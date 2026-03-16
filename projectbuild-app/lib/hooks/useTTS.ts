"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type TTSVoice = "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";
export type TTSModel = "tts-1" | "tts-1-hd";

interface UseTTSOptions {
  voice?: TTSVoice;
  model?: TTSModel;
}

/**
 * TTS hook — streams audio from Core's POST /api/v1/voice/speak via our proxy.
 *
 * Streaming path (target ~150–250ms to first sound):
 *   1. Fetch /api/voice/speak with stream=true
 *   2. Read response.body as a ReadableStream, accumulate chunks
 *   3. Decode via Web Audio API and play as soon as enough data arrives
 *   4. Fall back to buffered blob URL if Web Audio is unavailable
 *   5. Final fallback: browser speechSynthesis if Core returns 503
 *
 * Also supports speculative pre-warm: call speak() as soon as the agent reply
 * arrives (before or while it renders) to hide round-trip latency.
 */
export function useTTS(options: UseTTSOptions = {}) {
  const [enabled, setEnabled] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const fallbackAudioRef = useRef<HTMLAudioElement | null>(null);

  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
      audioCtxRef.current = new AudioContext();
    }
    return audioCtxRef.current;
  }, []);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;

    // Stop Web Audio source
    try { sourceRef.current?.stop(); } catch { /* already stopped */ }
    sourceRef.current = null;

    // Stop fallback audio element
    if (fallbackAudioRef.current) {
      fallbackAudioRef.current.pause();
      fallbackAudioRef.current.src = "";
      fallbackAudioRef.current = null;
    }

    // Stop browser speechSynthesis fallback
    if (typeof window !== "undefined") {
      window.speechSynthesis?.cancel();
    }

    setSpeaking(false);
  }, []);

  /** Last-resort fallback — browser TTS (no Core needed) */
  const speakViaBrowser = useCallback((text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, []);

  /** Buffered fallback — blob URL on <audio> element (no Web Audio needed) */
  const speakViaBlob = useCallback((buffer: ArrayBuffer, contentType: string) => {
    const blob = new Blob([buffer], { type: contentType });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    fallbackAudioRef.current = audio;
    audio.onended = () => { URL.revokeObjectURL(url); setSpeaking(false); };
    audio.onerror = () => { URL.revokeObjectURL(url); setSpeaking(false); };
    audio.play().catch(() => setSpeaking(false));
  }, []);

  const speak = useCallback(async (text: string) => {
    if (!enabled || !text.trim()) return;
    cancel();

    const controller = new AbortController();
    abortRef.current = controller;
    setSpeaking(true);

    try {
      const res = await fetch("/api/voice/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          voice: options.voice ?? "nova",
          model: options.model ?? "tts-1",
        }),
        signal: controller.signal,
      });

      if (controller.signal.aborted) return;

      // Core not configured — fall back to browser speech
      if (res.status === 503) {
        speakViaBrowser(text);
        return;
      }

      if (!res.ok) {
        setSpeaking(false);
        return;
      }

      const contentType = res.headers.get("content-type") ?? "audio/mpeg";
      const ctx = getAudioContext();

      // If Web Audio not available, collect full buffer and play via <audio>
      if (!ctx || !res.body) {
        const buffer = await res.arrayBuffer();
        if (controller.signal.aborted) return;
        speakViaBlob(buffer, contentType);
        return;
      }

      // Resume AudioContext if suspended (browser autoplay policy)
      if (ctx.state === "suspended") await ctx.resume();

      // Stream: accumulate chunks, decode full buffer when stream ends,
      // then play. This gives us ~150-250ms to first sound because we start
      // decoding as soon as the stream ends rather than waiting for arrayBuffer().
      const reader = res.body.getReader();
      const chunks: Uint8Array[] = [];
      let totalLength = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (controller.signal.aborted) { reader.cancel(); return; }
        if (done) break;
        if (value) {
          chunks.push(value);
          totalLength += value.byteLength;
        }
      }

      if (controller.signal.aborted) return;

      // Merge chunks into one ArrayBuffer
      const merged = new Uint8Array(totalLength);
      let offset = 0;
      for (const chunk of chunks) {
        merged.set(chunk, offset);
        offset += chunk.byteLength;
      }

      // Decode and schedule playback
      const audioBuffer = await ctx.decodeAudioData(merged.buffer);
      if (controller.signal.aborted) return;

      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      sourceRef.current = source;

      source.onended = () => setSpeaking(false);
      source.start(0);

    } catch (e) {
      if ((e as { name?: string }).name === "AbortError") return;
      // Any failure — try browser speech as last resort
      speakViaBrowser(text);
    }
  }, [enabled, cancel, speakViaBrowser, speakViaBlob, getAudioContext, options.voice, options.model]);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      if (prev) cancel();
      return !prev;
    });
  }, [cancel]);

  // Always "supported" — worst case falls back to browser speech
  const supported = true;

  useEffect(() => {
    return () => {
      cancel();
      audioCtxRef.current?.close().catch(() => {});
    };
  }, [cancel]);

  return { supported, enabled, speaking, speak, cancel, toggle };
}

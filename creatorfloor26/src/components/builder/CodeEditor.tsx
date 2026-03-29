"use client";

import CodeMirror from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { lua } from "@codemirror/legacy-modes/mode/lua";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { useTheme } from "@/lib/hooks/useTheme";

const luauLang = StreamLanguage.define(lua);

type Lang = "luau" | "verse";

export function CodeEditor({
  value,
  onChange,
  language,
  readOnly,
}: {
  value: string;
  onChange: (v: string) => void;
  language: Lang;
  readOnly?: boolean;
}) {
  const dark = useTheme();
  const extensions =
    language === "luau" ? [luauLang] : [javascript({ typescript: false })];

  return (
    <CodeMirror
      value={value}
      height="100%"
      className="min-h-[320px] overflow-hidden rounded-lg border border-zinc-200 text-sm dark:border-zinc-800"
      theme={dark ? oneDark : undefined}
      extensions={extensions}
      editable={!readOnly}
      onChange={onChange}
      basicSetup={{
        lineNumbers: true,
        foldGutter: true,
        highlightActiveLine: true,
      }}
    />
  );
}

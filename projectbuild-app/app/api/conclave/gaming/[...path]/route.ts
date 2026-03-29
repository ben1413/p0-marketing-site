/**
 * Conclave BFF on Project Build — browser calls `/api/conclave/gaming/*` only; forwards to
 * Core `/api/v1/gaming/*` with the same headers (Authorization, Cookie, x-dev-bypass*, etc.).
 *
 * Requires `P0_CORE_BASE_URL` or `NEXT_PUBLIC_P0_CORE_BASE_URL` (see `lib/p0/getCoreBaseUrl.ts`).
 */

import type { NextRequest } from "next/server";
import { fetchWithCoreFallback, getCoreBaseUrl } from "../../../../../lib/p0/getCoreBaseUrl";

export const runtime = "nodejs";
export const maxDuration = 60;

const HOP_BY_HOP = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
  "host",
]);

function buildTargetUrl(pathSegments: string[]): string | null {
  const base = getCoreBaseUrl();
  if (!base) return null;
  const path = pathSegments.join("/");
  return `${base}/api/v1/gaming/${path}`;
}

function forwardHeaders(request: NextRequest): Headers {
  const out = new Headers();
  request.headers.forEach((value, key) => {
    if (!HOP_BY_HOP.has(key.toLowerCase())) {
      out.set(key, value);
    }
  });
  return out;
}

async function proxy(request: NextRequest, pathSegments: string[]): Promise<Response> {
  const pathBase = buildTargetUrl(pathSegments);
  if (!pathBase) {
    return Response.json(
      { ok: false, error: "P0_CORE_BASE_URL is not configured for Conclave BFF" },
      { status: 503 }
    );
  }
  const u = new URL(request.url);
  const target = `${pathBase}${u.search}`;
  const hasBody = !["GET", "HEAD", "OPTIONS"].includes(request.method);
  const init: RequestInit = {
    method: request.method,
    headers: forwardHeaders(request),
    body: hasBody ? await request.text() : undefined,
    redirect: "manual",
  };
  return fetchWithCoreFallback(target, init);
}

export async function GET(
  request: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) {
  const { path } = await ctx.params;
  return proxy(request, path ?? []);
}

export async function POST(
  request: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) {
  const { path } = await ctx.params;
  return proxy(request, path ?? []);
}

export async function PATCH(
  request: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) {
  const { path } = await ctx.params;
  return proxy(request, path ?? []);
}

export async function PUT(
  request: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) {
  const { path } = await ctx.params;
  return proxy(request, path ?? []);
}

export async function DELETE(
  request: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) {
  const { path } = await ctx.params;
  return proxy(request, path ?? []);
}

import { NextRequest, NextResponse } from "next/server";
import { proxyToCore, readJsonResponse } from "@/lib/core/proxy";

export const runtime = "nodejs";

async function handle(req: NextRequest, segments: string[], method: string) {
  const subpath = (segments ?? []).join("/");
  if (!subpath) {
    return NextResponse.json({ ok: false, error: "Missing gaming API path" }, { status: 400 });
  }

  let body: string | null = null;
  if (method !== "GET" && method !== "HEAD") {
    body = await req.text();
  }

  const res = await proxyToCore({
    authorizationHeader: req.headers.get("authorization"),
    method,
    path: `/api/v1/gaming/${subpath}`,
    search: req.nextUrl.search,
    body,
    contentType: req.headers.get("content-type"),
  });

  const json = await readJsonResponse(res);
  return NextResponse.json(json, { status: res.status });
}

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) {
  const { path } = await ctx.params;
  return handle(req, path ?? [], "GET");
}

export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) {
  const { path } = await ctx.params;
  return handle(req, path ?? [], "POST");
}

export async function PATCH(
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) {
  const { path } = await ctx.params;
  return handle(req, path ?? [], "PATCH");
}

export async function DELETE(
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) {
  const { path } = await ctx.params;
  return handle(req, path ?? [], "DELETE");
}

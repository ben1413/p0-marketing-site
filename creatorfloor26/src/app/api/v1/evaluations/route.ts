import { NextRequest, NextResponse } from "next/server";
import { proxyToCore, readJsonResponse } from "@/lib/core/proxy";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const res = await proxyToCore({
    authorizationHeader: req.headers.get("authorization"),
    method: "GET",
    path: "/api/v1/evaluations",
    search: req.nextUrl.search,
    body: null,
    contentType: null,
  });
  return NextResponse.json(await readJsonResponse(res), { status: res.status });
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const res = await proxyToCore({
    authorizationHeader: req.headers.get("authorization"),
    method: "POST",
    path: "/api/v1/evaluations",
    search: req.nextUrl.search,
    body,
    contentType: req.headers.get("content-type"),
  });
  return NextResponse.json(await readJsonResponse(res), { status: res.status });
}

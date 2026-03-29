import { NextRequest, NextResponse } from "next/server";
import { proxyToCore, readJsonResponse } from "@/lib/core/proxy";

export const runtime = "nodejs";

async function proxyLedger(req: NextRequest, method: string) {
  let body: string | null = null;
  if (method !== "GET" && method !== "HEAD") {
    body = await req.text();
  }
  const res = await proxyToCore({
    authorizationHeader: req.headers.get("authorization"),
    method,
    path: "/api/v1/ledger",
    search: req.nextUrl.search,
    body,
    contentType: req.headers.get("content-type"),
  });
  const json = await readJsonResponse(res);
  return NextResponse.json(json, { status: res.status });
}

export async function GET(req: NextRequest) {
  return proxyLedger(req, "GET");
}

export async function POST(req: NextRequest) {
  return proxyLedger(req, "POST");
}

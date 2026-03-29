/**
 * BFF catch-all proxy → Core gaming APIs.
 *
 * All calls from the browser hit /api/gaming/[...path]
 * This route forwards them to Core with the server-held API key.
 * The key NEVER ships to the browser.
 *
 * Auth: Greenlight uses Firebase Auth. The user's ID token is forwarded
 * to Core as X-Greenlight-User — Core maps it to project auth.
 */

import { type NextRequest, NextResponse } from "next/server";

const CORE_URL = process.env.CORE_URL ?? "http://localhost:3000";
const API_KEY = process.env.GREENLIGHT_CORE_API_KEY ?? "";

// Paths not allowed through the proxy (admin-only operations)
const BLOCKED_PATHS = [
  "/gaming/decisions/engine-dev",
  "/gaming/calibration",
  "/gaming/outcomes/evaluate",
];

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return proxy(request, params.path, "GET");
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return proxy(request, params.path, "POST");
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return proxy(request, params.path, "PATCH");
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return proxy(request, params.path, "DELETE");
}

async function proxy(
  request: NextRequest,
  pathSegments: string[],
  method: string
) {
  const corePath = "/api/v1/gaming/" + pathSegments.join("/");

  // Block sensitive paths
  if (BLOCKED_PATHS.some((b) => corePath.includes(b))) {
    return NextResponse.json(
      { ok: false, error: "This operation requires direct Core access." },
      { status: 403 }
    );
  }

  // Build Core URL
  const coreUrl = new URL(corePath, CORE_URL);
  request.nextUrl.searchParams.forEach((v, k) => {
    coreUrl.searchParams.set(k, v);
  });

  // Forward headers — add Core API key, never expose it
  const forwardHeaders: Record<string, string> = {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  };

  // Forward user identity if present (from Firebase Auth)
  const userToken = request.headers.get("x-greenlight-user");
  if (userToken) forwardHeaders["X-Greenlight-User"] = userToken;

  let body: string | undefined;
  if (method !== "GET" && method !== "DELETE") {
    body = await request.text();
  }

  try {
    const upstream = await fetch(coreUrl.toString(), {
      method,
      headers: forwardHeaders,
      body,
    });

    const data = await upstream.json();

    return NextResponse.json(data, {
      status: upstream.status,
      headers: {
        // Don't cache writes
        "Cache-Control": method === "GET" ? "s-maxage=5" : "no-store",
      },
    });
  } catch (err) {
    console.error("[greenlight-bff] proxy error:", err);
    return NextResponse.json(
      { ok: false, error: "Core unreachable" },
      { status: 503 }
    );
  }
}

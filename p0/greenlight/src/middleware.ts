import { NextRequest, NextResponse } from "next/server";

/**
 * Greenlight auth middleware.
 *
 * Protects all operator routes. In demo mode (no Firebase config) the guard
 * is bypassed so the seed data is accessible without credentials.
 *
 * In production: operator routes require a valid Firebase session cookie or
 * Bearer token. Without one, users are redirected to /sign-in.
 *
 * Public routes (always accessible):
 *   /sign-in
 *   /api/gaming/*  (BFF — authenticated by Core API key, not operator session)
 *
 * Session verification happens server-side in layout.tsx for pages that need
 * real user data. Middleware provides the outer redirect guard only.
 */

const PUBLIC_PATHS = ["/sign-in", "/api/gaming/"];

function isPublic(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow public paths
  if (isPublic(pathname)) {
    return NextResponse.next();
  }

  // Demo mode bypass — if Firebase is not configured, let operators through
  // so seed data is usable without credentials. Set GREENLIGHT_DEMO_MODE=false
  // in production to enforce sign-in.
  const demoMode = process.env.GREENLIGHT_DEMO_MODE === "true";
  if (demoMode) {
    return NextResponse.next();
  }

  // Check for session cookie (set after Firebase sign-in) or Bearer header
  const sessionCookie = request.cookies.get("gl_session");
  const authHeader = request.headers.get("authorization");
  const hasAuth = !!sessionCookie || (!!authHeader && authHeader.startsWith("Bearer "));

  if (!hasAuth) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Run on all operator routes; skip static files, _next internals, and favicon
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};

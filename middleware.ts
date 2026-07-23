import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(_request: NextRequest) {
  const response = NextResponse.next();
  const csp = ["default-src 'self'","script-src 'self' 'unsafe-inline'","style-src 'self' 'unsafe-inline'","img-src 'self' data: blob:","font-src 'self'","connect-src 'self' https://*.supabase.co","frame-ancestors 'none'","base-uri 'self'","form-action 'self'","object-src 'none'","upgrade-insecure-requests"].join("; ");
  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  response.headers.set("X-Frame-Options", "DENY");
  return response;
}
export const config = { matcher: "/((?!_next/static|_next/image|favicon.svg).*)" };

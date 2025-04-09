import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/" || path === "/login" || path === "/register";

  // Check if user is authenticated (you can store this in a cookie or token)
  const token = request.cookies.get("auth-token")?.value || "";

  // Redirect logic
  if (!token && !isPublicPath) {
    // Redirect to login if trying to access protected route while not authenticated
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"],
};

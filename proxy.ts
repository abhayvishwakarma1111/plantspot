import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const adminCookie = request.cookies.get("admin");

  const pathname = request.nextUrl.pathname;

  const isLoginPage = pathname === "/admin/login";
  const isLoginApi = pathname === "/api/admin/login";

  if (
    pathname.startsWith("/admin") &&
    !isLoginPage &&
    adminCookie?.value !== "authenticated"
  ) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (
    pathname.startsWith("/api/admin") &&
    !isLoginApi &&
    adminCookie?.value !== "authenticated"
  ) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
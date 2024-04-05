import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { jwtDecode } from "jwt-decode";

export async function middleware(request: NextRequest) {
  const loginUrl = "/login";

  if (request.nextUrl.pathname === loginUrl) {
    return NextResponse.next();
  }

  const { cookies } = request;

  const refreshToken = cookies.get("refresh");
  const accessToken = cookies.get("access");

  if (refreshToken) {
    const decodedRefresh = jwtDecode(refreshToken.value);
    const currentTime = Date.now() / 1000;

    if (decodedRefresh.exp < currentTime) {
      return NextResponse.redirect(new URL(loginUrl, request.url));
    }
  } else {
    return NextResponse.redirect(new URL(loginUrl, request.url));
  }

  if (accessToken) {
    const decodedAccess = jwtDecode(accessToken.value);
    const currentTime = Date.now() / 1000;

    if (decodedAccess.exp < currentTime) {
      return NextResponse.redirect(new URL(loginUrl, request.url));
    }
  } else {
    return NextResponse.redirect(new URL(loginUrl, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/sections/:path*",
};

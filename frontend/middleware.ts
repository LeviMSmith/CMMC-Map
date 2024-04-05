import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { jwtDecode } from "jwt-decode";

async function refreshAccess() {
  const response = await fetch("/api/token/refresh/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
}

export async function middleware(request: NextRequest) {
  const { cookies } = request;

  const accessToken = cookies.get("access");
  const refreshToken = cookies.get("refresh");

  const loginUrl = "/login";

  if (!refreshToken && request.nextUrl.pathname !== loginUrl) {
    return NextResponse.redirect(new URL(loginUrl, request.url));
  }

  if (!accessToken) {
    await refreshAccess();
  } else {
    const decodedAccess = jwtDecode(accessToken.value);
    const currentTime = Date.now() / 1000;

    if (decodedAccess.exp < currentTime) {
      await refreshAccess();
    }
  }

  if (!accessToken) {
    return NextResponse.redirect(new URL(loginUrl, request.url));
  } else {
    const decodedAccess = jwtDecode(accessToken.value);
    const currentTime = Date.now() / 1000;

    if (decodedAccess.exp < currentTime) {
      return NextResponse.redirect(new URL(loginUrl, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/sections/:path*",
};

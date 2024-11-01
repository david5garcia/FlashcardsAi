import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Check if the user has a valid session token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  // Define the paths that should be protected
  const protectedPaths = ["/play"];
  const pathname = request.nextUrl.pathname;

  // If accessing a protected path and no token is present, redirect to the login page
  if (protectedPaths.includes(pathname) && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If the user is authenticated or the path is not protected, allow access
  return NextResponse.next();
}

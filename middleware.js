import { NextResponse } from "next/server";

export default function middleware(req) {
  const authenticated = req.cookies.get("access_token");
  const { pathname, origin } = req.nextUrl;

  if (!authenticated && pathname === "/Product") {
    return NextResponse.redirect(`${origin}/`);
  }

  if (authenticated && pathname === "/") {
    return NextResponse.redirect(`${origin}/Product`);
  }
}

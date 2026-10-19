import { NextResponse, type NextRequest } from "next/server";
import { verifySessionToken } from "./lib/session-token";

const SESSION_COOKIE = "numa_admin";

/** Proteção de rotas: o painel exige sessão de administradora. */
export async function proxy(request: NextRequest) {
  const secret = process.env.SESSION_SECRET;
  const token = request.cookies.get(SESSION_COOKIE)?.value;

  if (secret && (await verifySessionToken(secret, token))) {
    return NextResponse.next();
  }

  const login = new URL("/login", request.url);
  login.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

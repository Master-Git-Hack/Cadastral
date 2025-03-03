// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('user-storage')?.value;
  const isAuth = token && JSON.parse(token).state.token;

  // Permitir rutas públicas que incluyan "legacy"
  if (req.nextUrl.pathname.includes('legacy')) return NextResponse.next();

  // Redirigir si no está autenticado
  if (!isAuth && req.nextUrl.pathname !== '/sign-in') {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (['/'].includes(pathname)) {
    return NextResponse.next(); 
  }

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!session) {
    // if is on api then return a json response with error message
    if (pathname.startsWith('/api')) {
      return new NextResponse(JSON.stringify({ success: false, message: 'Unauthorized' }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      });
    }
    // else redirect to signin page
    return NextResponse.redirect(new URL(`/api/auth/signin?callbackUrl=${pathname}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!posts|api/auth|_next/static|_next/image|favicon.ico).*)'],
};

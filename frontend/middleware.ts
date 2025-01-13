import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    const isLoggedInUser = !!token?.accessToken;
    const isAuthPage = req.nextUrl.pathname.startsWith('/signin') || req.nextUrl.pathname.startsWith('/signup')

    if (isAuthPage && isLoggedInUser) {
        return NextResponse.redirect(new URL('/', req.url));
    }
    if (!isAuthPage && !isLoggedInUser) {
        return NextResponse.redirect(new URL('/signin', req.url));
      }
    
    return NextResponse.next()
}

export const config = {
    matcher: ['/','/signin', '/signup'],
  };
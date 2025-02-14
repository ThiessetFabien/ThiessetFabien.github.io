import { checkGmailAuth } from '@middlewares/checkGmailAuth';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/contact')) {
    return checkGmailAuth();
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/contact',
};

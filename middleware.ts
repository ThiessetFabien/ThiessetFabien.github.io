import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkGmailAuth } from '@middleware/checkGmailAuth';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/contact')) {
    return checkGmailAuth(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/contact',
};

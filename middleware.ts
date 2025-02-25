import { checkGmailAuth } from '@/src/middlewares/gmailAuth.middleware';
import { sanitizeMiddleware } from '@/src/middlewares/sanitize.middleware';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const sanitizedRequest = await sanitizeMiddleware(request);

  if (
    sanitizedRequest instanceof NextResponse &&
    (request.method === 'POST' || request.method === 'PUT')
  ) {
    return sanitizedRequest;
  }

  if (request.nextUrl.pathname.startsWith('/api/contact')) {
    return checkGmailAuth();
  }

  return NextResponse.next({
    request: sanitizedRequest,
  });
}

export const config = {
  matcher: ['/api/contact', '/api/:path*'],
};

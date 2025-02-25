import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { SanitizationService } from '@/src/lib/services/sanitize.service';

export async function sanitizeMiddleware(request: NextRequest) {
  if (request.method === 'POST' || request.method === 'PUT') {
    try {
      const sanitizer = SanitizationService.getInstance();
      const body = await request.json();
      const sanitizedBody = sanitizer.sanitizeObject(body);

      const newRequest = new Request(request.url, {
        method: request.method,
        headers: request.headers,
        body: JSON.stringify(sanitizedBody),
      });

      Object.defineProperty(newRequest, 'sanitizedBody', {
        value: sanitizedBody,
        writable: false,
      });

      return newRequest;
    } catch (error) {
      return NextResponse.json(
        {
          error: 'Erreur lors de la sanitisation des données',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
        { status: 400 }
      );
    }
  }
  return request;
}

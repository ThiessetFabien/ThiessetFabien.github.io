import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { SanitizationService } from '@/src/services/sanitize.service';

export async function sanitizeMiddleware(request: NextRequest) {
  if (request.method === 'POST' || request.method === 'PUT') {
    try {
      const sanitizer = SanitizationService.getInstance();
      const clonedRequest = request.clone();
      const body = await clonedRequest.json();
      const sanitizedBody = sanitizer.sanitizeObject(body);

      return NextResponse.json(sanitizedBody);
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

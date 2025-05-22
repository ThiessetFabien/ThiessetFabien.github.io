import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Ce middleware aide à s'assurer que les métadonnées sont correctement appliquées
// et gère les redirections vers la page 404 pour les routes invalides
export function middleware(request: NextRequest) {
  // Gestion de certaines routes qui doivent être redirigées vers la page 404
  const { pathname } = request.nextUrl;

  // Vérifie si le chemin est un chemin invalide connu
  if (
    pathname.includes('/.well-known/appspecific') ||
    pathname.includes('/undefined') ||
    pathname.endsWith('/videos/')
  ) {
    return NextResponse.redirect(new URL('/not-found', request.url));
  }

  // Continuer avec la requête pour les autres chemins
  return NextResponse.next();
}

// Voir: https://nextjs.org/docs/app/building-your-application/routing/middleware
export const config = {
  matcher: [
    // Inclure les routes d'icônes pour le diagnostic
    '/(.*)',
  ],
};

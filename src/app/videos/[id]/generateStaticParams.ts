// Ce fichier est nécessaire pour l'export statique avec output: export
// Il définit les paramètres pour la route dynamique /videos/[id]

// Liste des vidéos disponibles pour la génération statique
export function generateStaticParams() {
  return [
    { id: 'casalink' },
    // Ajouter d'autres vidéos ici au besoin
  ];
}

// Fonction vide requise pour la page client
export default function GenerateParams() {
  return null;
}

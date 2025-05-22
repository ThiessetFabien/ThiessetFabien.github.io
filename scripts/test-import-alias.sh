#!/bin/bash
# Script pour tester les règles d'alias ESLint
# Vérifie si les imports relatifs sont correctement détectés par ESLint

echo "Test des règles d'alias d'import..."

# Créer un fichier temporaire pour le test dans le répertoire du projet
TEMP_FILE="/home/fabien/Projets/Portfolio/src/test-alias.tsx"
cat > "$TEMP_FILE" << EOF
// Test des règles d'alias d'import
import { menuItems } from '../../config/menuItems.config';
import { LoadingProvider } from '../../contexts/LoadingContext';
import { Toaster } from '../../lib/components/ui/toaster';
import { FloatingMenubar } from '../../components/ui/sheet/FloatingMenubar';

function TestComponent() {
  return <div>Test</div>;
}

export default TestComponent;
EOF

echo "Fichier de test créé: $TEMP_FILE"
echo "Contenu du fichier de test:"
cat "$TEMP_FILE"
echo ""

# Exécuter ESLint sur le fichier temporaire
echo "Exécution d'ESLint sur le fichier de test..."
cd /home/fabien/Projets/Portfolio && \
npx eslint "$TEMP_FILE"

# Nettoyer
echo "Nettoyage..."
rm "$TEMP_FILE"

echo "Test terminé!"

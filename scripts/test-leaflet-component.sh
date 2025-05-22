#!/bin/bash
# filepath: /home/fabien/Projets/Portfolio/scripts/test-leaflet-component.sh

# Ce script teste le composant LeafletMapFixed et compare ses performances
# avec l'ancien composant LeafletMap

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

echo -e "${BLUE}${BOLD}=== Test du composant LeafletMapFixed ===${NC}"
echo "Ce script va tester le fonctionnement du nouveau composant de carte Leaflet"

# Vérifier si les dépendances sont installées
echo -e "${YELLOW}Vérification des dépendances...${NC}"
DEPS=("leaflet" "react-leaflet" "@types/leaflet")
MISSING=0

for DEP in "${DEPS[@]}"; do
  if grep -q "\"$DEP\"" package.json; then
    echo -e "  ${GREEN}✓${NC} $DEP est installé"
  else
    echo -e "  ${RED}✗${NC} $DEP est manquant"
    MISSING=1
  fi
done

if [ $MISSING -eq 1 ]; then
  echo -e "${YELLOW}Installation des dépendances manquantes...${NC}"
  bun install --save leaflet react-leaflet @types/leaflet
fi

# Vérifier si les images Leaflet sont présentes
echo -e "${YELLOW}Vérification des images Leaflet...${NC}"
if [ -d "public/images/leaflet" ]; then
  echo -e "  ${GREEN}✓${NC} Images Leaflet trouvées"
  # Vérifier si toutes les images nécessaires sont présentes
  REQUIRED_IMAGES=("marker-icon.png" "marker-icon-2x.png" "marker-shadow.png")
  IMAGES_MISSING=0
  
  for IMG in "${REQUIRED_IMAGES[@]}"; do
    if [ -f "public/images/leaflet/$IMG" ]; then
      echo -e "  ${GREEN}✓${NC} $IMG trouvé"
    else
      echo -e "  ${RED}✗${NC} $IMG manquant"
      IMAGES_MISSING=1
    fi
  done
  
  if [ $IMAGES_MISSING -eq 1 ]; then
    echo -e "${YELLOW}Copie des images manquantes depuis node_modules...${NC}"
    cp -f node_modules/leaflet/dist/images/* public/images/leaflet/
  fi
else
  echo -e "  ${RED}✗${NC} Images Leaflet manquantes"
  echo -e "${YELLOW}Création du dossier pour les images Leaflet...${NC}"
  mkdir -p public/images/leaflet
  
  echo -e "${YELLOW}Copie des images depuis node_modules...${NC}"
  cp -f node_modules/leaflet/dist/images/* public/images/leaflet/
  
  if [ $? -eq 0 ]; then
    echo -e "  ${GREEN}✓${NC} Images copiées avec succès"
  else
    echo -e "  ${RED}✗${NC} Impossible de copier les images"
  fi
fi

# Vérifier que les fichiers de styles sont correctement importés
echo -e "${YELLOW}Vérification des styles...${NC}"
STYLE_FILES=("leaflet-fixes.css" "leaflet-dark-mode.css" "leaflet.module.css")
STYLE_MISSING=0

for STYLE in "${STYLE_FILES[@]}"; do
  if [ -f "src/styles/$STYLE" ]; then
    echo -e "  ${GREEN}✓${NC} $STYLE existe"
  else
    echo -e "  ${RED}✗${NC} $STYLE est manquant"
    STYLE_MISSING=1
  fi
done

# Vérifier les utilitaires Leaflet
echo -e "${YELLOW}Vérification des utilitaires Leaflet...${NC}"
UTILS_DIR="src/utils/leaflet"
if [ -d "$UTILS_DIR" ]; then
  echo -e "  ${GREEN}✓${NC} Répertoire d'utilitaires Leaflet trouvé"
  
  UTIL_FILES=("mapTileProviders.ts" "testUtils.ts")
  UTILS_MISSING=0
  
  for UTIL in "${UTIL_FILES[@]}"; do
    if [ -f "$UTILS_DIR/$UTIL" ]; then
      echo -e "  ${GREEN}✓${NC} $UTIL existe"
    else
      echo -e "  ${RED}✗${NC} $UTIL est manquant"
      UTILS_MISSING=1
    fi
  done
  
  if [ $UTILS_MISSING -eq 1 ]; then
    echo -e "${YELLOW}!${NC} Certains utilitaires Leaflet sont manquants, vérifiez l'implémentation"
  fi
else
  echo -e "  ${RED}✗${NC} Répertoire d'utilitaires Leaflet manquant"
  echo -e "${YELLOW}!${NC} Assurez-vous que les utilitaires sont correctement implémentés"
fi

# Tester le composant
echo -e "${YELLOW}Test du composant LeafletMapFixed...${NC}"

# Vérifier que les fichiers nécessaires existent
if [ -f "src/components/ui/maps/LeafletMapFixed.tsx" ]; then
  echo -e "  ${GREEN}✓${NC} LeafletMapFixed.tsx existe"
else
  echo -e "  ${RED}✗${NC} LeafletMapFixed.tsx est manquant"
  exit 1
fi

if [ -f "src/components/ui/maps/TestLeafletMap.tsx" ]; then
  echo -e "  ${GREEN}✓${NC} TestLeafletMap.tsx existe"
else
  echo -e "  ${RED}✗${NC} TestLeafletMap.tsx est manquant"
  exit 1
fi

# Créer une route temporaire pour tester le composant
echo -e "${YELLOW}Création d'une route de test...${NC}"

# Détection du framework utilisé (Next.js ou autre)
if [ -f "src/app/layout.tsx" ] || [ -f "src/app/page.tsx" ]; then
  echo -e "  ${GREEN}✓${NC} Application Next.js détectée"
  
  # Créer un dossier de test s'il n'existe pas déjà
  TEST_DIR="src/app/test-leaflet"
  if [ ! -d "$TEST_DIR" ]; then
    mkdir -p "$TEST_DIR"
    
    # Création du fichier page.tsx
    cat > "$TEST_DIR/page.tsx" << 'EOF'
'use client';
import TestLeafletMap from '@src/components/ui/maps/TestLeafletMap';
import { useEffect } from 'react';

export default function TestLeafletPage() {
  // Charger l'utilitaire de test
  useEffect(() => {
    const importTestUtils = async () => {
      const { testLeafletMap } = await import('@src/utils/leaflet/testUtils');
      // Exporter la fonction pour la console
      window.testLeafletMap = testLeafletMap;
      console.log("Utilitaires de test Leaflet chargés. Essayez 'testLeafletMap()' dans la console pour exécuter les tests.");
    };
    
    importTestUtils().catch(console.error);
  }, []);
  
  return (
    <div className="min-h-screen">
      <TestLeafletMap />
    </div>
  );
}
EOF
    
    echo -e "  ${GREEN}✓${NC} Route de test créée : /test-leaflet"
    
    # Créer une page pour comparer les deux composants
    COMPARE_DIR="src/app/test-leaflet-compare"
    if [ ! -d "$COMPARE_DIR" ]; then
      mkdir -p "$COMPARE_DIR"
      
      # Création du fichier de comparaison
      cat > "$COMPARE_DIR/page.tsx" << 'EOF'
'use client';
import React, { useState } from 'react';
import LeafletMap from '@src/components/ui/maps/LeafletMap';
import LeafletMapFixed from '@src/components/ui/maps/LeafletMapFixed';

export default function LeafletComparePage() {
  const [center] = useState<[number, number]>([48.8566, 2.3522]);
  const [zoom] = useState<number>(13);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  
  // Configuration des marqueurs identiques pour les deux cartes
  const markers = [
    {
      position: [48.8566, 2.3522], // Paris
      circle: {
        radius: 5000,
        color: '#3388ff',
        fillColor: '#3388ff',
        fillOpacity: 0.2,
      },
    },
  ];
  
  return (
    <div className={`p-4 min-h-screen ${darkMode ? 'bg-gray-900 text-white dark' : 'bg-white'}`}>
      <div className="mb-4 flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Comparaison des composants Leaflet
        </h1>
        
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-4 py-2 rounded-md ${
            darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          {darkMode ? 'Mode Clair' : 'Mode Sombre'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="border rounded-lg overflow-hidden h-[400px]">
          <h2 className={`p-2 text-center font-semibold ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            LeafletMap (Original)
          </h2>
          <div className="h-[calc(100%-40px)]">
            <LeafletMap
              center={center}
              zoom={zoom}
              markers={markers}
              scrollWheelZoom={true}
              flyToAnimation={true}
            />
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden h-[400px]">
          <h2 className={`p-2 text-center font-semibold ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            LeafletMapFixed (Nouveau)
          </h2>
          <div className="h-[calc(100%-40px)]">
            <LeafletMapFixed
              center={center}
              zoom={zoom}
              markers={markers}
              scrollWheelZoom={true}
              flyToAnimation={true}
            />
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-4 border rounded-lg">
        <h2 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Guide de comparaison
        </h2>
        <p className="mb-2">Vérifiez les différences suivantes entre les deux composants :</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Chargement initial des tuiles</li>
          <li>Fluidité de l'animation</li>
          <li>Apparence en mode sombre</li>
          <li>Performance lors du déplacement et du zoom</li>
          <li>Affichage des contrôles et des attributions</li>
        </ul>
        <p className="mt-4 text-sm text-gray-500">
          Ouvrez la console du navigateur et exécutez <code>testLeafletMap()</code> pour un diagnostic complet.
        </p>
      </div>
    </div>
  );
}
EOF
      
      echo -e "  ${GREEN}✓${NC} Route de comparaison créée : /test-leaflet-compare"
    else
      echo -e "  ${YELLOW}!${NC} Le dossier test-leaflet-compare existe déjà"
    fi
  else
    echo -e "  ${YELLOW}!${NC} Le dossier test-leaflet existe déjà"
  fi
  
  # Lancer le serveur de développement
  echo -e "${YELLOW}Vous pouvez maintenant visiter les pages de test :${NC}"
  echo -e "${GREEN}http://localhost:3000/test-leaflet${NC} - Pour tester le nouveau composant"
  echo -e "${GREEN}http://localhost:3000/test-leaflet-compare${NC} - Pour comparer les deux versions"
else
  echo -e "  ${YELLOW}!${NC} Ce n'est pas une application Next.js"
  echo -e "  ${YELLOW}!${NC} Veuillez créer manuellement une route pour le composant TestLeafletMap"
fi

echo -e "${BLUE}${BOLD}=== Instructions pour valider les résultats ===${NC}"
echo "1. Lancez votre application en mode développement (bun run dev)"
echo "2. Accédez aux pages de test :"
echo "   - http://localhost:3000/test-leaflet (test du nouveau composant)"
echo "   - http://localhost:3000/test-leaflet-compare (comparaison des deux versions)"
echo "3. Vérifiez que les cartes s'affichent correctement"
echo "4. Testez le comportement avec et sans animation"
echo "5. Testez le mode sombre/clair"
echo "6. Dans la console du navigateur, exécutez 'testLeafletMap()' pour un diagnostic"
echo ""
echo -e "${YELLOW}${BOLD}Pour installer le nouveau composant comme version principale:${NC}"
echo -e "${GREEN}cp src/components/ui/maps/LeafletMapFixed.tsx src/components/ui/maps/LeafletMap.tsx${NC}"

# Donner les droits d'exécution au script
chmod +x "$(realpath $0)"

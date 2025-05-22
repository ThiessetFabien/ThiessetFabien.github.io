#!/bin/bash
# filepath: /home/fabien/Projets/Portfolio/scripts/fix-lint-format.sh

set -e
echo "🔍 Fixing linting and formatting issues..."

# Vérification des types TypeScript
echo "🔄 Running TypeScript type check..."
bun run type-check

# Correction des problèmes ESLint
echo "🛠️ Running ESLint fix..."
bun run lint:fix

# Correction du formatage avec Prettier
echo "💅 Running Prettier format..."
bun run format

echo "✅ Done! Linting and formatting issues have been fixed."
echo "👉 Running final verification..."
bun run lint:check

echo "🎉 All done! Your code is now clean and tidy."

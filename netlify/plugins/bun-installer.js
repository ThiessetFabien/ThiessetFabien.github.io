export const onPreBuild = async ({ utils }) => {
  try {
    console.log('🔧 Installing Bun...');
    await utils.run.command('npm install -g bun');
    console.log('✅ Bun installed successfully');

    // Vérifier l'installation
    await utils.run.command('bun --version');

    // Installer les dépendances avec Bun
    console.log('📦 Installing dependencies with Bun...');

    // Installer avec l'option --no-save pour éviter les problèmes de peer dependencies
    await utils.run.command('bun install --no-save');
    console.log('✅ Dependencies installed successfully');
  } catch (error) {
    console.error('❌ Error installing Bun:', error);
    utils.build.failBuild('Failed to install Bun');
  }
};

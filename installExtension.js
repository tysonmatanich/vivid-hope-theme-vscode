const { execSync } = require('child_process');

const version = execSync('node getVersion.js').toString().trim();
const command = `code --install-extension vivid-hope-theme-vscode-${version}.vsix`;

execSync(command, { stdio: 'inherit' });

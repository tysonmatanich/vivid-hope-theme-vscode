const fs = require('fs');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
process.stdout.write(packageJson.version);

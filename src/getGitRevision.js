// getGitRevision.js
const { execSync } = require('child_process');
const fs = require('fs');

try {
    const revision = execSync('git rev-parse --short HEAD').toString().trim();
    fs.writeFileSync('.env', `VITE_TITLE_APP="Dancer's Pointe Recital Line Up"\n`)
    fs.writeFileSync('.env', `VITE_APP_GIT_REVISION=${revision}\n`, { flag: 'a' });
    console.log(`Git revision written to .env: ${revision}`);
} catch (error) {
    console.error(`Error fetching Git revision: ${error.message}`);
}

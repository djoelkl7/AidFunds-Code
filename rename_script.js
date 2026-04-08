import fs from 'fs';
import path from 'path';

const replacements = [
  { from: /AidFunds/g, to: 'Cashlio Finance' },
  { from: /aidfunds\.online/g, to: 'cashlio.finance' },
  { from: /primary-red/g, to: 'primary-purple' },
  { from: /red-700/g, to: 'primary-purple-dark' },
  { from: /red-500/g, to: 'primary-purple' },
  { from: /red-600/g, to: 'primary-purple-dark' },
];

function walk(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        walk(filePath);
      }
    } else if (stats.isFile()) {
      const ext = path.extname(file);
      if (['.tsx', '.ts', '.html', '.json', '.css'].includes(ext)) {
        let content = fs.readFileSync(filePath, 'utf8');
        let changed = false;
        replacements.forEach(r => {
          if (r.from.test(content)) {
            content = content.replace(r.from, r.to);
            changed = true;
          }
        });
        if (changed) {
          fs.writeFileSync(filePath, content, 'utf8');
          console.log(`Updated ${filePath}`);
        }
      }
    }
  });
}

walk('.');

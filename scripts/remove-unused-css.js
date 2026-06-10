const fs = require('fs');
const path = require('path');

const candidates = [
  'active-border','button-group','cooking-border','cooking-status','functional-link','input-field','mission-title','nav-agent-mode','order-items-list','ready-border','status-badge','status-offline-badge','status-online','text-danger','visual-card--globe','visual-card--route','visual-card--spice','visual-card--truck'
];

const stylesDir = path.join(process.cwd(), 'src', 'styles');
const backupDir = path.join(process.cwd(), 'scripts', 'style-backups');
if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

function readFiles(dir) {
  return fs.readdirSync(dir).filter(f => f.endsWith('.css')).map(f => path.join(dir, f));
}

function removeSelectorsFromCss(css, candidates) {
  // Split rules by '}' to process each block
  const parts = css.split('}');
  const kept = [];
  for (let part of parts) {
    if (!part.trim()) continue;
    const idx = part.indexOf('{');
    if (idx === -1) {
      // trailing content, keep
      kept.push(part + '}');
      continue;
    }
    const selectorText = part.slice(0, idx).trim();
    const body = part.slice(idx + 1).trim();
    // split selectors by comma
    const selectors = selectorText.split(',').map(s => s.trim()).filter(Boolean);
    const filtered = selectors.filter(s => {
      // determine if this selector references any candidate class as a whole word
      return !candidates.some(c => {
        // match .classname possibly followed by :, ., space, [, >, +, ~, or end
        const re = new RegExp('\\.' + c + '(?=[\\\s\.:>#\[+~\\,]|$)');
        return re.test(s);
      });
    });
    if (filtered.length === 0) {
      // remove entire rule
      continue;
    }
    // otherwise keep rule with filtered selector list
    kept.push(filtered.join(', ') + ' {' + '\n' + body + '\n' + '}');
  }
  return kept.join('\n\n');
}

const files = readFiles(stylesDir);
files.forEach(file => {
  const name = path.basename(file);
  const txt = fs.readFileSync(file, 'utf8');
  fs.writeFileSync(path.join(backupDir, name + '.bak'), txt, 'utf8');
  const modified = removeSelectorsFromCss(txt, candidates);
  fs.writeFileSync(file, modified, 'utf8');
  console.log('Updated', name);
});

console.log('Backups saved to', backupDir);

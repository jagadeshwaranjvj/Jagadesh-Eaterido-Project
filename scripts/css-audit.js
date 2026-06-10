const fs = require('fs');
const path = require('path');

function readDirRecursive(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(readDirRecursive(full));
    } else {
      results.push(full);
    }
  });
  return results;
}

function getCssFiles() {
  const stylesDir = path.join(__dirname, '..', 'src', 'styles');
  if (!fs.existsSync(stylesDir)) return [];
  return fs.readdirSync(stylesDir)
    .filter(f => f.endsWith('.css'))
    .map(f => path.join(stylesDir, f));
}

function extractClassNames(cssContent) {
  const regex = /\.([a-zA-Z0-9_-]+)/g;
  const set = new Set();
  let m;
  while ((m = regex.exec(cssContent)) !== null) {
    set.add(m[1]);
  }
  return Array.from(set);
}

function getSourceFiles() {
  const srcDir = path.join(__dirname, '..', 'src');
  const publicDir = path.join(__dirname, '..', 'public');
  const files = [];
  if (fs.existsSync(srcDir)) files.push(...readDirRecursive(srcDir));
  if (fs.existsSync(publicDir)) files.push(...readDirRecursive(publicDir));
  // filter to text files we care about
  return files.filter(f => /\.(js|jsx|ts|tsx|html|css)$/.test(f));
}

function fileContains(filePath, tokens) {
  try {
    const txt = fs.readFileSync(filePath, 'utf8');
    return tokens.some(tok => txt.includes(tok));
  } catch (e) {
    return false;
  }
}

function main() {
  const cssFiles = getCssFiles();
  const allClasses = new Set();
  cssFiles.forEach(f => {
    const c = fs.readFileSync(f, 'utf8');
    extractClassNames(c).forEach(cls => allClasses.add(cls));
  });

  const classList = Array.from(allClasses).sort();
  const sourceFiles = getSourceFiles();

  const usage = {};
  classList.forEach(cls => {
    const tokens = [`class="${cls}"`, `class='${cls}'`, `className=\"${cls}\"`, `className='${cls}'`, `\b${cls}\b`, `.${cls}`];
    let found = false;
    for (const f of sourceFiles) {
      if (fileContains(f, tokens)) { found = true; break; }
    }
    usage[cls] = found;
  });

  const unused = Object.keys(usage).filter(k => !usage[k]);
  const report = { totalClasses: classList.length, unusedCount: unused.length, unused };
  console.log(JSON.stringify(report, null, 2));
}

main();

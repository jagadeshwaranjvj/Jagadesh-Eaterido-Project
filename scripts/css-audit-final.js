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
  const stylesDir = path.join(process.cwd(), 'src', 'styles');
  if (!fs.existsSync(stylesDir)) return [];
  return fs.readdirSync(stylesDir)
    .filter(f => f.endsWith('.css'))
    .map(f => path.join(stylesDir, f));
}

function extractClassNames(cssContent) {
  const regex = /\.([A-Za-z_-][A-Za-z0-9_-]*)/g;
  const set = new Set();
  let m;
  while ((m = regex.exec(cssContent)) !== null) {
    set.add(m[1]);
  }
  return Array.from(set);
}

function getSourceFiles() {
  const srcDir = path.join(process.cwd(), 'src');
  const publicDir = path.join(process.cwd(), 'public');
  const files = [];
  if (fs.existsSync(srcDir)) files.push(...readDirRecursive(srcDir));
  if (fs.existsSync(publicDir)) files.push(...readDirRecursive(publicDir));
  return files.filter(f => /\.(js|jsx|ts|tsx|html|css)$/.test(f));
}

function extractStaticPartsFromTemplateLiteral(tl) {
  // remove ${...} expressions
  return tl.split(/\$\{[^}]*\}/g).filter(Boolean);
}

function extractStringsFromContent(content) {
  const found = new Set();
  // double quoted
  const dq = /"([^"\\]*(?:\\.[^"\\]*)*)"/g;
  let m;
  while ((m = dq.exec(content)) !== null) {
    found.add(m[1]);
  }
  // single quoted
  const sq = /'([^'\\]*(?:\\.[^'\\]*)*)'/g;
  while ((m = sq.exec(content)) !== null) {
    found.add(m[1]);
  }
  // template literals: keep static parts
  const tl = /`([^\\`]*(?:\\.[^\\`]*)*)`/g;
  while ((m = tl.exec(content)) !== null) {
    const parts = extractStaticPartsFromTemplateLiteral(m[1]);
    parts.forEach(p => found.add(p));
  }
  return Array.from(found);
}

function extractFromClassNamesCalls(content) {
  const found = new Set();
  const regex = /(classNames|clsx|cx)\s*\(([^)]*)\)/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const args = m[2];
    const strings = extractStringsFromContent(args);
    strings.forEach(s => found.add(s));
  }
  return Array.from(found);
}

function splitCandidates(str) {
  if (!str) return [];
  return str.split(/\s+/).map(s => s.trim()).filter(Boolean);
}

function main() {
  const cssFiles = getCssFiles();
  console.error('cssFiles', cssFiles.length);
  const classes = new Set();
  cssFiles.forEach(f => {
    const txt = fs.readFileSync(f, 'utf8');
    extractClassNames(txt).forEach(c => classes.add(c));
  });

  const classList = Array.from(classes).sort();
  console.error('totalClasses', classList.length);

  const sourceFiles = getSourceFiles();
  console.error('sourceFiles', sourceFiles.length);

  const used = new Set();

  sourceFiles.forEach(f => {
    let txt = '';
    try { txt = fs.readFileSync(f, 'utf8'); } catch (e) { return; }

    // attribute-based className/class
    const attr = /(?:class|className)\s*=\s*(?:\{?`([^`]*)`\}?|\{?"([^\"]*)"\}?|\{?'([^']*)'\}?)/g;
    let m;
    while ((m = attr.exec(txt)) !== null) {
      const groups = [m[1], m[2], m[3]].filter(Boolean);
      groups.forEach(g => splitCandidates(g).forEach(t => used.add(t)));
    }

    // all string literals and static parts
    const strings = extractStringsFromContent(txt);
    strings.forEach(s => splitCandidates(s).forEach(t => used.add(t)));

    // classNames/clsx extraction
    const cn = extractFromClassNamesCalls(txt);
    cn.forEach(s => splitCandidates(s).forEach(t => used.add(t)));
  });

  const usedList = Array.from(used);
  const found = classList.filter(c => usedList.includes(c));
  const unused = classList.filter(c => !usedList.includes(c));

  const report = { totalClasses: classList.length, usedCount: found.length, unusedCount: unused.length, unused };
  console.log(JSON.stringify(report, null, 2));
}

main();

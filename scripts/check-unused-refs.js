const fs = require('fs');
const path = require('path');
const candidates = [
  'active-border','button-group','cooking-border','cooking-status','css','functional-link','input-field','menu-item-highlighted','mission-title','nav-agent-mode','order-items-list','ready-border','status-badge','status-offline-badge','status-online','text-danger','visual-card--globe','visual-card--route','visual-card--spice','visual-card--truck'
];

function read(dir){
  let out=[];
  const it=fs.readdirSync(dir);
  it.forEach(i=>{
    const full=path.join(dir,i);
    if(fs.statSync(full).isDirectory()) out=out.concat(read(full)); else out.push(full);
  });
  return out;
}

const allFiles = read(path.join(process.cwd(),'src'))
  .filter(f => !f.includes(path.join('src','styles')))
  .filter(f => /\.(js|jsx|ts|tsx|html)$/.test(f));

const res = {};
for(const c of candidates) res[c]=[];
for(const f of allFiles){
  const txt = fs.readFileSync(f,'utf8');
  for(const c of candidates){
    if(txt.indexOf(c) !== -1) res[c].push(f);
  }
}
console.log(JSON.stringify(res, null, 2));

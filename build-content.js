const fs = require('fs');
const path = require('path');

const root = __dirname;
const collections = ['berita','prestasi','galeri','ekstrakurikuler','pengumuman'];

function scalar(v='') {
  v = v.trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1,-1);
  if (v === 'true') return true;
  if (v === 'false') return false;
  return v;
}
function parseMarkdown(file) {
  const raw = fs.readFileSync(file,'utf8').replace(/^\uFEFF/, '');
  let meta = {}, body = raw;
  if (raw.startsWith('---')) {
    const end = raw.indexOf('\n---', 3);
    if (end !== -1) {
      const front = raw.slice(3,end).trim();
      body = raw.slice(end + 4).trim();
      for (const line of front.split(/\r?\n/)) {
        const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
        if (m) meta[m[1]] = scalar(m[2]);
      }
    }
  }
  return {...meta, body, slug:path.basename(file,path.extname(file))};
}
const data = {};
for (const name of collections) {
  const dir = path.join(root,'content',name);
  data[name] = [];
  if (!fs.existsSync(dir)) continue;
  for (const file of fs.readdirSync(dir).filter(f=>/\.(md|markdown)$/i.test(f))) {
    try { data[name].push(parseMarkdown(path.join(dir,file))); }
    catch(e) { console.warn('Lewati', file, e.message); }
  }
  data[name].sort((a,b)=>String(b.date||'').localeCompare(String(a.date||'')));
}
fs.writeFileSync(path.join(root,'content-data.js'), 'window.SCHOOL_CMS_DATA = ' + JSON.stringify(data,null,2) + ';\n');
console.log('CMS data dibuat:', Object.fromEntries(collections.map(k=>[k,data[k].length])));

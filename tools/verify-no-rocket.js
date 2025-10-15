const fs=require('fs');const p=require('path');
const exts=new Set(['.html','.htm','.js','.jsx','.ts','.tsx','.json','.css','.scss']);
let found=[];function walk(d){for(const n of fs.readdirSync(d)){const fp=p.join(d,n);const st=fs.statSync(fp);
if(st.isDirectory()){if(['node_modules','dist','.git'].includes(n))continue;walk(fp);}else{if(exts.has(p.extname(n).toLowerCase())){const txt=fs.readFileSync(fp,'utf8');if(/rocket/i.test(txt))found.push(fp);}}}}
walk(process.cwd());if(found.length){console.error('Found "rocket" in:');for(const f of found)console.error(' - '+f);process.exit(1);}else{console.log('OK: no "rocket" references found.');}
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const read = name => readFileSync(`node_modules/pyodide/${name}`);
const assets = {};
for (const name of ['pyodide.asm.wasm', 'python_stdlib.zip', 'pyodide-lock.json']) assets[name] = read(name).toString('base64');
const loader = `const bundled=${JSON.stringify(assets)};const originalFetch=globalThis.fetch.bind(globalThis);globalThis.fetch=(url,options)=>{const key=String(url).replace('https://offline.invalid/','');if(Object.hasOwn(bundled,key)){const raw=atob(bundled[key]),bytes=new Uint8Array(raw.length);for(let i=0;i<raw.length;i++)bytes[i]=raw.charCodeAt(i);return Promise.resolve(new Response(bytes,{headers:{'Content-Type':key.endsWith('.wasm')?'application/wasm':key.endsWith('.json')?'application/json':'application/octet-stream'}}));}return Promise.reject(new Error('Network access is disabled in this offline IDE: '+url));};`;
const escapeScript = text => text.replace(/<\/script/gi, '<\\/script');
const html=readFileSync('standalone/template.html','utf8').replace('/*__RUNTIME_ASSETS__*/', () => loader).replace('/*__ASM__*/', () => escapeScript(read('pyodide.asm.js').toString())).replace('/*__PYODIDE__*/', () => escapeScript(read('pyodide.js').toString()));
// The repository-root copy is published by GitHub Pages' branch deployment.
// Vite copies the public copy into production builds. Keep both identical.
mkdirSync('public', { recursive: true });
writeFileSync('python-ide.html', html);
writeFileSync('public/python-ide.html', html);

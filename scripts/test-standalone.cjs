// Exercise the generated file with a browser-like JS environment, without any network.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync('public/python-ide.html', 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(match => match[1]);
assert.equal(scripts.length, 4);
const elements = Object.fromEntries(['code','output','status','run','clear','open','input','save','filename'].map(id => [id, {value: '', textContent: '', click() {}}]));
const context = {console, crypto: require('node:crypto').webcrypto, Response, fetch: () => { throw Error('Unexpected network access'); }, URL, TextDecoder, TextEncoder, Uint8Array, Uint8ClampedArray, ArrayBuffer, SharedArrayBuffer, Promise, performance, setTimeout, clearTimeout, atob, btoa, Blob, AbortSignal, AbortController, navigator: {userAgent: 'Mozilla/5.0'}, location: new URL('file:///python-ide.html'), document: {createElement: () => ({}), currentScript: null, baseURI: 'file:///python-ide.html', getElementById: id => elements[id]}, sessionStorage: {}, addEventListener() {}, removeEventListener() {}};
context.globalThis = context; context.window = context; context.self = context;
vm.createContext(context);
for (const script of scripts) vm.runInContext(script, context);
(async () => {
  elements.code.value = 'import math\nprint(math.sqrt(81))';
  await elements.run.onclick();
  assert.equal(elements.output.textContent.trim(), '9.0');
  elements.code.value = 'raise ValueError("test error")';
  await elements.run.onclick();
  assert.match(elements.output.textContent, /ValueError: test error/);
  elements.code.value = 'print("works again")';
  await elements.run.onclick();
  assert.equal(elements.output.textContent.trim(), 'works again');
  console.log('Standalone Python starts offline and runs again after errors.');
})().catch(error => { console.error(error); process.exitCode = 1; });

# An IDE For Every Language

A landing page for the project and a downloadable, single-file Python IDE.

```sh
npm install
npm run dev
```

Installation generates `public/python-ide.html` from `standalone/template.html` and the installed Pyodide runtime. The generated HTML embeds Python and its standard library, and can be opened offline in a modern browser. `npm run build` includes the download in `dist`.

This is an early example: third-party libraries and workarounds such as turtle and pgzrun are not bundled yet. Open and save use your device's file picker and downloads. After changing the template, run `node scripts/copy-runtime.js` to regenerate the download.

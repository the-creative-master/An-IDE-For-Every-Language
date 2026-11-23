# An IDE for Every Language

**An IDE for Every Language** is an experiment in creating focused, language-specific coding environments in the browser. Python is included as an example IDE—a demonstration of the experience and architecture the project plans to build toward for many languages.

The current site includes:

- A project overview and contribution page
- A downloadable, single-file example Python IDE
- An offline Python runtime powered by [Pyodide](https://pyodide.org/)

## Example Python IDE

The Python IDE is a proof of concept for the project. It demonstrates that a small, standalone IDE can run in the browser with an editor, console output, and basic file controls.

### Features

- Runs Python locally using WebAssembly
- Works offline once downloaded
- Includes Python's standard library
- Opens `.py` files from the device
- Downloads or saves the current source file
- Captures output and Python exceptions
- Requires no account or server-side setup

> This is an early example rather than a complete Python development environment. Third-party packages and APIs such as `turtle` and `pgzrun` are not bundled yet.

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) with npm
- A modern browser

### Run locally

```sh
npm install
npm run dev
```

Vite will start the development server and print its local URL.

### Create a production build

```sh
npm run build
npm run preview
```

The build command refreshes the bundled Pyodide assets and creates the site in `dist/`.

### Generate the standalone example

The `postinstall`, `predev`, and `prebuild` scripts run `scripts/copy-runtime.js`, which:

1. Reads the Pyodide runtime from `node_modules/pyodide/`
2. Embeds the runtime, WASM module, and Python standard library into `standalone/template.html`
3. Writes the finished file to `public/python-ide.html`

You can regenerate it directly with:

```sh
npm run postinstall
```

Open `public/python-ide.html` directly in a browser to try the example offline.

## Testing

```sh
npm test
```

The standalone test loads the generated HTML in a browser-like Node.js environment. It verifies that Python can start offline, run code, report errors, and run successfully again afterward.

## Project structure

```text
index.html                   Landing page
src/                         Landing-page assets and source
standalone/template.html     Standalone example IDE template
scripts/copy-runtime.js      Embeds Pyodide into the standalone HTML
scripts/test-standalone.cjs  Offline standalone IDE test
public/python-ide.html       Generated downloadable example IDE
```

## Contributing

Contributions, language suggestions, and implementation ideas are welcome. The project aims to explore small, approachable IDE experiences that are easy to run offline in the browser.

Have an idea for another language or a suggested interaction model? Open an issue or submit a pull request.

### Deploying to GitHub Pages

The Pages workflow builds the site and generates the downloadable IDE before deploying `dist/`. In the repository's **Settings → Pages**, set the build and deployment source to **GitHub Actions**. Deploying the repository source directly will not include the generated IDE. Paths in the build are relative so it also works under a project subdirectory.

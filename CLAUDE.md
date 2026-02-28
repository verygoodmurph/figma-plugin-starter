# Figma Plugin Starter — Claude Code Guide

## Memory Log

After completing a meaningful unit of work, append an entry to `MEMORY.md` in the project root.

**Format:**

```markdown
## [DD/MM/YYYY HH:MM:SS]

- What changed and why
- Key decisions made (and reasoning if non-obvious)
- Files affected
```

**Rules:**

- Get the timestamp by running `date "+%d/%m/%Y %H:%M:%S"` — use the exact output
- Keep entries concise — one line per change
- Log decisions and direction changes, not trivial edits
- Append to the bottom (newest last)

## What This Is

A zero-build-step Figma plugin template. Two files do all the work: `code.js` (plugin logic) and `ui.html` (plugin interface). No bundler, no TypeScript, no package.json.

## Project Structure

```
manifest.json       → Plugin config (name, id, permissions, allowed domains)
code.js             → Code context — sandboxed, has Figma API, NO browser/DOM APIs
ui.html             → UI context — iframe with full browser APIs, NO Figma API access
SPEC.md             → Plugin specification (fill this in before building)
AGENTS.md           → Code recipes, API reference, best practices
.claude/skills/     → Skill files (figma-plugin, create-readme, etc.)
```

## Architecture: Two Isolated Contexts

The plugin runs in **two separate environments** that communicate only via message passing:

- **`code.js`** — Figma API access (`figma.*`). **No DOM, no `window`, no `document`, no `fetch`.**
- **`ui.html`** — Standard browser iframe. **No `figma.*` access.**

```javascript
// code.js → ui.html
figma.ui.postMessage({ type: "data", payload: value });

// ui.html → code.js
parent.postMessage({ pluginMessage: { type: "action", payload: value } }, "*");

// Receiving in code.js
figma.ui.onmessage = async (msg) => { if (msg.type === "action") { /* ... */ } };

// Receiving in ui.html
window.onmessage = (event) => {
  const msg = event.data.pluginMessage;
  if (msg.type === "data") { /* ... */ }
};
```

Always validate `msg.type` before acting. Always wrap UI→Code messages in `{ pluginMessage: ... }`.

## Pitfalls

- **`?.` and `??` in code.js** — BROKEN. Use `node && node.type` and `||` instead. Write ES5-compatible code in `code.js`; `ui.html` supports modern JS.
- **Cross-context access** — `code.js` cannot use `document`/`window`/`fetch`. `ui.html` cannot call `figma.*`. The only bridge is `postMessage`.
- **Font loading** — Always `await figma.loadFontAsync(node.fontName)` before setting `.characters`.
- **Empty selection** — Check `selection.length` before accessing `selection[0]`.
- **Missing domains** — Declare external domains in `manifest.json` `networkAccess.allowedDomains` or `fetch()` fails silently.
- **Error handling** — Wrap all Figma API calls in try-catch with `figma.notify("msg", { error: true })`.

## Development Workflow

1. **Write your spec** in `SPEC.md`
2. **Implement** in `code.js` and `ui.html`
3. **Test in Figma** — Plugins > Development > Import plugin from manifest
4. **Debug** — Plugins > Development > Show/hide console for `code.js`; browser devtools for `ui.html`

## References

- **Code recipes, API reference, theming, manifest config** → see `AGENTS.md`
- **Guided workflows (spec → build → feature)** → use the `/figma-plugin` skill

# Figma Plugin Starter — Claude Code Guide

## Memory Log

After completing a meaningful unit of work (implementing a feature, making a key decision, changing architecture, updating the spec, fixing a significant bug), append an entry to `MEMORY.md` in the project root.

**Format:**

```markdown
## [DD/MM/YYYY HH:MM:SS]

- What changed and why
- Key decisions made (and reasoning if non-obvious)
- Files affected
```

**Rules:**

- Get the timestamp by running `date "+%d/%m/%Y %H:%M:%S"` — use the exact output
- Keep entries concise — one line per change, enough to follow the history later
- Group related changes under a single timestamp
- Log decisions and direction changes, not just file edits (e.g., "Chose clientStorage over pluginData for settings because it persists across documents")
- Don't log trivial edits (typo fixes, formatting) — only things that matter for understanding project history
- Append to the bottom of the file (newest entries last, chronological order)

## What This Is

A zero-build-step Figma plugin template. Two files do all the work: `code.js` (plugin logic, Figma API access) and `ui.html` (plugin interface, browser environment). No bundler, no TypeScript, no package.json.

## Project Structure

```
manifest.json   → Plugin config (name, id, permissions, allowed domains)
code.js         → Code context — sandboxed, has Figma API, NO browser/DOM APIs
ui.html         → UI context — iframe with full browser APIs, NO Figma API access
SPEC.md         → Plugin specification (fill this in before building)
AGENTS.md       → Detailed Figma plugin development guidelines and patterns
```

## Architecture: Two Isolated Contexts

This is the most important thing to understand. The plugin runs in **two separate environments** that can only talk via message passing:

### Code Context (`code.js`)

- Has full Figma API access (`figma.*`)
- Sandboxed — **no DOM, no `window`, no `document`, no `fetch`**
- Runs in a limited JS engine (see syntax restrictions below)

### UI Context (`ui.html`)

- Standard browser iframe — full DOM, CSS, `fetch`, etc.
- **Cannot access `figma.*` API at all**
- Communicates with code context via `postMessage`

### Message Passing

**Code → UI:**

```javascript
figma.ui.postMessage({ type: "selectionData", data: someData });
```

**UI → Code:**

```javascript
parent.postMessage(
  { pluginMessage: { type: "runAction", data: someData } },
  "*",
);
```

**Receiving in UI:**

```javascript
window.onmessage = (event) => {
  const message = event.data.pluginMessage;
  if (message.type === "selectionData") {
    /* handle */
  }
};
```

**Receiving in Code:**

```javascript
figma.ui.onmessage = async (msg) => {
  if (msg.type === "runAction") {
    /* handle */
  }
};
```

Always validate `msg.type` before acting on messages.

## Critical: JavaScript Syntax Restrictions in `code.js`

The code context sandbox does NOT support all modern JS. These will cause silent failures or crashes:

| Syntax                    | Status                  | Use Instead                    |
| ------------------------- | ----------------------- | ------------------------------ |
| `?.` (optional chaining)  | **BROKEN**              | `node && node.type` or ternary |
| `??` (nullish coalescing) | **BROKEN**              | `\|\|`                         |
| Arrow functions           | Works (test edge cases) | —                              |
| Template literals         | Works                   | —                              |
| `async`/`await`           | Works                   | —                              |
| Destructuring             | Mostly works (test)     | —                              |
| Spread operator           | Mostly works (test)     | —                              |

**Rule: Write ES5-compatible code in `code.js`.** The UI context (`ui.html`) runs in a real browser and supports modern JS freely.

## Key Figma API Patterns

### Initialization

```javascript
figma.showUI(__html__, {
  themeColors: true,
  height: 400,
  width: 300,
  title: "My Plugin",
});
figma.skipInvisibleInstanceChildren = true; // performance
```

### Selection

```javascript
const selection = figma.currentPage.selection;
if (selection.length === 0) {
  figma.notify("Select something first");
  return;
}
```

### Async Operations (fonts, variables, styles)

```javascript
// Always load fonts before modifying text
await figma.loadFontAsync(node.fontName);
node.characters = "New text";

// Variables
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const variable = await figma.variables.getVariableByIdAsync(id);

// Styles
const textStyles = await figma.getLocalTextStylesAsync();
const colorStyles = await figma.getLocalColorStylesAsync();
```

### Error Handling

```javascript
try {
  await someOperation();
  figma.notify("Done!");
} catch (error) {
  console.error("Error:", error);
  figma.notify("Error: " + error.message, { error: true });
}
```

### Node Traversal

```javascript
function traverse(node, callback) {
  callback(node);
  if ("children" in node) {
    for (var i = 0; i < node.children.length; i++) {
      traverse(node.children[i], callback);
    }
  }
}
```

### Persistent Storage

```javascript
// Per-document
node.setPluginData("key", "value");
node.getPluginData("key");

// Per-user (survives across documents)
await figma.clientStorage.getAsync("key");
await figma.clientStorage.setAsync("key", value);
```

## UI Theming

The plugin UI automatically adapts to Figma's light/dark mode when `themeColors: true` is set. Use Figma's CSS variables:

| Variable                       | Purpose                   |
| ------------------------------ | ------------------------- |
| `--figma-color-bg`             | Background                |
| `--figma-color-text`           | Primary text              |
| `--figma-color-text-secondary` | Secondary text            |
| `--figma-color-text-brand`     | Brand accent text         |
| `--figma-color-bg-brand`       | Primary button background |
| `--figma-color-text-onbrand`   | Text on brand buttons     |
| `--figma-color-bg-brand-hover` | Primary button hover      |
| `--figma-color-bg-secondary`   | Secondary backgrounds     |
| `--figma-color-border`         | Borders                   |

## Manifest Configuration

`manifest.json` controls plugin capabilities. Update these fields when building:

- **`name`** / **`id`**: Plugin identity (update both for your plugin)
- **`capabilities`**: Add `["codegen"]` for Dev Mode plugins, etc.
- **`permissions`**: Add `["teamlibrary"]` to access external library files
- **`enableProposedApi`**: Set `true` only if using experimental APIs
- **`editorType`**: `["figma"]`, `["figjam"]`, `["dev"]`, or `["slides"]`
- **`networkAccess.allowedDomains`**: Allowlist for any external API calls
- **`documentAccess`**: `"dynamic-page"` is the default

## Development Workflow

1. **Write your spec** in `SPEC.md` — describe what the plugin should do, its UI, and edge cases
2. **Implement in `code.js` and `ui.html`** — follow the patterns above
3. **Test in Figma** — Plugins > Development > Import plugin from manifest
4. **Debug** — Plugins > Development > Show/hide console for `code.js` logs; browser devtools for `ui.html`

## Common Mistakes to Avoid

- Using `?.` or `??` in `code.js` — will break silently
- Trying to access `document` or `window` in `code.js` — wrong context
- Trying to call `figma.*` from `ui.html` — wrong context
- Forgetting to `await figma.loadFontAsync()` before setting text — will throw
- Not checking `selection.length` before accessing `selection[0]` — will throw
- Not declaring external domains in `manifest.json` `networkAccess` — fetch will fail silently
- Sending messages without wrapping in `{ pluginMessage: ... }` from UI side

## When Modifying This Template

- Keep `code.js` and `ui.html` as the only source files (no build step)
- Update `manifest.json` first — name, id, permissions, allowed domains
- Resize the UI in `figma.showUI()` to fit your plugin's needs
- Add new message types to both the sender and receiver sides
- Wrap all Figma API calls in try-catch with `figma.notify()` for user feedback
- Test both light and dark mode in Figma

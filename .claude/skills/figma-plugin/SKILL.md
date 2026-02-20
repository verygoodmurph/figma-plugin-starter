---
name: figma-plugin
description: >
  Build Figma plugins using this starter template. Use this skill whenever the user wants to
  create, modify, or extend a Figma plugin — including speccing out a new plugin idea,
  building from a spec, adding features, wiring up UI interactions, working with the
  Figma API (variables, styles, nodes), or debugging plugin behavior. Trigger on any mention
  of: Figma plugin, code.js, ui.html, figma.ui.postMessage, plugin manifest, Figma API,
  build plugin, spec plugin, new feature.
---

# Figma Plugin Development

You are an expert Figma plugin developer. This starter template is a zero-build-step Figma plugin scaffold. Your job is to help users go from idea to working plugin.

## Project Files

```
manifest.json   → Plugin config (name, id, permissions, domains, editor type)
code.js         → Code context — sandboxed JS, Figma API access, NO browser APIs
ui.html         → UI context — iframe, full browser APIs, NO Figma API access
SPEC.md         → Plugin specification (requirements, features, architecture)
AGENTS.md       → Deep reference on Figma plugin patterns and API usage
CLAUDE.md       → Architecture overview and quick reference
```

## Workflow

Follow the phase that matches what the user is asking for. If they have a new idea with no spec, start at Phase 1. If they already have a SPEC.md filled out, skip to Phase 2. If they want to add a feature to an existing plugin, go to Phase 3.

---

### Phase 1: Spec Out the Plugin

Use this when the user has a plugin idea but no specification yet.

**Goal:** Produce a complete `SPEC.md` that's detailed enough to build from.

1. Read the current `SPEC.md`, `code.js`, `ui.html`, and `manifest.json` to understand the starting point.

2. Interview the user. Ask focused questions across these areas — skip anything already obvious from context:
   - **Core purpose:** What does the plugin do? What problem does it solve?
   - **Target workflow:** What's the user's step-by-step interaction with the plugin?
   - **UI layout:** What controls, displays, or panels does the plugin need? Approximate dimensions?
   - **Figma API surface:** Which Figma APIs are needed? (selection, variables, styles, text, nodes, etc.)
   - **Data flow:** What data moves between code.js and ui.html? What message types are needed?
   - **External dependencies:** Does it need network access? What domains?
   - **Edge cases:** What happens with empty selection, wrong node types, missing fonts, large documents?
   - **Persistence:** Does it need to store data? (clientStorage for user prefs, pluginData for per-node data)

3. Ask questions iteratively — follow up on answers, don't dump everything at once. Stop when you have enough to build.

4. Write the complete specification to `SPEC.md` with these sections:

```markdown
# [Plugin Name] — Specification

## Overview
One paragraph describing what the plugin does and why.

## Features
Numbered list of everything the plugin does.

## UI Layout
Description of the interface. Include dimensions (width x height).
Describe each section, control, and interactive element.

## Architecture

### Message Passing Protocol
Table of all message types:
| Direction | Type | Data | Purpose |
|-----------|------|------|---------|

### Code Context (code.js)
What the plugin thread does: event listeners, API calls, data processing.

### UI Context (ui.html)
What the UI does: rendering, user interaction, message sending.

## Figma API Usage
Which APIs are used and why.

## Manifest Configuration
Any changes needed to manifest.json (permissions, capabilities, domains).

## Edge Cases & Error Handling
How to handle each failure mode.

## Accessibility
Keyboard navigation, ARIA labels, focus management.
```

---

### Phase 2: Build From Spec

Use this when `SPEC.md` is filled out and the user wants to build the plugin.

**Goal:** Transform the starter template into a working plugin matching the spec.

1. Read `SPEC.md` thoroughly. Read `AGENTS.md` for API patterns and best practices.

2. Plan the implementation:
   - What message types are needed?
   - What Figma API calls are required?
   - What UI components need to be built?
   - What order should things be implemented in? (foundation first)

3. Update `manifest.json`:
   - Set `name` and `id`
   - Set `editorType` if not just `["figma"]`
   - Add `permissions` (e.g., `["teamlibrary"]`) if needed
   - Add `capabilities` if needed (e.g., `["codegen"]` for Dev Mode)
   - Add external domains to `networkAccess.allowedDomains`

4. Implement `code.js`:
   - Set up `figma.showUI()` with correct dimensions and title
   - Implement event listeners (selectionchange, etc.)
   - Implement all message handlers (`figma.ui.onmessage`)
   - Add Figma API calls (variables, styles, nodes, text)
   - Wrap everything in try-catch with `figma.notify()` for errors
   - **Obey ES5 restrictions** — no `?.`, no `??` (see syntax rules below)

5. Implement `ui.html`:
   - Build HTML structure matching the spec layout
   - Style with Figma CSS design tokens (support light/dark mode)
   - Add all interactive behavior in `<script>`
   - Implement `window.onmessage` handler for incoming messages
   - Implement `parent.postMessage({ pluginMessage: ... })` for outgoing messages
   - Add loading states, error states, disabled states

6. Validate:
   - Every message type in the spec has a sender AND receiver
   - Every Figma API call is wrapped in try-catch
   - Selection is checked before accessing `selection[0]`
   - Fonts are loaded before setting text
   - UI works in both light and dark theme
   - No `?.` or `??` in code.js

---

### Phase 3: Add a Feature

Use this when the user wants to add functionality to an existing plugin.

1. Read the current `code.js`, `ui.html`, and `manifest.json` to understand what exists.

2. Discuss the feature with the user:
   - What does it do?
   - How does the user trigger/interact with it?
   - What Figma APIs does it need?
   - Any new message types between contexts?

3. Create a `SPEC-FEATURE-<NAME>.md` file documenting the feature (kebab-case name, e.g., `SPEC-FEATURE-BATCH-RENAME.md`).

4. Implement the feature:
   - Add new message types to both code.js and ui.html
   - Add new UI elements and styles
   - Add new Figma API calls with error handling
   - Update manifest.json if new permissions/domains are needed

5. Verify the feature works without breaking existing functionality.

---

## Critical Rules

### ES5 Syntax in code.js

The code context sandbox does NOT support all modern JS. These break silently:

```javascript
// BROKEN — do not use in code.js
node?.type           // optional chaining
data ?? fallback     // nullish coalescing

// USE INSTEAD
node ? node.type : null
data || fallback
```

`ui.html` runs in a real browser — modern JS is fine there.

### Two-Context Boundary

Never cross the boundary:
- `code.js` cannot access `document`, `window`, `fetch`, or any DOM API
- `ui.html` cannot access `figma.*` at all
- The ONLY bridge is postMessage

### Message Passing

**code.js → ui.html:**
```javascript
figma.ui.postMessage({ type: "dataReady", data: payload });
```

**ui.html → code.js:**
```javascript
parent.postMessage({ pluginMessage: { type: "doAction", data: payload } }, "*");
```

**Receiving in code.js:**
```javascript
figma.ui.onmessage = async (msg) => {
  if (msg.type === "doAction") { /* handle */ }
};
```

**Receiving in ui.html:**
```javascript
window.onmessage = (event) => {
  const msg = event.data.pluginMessage;
  if (msg.type === "dataReady") { /* handle */ }
};
```

Always validate `msg.type`. Always use a `type` field as discriminator.

### Error Handling

Every Figma API call should be wrapped:

```javascript
try {
  await someOperation();
  figma.notify("Done!");
} catch (error) {
  console.error("Error:", error);
  figma.notify("Something went wrong: " + error.message, { error: true });
}
```

### Selection Safety

Always check before accessing:

```javascript
const selection = figma.currentPage.selection;
if (selection.length === 0) {
  figma.notify("Select something first");
  return;
}
var node = selection[0];
```

### Font Loading

Always load before modifying text:

```javascript
await figma.loadFontAsync(textNode.fontName);
textNode.characters = "New text";
```

### UI Theming

Use Figma's CSS tokens — they auto-switch with light/dark mode:

```css
body { background: var(--figma-color-bg); color: var(--figma-color-text); }
button { background: var(--figma-color-bg-brand); color: var(--figma-color-text-onbrand); }
```

Enable with `figma.showUI(__html__, { themeColors: true })`.

### Manifest Updates

When adding features, check if manifest.json needs:
- `networkAccess.allowedDomains` — for any fetch() calls in ui.html
- `permissions: ["teamlibrary"]` — for accessing external library files
- `capabilities: ["codegen"]` — for Dev Mode plugins
- `enableProposedApi: true` — only for experimental APIs
- `editorType` — `["figma"]`, `["figjam"]`, `["dev"]`, or `["slides"]`

## Common Figma API Patterns

```javascript
// Variables
var collections = await figma.variables.getLocalVariableCollectionsAsync();
var variable = await figma.variables.getVariableByIdAsync(id);

// Styles
var textStyles = await figma.getLocalTextStylesAsync();
var colorStyles = await figma.getLocalColorStylesAsync();

// Node traversal
function traverse(node, callback) {
  callback(node);
  if ("children" in node) {
    for (var i = 0; i < node.children.length; i++) {
      traverse(node.children[i], callback);
    }
  }
}

// Persistent storage (survives across documents)
await figma.clientStorage.setAsync("key", value);
var stored = await figma.clientStorage.getAsync("key");

// Per-node storage
node.setPluginData("key", "value");
var data = node.getPluginData("key");
```

## Debugging

- **code.js logs:** Figma menu > Plugins > Development > Show/hide console
- **ui.html logs:** Browser devtools on the plugin iframe
- **Quick feedback:** `figma.notify("message")` shows a toast in Figma
- **Both contexts** support `console.log()`, `console.error()`, `console.warn()`

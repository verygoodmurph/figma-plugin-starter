# Build Plugin From Specification

## Overview

Read `SPEC.md` and implement the complete plugin according to the specification.

## Steps

1. **Read specification** — read `SPEC.md` to understand all requirements: features, message passing protocol, UI/UX, edge cases, architecture, API usage

2. **Analyze current codebase** — read `code.js`, `ui.html`, `manifest.json`. Identify what to modify vs. reuse.

3. **Plan implementation** — break down into logical components, identify dependencies, determine code context vs. UI context responsibilities

4. **Update `manifest.json`** — name, id, editorType, permissions, capabilities, networkAccess, documentAccess

5. **Implement `code.js`**
   - Set up `figma.showUI()` with correct dimensions
   - Implement event listeners, message handlers, API calls
   - Wrap everything in try-catch with `figma.notify()` for errors
   - Use ES5-compatible syntax — no `?.`, no `??`
   - Load fonts before setting text, check selection before accessing

6. **Implement `ui.html`**
   - Build HTML matching spec layout
   - Style with Figma CSS tokens (light/dark mode support)
   - Implement message passing (send via `parent.postMessage`, receive via `window.onmessage`)
   - Add loading states, error states, keyboard navigation, ARIA labels
   - Implement any data processing, filtering, or search logic
   - Add accessibility features (focus indicators, semantic HTML)

7. **Validate implementation**
   - Every message type has a sender AND receiver
   - All Figma API calls wrapped in try-catch
   - Selection checked before access
   - Fonts loaded before text modification
   - Theme support works (light/dark)
   - No `?.` or `??` in code.js
   - All spec features implemented
   - Keyboard navigation functional
   - Error handling covers documented scenarios

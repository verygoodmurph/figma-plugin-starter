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

## Rules & Patterns

All rules (ES5 syntax, two-context boundary, pitfalls) are in **CLAUDE.md** (always loaded).
All code patterns (API recipes, theming, manifest fields) are in **AGENTS.md** — read it before implementing.

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

2. Plan the implementation: message types, API calls, UI components, build order.

3. Update `manifest.json` — name, id, editorType, permissions, capabilities, allowedDomains.

4. Implement `code.js` — showUI, event listeners, message handlers, API calls, error handling.

5. Implement `ui.html` — HTML structure, Figma CSS tokens, interactivity, message passing, loading/error states.

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

2. Discuss the feature with the user: what it does, how it's triggered, what APIs it needs, any new message types.

3. Create a `SPEC-FEATURE-<NAME>.md` file documenting the feature (kebab-case name).

4. Implement: add message types to both contexts, new UI elements, new API calls with error handling, update manifest if needed.

5. Verify the feature works without breaking existing functionality.

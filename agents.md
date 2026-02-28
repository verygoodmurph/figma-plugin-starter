# Figma Plugin Development Reference

> Architecture overview, syntax restrictions, and pitfalls are in **CLAUDE.md** (always loaded).
> This file covers code recipes, patterns, and API reference — read it before implementing.

## Code Recipes

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
var collections = await figma.variables.getLocalVariableCollectionsAsync();
var variable = await figma.variables.getVariableByIdAsync(id);

// Styles
var textStyles = await figma.getLocalTextStylesAsync();
var colorStyles = await figma.getLocalColorStylesAsync();
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

## Selection Change Listener

```javascript
figma.on("selectionchange", async () => {
  const selection = figma.currentPage.selection;
  if (selection.length > 0) {
    figma.ui.postMessage({
      type: "selectionChanged",
      data: selection.map((node) => ({ id: node.id, type: node.type })),
    });
  }
});
```

## UI Theming

Set `themeColors: true` in `figma.showUI()` to auto-adapt to Figma's light/dark mode. Use these CSS variables:

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

## Manifest Reference

Update these fields in `manifest.json` when building:

- **`name`** / **`id`**: Plugin identity
- **`editorType`**: `["figma"]`, `["figjam"]`, `["dev"]`, or `["slides"]`
- **`capabilities`**: Add `["codegen"]` for Dev Mode plugins
- **`permissions`**: Add `["teamlibrary"]` to access external library files
- **`networkAccess.allowedDomains`**: Allowlist for any `fetch()` calls in ui.html
- **`enableProposedApi`**: `true` only for experimental APIs
- **`documentAccess`**: `"dynamic-page"` is the default

## Best Practices: Code Context

- Use `figma.skipInvisibleInstanceChildren = true` for performance
- Batch operations when possible — minimize API round-trips
- Debounce `selectionchange` handlers if doing heavy processing
- Clone nodes before modifying: `node.clone()`
- Set properties before adding to parent: `node.x = 100; parent.appendChild(node)`
- Validate node types before operations: `if (node.type === 'TEXT')`
- Handle multiple selections — don't assume `selection[0]` is the only node
- Validate all message data from UI context before acting on it

## Best Practices: UI Context

- Use Figma CSS tokens for all styling (see UI Theming above)
- Provide loading states for async operations
- Disable buttons during operations to prevent double-clicks
- Show clear error messages — don't fail silently
- Ensure keyboard navigability and ARIA labels for accessibility

## API Quick Reference

### Variables API

- `figma.variables.getLocalVariableCollectionsAsync()` — all collections
- `figma.variables.getLocalVariableCollectionsByIdAsync(id)` — specific collection
- `figma.variables.getVariableByIdAsync(id)` — specific variable

### Styles API

- `figma.getLocalTextStylesAsync()` / `figma.getLocalColorStylesAsync()`
- `figma.getLocalEffectStylesAsync()` / `figma.getLocalGridStylesAsync()`

### Node Operations

- `node.clone()` / `node.remove()` / `parent.appendChild(node)`
- `node.setPluginData(key, value)` / `node.getPluginData(key)`

## Template Modification Checklist

- Keep `code.js` and `ui.html` as the only source files (no build step)
- Update `manifest.json` first — name, id, permissions, allowed domains
- Resize the UI in `figma.showUI()` to fit your plugin's needs
- Add new message types to both the sender and receiver sides
- Wrap all Figma API calls in try-catch with `figma.notify()` for user feedback
- Test both light and dark mode in Figma

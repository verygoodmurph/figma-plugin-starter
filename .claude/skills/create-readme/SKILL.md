---
name: create-readme
description: >
  Generate or update a README.md for the Figma plugin by analyzing the codebase.
  Use when the user asks to create a readme, write documentation, or generate docs
  for their plugin.
disable-model-invocation: true
---

# Create README

Generate a `README.md` by analyzing the plugin's actual code — not assumptions.

## Steps

1. **Read the codebase.** Read all of these files before writing anything:
   - `manifest.json` — plugin name, id, permissions, capabilities, network access
   - `code.js` — what the plugin actually does (features, API calls, event handlers)
   - `ui.html` — what the user sees and interacts with (controls, layout, feedback)
   - `SPEC.md` — requirements and design intent (if filled out)
   - `README.md` — existing content to preserve (if it exists)
   - `LICENSE` — license type (if it exists)

2. **Infer the content from code.** Base every section on what you found in the files:
   - **What it does:** Summarize the plugin's purpose from its actual behavior
   - **Features:** List capabilities you observed in code.js and ui.html
   - **How to use it:** Describe the workflow based on the UI controls and message flow
   - **What Figma APIs it uses:** Note variables, styles, selection, text, nodes, etc.
   - **Limitations:** Note any constraints visible in the code (editor type, permissions, domains)

3. **Ask the user for anything you can't infer:**
   - Links they want included (docs, tutorials, community, support)
   - Additional resources or credits
   - If no LICENSE file exists, ask which license they want (default to MIT)

4. **Write `README.md`** with this structure:

```markdown
# [Plugin Name from manifest.json]

[1-2 paragraph description of what the plugin does and why it's useful]

## Features

- [Feature 1 — inferred from code]
- [Feature 2 — inferred from code]
- ...

## Usage

[Step-by-step instructions based on how the UI actually works]

## Development

### Getting Started

1. Clone this repository
2. In Figma, go to Plugins > Development > Import plugin from manifest
3. Select the `manifest.json` file

### Project Structure

- `manifest.json` — Plugin configuration
- `code.js` — Plugin logic (Figma API)
- `ui.html` — Plugin interface

## Links

[User-provided links, if any]

## License

[License type] — see [LICENSE](LICENSE) for details.
```

5. **Validate.** Check that:
   - The plugin name matches manifest.json
   - Features described match what the code actually does
   - Usage instructions match the actual UI controls
   - Markdown renders correctly (no broken links, proper formatting)
   - If updating an existing README, valuable content was preserved

## Rules

- Every claim in the README must be traceable to something in the code. Do not invent features.
- Keep it concise. A plugin README should be scannable, not a novel.
- Use plain language — write for someone evaluating whether to install the plugin.
- Include a Development section so contributors can get started.
- Only add a Contributing section if the user asks for one.

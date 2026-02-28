# Create README

## Overview

Generate or update a `README.md` by analyzing the plugin's actual code.

## Steps

1. **Read the codebase** — read all of these before writing:
   - `manifest.json` — plugin name, id, permissions, capabilities, network access
   - `code.js` — what the plugin actually does (features, API calls, event handlers)
   - `ui.html` — what the user sees and interacts with
   - `SPEC.md` — requirements and design intent (if filled out)
   - `README.md` — existing content to preserve (if it exists)
   - `LICENSE` — license type (if it exists)

2. **Infer content from code** — base every section on what you found:
   - **What it does:** Summarize the plugin's purpose from its actual behavior
   - **Features:** List capabilities observed in code.js and ui.html
   - **How to use it:** Describe the workflow based on UI controls and message flow
   - **Limitations:** Note any constraints visible in the code

3. **Ask the user for anything you can't infer:**
   - Links they want included (docs, tutorials, community)
   - Additional resources or credits
   - If no LICENSE file exists, ask which license they want (default to MIT)

4. **Handle license** — if no LICENSE file exists, create one based on user's choice

5. **Write `README.md`** with this structure:

```markdown
# [Plugin Name from manifest.json]

[1-2 paragraph description]

## Features

- [Feature 1 — inferred from code]
- ...

## Usage

[Step-by-step instructions based on actual UI]

## Development

### Getting Started

1. Clone this repository
2. In Figma: Plugins > Development > Import plugin from manifest
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

6. **Validate** — plugin name matches manifest.json, features match the code, usage matches the UI, markdown renders correctly

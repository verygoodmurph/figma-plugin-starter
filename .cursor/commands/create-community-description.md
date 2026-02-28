# Create Community Description

## Overview

Generate a `community-documentation.md` file with the three fields required to publish a plugin to the Figma Community.

## Steps

1. **Read the codebase** — read all of these before writing:
   - `manifest.json` — plugin name
   - `code.js` — what the plugin does
   - `ui.html` — how the user interacts with it
   - `README.md` — additional context (if it exists)
   - `SPEC.md` — design intent (if filled out)

2. **Generate the three required fields:**

   **Name** (max 100 characters)
   - Use the `name` field from `manifest.json`
   - If it exceeds 100 characters, shorten it while keeping it descriptive

   **Tagline** (max 100 characters)
   - One sentence capturing the plugin's core value
   - Write as a benefit statement, not a feature list
   - Example: "Batch rename layers with smart patterns and regex support"

   **Description** (no limit, markdown supported)
   - Open with what the plugin does and why (1-2 sentences)
   - List key features with brief explanations
   - Include basic usage instructions
   - Note any requirements or limitations
   - Do NOT include the plugin name as a heading — Figma adds it automatically
   - Supported markdown: **bold**, _italic_, ~~strikethrough~~, lists, [links](url), `code`, code blocks

3. **Write `community-documentation.md`** in the project root:

```markdown
# Name

[Plugin name, max 100 characters]

## Tagline

[One compelling sentence, max 100 characters]

## Description

[Full description with markdown formatting]
```

4. **Validate** — name ≤ 100 chars, tagline ≤ 100 chars, description based on actual code, print character counts for Name and Tagline

## Rules

- Every feature mentioned must exist in the code
- The tagline is what people see in search results — make it specific and compelling
  - Bad: "A useful Figma plugin for designers"
  - Good: "Extract and export all color styles as CSS, Tailwind, or JSON"
- Write for someone browsing the Figma Community who has never seen the plugin

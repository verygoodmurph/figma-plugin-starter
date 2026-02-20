---
name: create-community-description
description: >
  Generate Figma Community documentation for publishing the plugin.
  Use when the user asks to create a community description, prepare for publishing,
  write a tagline, or generate Figma Community docs.
disable-model-invocation: true
---

# Create Community Description

Generate a `community-documentation.md` file with the three fields required to publish a plugin to the Figma Community.

## Steps

1. **Read the codebase.** Read all of these before writing:
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
   - One sentence that captures the plugin's core value
   - Write it as a benefit statement, not a feature list
   - Think: what would make someone click "Install"?
   - Example: "Batch rename layers with smart patterns and regex support"
   - Count characters — must be 100 or fewer

   **Description** (no character limit, markdown supported)
   - Open with what the plugin does and why it's useful (1-2 sentences)
   - List key features with brief explanations
   - Include basic usage instructions (what to select, what buttons to click)
   - Note any requirements or limitations
   - Supported markdown: **bold**, _italic_, ~~strikethrough~~, ordered lists, unordered lists, [links](url), `code`, code blocks
   - Do NOT include the plugin name as a heading — Figma adds it automatically

3. **Write `community-documentation.md`** in the project root:

```markdown
# Name

[Plugin name, max 100 characters]

## Tagline

[One compelling sentence, max 100 characters]

## Description

[Full description with markdown formatting]
```

4. **Validate.**
   - Name is 100 characters or fewer
   - Tagline is 100 characters or fewer
   - Description is based on actual code behavior, not assumptions
   - Markdown formatting is correct
   - Print the character counts for Name and Tagline so the user can verify

## Rules

- Every feature mentioned must exist in the code. Do not invent capabilities.
- The tagline is the most important line — it's what people see in search results. Make it specific and compelling, not generic.
- Bad tagline: "A useful Figma plugin for designers" (vague, could be anything)
- Good tagline: "Extract and export all color styles as CSS, Tailwind, or JSON" (specific, clear value)
- Write the description for someone browsing the Figma Community who has never seen the plugin. Lead with value, not implementation details.
- Keep the description focused. Figma Community pages are scanned, not read word-by-word.

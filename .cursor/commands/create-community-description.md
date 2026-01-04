# Create Community Description

## Overview

Generate a Figma Community Plugin markdown file (`community-documentation.md`) with all required fields for publishing to the Figma Community.

## Steps

1. **Read manifest.json**

   - Extract the plugin name from `manifest.json` (field: `name`)
   - Verify the name is within the 100 character limit
   - If the name exceeds 100 characters, truncate it appropriately

2. **Gather plugin information**

   - Read `code.js` and `ui.html` to understand plugin functionality
   - Read `README.md` for additional context
   - Review the plugin's core features and capabilities
   - Analyze the code to identify:
     - Main purpose and functionality
     - Key features and actions
     - UI components and interactions
     - API usage patterns
     - Any limitations or constraints

3. **Infer required fields**

   - **Tagline**: Generate a succinct description (max 100 characters) based on the plugin's core purpose and main functionality
   - **Description**: Create a comprehensive overview including:
     - Plugin's purpose and main features (inferred from code analysis)
     - How to use each feature (based on UI interactions and code logic)
     - Any limitations discovered from code review
     - Considerations or general guidance based on implementation patterns
     - Format using supported markdown: **bold**, _italic_, ~~strikethrough~~, ordered lists, unordered lists, [links](url), `code`, and code blocks

4. **Create community-documentation.md**

   - Generate the file in the project root
   - Format with proper markdown structure
   - Include all three required sections:
     - Name (from manifest.json)
     - Tagline (inferred from code, max 100 chars)
     - Description (inferred from code, markdown formatted)

5. **Validate output**
   - Ensure name is ≤ 100 characters
   - Ensure tagline is ≤ 100 characters
   - Verify markdown formatting is correct
   - Check that all required fields are present

## File Structure

The generated `figma-community-docs.md` should follow this structure:

```markdown
# Name

[Plugin name from manifest.json, max 100 characters]

## Tagline

[Inferred tagline based on plugin functionality, max 100 characters]

## Description

[Inferred description with markdown formatting support, based on code analysis]
```

## Notes

- The name field will be automatically extracted from `manifest.json`
- Tagline and description will be automatically inferred from code analysis
- All character limits must be enforced (name ≤ 100 chars, tagline ≤ 100 chars)
- Description should use markdown formatting appropriately
- Analyze the code thoroughly to understand the plugin's purpose and features
- Base the description on actual functionality found in the code, not assumptions

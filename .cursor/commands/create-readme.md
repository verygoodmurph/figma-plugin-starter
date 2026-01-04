# Create README

## Overview

Generate or update a `README.md` file with comprehensive documentation for the Figma plugin, including inferred content from code analysis and user-provided additional resources.

## Steps

1. **Read manifest.json**

   - Extract the plugin name from `manifest.json` (field: `name`)
   - Extract plugin ID and other relevant metadata
   - Note any capabilities, permissions, or network access configurations

2. **Gather plugin information**

   - Read `code.js` and `ui.html` to understand plugin functionality
   - Review existing `README.md` if it exists to preserve any important information
   - Check for existing `LICENSE` or `LICENSE.txt` file in the project root
   - Analyze the code to identify:
     - Main purpose and functionality
     - Key features and actions
     - UI components and interactions
     - API usage patterns
     - Any limitations or constraints
     - Technical implementation details

3. **Infer core content**

   - **Title**: Use plugin name from `manifest.json`
   - **Description**: Generate a comprehensive overview including:
     - Plugin's purpose and main features (inferred from code analysis)
     - How to use each feature (based on UI interactions and code logic)
     - Key concepts demonstrated (e.g., UI communication, async functions, etc.)
     - Any limitations discovered from code review
     - Technical considerations based on implementation patterns
     - Format using markdown: **bold**, _italic_, ~~strikethrough~~, ordered lists, unordered lists, [links](url), `code`, and code blocks

4. **Handle license information**

   - Check if a `LICENSE` or `LICENSE.txt` file exists in the project root
   - If a license file exists, read it to determine the license type
   - If no license file exists, prompt the user to select a license type:
     - MIT License (recommended for open source projects)
     - Apache 2.0
     - GPL v3
     - Other (user-specified)
   - Create or update the LICENSE file if needed
   - Include license information in the README

5. **Prompt for additional content**

   - **Links**: Ask the user for relevant links such as:
     - Documentation links (Figma Plugin API Docs, tutorials, etc.)
     - Related resources
     - External references
     - Community or support links
   - **Resources**: Ask the user for any additional sections they'd like to include:
     - Installation instructions
     - Usage examples
     - Contributing guidelines
     - Credits or acknowledgments
     - Any other relevant information

6. **Create or update README.md**

   - Generate or update the file in the project root
   - Format with proper markdown structure
   - Include sections:
     - Title (from manifest.json)
     - Description (inferred from code, markdown formatted)
     - Features/Key Concepts (inferred from code)
     - Usage instructions (inferred from code)
     - Links section (user-provided)
     - Additional resources (user-provided)
     - License section (with reference to LICENSE file)
   - Preserve any existing valuable content from current README.md if updating

7. **Validate output**

   - Verify markdown formatting is correct
   - Ensure all links are properly formatted
   - Check that inferred content accurately reflects the code
   - Confirm user-provided content is integrated appropriately

## File Structure

The generated `README.md` should follow this structure:

```markdown
# [Plugin Name]

[Inferred description based on plugin functionality]

## Features

[Inferred list of key features and concepts demonstrated]

## Usage

[Inferred usage instructions based on code analysis]

## Links

[User-provided links section]

## Resources

[User-provided additional resources and information]

## License

This project is licensed under the [License Name] License - see the [LICENSE](LICENSE) file for details.
```

## Notes

- Core content (description, features, usage) will be automatically inferred from code analysis
- License information will be handled automatically (check for existing LICENSE file or prompt for license type)
- Additional content (links, resources) will be collected from the user via prompts
- When updating an existing README.md, preserve valuable existing content
- Analyze the code thoroughly to understand the plugin's purpose and features
- Base the description on actual functionality found in the code, not assumptions
- Use clear, user-friendly language appropriate for a README
- Include code examples where helpful for understanding usage
- Default to MIT License if user doesn't specify a preference (common for open source projects)

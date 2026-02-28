
## [28/02/2026 15:07:04]

- Optimized AI config files: eliminated massive duplication across CLAUDE.md, AGENTS.md, and figma-plugin SKILL.md
- Strategy: CLAUDE.md is the hub (always loaded, ~84 lines), AGENTS.md is the reference (on-demand, ~169 lines), SKILL.md is workflow only (~128 lines)
- CLAUDE.md: compressed architecture to 1 code block, merged syntax restrictions + common mistakes into "Pitfalls" section, moved API recipes/theming/manifest to AGENTS.md
- AGENTS.md: received code recipes, theming table, manifest reference, template checklist from CLAUDE.md; removed its own duplicates (patterns 2-5, JS syntax section, persona intro, "When Writing Code")
- figma-plugin SKILL.md: gutted ~150 lines of Critical Rules + Common Patterns sections, replaced with 3-line cross-reference to CLAUDE.md and AGENTS.md
- Cursor commands: tightened create-readme (127→69), create-community-description (78→59), enhance-spec-interview (128→30), build-from-spec (189→41)
- Cursor rules: tightened memory.mdc (35→23), removed stray "Use yarn" line
- Total reduction: ~1,586 → ~647 lines (~59% reduction)
- Files affected: CLAUDE.md, AGENTS.md, .claude/skills/figma-plugin/SKILL.md, .cursor/commands/*.md, .cursor/rules/memory.mdc

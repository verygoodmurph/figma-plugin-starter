# Enhance Specification

## Overview

Interview the user to gather detailed requirements, then enhance `SPEC.md` with deeper technical details, design rationale, edge cases, and implementation guidance.

## Steps

1. **Read existing state**
   - Read `SPEC.md`, `code.js`, `ui.html`, `manifest.json`
   - Identify gaps, ambiguities, and inconsistencies between spec and implementation

2. **Interview the user** — ask iteratively, not all at once. Focus on areas where user input adds unique value (skip what you can infer from code):
   - **Architecture:** Message passing strategies, state management, data flow, performance tradeoffs
   - **UX:** Workflow patterns, interaction design, feedback mechanisms, accessibility needs
   - **Edge cases:** Error scenarios, boundary conditions, failure recovery strategies
   - **Tradeoffs:** Performance vs. features, simplicity vs. flexibility, current vs. future needs
   - **Constraints:** Platform limitations, API restrictions, compatibility

3. **Enhance `SPEC.md`**
   - Integrate interview insights into existing sections or add new ones
   - Document design decisions and their rationale
   - Add edge cases, error handling strategies, and accessibility requirements
   - Ensure all sections are specific and actionable

4. **Validate**
   - All interview insights incorporated
   - Technical details align with implementation
   - Consistent across sections, correct markdown
   - Edge cases and error scenarios documented

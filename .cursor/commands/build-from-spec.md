# Build Plugin From Specification

## Overview

Read the `SPEC.md` file and implement the complete plugin according to the specification. This command transforms the starter template into a fully functional plugin matching all requirements, features, and technical details documented in the specification.

## Steps

1. **Read specification document**

   - Read `SPEC.md` to understand all requirements
   - Identify all features, technical requirements, and implementation details
   - Note message passing protocols, UI/UX requirements, and edge cases
   - Extract architecture patterns, data structures, and API usage
   - Review error handling strategies and accessibility requirements

2. **Analyze current codebase**

   - Read `code.js` to understand the starter template structure
   - Read `ui.html` to understand current UI implementation
   - Read `manifest.json` to understand current configuration
   - Identify what needs to be modified vs. what can be reused
   - Note any starter template code that should be preserved or removed

3. **Plan implementation**

   - Break down implementation into logical components
   - Identify dependencies between features
   - Plan code organization and structure
   - Determine what needs to be implemented in code context vs. UI context
   - Note any external data or libraries needed

4. **Update manifest.json**

   - Update plugin name and ID based on spec
   - Configure document access level if specified
   - Add any required capabilities or permissions
   - Configure network access if needed
   - Set appropriate UI dimensions from spec

5. **Implement code context (`code.js`)**

   - Replace or enhance starter template code
   - Implement all features specified in the code context section
   - Add message handlers for UI communication
   - Implement data generation/processing logic
   - Add error handling and edge case management
   - Include font management if text nodes are involved
   - Add client storage logic if persistence is required
   - Follow Figma Plugin API best practices
   - Use ES5-compatible syntax (avoid optional chaining, nullish coalescing)
   - Add comprehensive error handling with try-catch blocks
   - Use `figma.notify()` for user feedback

6. **Implement UI context (`ui.html`)**

   - Replace or enhance starter template UI
   - Implement all UI components specified in the spec
   - Add HTML structure matching the layout requirements
   - Implement CSS styling using Figma design tokens
   - Add JavaScript for interactivity and message handling
   - Implement keyboard navigation and accessibility features
   - Add ARIA labels and semantic HTML
   - Support light and dark mode themes
   - Implement lazy loading and performance optimizations if specified
   - Add visual feedback and loading states

7. **Implement message passing**

   - Set up all message types from the spec's message passing protocol
   - Implement message handlers in code context
   - Implement message senders in UI context
   - Add message validation and error handling
   - Ensure bidirectional communication works correctly

8. **Add data generation/processing**

   - If spec requires data generation (e.g., emoji lists, categories), implement it
   - Create data structures matching spec requirements
   - Implement any filtering, searching, or processing logic
   - Optimize for performance (lazy loading, caching, etc.)

9. **Implement error handling**

   - Add error handling for all scenarios documented in spec
   - Implement graceful degradation where specified
   - Add user-friendly error messages
   - Log errors to console for debugging
   - Handle edge cases appropriately

10. **Add accessibility features**

    - Implement keyboard navigation as specified
    - Add ARIA labels and roles
    - Ensure focus management works correctly
    - Add visible focus indicators
    - Test screen reader compatibility

11. **Optimize performance**

    - Implement lazy loading if specified
    - Add virtual scrolling if needed for large lists
    - Debounce search inputs if specified
    - Cache data appropriately
    - Optimize rendering and interactions

12. **Validate implementation**

    - Verify all features from spec are implemented
    - Check message passing protocol matches spec
    - Verify UI dimensions match spec
    - Test error handling scenarios
    - Verify accessibility features work
    - Check that code follows Figma Plugin API best practices
    - Ensure ES5 compatibility in code.js
    - Verify theme support works correctly

## Implementation Guidelines

### Code Context (`code.js`)

- **Async Operations:** Always use `await` for async Figma API calls
- **Error Handling:** Wrap async operations in try-catch blocks
- **User Feedback:** Use `figma.notify()` for all user-facing messages
- **Font Loading:** Always `await figma.loadFontAsync()` before setting text properties
- **Selection Handling:** Always check if selection exists before accessing
- **Message Validation:** Validate message types and data structure
- **ES5 Syntax:** Avoid optional chaining (`?.`), nullish coalescing (`??`), and other ES2020+ features

### UI Context (`ui.html`)

- **Design Tokens:** Use Figma design tokens (`--figma-color-*`) for all styling
- **Theme Support:** Support both `html.figma-light` and `html.figma-dark` classes
- **Accessibility:** Include ARIA labels, semantic HTML, keyboard navigation
- **Performance:** Implement lazy loading, virtual scrolling, or debouncing as needed
- **Visual Feedback:** Add loading states, hover effects, and focus indicators
- **Message Handling:** Validate received messages before processing

### Code Organization

- **Modularity:** Break code into logical functions
- **Comments:** Add comments for complex logic and API usage
- **Naming:** Use descriptive variable and function names
- **Consistency:** Follow patterns established in starter template
- **Error Messages:** Provide clear, actionable error messages

## File Structure

The implementation should maintain this structure:

```
project-root/
├── manifest.json      (updated with plugin name, dimensions, config)
├── code.js            (complete implementation)
├── ui.html            (complete UI implementation)
├── SPEC.md            (specification document - reference only)
└── README.md          (may need updates after implementation)
```

## Testing Checklist

After implementation, verify:

- [ ] All features from spec are implemented and working
- [ ] Message passing works correctly in both directions
- [ ] UI matches the layout and design specified
- [ ] Error handling works for all documented scenarios
- [ ] Keyboard navigation functions correctly
- [ ] Theme support works (light/dark mode)
- [ ] Performance optimizations are in place
- [ ] Accessibility features are functional
- [ ] Code follows Figma Plugin API best practices
- [ ] No ES2020+ syntax in code.js
- [ ] All edge cases are handled appropriately

## Notes

- Implement features in the order that makes sense (foundation first, then features)
- Preserve any useful patterns from the starter template
- Follow the exact message passing protocol from the spec
- Match UI dimensions and layout exactly as specified
- Implement all accessibility requirements from the spec
- Add comprehensive error handling even if not explicitly detailed
- Use console.log() for debugging, but remove excessive logging before finalizing
- Test each feature as you implement it
- Reference the spec frequently to ensure accuracy
- If spec is ambiguous, make reasonable decisions based on best practices
- Ensure code is production-ready, not just functional

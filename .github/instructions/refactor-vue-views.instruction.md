---
description: 'Refactor large Vue page views into smaller, reusable components for better modularity and maintainability.'
applyTo: 'src/renderer/views/**.vue'
---

When working in this Vue project, refactor any large page view files (`/src/renderer/views`) into smaller, focused components. Each component should encapsulate a distinct piece of UI or logic to promote reusability and easier testing.

## Guidelines:

- Identify sections of the page view that can be logically separated (e.g., forms, cards, lists, modals).
- Move these sections into new components within the `/components/pages` directory.
- Each new component should:
  - Have a clear, descriptive name.
  - Accept props for any data or callbacks it needs.
  - Emit events for interactions back to the parent view.
- Refactor the original page view to import and use these new components.
- Ensure all functionality remains intact and the UI is unchanged from the user's perspective.
- Update any relevant tests or documentation if needed.

## Example

**Before:**  
A single Vue file with multiple sections hardcoded in the template.

**After:**  
The file imports `<UserForm />`, `<UserList />`, and `<UserModal />` components, with the template using these new tags and passing required props/events.

## Note:

Apply these instructions to any new or existing Vue page views that become too large or complex for easy maintenance.

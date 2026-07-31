# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.


# Problem:

People struggle to organize daily work because their tasks, notes, and goals are spread across multiple places. They also lack a clear overview of what they have accomplished, making it difficult to stay consistent and motivated.

# Primary User:

Alex

22 years old
University student
Works part-time
Uses a laptop every day
Has many assignments
Wants something simpler than Notion
Doesn't want to spend time configuring productivity systems

# MVP:

## Must have:

Without these, the app fails its purpose.

Create tasks
Edit tasks
Delete tasks
Mark tasks complete
Organize tasks
Basic dashboard

## Should Have

These make the app significantly better.

Notes
Focus timer
Habits
Due dates
Statistics

## Could Have

Nice extras if time allows.

Drag & drop
Calendar
Themes
AI assistant
Notifications
Recurring tasks

## Won't Have (for version 1)

This category is just as important.

We intentionally say no to:

Team collaboration
File uploads
Real-time synchronization
Mobile app
Offline support

## Success

For our MVP:

A user can create, edit, complete, and delete tasks.
A user can view today's workload at a glance.
A user can track basic progress over time.
The interface is responsive and pleasant to use.
The application remains fast and easy to understand.


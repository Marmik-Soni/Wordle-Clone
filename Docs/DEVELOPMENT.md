# Development Guide

Welcome to the Wordle Clone development guide! This document will help you get started with developing this project.

## 📚 Table of Contents

- [Quick Start](#quick-start)
- [Understanding the Stack](#understanding-the-stack)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Common Tasks](#common-tasks)
- [Tips & Best Practices](#tips--best-practices)

## 🚀 Quick Start

### Prerequisites

Make sure you have installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **pnpm** (v8 or higher) - Install with: `npm install -g pnpm`

### Initial Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd Wordle-Clone

# Install all dependencies
pnpm install

# Start development servers (both client and server)
pnpm dev
```

Your application will be running at:

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000

## 🎓 Understanding the Stack

### Frontend - Vue.js

Vue.js is a progressive JavaScript framework for building user interfaces.

**Key Concepts:**

- **Composition API**: Modern way to write Vue components
- **Reactive State**: Use `ref()` and `reactive()` for reactive data
- **Template Syntax**: HTML-like syntax for rendering components
- **Components**: Reusable pieces of UI

**Example Component:**

```vue
<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
const increment = () => count.value++;
</script>

<template>
  <button @click="increment">Count: {{ count }}</button>
</template>
```

**Learning Resources:**

- [Vue.js Official Docs](https://vuejs.org/)
- [Vue.js Composition API Guide](https://vuejs.org/guide/extras/composition-api-faq.html)

### Backend - Hono

Hono is an ultrafast web framework for edge computing and Node.js.

**Key Concepts:**

- **Routing**: Define API endpoints
- **Context (c)**: Access request/response
- **Middleware**: Add functionality like CORS, logging
- **Type Safety**: Full TypeScript support

**Example Route:**

```typescript
import { Hono } from 'hono';

const app = new Hono();

app.get('/api/users/:id', (c) => {
  const id = c.req.param('id');
  return c.json({ id, name: 'John Doe' });
});
```

**Learning Resources:**

- [Hono Official Docs](https://hono.dev/)
- [Hono API Reference](https://hono.dev/api/hono)

### Monorepo - pnpm Workspaces

This project uses a monorepo structure, meaning both client and server are in one repository.

**Benefits:**

- Shared dependencies
- Consistent tooling
- Easier development
- Single source of truth

**Workspace Commands:**

```bash
# Run command in specific workspace
pnpm --filter client <command>
pnpm --filter server <command>

# Run in all workspaces
pnpm --recursive <command>
```

## 📁 Project Structure

```
Wordle-Clone/
├── client/                    # Vue.js Frontend
│   ├── src/
│   │   ├── assets/           # Images, styles, etc.
│   │   ├── components/       # Vue components
│   │   ├── App.vue           # Main app component
│   │   ├── main.ts           # Entry point
│   │   └── style.css         # Global styles
│   ├── index.html            # HTML template
│   ├── vite.config.ts        # Vite configuration
│   ├── tsconfig.json         # TypeScript config
│   └── package.json          # Dependencies
│
├── server/                    # Hono Backend
│   ├── src/
│   │   └── index.ts          # Server entry point
│   ├── tsconfig.json         # TypeScript config
│   └── package.json          # Dependencies
│
├── .husky/                    # Git hooks
├── .vscode/                   # VS Code settings
├── package.json              # Root package.json
├── pnpm-workspace.yaml       # Workspace config
├── .gitignore                # Git ignore rules
├── .editorconfig             # Editor config
├── .prettierrc               # Prettier config
└── README.md                 # Main documentation
```

## 🔄 Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/my-new-feature
```

### 2. Start Development Servers

```bash
pnpm dev
```

### 3. Make Changes

- Edit files in `client/src/` for frontend
- Edit files in `server/src/` for backend
- Changes will auto-reload (hot module replacement)

### 4. Check Your Code

```bash
# Format code
pnpm format

# Lint code
pnpm lint

# Type check
pnpm type-check
```

### 5. Commit Changes

```bash
git add .
git commit -m "feat: add new feature"
```

Git hooks will automatically:

- Format your code
- Run linters
- Ensure code quality

### 6. Push and Create PR

```bash
git push origin feature/my-new-feature
```

## 🛠️ Common Tasks

### Adding a New Vue Component

```bash
# Create new component file
touch client/src/components/MyComponent.vue
```

```vue
<!-- client/src/components/MyComponent.vue -->
<script setup lang="ts">
interface Props {
  message: string;
}

defineProps<Props>();
</script>

<template>
  <div class="my-component">
    <p>{{ message }}</p>
  </div>
</template>

<style scoped>
.my-component {
  padding: 1rem;
}
</style>
```

### Adding a New API Route

```typescript
// server/src/index.ts
app.get('/api/new-route', (c) => {
  return c.json({ data: 'Hello!' });
});
```

### Installing New Dependencies

**Client:**

```bash
pnpm --filter client add <package-name>
```

**Server:**

```bash
pnpm --filter server add <package-name>
```

**Dev Dependencies:**

```bash
pnpm --filter client add -D <package-name>
```

### Environment Variables

**Client (.env):**

```env
VITE_API_URL=http://localhost:3000
```

Use in code:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

**Server (.env):**

```env
PORT=3000
NODE_ENV=development
```

Use in code:

```typescript
const port = process.env.PORT || 3000;
```

## 💡 Tips & Best Practices

### TypeScript

- ✅ Always define types for function parameters
- ✅ Use interfaces for object shapes
- ✅ Avoid `any` type when possible
- ✅ Let TypeScript infer types when obvious

### Vue.js

- ✅ Use Composition API (`<script setup>`)
- ✅ Keep components small and focused
- ✅ Use props for parent-to-child communication
- ✅ Use emits for child-to-parent communication
- ✅ Use scoped styles to avoid CSS conflicts

### Hono

- ✅ Group related routes together
- ✅ Use middleware for common functionality
- ✅ Return proper HTTP status codes
- ✅ Validate input data
- ✅ Handle errors gracefully

### Git

- ✅ Write clear commit messages
- ✅ Keep commits focused and atomic
- ✅ Pull latest changes before starting work
- ✅ Test before committing

### Code Style

- ✅ Let Prettier format your code
- ✅ Fix ESLint warnings
- ✅ Use meaningful variable names
- ✅ Add comments for complex logic
- ✅ Keep functions small

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5173 (frontend)
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Kill process on port 3000 (backend)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Dependencies Not Installing

```bash
# Clear pnpm cache
pnpm store prune

# Remove node_modules and reinstall
rm -rf node_modules client/node_modules server/node_modules
pnpm install
```

### TypeScript Errors

```bash
# Restart TypeScript server in VS Code
# Press: Ctrl+Shift+P
# Type: TypeScript: Restart TS Server
```

## 📖 Next Steps

1. **Learn Vue.js**: Complete the [Vue.js tutorial](https://vuejs.org/tutorial/)
2. **Learn Hono**: Read the [Hono getting started guide](https://hono.dev/getting-started/basic)
3. **Build Features**: Start implementing Wordle game logic
4. **Write Tests**: Add unit and integration tests
5. **Deploy**: Learn about deployment options

## 🤝 Getting Help

- Check existing [Issues](../../issues)
- Read the [Contributing Guide](CONTRIBUTING.md)
- Ask questions in discussions

Happy coding! 🚀

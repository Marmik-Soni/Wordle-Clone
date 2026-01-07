# Contributing to Wordle Clone

Thank you for your interest in contributing to Wordle Clone! This document provides guidelines and instructions for contributing.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Install dependencies: `pnpm install`
4. Create a new branch: `git checkout -b feature/your-feature-name`

## 💻 Development Setup

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Running Locally

```bash
# Install dependencies
pnpm install

# Run development servers
pnpm dev
```

## 📝 Code Style

We use ESLint and Prettier to maintain code quality and consistency.

### Before Committing

- Run `pnpm lint` to check for linting errors
- Run `pnpm format` to format your code
- Run `pnpm type-check` to ensure TypeScript types are correct

Pre-commit hooks will automatically run these checks, but it's good practice to run them manually before committing.

### Coding Conventions

- Use TypeScript for all new code
- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Keep functions small and focused

## 🧪 Testing

Our CI/CD pipeline automatically runs tests on all pull requests. Before submitting:

```bash
# Run linting
pnpm lint

# Run type checking
pnpm type-check

# Build both projects
pnpm build
```

See [CI/CD Documentation](Docs/CI-CD.md) for more details about our automated testing.

## 📋 Pull Request Process

1. **Update Documentation**: Ensure README.md and other docs are updated if needed
2. **Test Your Changes**: Make sure everything works as expected
3. **Follow Code Style**: Ensure your code passes linting and formatting checks
4. **Write Clear Descriptions**: Explain what your PR does and why
5. **Link Issues**: Reference any related issues in your PR description
6. **Be Patient**: Wait for review and be open to feedback

### PR Title Format

Use clear, descriptive titles:

- `feat: Add new feature`
- `fix: Fix bug in component`
- `docs: Update README`
- `style: Format code`
- `refactor: Refactor component logic`
- `test: Add tests`
- `chore: Update dependencies`

## 🐛 Reporting Bugs

When reporting bugs, please include:

- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Your environment (OS, Node version, etc.)

## 💡 Suggesting Features

We welcome feature suggestions! Please:

- Check if the feature has already been suggested
- Provide a clear description of the feature
- Explain why it would be useful
- Include examples or mockups if possible

## 🏗️ Project Structure

```
client/         # Vue.js frontend
server/         # Hono backend
```

### Working on the Frontend

- Components go in `client/src/components/`
- Use Vue 3 Composition API
- Follow Vue.js style guide

### Working on the Backend

- API routes in `server/src/`
- Use Hono framework conventions
- Keep routes organized and documented

## � Additional Resources

- [Development Guide](Docs/DEVELOPMENT.md) - Beginner-friendly guide for Vue.js & Hono
- [Setup Documentation](Docs/SETUP.md) - Complete project details
- [Quick Start Guide](Docs/QUICKSTART.md) - Get started quickly- [CI/CD Pipeline](Docs/CI-CD.md) - Automated testing and deployment
- [Deployment Guide](Docs/DEPLOYMENT.md) - Production deployment

## �📞 Questions?

Feel free to open an issue for any questions or concerns!

Thank you for contributing! 🎉

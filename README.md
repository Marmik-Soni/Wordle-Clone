# Wordle Clone

![CI](https://github.com/yourusername/wordle-clone/workflows/CI/badge.svg)
![Deploy](https://github.com/yourusername/wordle-clone/workflows/Deploy/badge.svg)

A modern, open-source Wordle clone built with Vue.js and Hono, showcasing best practices in full-stack TypeScript development.

## 🎮 About

This is a feature-rich clone of the popular word-guessing game Wordle. Players have six attempts to guess a five-letter word, with feedback provided after each guess.

## ✨ Features

- 🎯 Classic Wordle gameplay
- 📱 Responsive design
- 🎨 Modern UI with Vue.js
- ⚡ Fast backend powered by Hono
- 🔒 Type-safe with TypeScript
- 🧪 Ready for testing (framework to be added)
- 📦 Monorepo architecture

## 🛠️ Tech Stack

### Frontend (Client)

- **Vue.js 3** - Progressive JavaScript framework
- **Vite** - Next-generation frontend tooling
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **PostCSS** - CSS transformations

### Backend (Server)

- **Hono** - Ultrafast web framework
- **Node.js** - Runtime environment
- **TypeScript** - Type-safe JavaScript
- **Drizzle ORM** - TypeScript ORM
- **Neon PostgreSQL** - Serverless PostgreSQL database

### Development Tools

- **pnpm** - Fast, disk space efficient package manager
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Run linters on staged files
- **Drizzle Kit** - Database migrations

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0
- **Neon Account** - [Sign up](https://neon.tech) for free PostgreSQL database

## 🚀 Getting Started

### Quick Start

See [QUICKSTART.md](Docs/QUICKSTART.md) for a 5-minute setup guide.

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd Wordle-Clone
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

### Development

Run both client and server in development mode:

```bash
pnpm dev
```

Or run them individually:

```bash
# Frontend only
pnpm dev:client

# Backend only
pnpm dev:server
```

The client will be available at `http://localhost:5173` and the server at `http://localhost:3000`.

### Building for Production

Build both projects:

```bash
pnpm build
```

Or build individually:

```bash
pnpm build:client
pnpm build:server
```

### Preview Production Build

Preview the client production build:

```bash
pnpm preview:client
```

## 📁 Project Structure

```
Wordle-Clone/
├── client/                 # Vue.js frontend
│   ├── src/
│   │   ├── assets/        # Static assets
│   │   ├── components/    # Vue components
│   │   └── App.vue        # Root component
│   ├── package.json
│   └── vite.config.ts
├── server/                 # Hono backend
│   ├── src/
│   │   └── index.ts       # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── .husky/                 # Git hooks
├── .vscode/                # VS Code settings
├── package.json            # Root package.json
└── pnpm-workspace.yaml     # pnpm workspace config
```

## 🧰 Available Scripts

### Root Level

- `pnpm dev` - Run both client and server in development mode
- `pnpm dev:client` - Run only the client
- `pnpm dev:server` - Run only the server
- `pnpm build` - Build both projects
- `pnpm lint` - Lint all code
- `pnpm format` - Format all code with Prettier
- `pnpm format:check` - Check if code is formatted
- `pnpm type-check` - Type check all TypeScript code

### Client

- `pnpm --filter client dev` - Run client dev server
- `pnpm --filter client build` - Build client for production
- `pnpm --filter client preview` - Preview production build
- `pnpm --filter client lint` - Lint client code

### Server

- `pnpm --filter server dev` - Run server in watch mode
- `pnpm --filter server build` - Build server
- `pnpm --filter server start` - Start production server
- `pnpm --filter server lint` - Lint server code

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

This project uses ESLint and Prettier for code quality and formatting. Pre-commit hooks ensure code is formatted before committing.

## � Documentation

- [Quick Start Guide](Docs/QUICKSTART.md) - Get started in 5 minutes
- [Development Guide](Docs/DEVELOPMENT.md) - Comprehensive guide for beginners (Vue.js & Hono)
- [Setup Documentation](Docs/SETUP.md) - Complete project setup details- [CI/CD Pipeline](Docs/CI-CD.md) - Continuous Integration and Deployment
- [Deployment Guide](Docs/DEPLOYMENT.md) - Production deployment instructions- [Project Status](Docs/PROJECT_STATUS.md) - Current status and next steps
- [Contributing Guidelines](CONTRIBUTING.md) - How to contribute

## �📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original Wordle game by Josh Wardle
- Vue.js team for the amazing framework
- Hono team for the ultrafast web framework

## 📧 Contact

Project Link: [https://github.com/yourusername/wordle-clone](https://github.com/yourusername/wordle-clone)

---

Made with ❤️ and TypeScript

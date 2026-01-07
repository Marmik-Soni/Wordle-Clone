# CI/CD Pipeline Documentation

This project uses GitHub Actions for continuous integration and deployment.

## 📋 Table of Contents

- [Overview](#overview)
- [Workflows](#workflows)
- [Setup Instructions](#setup-instructions)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## 🔄 Overview

Our CI/CD pipeline automatically:

- ✅ Runs linting and type checking
- ✅ Checks code formatting
- ✅ Builds client and server
- ✅ Runs tests (when implemented)
- ✅ Reviews dependencies for security
- ✅ Creates build artifacts
- ✅ Deploys to production (configurable)

## 🔧 Workflows

### 1. CI Workflow (`.github/workflows/ci.yml`)

**Triggers:**

- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

**Jobs:**

#### Lint & Type Check

- Checks code style with ESLint
- Validates TypeScript types
- Verifies Prettier formatting

#### Build Client

- Builds the Vue.js frontend
- Uploads build artifacts
- Ensures production build works

#### Build Server

- Compiles TypeScript backend
- Uploads build artifacts
- Validates server build

#### Run Tests

- Runs test suite (placeholder for now)
- Will include unit and integration tests

#### Build Status

- Final status check
- Fails if any job fails
- Provides summary

### 2. Deploy Workflow (`.github/workflows/deploy.yml`)

**Triggers:**

- Push to `main` branch
- Manual trigger via GitHub UI

**Status:** Template ready - requires deployment configuration

**Supported Platforms:**

- Vercel (Frontend)
- Railway (Backend)
- Netlify (Frontend)
- Render (Backend)
- AWS/GCP/Azure (Full stack)

### 3. Dependency Review (`.github/workflows/dependency-review.yml`)

**Triggers:**

- Pull requests to `main` or `develop`

**Features:**

- Checks for vulnerable dependencies
- Comments on PRs with findings
- Fails on moderate+ severity issues

## 🚀 Setup Instructions

### Initial Setup

1. **Enable GitHub Actions**
   - GitHub Actions are automatically enabled for public repos
   - For private repos: Settings → Actions → Enable

2. **Branch Protection (Recommended)**

   ```
   Repository Settings → Branches → Add rule

   Branch name pattern: main
   ✅ Require status checks to pass before merging
   ✅ Require branches to be up to date before merging
   Select: lint-and-type-check, build-client, build-server
   ```

3. **Secrets Configuration (for deployment)**

   ```
   Repository Settings → Secrets and variables → Actions

   Add secrets as needed:
   - VERCEL_TOKEN
   - VERCEL_ORG_ID
   - VERCEL_PROJECT_ID
   - RAILWAY_TOKEN
   - DATABASE_URL (for production)
   ```

### Local Testing

Test workflows locally with [act](https://github.com/nektos/act):

```bash
# Install act
brew install act  # macOS
# or
choco install act-cli  # Windows

# Run CI workflow
act -j lint-and-type-check

# Run all jobs
act push
```

## 📦 Deployment

### Option 1: Vercel (Frontend)

1. **Install Vercel CLI:**

   ```bash
   pnpm add -g vercel
   ```

2. **Login and setup:**

   ```bash
   cd client
   vercel login
   vercel link
   ```

3. **Get tokens:**

   ```bash
   vercel --token
   ```

4. **Add secrets to GitHub:**
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

5. **Uncomment Vercel deployment in `.github/workflows/deploy.yml`**

### Option 2: Railway (Backend)

1. **Create Railway project:**
   - Go to [railway.app](https://railway.app)
   - Create new project
   - Link GitHub repository

2. **Add environment variables:**

   ```
   DATABASE_URL=your_neon_url
   NODE_ENV=production
   PORT=3000
   ```

3. **Get Railway token:**
   - Settings → Tokens → Create token

4. **Add to GitHub secrets:**
   - `RAILWAY_TOKEN`

5. **Uncomment Railway deployment in workflow**

### Option 3: Manual Deployment

#### Client (Static hosting)

```bash
# Build
cd client
pnpm build

# Deploy dist/ folder to:
# - Netlify: netlify deploy --prod --dir=dist
# - GitHub Pages: Push dist/ to gh-pages branch
# - Cloudflare Pages: Connect repo and set build command
```

#### Server (Node.js hosting)

```bash
# Build
cd server
pnpm build

# Deploy to:
# - Railway: railway up
# - Render: Connect repo
# - Heroku: git push heroku main
# - DigitalOcean: Use App Platform
```

## 🔍 Monitoring Workflows

### View Workflow Runs

1. Go to repository → **Actions** tab
2. Click on a workflow to see runs
3. Click on a run to see job details
4. View logs for each step

### Status Badges

Add to README.md:

```markdown
![CI](https://github.com/yourusername/wordle-clone/actions/workflows/ci.yml/badge.svg)
![Deploy](https://github.com/yourusername/wordle-clone/actions/workflows/deploy.yml/badge.svg)
```

## 🐛 Troubleshooting

### Build Fails on CI but Works Locally

**Issue:** Different Node.js or pnpm versions

**Solution:**

```bash
# Match CI versions locally
nvm use 20
pnpm --version  # Should be 10.x
```

### Linting Fails

**Issue:** Code not formatted or has lint errors

**Solution:**

```bash
# Fix locally
pnpm format
pnpm lint
pnpm type-check
```

### Build Artifacts Not Found

**Issue:** Build output directory incorrect

**Solution:** Check `dist` paths in workflow files match your build output

### Deployment Fails

**Issue:** Missing environment variables

**Solution:**

1. Check GitHub Secrets are set
2. Verify secret names match workflow
3. Check deployment platform settings

### pnpm Install Fails

**Issue:** Lockfile out of sync

**Solution:**

```bash
# Update lockfile
pnpm install
git add pnpm-lock.yaml
git commit -m "chore: update lockfile"
```

## 🎯 Best Practices

### 1. Always Run Checks Before Pushing

```bash
# Pre-push checklist
pnpm format
pnpm lint
pnpm type-check
pnpm build
```

### 2. Use Conventional Commits

```bash
# Types: feat, fix, docs, style, refactor, test, chore
git commit -m "feat: add user authentication"
git commit -m "fix: resolve build error in client"
git commit -m "docs: update deployment guide"
```

### 3. Create Feature Branches

```bash
git checkout -b feature/game-board
# Make changes
git push origin feature/game-board
# Create PR on GitHub
```

### 4. Keep Dependencies Updated

```bash
# Check for updates
pnpm outdated

# Update dependencies
pnpm update

# Test after updates
pnpm build
```

### 5. Monitor Action Costs

- GitHub Actions is free for public repos
- Private repos: 2,000 minutes/month free
- Monitor usage: Settings → Billing → Actions

## 📊 Workflow Optimization

### Cache Dependencies

Already implemented:

```yaml
- uses: actions/setup-node@v4
  with:
    cache: 'pnpm' # Speeds up installs
```

### Parallel Jobs

Our workflows run builds in parallel:

- Client build
- Server build
- Tests

### Skip CI

For documentation-only changes:

```bash
git commit -m "docs: update README [skip ci]"
```

## 🔒 Security

### Protected Secrets

Never commit:

- Database URLs
- API keys
- Tokens
- Passwords

Use GitHub Secrets instead!

### Dependency Scanning

Automatically enabled:

- Dependabot security updates
- Dependency review on PRs
- Vulnerability alerts

### Code Scanning

Enable CodeQL (optional):

```
Security → Code scanning → Set up CodeQL
```

## 📚 Additional Resources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [pnpm in CI](https://pnpm.io/continuous-integration)
- [Vercel Deployment](https://vercel.com/docs/cli)
- [Railway Deployment](https://docs.railway.app/)
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)

## 🎓 Learning Path

1. Start with understanding the CI workflow
2. Watch workflow runs on GitHub
3. Experiment with local changes
4. Set up deployment when ready
5. Add tests and expand workflows

---

**Need help?** Open an issue or check the [CONTRIBUTING.md](../CONTRIBUTING.md) guide!

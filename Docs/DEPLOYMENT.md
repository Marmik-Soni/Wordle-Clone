# Deployment Guide

Complete guide for deploying Wordle Clone to production.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Frontend Deployment](#frontend-deployment)
- [Backend Deployment](#backend-deployment)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Post-Deployment](#post-deployment)

## ✅ Prerequisites

Before deploying, ensure:

- ✅ Code is committed and pushed to GitHub
- ✅ All tests pass locally
- ✅ Build succeeds: `pnpm build`
- ✅ Environment variables documented
- ✅ Database is set up (Neon PostgreSQL)

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended)

**Why Vercel?**

- Free tier available
- Automatic deployments from GitHub
- Built-in CDN
- Perfect for Vue/Vite apps

**Steps:**

1. **Install Vercel CLI:**

   ```bash
   pnpm add -g vercel
   ```

2. **Deploy from client directory:**

   ```bash
   cd client
   vercel
   ```

3. **Configure project:**
   - Framework: Vite
   - Build Command: `pnpm build`
   - Output Directory: `dist`
   - Install Command: `pnpm install`

4. **Set environment variables:**

   ```
   VITE_API_URL=https://your-api-url.com
   ```

5. **Deploy to production:**
   ```bash
   vercel --prod
   ```

**Automatic Deployments:**

- Connect GitHub repository in Vercel dashboard
- Every push to `main` auto-deploys

### Option 2: Netlify

1. **Connect GitHub repo:**
   - Go to [netlify.com](https://netlify.com)
   - New site from Git → Choose repo

2. **Build settings:**

   ```
   Base directory: client
   Build command: pnpm build
   Publish directory: client/dist
   ```

3. **Environment variables:**
   ```
   VITE_API_URL=https://your-api-url.com
   ```

### Option 3: Cloudflare Pages

1. **Connect repository:**
   - Go to [pages.cloudflare.com](https://pages.cloudflare.com)
   - Create project → Connect Git

2. **Build configuration:**

   ```
   Framework: Vite
   Build command: pnpm build
   Build output: dist
   Root directory: client
   ```

3. **Environment variables:**
   ```
   NODE_VERSION=20
   VITE_API_URL=https://your-api-url.com
   ```

## 🚀 Backend Deployment

### Option 1: Railway (Recommended)

**Why Railway?**

- Free $5 credit/month
- Easy PostgreSQL integration
- GitHub auto-deploy
- Great for Hono apps

**Steps:**

1. **Create account:** [railway.app](https://railway.app)

2. **Create new project:**
   - New Project → Deploy from GitHub repo

3. **Configure service:**

   ```
   Root Directory: server
   Build Command: pnpm build
   Start Command: pnpm start
   ```

4. **Add environment variables:**

   ```
   DATABASE_URL=your_neon_url
   NODE_ENV=production
   PORT=3000
   ```

5. **Deploy:**
   - Push to GitHub → Automatic deployment

6. **Get deployment URL:**
   - Copy Railway URL (e.g., `https://app.railway.app`)
   - Update frontend `VITE_API_URL`

### Option 2: Render

1. **Create account:** [render.com](https://render.com)

2. **New Web Service:**
   - Connect GitHub repo
   - Root Directory: `server`

3. **Settings:**

   ```
   Name: wordle-clone-api
   Environment: Node
   Build Command: pnpm install && pnpm build
   Start Command: pnpm start
   ```

4. **Environment variables:**
   ```
   DATABASE_URL=your_neon_url
   NODE_ENV=production
   ```

### Option 3: Fly.io

1. **Install flyctl:**

   ```bash
   brew install flyctl  # macOS
   # or
   pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"  # Windows
   ```

2. **Login:**

   ```bash
   fly auth login
   ```

3. **Initialize (from server directory):**

   ```bash
   cd server
   fly launch
   ```

4. **Set secrets:**

   ```bash
   fly secrets set DATABASE_URL=your_neon_url
   fly secrets set NODE_ENV=production
   ```

5. **Deploy:**
   ```bash
   fly deploy
   ```

## 🗄️ Database Setup

### Neon PostgreSQL (Already Set Up)

Your database is ready! Just ensure:

1. **Production connection string:**
   - Get from Neon dashboard
   - Use pooled connection for serverless

2. **Run migrations:**

   ```bash
   cd server
   DATABASE_URL=your_neon_url pnpm db:push
   ```

3. **Seed data (optional):**
   ```bash
   # Create seed script if needed
   pnpm db:seed
   ```

### Environment-Specific Databases

**Best Practice:** Separate databases for each environment

- **Development:** Local PostgreSQL or Neon branch
- **Staging:** Neon staging branch
- **Production:** Neon main branch

Create branches in Neon dashboard:

```
Dashboard → Branches → Create branch
```

## 🔐 Environment Variables

### Frontend (.env)

```env
# Production
VITE_API_URL=https://your-api.railway.app

# Staging
VITE_API_URL=https://staging-api.railway.app

# Development (already set)
VITE_API_URL=http://localhost:3000
```

### Backend (.env)

```env
# Production
DATABASE_URL=postgresql://user:pass@host.neon.tech/db?sslmode=require
NODE_ENV=production
PORT=3000

# Staging
DATABASE_URL=postgresql://user:pass@host-staging.neon.tech/db
NODE_ENV=staging
PORT=3000

# Development (already set)
DATABASE_URL=your_dev_neon_url
NODE_ENV=development
PORT=3000
```

### Managing Secrets

**Never commit secrets to Git!**

✅ **Do:**

- Use `.env.example` files with placeholders
- Store secrets in platform dashboards
- Use environment-specific values

❌ **Don't:**

- Commit `.env` files
- Hardcode secrets in code
- Share secrets publicly

## 🔄 Deployment Workflow

### Manual Deployment

```bash
# 1. Ensure everything works locally
pnpm dev

# 2. Run all checks
pnpm lint
pnpm type-check
pnpm build

# 3. Commit and push
git add .
git commit -m "feat: ready for deployment"
git push origin main

# 4. Deploy platforms auto-deploy or use CLI
vercel --prod  # Frontend
railway up     # Backend
```

### Automated Deployment (CI/CD)

Already configured! See [CI-CD.md](CI-CD.md)

**On push to `main`:**

1. ✅ CI runs (lint, type-check, build)
2. ✅ Tests run
3. ✅ Deployment triggers
4. ✅ Frontend deploys to Vercel
5. ✅ Backend deploys to Railway

## ✅ Post-Deployment Checklist

### 1. Verify Deployments

**Frontend:**

```bash
curl https://your-frontend.vercel.app
# Should return HTML
```

**Backend:**

```bash
curl https://your-api.railway.app/health
# Should return {"status":"ok"}
```

### 2. Test Database Connection

```bash
curl https://your-api.railway.app/api/words
# Should return words array
```

### 3. Check CORS

Open frontend in browser:

- Open DevTools → Network
- Verify API calls succeed
- Check for CORS errors

### 4. Update Frontend API URL

Make sure frontend points to deployed backend:

```env
VITE_API_URL=https://your-api.railway.app
```

### 5. Monitor Logs

**Vercel:**

```bash
vercel logs
```

**Railway:**

- Dashboard → Service → Logs

### 6. Set Up Monitoring (Optional)

- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **Uptime Robot** - Uptime monitoring

## 🐛 Troubleshooting

### Build Fails

**Check:**

- Node version matches (20.x)
- All dependencies installed
- Environment variables set
- Build logs for errors

**Solution:**

```bash
# Clear cache and rebuild
rm -rf node_modules dist
pnpm install
pnpm build
```

### API Not Connecting

**Check:**

- CORS settings in backend
- `VITE_API_URL` is correct
- Backend is running
- Network tab in DevTools

**Solution:**
Update `server/src/index.ts`:

```typescript
app.use(
  '/*',
  cors({
    origin: ['https://your-frontend.vercel.app', 'http://localhost:5173'],
    credentials: true,
  })
);
```

### Database Connection Failed

**Check:**

- `DATABASE_URL` is set correctly
- Neon database is active
- Using pooled connection
- SSL mode is enabled

**Solution:**

```bash
# Test connection locally
cd server
DATABASE_URL=your_production_url pnpm dev
```

### Environment Variables Not Working

**Check:**

- Variables are set in platform dashboard
- Variables don't have quotes
- Restart deployment after changes

**Solution:**
Redeploy after setting variables:

```bash
vercel --prod  # Vercel
# or trigger redeploy in Railway dashboard
```

## 🎯 Performance Optimization

### Frontend

1. **Enable compression:**
   - Automatic in Vercel/Netlify
2. **Optimize images:**

   ```bash
   pnpm add -D vite-plugin-imagemin
   ```

3. **Code splitting:**
   - Already enabled in Vite

4. **Enable caching:**
   - Configure in `vercel.json`

### Backend

1. **Connection pooling:**
   - Already using Neon pooled connection

2. **Add caching:**

   ```bash
   pnpm add @hono/cache
   ```

3. **Rate limiting:**
   ```bash
   pnpm add hono-rate-limiter
   ```

## 📊 Cost Estimation

### Free Tier Limits

**Frontend (Vercel):**

- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Custom domains

**Backend (Railway):**

- ✅ $5 credit/month
- ⚠️ ~500 hours/month

**Database (Neon):**

- ✅ 512MB storage
- ✅ 3GB data transfer
- ✅ Pooled connections

**Total: FREE** for hobby projects!

### Scaling Costs

**Vercel Pro:** $20/month
**Railway:** Pay as you go (~$10-20/month)
**Neon Pro:** $19/month

## 🚀 Going Live Checklist

- [ ] Frontend deployed successfully
- [ ] Backend deployed successfully
- [ ] Database connected
- [ ] Environment variables set
- [ ] CORS configured correctly
- [ ] API endpoints tested
- [ ] Frontend loads properly
- [ ] Game mechanics work
- [ ] Custom domain added (optional)
- [ ] SSL certificate active
- [ ] Monitoring set up
- [ ] Documentation updated
- [ ] README has live demo link

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app/)
- [Neon Documentation](https://neon.tech/docs)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)
- [Hono Deployment](https://hono.dev/getting-started/basic)

---

**Ready to deploy?** Follow the steps above and you'll be live in minutes! 🎉

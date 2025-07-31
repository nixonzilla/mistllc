# ✅ MISTLLC Project Checklist

## 📁 Project Structure
- [ ] Move frontend files (`App.tsx`, `index.html`, etc.) into `frontend/` or `app/`
- [ ] Remove or `.gitignore` unused files:
  - [ ] `bfg-1.14.0.jar`
  - [ ] `git-sizer*.tar.gz`
  - [ ] `mistllc-backup/`, `mistllc~...`, `.git.bfg-report`
- [ ] Organize `docker/` with valid `Dockerfile` and `docker-compose.yml`

## ⚙️ Vite + React + TypeScript
- [ ] Confirm `vite.config.js` targets correct entry (`src/main.tsx`)
- [ ] Run and verify dev server: `npm run dev`
- [ ] Configure PostCSS if needed (`postcss.config.js`)
- [ ] Lint setup (`.hintrc`, `.eslintrc`, or similar)

## 🐳 Docker / Dev Container
- [ ] Ensure `.devcontainer/devcontainer.json` is configured
- [ ] Dockerfile exists and builds
- [ ] `docker-compose.yml` can run app and dependencies
- [ ] Add volumes/mounts for live dev if needed

## 🔐 Environment & Git Hygiene
- [ ] `.env` properly added to `.gitignore`
- [ ] Use `.env.example` to show required variables
- [ ] Clean up Git history (after BFG run, delete `.jar`, `.report`, etc.)
- [ ] Remove Git artifacts like `mistllc~...` and `.git.bfg-report`

## 🔄 GitHub Actions / CI
- [ ] Move `workflow.yml` into `.github/workflows/`
- [ ] Lint + test + build jobs set up
- [ ] Auto-deploy (e.g., to Cloudflare Pages, Render, or VPS)
- [ ] CodeQL scanning (optional but recommended)

## 🧪 Testing Setup
- [ ] Install and configure:
  - [ ] `Vitest` or `Jest`
  - [ ] `React Testing Library` if UI tests
- [ ] Write first basic test case

## 🌍 Deployment & Domains
- [ ] Add deployment scripts in `package.json`
- [ ] Validate `CNAME` is correct and connected to Cloudflare
- [ ] Setup production env variables

## 📚 Documentation & Collaboration
- [ ] `README.md` includes:
  - [ ] Project summary
  - [ ] Dev setup instructions
  - [ ] Contribution guide
- [ ] `CODE_OF_CONDUCT.md` and `CONTRIBUTING.md` reviewed
- [ ] Add screenshots or architecture diagram

## 🎯 Feature Modules (by folder)
| Folder         | Description                          | Status |
|----------------|--------------------------------------|--------|
| `audio/`       | Music/audio management               | [ ]    |
| `community/`   | Community spaces, feedback, forums   | [ ]    |
| `merch/`       | Shop, inventory, checkout features   | [ ]    |
| `codeql/`      | Static security analysis setup       | [ ]    |
| `app/`         | Main app logic (e.g., backend/api)   | [ ]    |
| `frontend/`    | React frontend app                   | [ ]    |

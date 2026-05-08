# STIR Trade Planner

Chart analysis + risk-equalized entry ladder for STIR futures (SR3, ZQ, I, L, SO3, SA3).

## Project structure

```
stir-planner/
├── api/
│   └── analyze.js        ← Vercel serverless function (API key proxy)
├── public/
│   └── index.html        ← Full frontend (single file)
├── vercel.json           ← Routing config
├── package.json
└── .gitignore
```

---

## Deploy to Vercel via GitHub

### 1. Create a GitHub repo

1. Go to [github.com/new](https://github.com/new)
2. Name it `stir-planner` (or anything you like)
3. Set to **Private**
4. **Do not** initialise with README (you'll push existing files)
5. Click **Create repository**

### 2. Push this project

Open a terminal in this folder and run:

```bash
git init
git add .
git commit -m "Initial commit — STIR Trade Planner"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/stir-planner.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### 3. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New → Project**
3. Select your `stir-planner` repo → click **Import**
4. Framework preset: leave as **Other** (no build step)
5. Click **Deploy** — it will work but AI calls will fail until you add the API key

### 4. Add your Anthropic API key

1. In Vercel, go to your project → **Settings → Environment Variables**
2. Add a new variable:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** your Anthropic API key (`sk-ant-...`)
   - **Environment:** Production (and Preview if you want)
3. Click **Save**
4. Go to **Deployments** → click the three dots on your latest deploy → **Redeploy**

Your app is now live at `https://stir-planner.vercel.app` (or whatever Vercel assigns).

---

## How it works

- The frontend (`public/index.html`) sends chart images + trade idea to `/api/analyze`
- The serverless function (`api/analyze.js`) injects the `ANTHROPIC_API_KEY` from Vercel env vars and forwards to Anthropic
- **The API key never touches the browser** — it lives only in Vercel's environment

---

## Future updates

To push changes:

```bash
git add .
git commit -m "describe your change"
git push
```

Vercel auto-deploys on every push to `main`.

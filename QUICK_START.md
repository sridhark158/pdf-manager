# Quick Start Guide - GitHub Pages Setup

## For First-Time Users

Follow these steps to host your PDF Manager on GitHub Pages:

### Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Sign in to your account
3. Click **New Repository**
4. Name it `pdf-manager`
5. Choose **Public** (required for free GitHub Pages)
6. Click **Create Repository**

### Step 2: Connect Your Local Project to GitHub

Open terminal/PowerShell in the pdf-manager folder:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: PDF Manager application"

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/pdf-manager.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username**

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment":
   - Source: **GitHub Actions** (should be pre-selected)
5. Wait a moment, refresh the page
6. You should see: "Your site is live at `https://YOUR_USERNAME.github.io/pdf-manager/`"

### Step 4: Deploy Updates

After making changes to your code:

```bash
git add .
git commit -m "Describe your changes"
git push origin main
```

GitHub Actions will automatically build and deploy! ✨

## Troubleshooting

### "GitHub Actions" not showing as an option
- Ensure your repository is public
- Try refreshing the GitHub Pages settings

### Build failing
- Check the Actions tab in your repository
- Click the failed workflow to see error details
- Ensure all files are committed

### Site shows 404
- Wait 5 minutes after first deployment
- Clear your browser cache
- Check that the URL includes `/pdf-manager/`

## Useful Links

- Your repository: `https://github.com/YOUR_USERNAME/pdf-manager`
- Your live site: `https://YOUR_USERNAME.github.io/pdf-manager/`
- GitHub Pages docs: `https://pages.github.com/`

## What's Happening Behind the Scenes?

When you push to GitHub:
1. GitHub Actions workflow starts automatically
2. Installs dependencies (`npm install`)
3. Builds the Angular app for production (`npm run build`)
4. Deploys the built files to GitHub Pages
5. Your site is updated within 1-2 minutes

---

**Need more help?** See [GITHUB_PAGES_GUIDE.md](./GITHUB_PAGES_GUIDE.md) for advanced options.

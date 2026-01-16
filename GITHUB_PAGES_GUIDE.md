# GitHub Pages Deployment Guide

## Prerequisites
- Git installed on your machine
- GitHub account
- Repository created on GitHub

## Step-by-Step Instructions

### 1. Initialize Git Repository (if not already done)
```bash
cd pdf-manager
git init
git add .
git commit -m "Initial commit: PDF Manager app"
```

### 2. Add GitHub Remote
Replace `YOUR_USERNAME` with your GitHub username and `your-repo-name` with your repository name:
```bash
git remote add origin https://github.com/YOUR_USERNAME/your-repo-name.git
git branch -M main
git push -u origin main
```

### 3. Configure GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
   - This will use the automated workflow

### 4. Automatic Deployment

The GitHub Actions workflow will automatically:
- Trigger on every push to the `main` branch
- Install dependencies
- Build the Angular app for production
- Deploy to GitHub Pages

Your site will be available at: `https://YOUR_USERNAME.github.io/your-repo-name/`

### 5. Manual Build & Deploy (Optional)

If you prefer manual deployment:

```bash
# Build for production
npm run build -- --configuration production

# Install angular-cli-ghpages (one time)
npm install -g angular-cli-ghpages

# Deploy
ngh --dir=dist/pdf-manager
```

## Important Notes

### Base Href
- The `baseHref` in `angular.json` is set to `/pdf-manager/`
- This assumes your repository is named `pdf-manager`
- If your repository has a different name, update `angular.json`:
  ```json
  "baseHref": "/your-repo-name/"
  ```

### Custom Domain (Optional)
If you want to use a custom domain:
1. Update the `cname` in `.github/workflows/deploy.yml`
2. Add DNS records pointing to GitHub Pages
3. Enable HTTPS in GitHub Pages settings

### Troubleshooting

**Site not loading after deployment:**
- Clear browser cache
- Check that `baseHref` matches your repository name
- Verify the workflow ran successfully in GitHub Actions tab

**Build fails in GitHub Actions:**
- Check the Actions log in GitHub
- Ensure all dependencies are in `package.json`
- Verify Node.js version in workflow (currently v18)

## First-Time Setup Checklist

- [ ] Repository created on GitHub
- [ ] Git initialized locally
- [ ] Remote added to GitHub
- [ ] Initial commit pushed to main branch
- [ ] GitHub Pages enabled in Settings
- [ ] baseHref updated to match repository name
- [ ] First deployment completed
- [ ] Site accessible at GitHub Pages URL

## Update Process

Once set up, deploying updates is simple:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

That's it! GitHub Actions will automatically build and deploy your changes.

## Resources

- [GitHub Pages Documentation](https://pages.github.com/)
- [Angular CLI Build Configuration](https://angular.io/cli/build)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

#!/usr/bin/env bash

# PDF Manager - GitHub Pages Deployment Script
# This script builds and deploys the Angular app to GitHub Pages

echo "PDF Manager - GitHub Pages Deployment"
echo "======================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "❌ Git is not initialized in this directory."
    echo "Please run: git init"
    exit 1
fi

# Check if remote is set
if ! git remote | grep -q origin; then
    echo "❌ Git remote 'origin' not found."
    echo "Please add your GitHub repository:"
    echo "  git remote add origin https://github.com/YOUR_USERNAME/your-repo-name.git"
    exit 1
fi

echo "📦 Building Angular app for production..."
npm run build -- --configuration production

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"
echo ""
echo "📤 Preparing to push to GitHub..."
echo ""
echo "Next steps:"
echo "1. Commit your changes:"
echo "   git add ."
echo "   git commit -m 'Deploy to GitHub Pages'"
echo ""
echo "2. Push to GitHub:"
echo "   git push origin main"
echo ""
echo "3. GitHub Actions will automatically build and deploy!"
echo ""
echo "Your site will be available at:"
REPO_NAME=$(git config --get remote.origin.url | sed 's/.*\///' | sed 's/.git$//')
GITHUB_USER=$(git config --get remote.origin.url | sed 's/.*github.com[:/]//' | sed 's/\/.*//')
echo "   https://${GITHUB_USER}.github.io/${REPO_NAME}/"
echo ""

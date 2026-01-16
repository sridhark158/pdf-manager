# PDF Manager - GitHub Pages Deployment Script (PowerShell)
# This script builds and deploys the Angular app to GitHub Pages

Write-Host "PDF Manager - GitHub Pages Deployment" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (!(Test-Path .\.git)) {
    Write-Host "❌ Git is not initialized in this directory." -ForegroundColor Red
    Write-Host "Please run: git init" -ForegroundColor Yellow
    exit 1
}

# Check if remote is set
$remotes = git remote
if ($remotes -notcontains "origin") {
    Write-Host "❌ Git remote 'origin' not found." -ForegroundColor Red
    Write-Host "Please add your GitHub repository:" -ForegroundColor Yellow
    Write-Host "  git remote add origin https://github.com/YOUR_USERNAME/your-repo-name.git" -ForegroundColor Yellow
    exit 1
}

Write-Host "📦 Building Angular app for production..." -ForegroundColor Cyan
npm run build -- --configuration production

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful!" -ForegroundColor Green
Write-Host ""
Write-Host "📤 Preparing to push to GitHub..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Commit your changes:" -ForegroundColor Yellow
Write-Host "   git add ." -ForegroundColor Gray
Write-Host "   git commit -m 'Deploy to GitHub Pages'" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Push to GitHub:" -ForegroundColor Yellow
Write-Host "   git push origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "3. GitHub Actions will automatically build and deploy!" -ForegroundColor Yellow
Write-Host ""

# Extract GitHub info
$remoteUrl = git config --get remote.origin.url
$repoName = ($remoteUrl -split '/')[-1] -replace '\.git$', ''
$githubUser = ($remoteUrl -split '/')[-2] -replace '^.*:', ''

Write-Host "Your site will be available at:" -ForegroundColor Cyan
Write-Host "   https://${githubUser}.github.io/${repoName}/" -ForegroundColor Green
Write-Host ""

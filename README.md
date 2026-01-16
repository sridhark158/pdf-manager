# PDF Manager - Merge, Reorder & Compress PDFs

A modern Angular application for managing PDF files with features to merge multiple PDFs, reorder them with drag-and-drop, convert images to PDF, and compress the results.

## Features

✨ **Core Features:**
- 📤 **Drag & Drop Upload** - Upload PDF files and images
- 🖼️ **Image Support** - Convert JPG, PNG, and other image formats to PDF
- 🔗 **Merge PDFs** - Combine multiple PDF files into a single document
- 🎯 **Drag & Drop Reordering** - Reorder PDF files before merging
- 📊 **Compression Options** - No compression, medium, or high compression
- 👁️ **Preview Functionality** - View merged PDFs in an embedded viewer
- 📄 **Page Count** - Display page count for each PDF
- ⬇️ **Download** - Save merged PDFs to your device

## Live Demo

**Hosted on GitHub Pages:** [PDF Manager](https://YOUR_USERNAME.github.io/pdf-manager/)

## Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/pdf-manager.git
   cd pdf-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   Navigate to `http://localhost:4200/`

### GitHub Pages Deployment

For detailed deployment instructions, see [GITHUB_PAGES_GUIDE.md](./GITHUB_PAGES_GUIDE.md)

**Quick Deploy:**
```bash
# Build for production
npm run build

# Push to GitHub
git add .
git commit -m "Your changes"
git push origin main
```

GitHub Actions will automatically build and deploy!

## Project Structure

```
pdf-manager/
├── src/
│   ├── app/
│   │   ├── services/
│   │   │   └── pdf.service.ts          # PDF processing service
│   │   ├── pipes/
│   │   │   └── safe.pipe.ts            # DomSanitizer pipe
│   │   ├── app.component.ts            # Main component
│   │   ├── app.component.html          # Template
│   │   ├── app.component.css           # Styles
│   │   └── app.config.ts               # App configuration
│   ├── assets/                         # Static assets
│   ├── styles.css                      # Global styles
│   └── index.html
├── .github/workflows/
│   └── deploy.yml                      # GitHub Actions workflow
├── angular.json
├── package.json
├── deploy.sh                           # Linux/Mac deployment script
├── deploy.ps1                          # Windows deployment script
└── README.md
```

## Development

### Available Commands

```bash
# Development server
npm start

# Build for production
npm run build

# Build for production (alternate)
npm run build -- --configuration production

# Run tests
npm test

# Lint code
npm lint
```

### Tech Stack

- **Framework:** Angular 17 (Standalone Components)
- **Drag & Drop:** Angular CDK (Component Dev Kit)
- **PDF Processing:** 
  - `pdf-lib` - For merging and creating PDFs
  - `pdfjs-dist` - For PDF rendering and thumbnails
- **Styling:** CSS3 with responsive design
- **Deployment:** GitHub Pages with GitHub Actions

## Usage

### Upload Files
1. Click "Browse Files" or drag & drop PDF/image files
2. Supported image formats: JPG, PNG, GIF, BMP, WebP
3. Images are automatically converted to PDF

### Reorder Files
- Click and drag PDF cards to reorder them
- The merged PDF will follow the displayed order

### Merge & Compress
1. Select compression level (No, Medium, or High)
2. Click "🔗 Merge PDFs"
3. Wait for completion
4. Download the merged PDF

### Preview & Download
- Click "👁️ Preview" to view the merged PDF
- Click "⬇️ Download Merged PDF" to save

## Deployment

### GitHub Pages (Recommended)

1. Create a GitHub repository
2. Push your code to the `main` branch
3. Enable GitHub Pages in repository settings
4. GitHub Actions will automatically deploy

See [GITHUB_PAGES_GUIDE.md](./GITHUB_PAGES_GUIDE.md) for detailed instructions.

### Other Hosting Options

- **Netlify:** Connect your GitHub repo for automatic deployment
- **Vercel:** Similar to Netlify, automatic deployments
- **AWS S3 + CloudFront:** For production-scale hosting
- **Firebase Hosting:** Google's hosting platform

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Performance

- Suitable for PDFs up to 50-100 MB depending on browser
- Image conversion is optimized for standard image sizes
- Compression options available for large file size reduction

## Troubleshooting

### Build Issues
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Angular cache: `ng cache clean`

### Deployment Issues
- Ensure `baseHref` in `angular.json` matches your repository name
- Check GitHub Actions logs for build errors
- Clear browser cache after deployment

## License

MIT License - Feel free to use this project for personal or commercial use.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Future Enhancements

- Page extraction and rotation
- PDF annotation tools
- OCR text extraction
- Batch processing
- Cloud storage integration

## Support

For issues or feature requests, please open an issue on GitHub.

---

**Happy PDF Managing! 🎉**

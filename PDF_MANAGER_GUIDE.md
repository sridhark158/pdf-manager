# PDF Manager - Angular Application

A modern Angular application for managing PDF files with features to merge multiple PDFs, reorder them with drag-and-drop, and preview the results.

## Features

✨ **Core Features:**
- 📤 **Drag & Drop Upload** - Drop PDF files directly or click to browse
- 🔗 **Merge PDFs** - Combine multiple PDF files into a single document
- 🎯 **Drag & Drop Reordering** - Reorder PDF files before merging
- 👁️ **Preview Functionality** - View merged PDFs in an embedded viewer
- 📊 **Thumbnails** - See preview thumbnails of each PDF
- 📄 **Page Count** - Display page count for each PDF
- ⬇️ **Download** - Save merged PDFs to your device

## Tech Stack

- **Framework:** Angular 17 (Standalone Components)
- **Drag & Drop:** Angular CDK (Component Dev Kit)
- **PDF Processing:** 
  - `pdf-lib` - For merging PDFs
  - `pdfjs-dist` - For PDF rendering and thumbnails
- **Styling:** CSS3 with responsive design
- **Package Manager:** npm

## Installation

1. **Prerequisites**
   - Node.js (v18+)
   - npm (v9+)

2. **Install Dependencies**
   ```bash
   cd pdf-manager
   npm install
   ```

3. **Copy PDF.js Worker**
   The application needs the PDF.js worker file:
   ```bash
   mkdir -p src/assets
   cp node_modules/pdfjs-dist/build/pdf.worker.min.js src/assets/
   ```

## Development

### Start Development Server
```bash
npm start
# or
ng serve
```

The application will be available at `http://localhost:4200`

### Build for Production
```bash
npm run build
# or
ng build
```

Output will be in the `dist/` directory.

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
├── angular.json
├── package.json
└── README.md
```

## Usage

### Upload PDFs
1. Click **"Browse Files"** button or drag & drop PDF files into the upload area
2. Select one or more PDF files from your computer
3. Files will be displayed as cards with thumbnails and page counts

### Reorder PDFs
- Click and drag the PDF cards to reorder them
- The merged PDF will combine files in the displayed order

### Merge PDFs
1. Ensure at least 2 PDFs are uploaded
2. Click **"🔗 Merge PDFs"** button
3. Wait for the merge process to complete
4. A success message will appear

### Preview & Download
- Click **"👁️ Preview"** to view the merged PDF in an embedded viewer
- Click **"⬇️ Download Merged PDF"** to save the file to your device

### Manage Files
- Click the **×** button on any card to remove that PDF
- Click **"Clear All"** to remove all uploaded files

## How It Works

### PDF Merging
The application uses `pdf-lib` to:
1. Load each PDF file as an array buffer
2. Create a new PDF document
3. Copy all pages from source PDFs
4. Add them to the merged document in order
5. Generate a blob for download

### Thumbnail Generation
Using `pdfjs-dist`:
1. Renders the first page of each PDF
2. Converts to a canvas
3. Generates a data URL for display

### Drag & Drop
Powered by Angular CDK:
- `cdkDropList` directive for the PDF container
- `cdkDrag` directive for individual cards
- Automatic reordering via `moveItemInArray`

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Performance Considerations

- Large PDF files may take longer to process
- Browser memory limits may affect merging of very large files (100+ MB)
- Thumbnails are generated for the first page only
- Consider breaking down very large merge operations

## Troubleshooting

### "PDF Worker not found"
Ensure you've copied the PDF.js worker file:
```bash
cp node_modules/pdfjs-dist/build/pdf.worker.min.js src/assets/
```

### Merge fails with large files
Browser memory limitations may prevent merging very large PDFs. Try:
- Breaking the merge into smaller batches
- Using a different device with more RAM
- Compressing PDFs first

### Drag & drop not working
Clear your browser cache and restart the development server:
```bash
ng serve --poll
```

## Dependencies

### Core
- `@angular/core` - Angular framework
- `@angular/common` - Common utilities
- `@angular/platform-browser` - Browser APIs
- `@angular/cdk` - Component Dev Kit for drag-drop

### PDF Processing
- `pdf-lib` - Create and modify PDFs
- `pdfjs-dist` - Render PDFs and extract pages

## License

This project is open source and available under the MIT License.

## Future Enhancements

Potential features for future versions:
- PDF compression
- Page extraction/rotation
- Batch operations
- PDF annotation tools
- Cloud storage integration
- OCR text extraction

## Support

For issues or feature requests, please create an issue in the repository.

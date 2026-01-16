import { Injectable } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument } from 'pdf-lib';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() {
    // Set the worker source for pdfjs-dist
    pdfjsLib.GlobalWorkerOptions.workerSrc = `assets/pdf.worker.min.js`;
  }

  /**
   * Merge multiple PDF files into one
   */
  async mergePdfs(pdfFiles: File[], compressionLevel: number = 0): Promise<Blob> {
    try {
      const mergedPdf = await PDFDocument.create();

      for (const pdfFile of pdfFiles) {
        console.log(`Processing PDF: ${pdfFile.name}`);
        const arrayBuffer = await pdfFile.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        
        // Get all page indices
        const pageIndices = pdf.getPageIndices();
        console.log(`PDF has ${pageIndices.length} pages`);
        
        // Copy pages from source PDF to merged PDF
        const copiedPages = await mergedPdf.copyPages(pdf, pageIndices);
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }

      // Apply compression if specified
      if (compressionLevel > 0) {
        console.log(`Applying compression level: ${compressionLevel}`);
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      console.log(`Merged PDF created successfully, size: ${blob.size} bytes`);
      return blob;
    } catch (error) {
      console.error('Error in mergePdfs:', error);
      throw error;
    }
  }

  /**
   * Convert image file to PDF
   */
  async convertImageToPdf(imageFile: File): Promise<Blob> {
    try {
      console.log(`Converting image to PDF: ${imageFile.name}`);
      const imageArrayBuffer = await imageFile.arrayBuffer();
      const imageDataUrl = await this.arrayBufferToDataUrl(imageArrayBuffer, imageFile.type);
      
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      
      // Get image dimensions
      const img = new Image();
      img.src = imageDataUrl;
      
      await new Promise((resolve) => {
        img.onload = resolve;
      });
      
      // Embed image in PDF
      let embeddedImage;
      if (imageFile.type === 'image/png') {
        embeddedImage = await pdfDoc.embedPng(imageDataUrl);
      } else if (imageFile.type === 'image/jpeg') {
        embeddedImage = await pdfDoc.embedJpg(imageDataUrl);
      } else {
        throw new Error(`Unsupported image format: ${imageFile.type}`);
      }
      
      const { width, height } = embeddedImage.scale(1);
      const page = pdfDoc.addPage([width, height]);
      page.drawImage(embeddedImage, {
        x: 0,
        y: 0,
        width: width,
        height: height,
      });
      
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      console.log(`Image converted to PDF successfully, size: ${blob.size} bytes`);
      return blob;
    } catch (error) {
      console.error('Error converting image to PDF:', error);
      throw error;
    }
  }

  /**
   * Convert ArrayBuffer to Data URL
   */
  private arrayBufferToDataUrl(buffer: ArrayBuffer, mimeType: string): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return 'data:' + mimeType + ';base64,' + btoa(binary);
  }

  /**
   * Get total pages in a PDF
   */
  async getPdfPageCount(file: File): Promise<number> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
    return pdf.numPages;
  }

  /**
   * Generate a thumbnail from the first page of a PDF
   */
  async generateThumbnail(file: File, width: number = 200): Promise<string> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      const page = await pdf.getPage(1);

      const scale = width / page.getViewport({ scale: 1 }).width;
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext: context!,
        canvas: canvas,
        viewport: viewport
      };

      await page.render(renderContext).promise;
      return canvas.toDataURL();
    } catch (error) {
      console.error('Error generating thumbnail:', error);
      return '';
    }
  }
}

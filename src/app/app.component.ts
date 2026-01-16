import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { PdfService } from './services/pdf.service';
import { FormsModule } from '@angular/forms';
import { SafePipe } from './pipes/safe.pipe';

interface PdfItem {
  id: string;
  file: File;
  name: string;
  thumbnail?: string;
  pageCount?: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DragDropModule, FormsModule, SafePipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  pdfItems: PdfItem[] = [];
  isLoading = false;
  isMerging = false;
  dragOver = false;
  mergedPdfUrl: string | null = null;
  showPreview = false;
  compressionLevel: number = 0; // 0 = no compression, 1 = medium, 2 = high

  constructor(private pdfService: PdfService) {}

  ngOnInit(): void {
    console.log('PDF Manager initialized');
  }

  /**
   * Handle file input change
   */
  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    this.processFiles(files);
  }

  /**
   * Handle drag and drop
   */
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver = false;
    const files = event.dataTransfer?.files;
    if (files) {
      this.processFiles(files);
    }
  }

  /**
   * Process dropped or selected files
   */
  async processFiles(files: FileList): Promise<void> {
    this.isLoading = true;

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (!file) continue;

      let fileToProcess = file;
      let displayName = file.name;
      const isImage = file.type.startsWith('image/');

      try {
        if (isImage) {
          // Convert image to PDF
          console.log(`Converting image: ${file.name}`);
          const pdfBlob = await this.pdfService.convertImageToPdf(file);
          fileToProcess = new File([pdfBlob], file.name.replace(/\.[^/.]+$/, '.pdf'), { type: 'application/pdf' });
          displayName = file.name.replace(/\.[^/.]+$/, '.pdf') + ' (from image)';
        } else if (file.type !== 'application/pdf') {
          // Skip unsupported file types
          console.warn(`Skipping unsupported file type: ${file.type}`);
          continue;
        }

        const pdfItem: PdfItem = {
          id: `${Date.now()}-${i}`,
          file: fileToProcess,
          name: displayName
        };

        // Generate thumbnail and get page count
        try {
          pdfItem.thumbnail = await this.pdfService.generateThumbnail(fileToProcess);
          pdfItem.pageCount = await this.pdfService.getPdfPageCount(fileToProcess);
        } catch (error) {
          console.error('Error processing file:', error);
        }

        this.pdfItems.push(pdfItem);
      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
        alert(`Error processing ${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    this.isLoading = false;
  }

  /**
   * Handle drag and drop reordering
   */
  drop(event: CdkDragDrop<PdfItem[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  /**
   * Remove a PDF from the list
   */
  removePdf(id: string): void {
    this.pdfItems = this.pdfItems.filter(item => item.id !== id);
    this.mergedPdfUrl = null;
  }

  /**
   * Remove all PDFs
   */
  clearAll(): void {
    this.pdfItems = [];
    this.mergedPdfUrl = null;
  }

  /**
   * Merge selected PDFs
   */
  async mergePdfs(): Promise<void> {
    if (this.pdfItems.length < 2) {
      alert('Please upload at least 2 PDF files to merge');
      return;
    }

    this.isMerging = true;
    console.log(`Starting merge of ${this.pdfItems.length} PDFs with compression level: ${this.compressionLevel}...`);

    try {
      const files = this.pdfItems.map(item => item.file);
      console.log('Files to merge:', files.map(f => f.name));
      
      const mergedBlob = await this.pdfService.mergePdfs(files, this.compressionLevel);
      console.log(`Merge successful. Blob size: ${mergedBlob.size} bytes`);
      
      // Create a download URL
      const url = window.URL.createObjectURL(mergedBlob);
      this.mergedPdfUrl = url;
      console.log('Merged PDF URL created:', url);
      
      const compressionText = this.compressionLevel > 0 ? ` (Compression: ${this.compressionLevel === 1 ? 'Medium' : 'High'})` : '';
      alert(`✓ PDFs merged successfully!${compressionText} The merged PDF is ready for download.`);
    } catch (error) {
      console.error('Error merging PDFs:', error);
      alert(`✗ Error merging PDFs: ${error instanceof Error ? error.message : 'Unknown error'}. Please check the browser console for details.`);
    } finally {
      this.isMerging = false;
    }
  }

  /**
   * Download the merged PDF
   */
  downloadMergedPdf(): void {
    if (!this.mergedPdfUrl) {
      console.error('No merged PDF URL available');
      alert('No merged PDF available. Please merge PDFs first.');
      return;
    }

    try {
      const link = document.createElement('a');
      link.href = this.mergedPdfUrl;
      link.download = `merged-document-${new Date().getTime()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log('PDF download triggered successfully');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Error downloading PDF. Please try again.');
    }
  }

  /**
   * Preview merged PDF
   */
  togglePreview(): void {
    this.showPreview = !this.showPreview;
  }

  /**
   * Trigger file input
   */
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }
}

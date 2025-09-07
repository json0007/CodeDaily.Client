// code-block.component.ts
import { Component, Input, ElementRef, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { createHighlighter, Highlighter, type BundledLanguage, type BundledTheme } from 'shiki';

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.css']
})
export class CodeBlockComponent implements AfterViewInit {
  @Input() code = '';
  @Input() language?: string;
  @ViewChild('codeElement') codeElement!: ElementRef;

  detectedLanguage = '';
  copyButtonText = 'copy';
  private highlighter?: Highlighter;

  constructor(private cdr: ChangeDetectorRef) {
    this.initializeHighlighter();
  }

  async ngAfterViewInit() {
    await this.highlightCode();
  }

  private async initializeHighlighter() {
    this.highlighter = await createHighlighter({
      themes: ['slack-dark'],
      langs: ['typescript', 'javascript', 'csharp', 'json', 'css', 'sql', 'bash', 'html', 'markdown']
    });
  }

  private async highlightCode() {  
    const codeElement = this.codeElement?.nativeElement;
    
    if (!this.highlighter) {
      await this.initializeHighlighter();
    }
    
    const lang = this.language || this.detectLanguage(this.code);
    this.detectedLanguage = lang;
    
    try {
      const html = this.highlighter!.codeToHtml(this.code, {
        lang: lang as BundledLanguage,
        theme: 'slack-dark' as BundledTheme
      });
      
      // Extract the complete pre element to preserve Shiki's styling
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const preElement = doc.querySelector('pre');
      
      if (preElement && preElement.style.backgroundColor) {
        // Apply Shiki's background color to our container
        const container = codeElement.closest('.code-container') as HTMLElement;
        if (container) {
          container.style.backgroundColor = preElement.style.backgroundColor;
        }
      }
      
      const codeContent = doc.querySelector('code');
      if (codeContent) {
        codeElement.innerHTML = codeContent.innerHTML;
      } else {
        codeElement.textContent = this.code;
      }
    } catch (error) {
      console.warn('Failed to highlight code with Shiki:', error);
      codeElement.textContent = this.code;
      this.detectedLanguage = 'text';
    }
  }

  private detectLanguage(code: string): string {
    // Simple language detection based on common patterns
    if (code.includes('class ') && code.includes('public ')) return 'csharp';
    if (code.includes('function ') || code.includes('const ') || code.includes('let ')) return 'javascript';
    if (code.includes('interface ') && code.includes(': ')) return 'typescript';
    if (code.includes('SELECT ') || code.includes('FROM ')) return 'sql';
    if (code.includes('{') && code.includes('}') && code.includes(':')) return 'json';
    return 'text';
  }
  async copyCode() {
    console.log('Copying code to clipboard:', this.code);
    try {
      await navigator.clipboard.writeText(this.code);
      this.copyButtonText = 'copied!';
      this.cdr.detectChanges();
      
      setTimeout(() => {
        this.copyButtonText = 'copy';
        this.cdr.detectChanges();
      }, 1500);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  }
}
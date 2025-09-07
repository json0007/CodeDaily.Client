// markdown.directive.ts
import { 
  Directive, 
  Input, 
  ElementRef, 
  createComponent,
  EnvironmentInjector,
  AfterViewInit
} from '@angular/core';
import { marked, Renderer } from 'marked';
import { CodeBlockComponent } from '../components/code-block/code-block.component';

@Directive({
  selector: '[appMarkdown]',
  standalone: true
})
export class MarkdownDirective implements AfterViewInit {
  @Input('appMarkdown') markdown = '';

  constructor(
    private el: ElementRef,
    private environmentInjector: EnvironmentInjector
  ) {}

  ngAfterViewInit() {
    const renderer = new Renderer();
    const codeBlocks: Array<{id: string, code: string, language?: string}> = [];
    
    // Override the code renderer to create placeholders
    renderer.code = ({ text, lang }: { text: string; lang?: string }) => {
      const id = 'code-' + Math.random().toString(36).substr(2, 9);
      codeBlocks.push({ id, code: text, language: lang });
      return `<div class="code-placeholder" data-id="${id}"></div>`;
    };

    // Render markdown to HTML
    const html = marked(this.markdown, { renderer });
    this.el.nativeElement.innerHTML = html;

    // Replace placeholders with actual components
    codeBlocks.forEach(({ id, code, language }) => {
      const placeholder = this.el.nativeElement.querySelector(`[data-id="${id}"]`);
      if (placeholder) {
        const componentRef = createComponent(CodeBlockComponent, {
          environmentInjector: this.environmentInjector,
          hostElement: placeholder
        });

        componentRef.setInput('code', code);
        if (language) 
            componentRef.setInput('language', language);
        
        // Trigger change detection
        componentRef.changeDetectorRef.detectChanges();
        
        placeholder.replaceWith(componentRef.location.nativeElement);
      }
    });
  }
}
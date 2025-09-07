import { Component, Input, Output, EventEmitter, TemplateRef, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() customClass?: string;
  
  @ContentChild('cardHeader') cardHeader?: TemplateRef<any>;
  @ContentChild('cardBody') cardBody?: TemplateRef<any>;
  @ContentChild('cardFooter') cardFooter?: TemplateRef<any>;

  @Output() actionClick = new EventEmitter<any>();
}

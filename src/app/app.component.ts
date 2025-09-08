import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { BreadcrumbComponent } from './shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, BreadcrumbComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  protected readonly title = signal('CodeDaily.Client');
}

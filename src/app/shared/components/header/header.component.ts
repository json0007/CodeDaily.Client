import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeToggle } from '../../theme-toggle/theme-toggle';

@Component({
  selector: 'app-header',
  imports: [RouterModule, ThemeToggle],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}

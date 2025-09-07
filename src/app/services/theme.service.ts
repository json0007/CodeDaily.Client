import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'selectedTheme';
  private themeSubject = new BehaviorSubject<Theme>(this.getStoredTheme());
  
  public theme$ = this.themeSubject.asObservable();

  constructor() {
    // Apply the stored theme on service initialization
    this.applyTheme(this.getStoredTheme());
  }

  getCurrentTheme(): Theme {
    return this.themeSubject.value;
  }

  toggleTheme(): void {
    const newTheme: Theme = this.getCurrentTheme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    this.storeTheme(theme);
    this.applyTheme(theme);
  }

  private getStoredTheme(): Theme {
    const stored = localStorage.getItem(this.THEME_KEY);
    if (stored && (stored === 'light' || stored === 'dark')) {
      return stored as Theme;
    }
    
    // Default to system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  private storeTheme(theme: Theme): void {
    localStorage.setItem(this.THEME_KEY, theme);
  }

  private applyTheme(theme: Theme): void {
    const html = document.documentElement;
    
    // Apply theme - explicitly set both light and dark
    html.setAttribute('data-theme', theme);
  }
}
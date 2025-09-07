import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface BreadcrumbItem {
  label: string;
  url: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbsSubject = new BehaviorSubject<BreadcrumbItem[]>([]);
  public breadcrumbs$: Observable<BreadcrumbItem[]> = this.breadcrumbsSubject.asObservable();

  private routeLabels: { [key: string]: string } = {
    '': 'Home',
    'newsletters': 'Newsletters',
    'templates': 'Templates',
    'about': 'About'
  };

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateBreadcrumbs();
      });
  }

  private updateBreadcrumbs(): void {
    const url = this.router.url;
    const urlSegments = url.split('/').filter(segment => segment);
    
    const breadcrumbs: BreadcrumbItem[] = [];
    
    // Always add Home
    breadcrumbs.push({
      label: 'Home',
      url: '/',
      active: urlSegments.length === 0
    });

    // Add other segments
    let currentUrl = '';
    urlSegments.forEach((segment, index) => {
      currentUrl += '/' + segment;
      const isLast = index === urlSegments.length - 1;
      
      breadcrumbs.push({
        label: this.routeLabels[segment] || this.capitalize(segment),
        url: currentUrl,
        active: isLast
      });
    });

    this.breadcrumbsSubject.next(breadcrumbs);
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
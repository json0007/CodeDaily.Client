import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TemplatesComponent } from './pages/templates/templates.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'blogs', 
    loadChildren: () => import('./pages/blogs/blogs.routes').then(m => m.blogsRoutes)
  },
  { path: 'templates', component: TemplatesComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' }
];

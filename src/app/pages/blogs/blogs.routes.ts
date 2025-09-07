import { Routes } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogComponent } from './blog/blog.component';

export const blogsRoutes: Routes = [
  {
    path: '',
    component: BlogListComponent
  },
  {
    path: ':slug',
    component: BlogComponent
  }
];
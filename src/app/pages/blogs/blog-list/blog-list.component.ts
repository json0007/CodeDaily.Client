import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogListItem } from '../../../shared/models';
import { ApiService } from '../../../services/api.service';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { CardComponent } from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-blog-list',
  imports: [CommonModule, RouterModule, LoadingComponent, CardComponent],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent implements OnInit {
  blogs: BlogListItem[] = [];
  error: string | null = null;
  isLoading: boolean = true;

  constructor(private apiService: ApiService) { }

  async ngOnInit() {
    try {
      this.isLoading = true;
      this.blogs = await this.apiService.GetAll<BlogListItem>('api/blogs');
    } catch (error: any) {
      console.error('Error loading blogs:', error);
      this.error = `Failed to load blogs. Status: ${error.status || 'Unknown'}, Message: ${error.message || 'Network error'}`;
    } finally {
      this.isLoading = false;
    }
  }

  // Handle card click action
  onBlogCardClick(data: any) {
    console.log('Blog card clicked:', data);
    // Additional handling if needed
  }
}

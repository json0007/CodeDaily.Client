import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Blog } from '../../../shared/models';
import { ApiService } from '../../../services/api.service';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { MarkdownDirective } from '../../../shared/directives/markdown.directive';

@Component({
  selector: 'app-blog',
  imports: [CommonModule, RouterModule, LoadingComponent, MarkdownDirective],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  slug: string | null = null;
  blog: Blog | null = null;
  error: string | null = null;
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  async ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug');
    if (this.slug) {
      try {
        this.isLoading = true;
        this.blog = await this.apiService.Get<Blog>('api/blogs', this.slug);
      } catch (error: any) {
        console.error('Error loading blog:', error);
        this.error = `Failed to load blog. Status: ${error.status || 'Unknown'}, Message: ${error.message || 'Network error'}`;
      } finally {
        this.isLoading = false;
      }
    }
  }
}
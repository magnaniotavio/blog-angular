import { Component } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  posts: Post[] = []; // Initialize with an empty array
  searchQuery: string = '';
  searchResults: Post[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  searchPosts(searchQuery: string) {
    const foundPosts = this.posts.filter(post => post.title.includes(searchQuery) || post.content.includes(searchQuery));
    this.searchResults = foundPosts
  }
}

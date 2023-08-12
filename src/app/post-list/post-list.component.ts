import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  categories: string[] = [];
  searchQuery: string = '';
  searchResults: Post[] = [];
  foundPosts: Post[] = [];

  foundCategorizedPosts: Post[] = [];


  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
      this.categories = Array.from(new Set(this.posts.flatMap(post => post.category)));
    });
  }

  searchPosts(searchQuery: string) {
    const foundPosts = this.posts.filter(post => post.title.includes(searchQuery) || post.content.includes(searchQuery));
    this.foundCategorizedPosts = []
    this.foundPosts = foundPosts
  }

  filterCategory(searchedCategory: string) {
    const foundCategorizedPosts = this.posts.filter(post => post.category === searchedCategory);
    this.foundPosts = []
    this.foundCategorizedPosts = foundCategorizedPosts
  }
}


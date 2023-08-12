import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = []; // Initialize with an empty array
  categories: string[] = []; // Explicitly define the type as string[]

  // IN THE CATEOGRY NAVBAR, EACH CLICK YOU DO WILL TAKE YOU CALL SEARCHCATEGORY()

  updatedPostTitle: string = '';
  updatedPostContent: string = '';
  updatedPostCategory: string = '';

  editStates: boolean = false;
  selectedPost: number = 0;

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

  toggleEdit(postId: number): void {
    this.selectedPost = postId
    const selectedPost = this.posts.find(post => post.id === postId);
    if (selectedPost) {
      this.updatedPostTitle = selectedPost.title
      this.updatedPostCategory = selectedPost.category
      this.updatedPostContent = selectedPost.content
      if (postId === postId) {
        this.editStates = !this.editStates
      }
      else { this.editStates = !this.editStates }
    }
  }

  deletePost(postId: number): void {
    let i;
    for (i of this.posts) if (
      i.id === postId
    ) {
      this.postService.deletePost(postId).subscribe()
    }
  }

  editPost(postId: number): void {
    let i;
    for (i of this.posts) if (
      i.id === postId
    ) {
      const updatedPost: Post = {
        id: postId, // Replace with the appropriate logic to generate a unique ID
        title: this.updatedPostTitle, // Use the entered title
        content: this.updatedPostContent, // Use the entered content
        category: this.updatedPostCategory, // Use the entered content
      };
      this.postService.updatePost(updatedPost).subscribe()
    }
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


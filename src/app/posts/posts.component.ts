import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {

  post: Post | undefined; // Initialize as undefined
  postId: number = 0; // Or any default value you want
  postTitle: string = '';
  postContent: string = '';
  postCategory: string = '';
  updatedPostTitle: string = '';
  updatedPostContent: string = '';
  updatedPostCategory: string = '';
  editStates: boolean = false;
  selectedPost: number = 0;

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const postId = +params['postId'];
      this.postService.getPost(postId).subscribe(
        post => {
          if (post) {
            this.post = post
            this.postId = post.id; // Assign the retrieved post directly
            this.postTitle = post.title; // Assign the retrieved post directly
            this.postContent = post.content; // Assign the retrieved post directly
            this.postCategory = post.category; // Assign the retrieved post directly

          } else {
            console.error(`Post with ID ${postId} not found.`);
          }
        },
        error => {
          console.error('Error fetching post:', error);
        }
      );
    });
  }

  toggleEdit(postId: number): void {
    this.selectedPost = postId

    if (postId === postId) { this.editStates = !this.editStates }
    else { this.editStates = !this.editStates }
  }

  deletePost(postId: number): void {

    this.postService.deletePost(postId).subscribe()

  }

  editPost(postId: number): void {
    const updatedPost: Post = {
      id: postId, // Replace with the appropriate logic to generate a unique ID
      title: this.updatedPostTitle, // Use the entered title
      content: this.updatedPostContent, // Use the entered content
      category: this.updatedPostCategory
    };
    this.postService.updatePost(updatedPost).subscribe()

  }

}
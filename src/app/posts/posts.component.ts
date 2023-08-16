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

  post: Post;
  postId: number = 0;
  postTitle: string = '';
  postContent: string = '';
  postCategory: string = '';

  constructor(private postService: PostService, private route: ActivatedRoute) {
    this.post = {} as Post; // Initialize the property in the constructor

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const postId = +params['postId'];
      this.postService.getPost(postId).subscribe(
        post => {
          if (post) {
            this.post = post
            this.postId = post.id;
            this.postTitle = post.title;
            this.postContent = post.content;
            this.postCategory = post.category;

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

}
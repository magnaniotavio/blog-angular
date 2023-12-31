import { Component } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent {
  posts: Post[] = [];
  @Input() post: Post

  updatedPostTitle: string = '';
  updatedPostContent: string = '';
  updatedPostCategory: string = '';

  editStates: boolean = false;
  selectedPost: number = 0;

  constructor(private postService: PostService) {
    this.post = {} as Post; // Initialize the property in the constructor

  }

  allPosts: number = 0;
  pagination: number = 1;

  ngOnInit(): void {
    this.postService.getPosts(this.pagination).subscribe(posts => {
      this.posts = posts;
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
      window.location.reload();
    }
  }

  editPost(postId: number): void {
    let i;
    for (i of this.posts) if (
      i.id === postId
    ) {
      const updatedPost: Post = {
        id: postId,
        title: this.updatedPostTitle,
        content: this.updatedPostContent,
        category: this.updatedPostCategory,
      };
      this.postService.updatePost(updatedPost).subscribe()
      window.location.reload();
    }
  }


}

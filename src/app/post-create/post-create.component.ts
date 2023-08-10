import { Component } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {

  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  newPostTitle: string = ''; // Property to store the new post title
  newPostContent: string = ''; // Property to store the new post content

  constructor(private postService: PostService) {

  } // Add the postService as a property of the class

  addNewPost(): void {
    const newPost: Post = {
      id: this.getRandomNumber(1, 1000), // Replace with the appropriate logic to generate a unique ID
      title: this.newPostTitle, // Use the entered title
      content: this.newPostContent, // Use the entered content
    };

    this.postService.addPost(newPost).subscribe(response => {
      console.log(response); // This will log the response from the server
    });
  }



}



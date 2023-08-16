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
  allPosts: number = 0;
  pagination: number = 1;
  categories: string[] = [];
  searchQuery: string = '';
  searchResults: Post[] = [];

  postsToShow: Post[] = [];

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.fetchPosts();
    console.log(this.fetchPosts());
  }

  fetchPosts() {
    this.postService.getPosts(this.pagination).subscribe(posts => {
      this.allPosts = posts.length;
      this.posts = posts;
      this.postsToShow = posts;
      this.categories = Array.from(new Set(this.posts.flatMap(post => post.category)));
    });
  }

  renderPage(event: number) {
    this.pagination = event;
  }

  searchPosts(searchQuery: string) {
    this.pagination = 1; // Reinitialize pagination number
    const fetchedPosts = this.posts.filter(post => post.title.includes(searchQuery) || post.content.includes(searchQuery));
    this.allPosts = fetchedPosts.length;
    this.postsToShow = fetchedPosts
  }

  filterCategory(searchedCategory: string) {
    this.pagination = 1; // Reinitialize pagination number
    const foundCategorizedPosts = this.posts.filter(post => post.category === searchedCategory);
    this.allPosts = foundCategorizedPosts.length;
    this.postsToShow = foundCategorizedPosts
  }

  truncateText(text: string, numWords: number): string {
    const words = text.split(' ');
    if (words.length <= numWords) {
      return text;
    }
    const truncatedWords = words.slice(0, numWords);
    return truncatedWords.join(' ') + ' ...';
  }

}


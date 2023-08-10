import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'http://localhost:3000/posts'; // Change this URL to match your backend API

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl);
  }

  getPost(id: number): Observable<Post | undefined> {
    return this.http.get<Post>(`${this.baseUrl}/${id}`);
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.baseUrl, post);
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/${post.id}`, post);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
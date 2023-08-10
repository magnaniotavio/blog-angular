import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { HomeComponent } from './home/home.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostEditComponent } from './post-edit/post-edit.component';

import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component'; // Import the FormsModule

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    HomeComponent,
    PostListComponent,
    PostCreateComponent,
    PostEditComponent,
    SearchComponent,
    SearchResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    FormsModule, // Add FormsModule here
    HttpClientModule, // Here for API

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

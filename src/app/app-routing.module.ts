import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { HomeComponent } from './home/home.component';
import { PostCreateComponent } from './post-create/post-create.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'create', component: PostCreateComponent },
  { path: 'post/:postId', component: PostsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

import { AlertService } from './../shared/services/alert.service';
import { PostService } from './../../shared/posts.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from 'src/app/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  postSubscription: Subscription;
  deletePostSubscription: Subscription;
  searchStr = '';

  constructor(
    private postService: PostService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.postSubscription = this.postService.getAll()
      .subscribe(posts => {
        this.posts = posts;
      });
  }

  remove(id: string) {
    this.deletePostSubscription = this.postService.remove(id)
      .subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== id);
        this.alertService.warning('Пост удалён');
      });
  }



  ngOnDestroy() {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }

    if (this.deletePostSubscription) {
      this.deletePostSubscription.unsubscribe();
    }
  }

}

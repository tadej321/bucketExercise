import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BucketModel} from './bucket-list/bucket/bucket.model';
import {Router} from '@angular/router';
import {AuthService} from './authentication/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'bucketExercise';
  label = 'Bucket list';
  view = 'bucketList';

  viewedBucket: BucketModel;
  public isAuth = false;
  private authSub: Subscription;

  constructor(private router: Router, private authService: AuthService) {
    this.router = router;
  }


  ngOnInit(): void {
    this.authService.autoAuthUser();
    this.authSub = this.authService.getAuthStatusListener().subscribe(res => {
      this.isAuth = res;
    });
  }

  /**
   * Calls the logout API to logout the user.
   */
  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}

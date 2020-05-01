import {Component, Input, OnInit} from '@angular/core';
import {BucketModel} from './bucket-list/bucket/bucket.model';
import {Router} from '@angular/router';
import {AuthService} from './authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'bucketExercise';
  label = 'Bucket list';
  view = 'bucketList';

  viewedBucket: BucketModel;

  constructor(private router: Router, private authService: AuthService) {
    this.router = router;
  }


  ngOnInit(): void {
    this.authService.autoAuthUser();
  }

  /**
   * Calls the logout API to logout the user.
   */
  onLogout() {
    this.authService.logout();
  }
}

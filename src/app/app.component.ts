import {Component, Input} from '@angular/core';
import {BucketModel} from './bucket-list/bucket/bucket.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bucketExercise';
  label = 'Bucket list';
  view = 'bucketList';

  viewedBucket: BucketModel;

  constructor(private router: Router) {
    this.router = router;
  }


  viewBucket(viewedBucket: BucketModel): void {
    this.viewedBucket = viewedBucket;
    this.view = 'bucket';
  }



}

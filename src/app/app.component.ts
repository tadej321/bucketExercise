import {Component, Input} from '@angular/core';
import {BucketModel} from './bucket-list/bucket/bucket.model';

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

  viewBucket(viewedBucket: BucketModel) {
    this.viewedBucket = viewedBucket;
    this.view = 'bucket';
  }



}

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BucketModel} from './bucket/bucket.model';
import {BucketService} from './bucket.service';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.css']
})
export class BucketListComponent implements OnInit {
  public buckets: BucketModel[] = [];

  private bucketSub: Subscription;
  private openCreateBucket = false;

  @Output() viewedBucket = new EventEmitter<BucketModel>();

  constructor(public bucketService: BucketService) {
  }

  ngOnInit() {
    this.bucketSub = this.bucketService.getBucketUpdatedListener()
      .subscribe(bucketData => {
        this.buckets = bucketData.buckets;
      });
    this.bucketService.getBuckets();
  }


  onCreateNewBucket() {
    this.openCreateBucket = !this.openCreateBucket;
  }

  onViewBucket(bucket: BucketModel) {
    this.viewedBucket.emit(bucket);
  }
}

import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {BucketModel} from './bucket/bucket.model';
import {BucketService} from './bucket.service';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.css']
})
export class BucketListComponent implements OnInit, OnDestroy {
  public buckets: BucketModel[] = [];

  private bucketSub: Subscription;
  private openCreateBucket = false;

  @Output() viewedBucket = new EventEmitter<BucketModel>();

  constructor(public bucketService: BucketService, private router: Router) {
    this.router = router;
  }

  ngOnInit(): void {
    this.bucketSub = this.bucketService.getBucketUpdatedListener()
      .subscribe(bucketData => {
        this.buckets = bucketData.buckets;
      });
    this.bucketService.getBuckets();
  }


  onCreateNewBucket(): void {
    this.openCreateBucket = !this.openCreateBucket;
  }

  onViewBucket(bucket: BucketModel): void {
    this.viewedBucket.emit(bucket);
  }

  ngOnDestroy(): void {
    this.bucketSub.unsubscribe();
  }
}

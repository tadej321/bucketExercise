import { Component, OnInit } from '@angular/core';
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
  public buckets: BucketModel[] = [
    {name: 'bucket 1', location: 'Ljubljana', content: {}}, {name: 'bucket 2', location: 'Kranj', content: {}}];

  private bucketSub: Subscription;
  constructor(public bucketService: BucketService) { }

  ngOnInit() {
    this.bucketService.getBuckets();

    this.bucketSub = this.bucketService.getBucketUpdatedListener()
      .subscribe(bucketData => {
        this.buckets = bucketData.buckets;
      });
  }

}

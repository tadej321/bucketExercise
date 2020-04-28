import {Component, Input, OnInit} from '@angular/core';
import {BucketModel} from '../bucket.model';
import {ContentModel} from '../bucket-content/content.model';
import {BucketService} from '../../bucket.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-bucket-info',
  templateUrl: './bucket-info.component.html',
  styleUrls: ['./bucket-info.component.css']
})
export class BucketInfoComponent implements OnInit {

  bucket: BucketModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bucketService: BucketService
  ) { }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.paramMap);
  }

  calculateSize(content: ContentModel[]): number {
    let bucketSize = 0;
    for (const file of content) {
      bucketSize += file.size;
    }
    return bucketSize;
  }


  onDeleteBucket(bucketId: string): void {
    if (confirm('Do you really want to delete this bucket?')) {
      this.bucketService.deleteBucket(bucketId);
    }
  }
}

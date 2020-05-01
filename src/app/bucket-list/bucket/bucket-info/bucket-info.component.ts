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

  @Input() bucket: BucketModel;

  constructor(
    private bucketService: BucketService
  ) { }

  ngOnInit() {
  }

  /**
   * Calculates the total size of all files.
   *
   * @returns number Size of bucket
   * @param content Content of the bucket
   */
  calculateSize(content: ContentModel[]): number {
    let bucketSize = 0;
    for (const file of content) {
      bucketSize += file.size;
    }
    return bucketSize;
  }

  /**
   * Calls the deleteBucket API
   *
   * @param bucketId Id of bucket to be deleted.
   */
  onDeleteBucket(bucketId: string): void {
    if (confirm('Do you really want to delete this bucket?')) {
      this.bucketService.deleteBucket(bucketId);
    }
  }
}

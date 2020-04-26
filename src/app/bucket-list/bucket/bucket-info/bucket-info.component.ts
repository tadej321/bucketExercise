import {Component, Input, OnInit} from '@angular/core';
import {BucketModel} from '../bucket.model';
import {ContentModel} from '../bucket-content/content.model';

@Component({
  selector: 'app-bucket-info',
  templateUrl: './bucket-info.component.html',
  styleUrls: ['./bucket-info.component.css']
})
export class BucketInfoComponent implements OnInit {

  @Input() bucket: BucketModel;

  constructor() { }

  ngOnInit() {
  }

  calculateSize(content: ContentModel[]): number {
    let bucketSize = 0;
    for (const file of content) {
      bucketSize += file.size;
    }
    return bucketSize;
  }
}

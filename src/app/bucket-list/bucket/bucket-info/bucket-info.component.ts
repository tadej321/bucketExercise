import { Component, OnInit } from '@angular/core';
import {BucketModel} from '../bucket.model';

@Component({
  selector: 'app-bucket-info',
  templateUrl: './bucket-info.component.html',
  styleUrls: ['./bucket-info.component.css']
})
export class BucketInfoComponent implements OnInit {
  bucket: BucketModel = {
    name: 'Bucket 1',
    location: 'Kranj',
    content: {size: '1.6 GB'}
  };

  constructor() { }

  ngOnInit() {
  }

}

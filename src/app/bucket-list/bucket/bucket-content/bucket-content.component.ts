import {Component, Input, OnInit} from '@angular/core';
import {ContentModel} from './content.model';

@Component({
  selector: 'app-bucket-content',
  templateUrl: './bucket-content.component.html',
  styleUrls: ['./bucket-content.component.css']
})
export class BucketContentComponent implements OnInit {

  @Input() bucketContent: ContentModel[];

  constructor() { }

  ngOnInit() {
    console.log(this.bucketContent);
  }

}

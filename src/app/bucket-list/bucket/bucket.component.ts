import {Component, Input, OnInit} from '@angular/core';
import {BucketModel} from './bucket.model';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css']
})
export class BucketComponent implements OnInit {

  @Input() bucket: BucketModel;

  view: string;
  constructor() { }

  ngOnInit() {
    this.view = 'details';
  }

  changeView(view: string) {
    this.view = view;
  }
}

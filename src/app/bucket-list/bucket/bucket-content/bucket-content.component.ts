import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bucket-content',
  templateUrl: './bucket-content.component.html',
  styleUrls: ['./bucket-content.component.css']
})
export class BucketContentComponent implements OnInit {

  files = [
    {name: 'filename 1', modified: '04.02.2019', size: '3 MB'},
    {name: 'filename 2', modified: '13.05.2019', size: '321 KB'},
    {name: 'filename 3', modified: '25.09.2019', size: '1 MB'}
  ];
  constructor() { }

  ngOnInit() {
  }

}

import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BucketModel} from './bucket.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {BucketService} from '../bucket.service';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css']
})
export class BucketComponent implements OnInit, OnDestroy {

  bucket: BucketModel;
  bucketId: string;

  view: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bucketService: BucketService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.bucketId = params.id;
    });
    this.view = 'details';
  }

  changeView(view: string) {
    this.view = view;
  }

  ngOnDestroy(): void {}

}

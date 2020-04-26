import { Injectable } from '@angular/core';
import {BucketModel} from './bucket/bucket.model';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BucketService {

  public buckets: BucketModel[] = [
    {
      name: 'bucket 1',
      location: 'Ljubljana',
      content: [
        {fileName: 'filename 1', fileURL: 'none', modified: new Date(), size: 3000},
        {fileName: 'filename 2', fileURL: 'none', modified: new Date(), size: 150},
        {fileName: 'filename 3', fileURL: 'none', modified: new Date(), size: 1000}
      ]},
    {
      name: 'bucket 2',
      location: 'Kranj',
      content: [
        {fileName: 'filename 4', fileURL: 'none', modified: new Date(), size: 420},
        {fileName: 'filename 5', fileURL: 'none', modified: new Date(), size: 1500},
        {fileName: 'filename 6', fileURL: 'none', modified: new Date(), size: 970}
      ]
    }
  ];
  private bucketsUpdated = new Subject<{buckets: BucketModel[]}>();


  constructor() {}

  getBuckets() {
    this.bucketsUpdated.next({buckets: [...this.buckets]});
  }

  getBucketUpdatedListener() {
    return this.bucketsUpdated.asObservable();
  }

}

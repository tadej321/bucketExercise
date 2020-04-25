import { Injectable } from '@angular/core';
import {BucketModel} from './bucket/bucket.model';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BucketService {

  public buckets: BucketModel[] = [
    {name: 'bucket 1', location: 'Ljubljana', content: {}},
    {name: 'bucket 2', location: 'Kranj', content: {}}];
  private bucketsUpdated = new Subject<{buckets: BucketModel[]}>();


  constructor() {}

  getBuckets() {
    this.bucketsUpdated.next({buckets: [...this.buckets]});
  }

  getBucketUpdatedListener() {
    return this.bucketsUpdated.asObservable();
  }

}

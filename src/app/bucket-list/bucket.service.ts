import { Injectable } from '@angular/core';
import {BucketModel} from './bucket/bucket.model';
import {Observable, Subject, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

const LOCATIONS_URL = environment.locationsApiUrl;

interface Location {
  location: string;
}

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

  public locations;
  private bucketsUpdated = new Subject<{buckets: BucketModel[]}>();


  constructor(private http: HttpClient) {}

  getBuckets(): void {
    this.bucketsUpdated.next({buckets: [...this.buckets]});
  }

  getBucketUpdatedListener(): Observable<{buckets: BucketModel[]}> {
    return this.bucketsUpdated.asObservable();
  }


  getLocations(): Observable<[Location]> {
    return new Observable((subscriber) => {
      this.http.get(
        LOCATIONS_URL
      ).pipe(map((data: Array<any>) => {
        const location = [];
        for (const obj of data) {
          location.push({location: obj.kraj});
        }
        return location;
      }))
      .subscribe((locations: [Location]) => {
        subscriber.next(locations);
      });
    });
  }

  createBucket(newBucket: BucketModel): void {
    // Include http post call here
    this.buckets.push(newBucket);
    this.bucketsUpdated.next({buckets: [...this.buckets]});
  }
}

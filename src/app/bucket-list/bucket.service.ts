import { Injectable } from '@angular/core';
import {BucketModel} from './bucket/bucket.model';
import {Observable, Subject, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {ContentModel} from './bucket/bucket-content/content.model';

const LOCATIONS_URL = environment.locationsApiUrl;
const BUCKET_URL = environment.bucketApiURl;

interface Location {
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class BucketService {

  public buckets: BucketModel[] = [
    {
      id: 'da6d8d8as7d68a7s6d',
      name: 'bucket 1',
      location: 'Ljubljana',
      content: [
        {fileName: 'filename 1', fileURL: 'none', modified: new Date(), size: 3000},
        {fileName: 'filename 2', fileURL: 'none', modified: new Date(), size: 150},
        {fileName: 'filename 3', fileURL: 'none', modified: new Date(), size: 1000}
      ]},
    {
      id: 'dasd9s7d9a7s97da9',
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


  constructor(private http: HttpClient, private router: Router) {}

  getBucketById(id: string): Observable<BucketModel> {
    if (BUCKET_URL) {
      return this.http.get<{
        id: string;
        name: string;
        location: string;
        content: ContentModel[];
      }>(BUCKET_URL + id);
    } else {
      return new Observable<BucketModel>((subscriber => {
        const bucketIndex = this.buckets.findIndex(i => i.id === id);
        const bucket = this.buckets[bucketIndex];
        subscriber.next(bucket);
      }));
    }
  }

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

  deleteBucket(id: string): void {
    if (BUCKET_URL) {
      this.http.delete<{message: string}>(BUCKET_URL + id)
        .subscribe(response => {
          const updatedBuckets = [...this.buckets];
          const bucketIndex = updatedBuckets.findIndex(i => i.id === id);

          updatedBuckets.splice(bucketIndex, 1);

          this.buckets = updatedBuckets;
          this.bucketsUpdated.next({buckets: [...this.buckets]});

          this.router.navigate(['']);
        });
    } else {
      const updatedBuckets = [...this.buckets];
      const bucketIndex = updatedBuckets.findIndex(i => i.id === id);

      updatedBuckets.splice(bucketIndex, 1);

      this.buckets = updatedBuckets;
      this.bucketsUpdated.next({buckets: [...this.buckets]});
      console.log(this.router.getCurrentNavigation());
      this.router.navigate(['']);
    }
  }

  addFile(id: string, file: File) {

    // const postData: FormData = new FormData();
    //
    // postData.append('fileName', file.name);
    // postData.append('fileURL', file);
    // postData.append('modified', file.lastModified.toLocaleString());
    // postData.append('size', file.size.toString());
    //
    // console.log(postData.get('fileURL'));
    if (BUCKET_URL) {
      this.http.put(BUCKET_URL + id, file)
        .subscribe(response => {

        });

    }
  }
}

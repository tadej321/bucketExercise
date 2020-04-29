import { Injectable } from '@angular/core';
import {BucketModel} from './bucket/bucket.model';
import {Observable, Subject, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {ContentModel} from './bucket/bucket-content/content.model';

const LOCATIONS_URL = environment.locationsApiUrl;
const BACKEND_URL = environment.backendApiUrl;

interface Location {
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class BucketService {

  public buckets: BucketModel[] = [
    {
      _id: 'da6d8d8as7d68a7s6d',
      name: 'bucket 1',
      location: 'Ljubljana',
      content: [
        {_id: 'd7sf85a8c8a6df85ds67', fileName: 'filename 1', filePath: 'none', modified: new Date(), size: 312344},
        {_id: 'vf80d6b58d5f78686f8a', fileName: 'filename 2', filePath: 'none', modified: new Date(), size: 150000},
        {_id: 'fa6cv86a7v5a6s9687f8', fileName: 'filename 3', filePath: 'none', modified: new Date(), size: 1000}
      ]},
    {
      _id: 'dasd9s7d9a7s97da9',
      name: 'bucket 2',
      location: 'Kranj',
      content: [
        {_id: 'av0vb67s88c6b6nb8sn5s', fileName: 'filename 4', filePath: 'none', modified: new Date(), size: 42000},
        {_id: 'f675av5a57s5a797d7b68', fileName: 'filename 5', filePath: 'none', modified: new Date(), size: 15000},
        {_id: 'sac86a08sc9868s5c74vb', fileName: 'filename 6', filePath: 'none', modified: new Date(), size: 970000}
      ]
    }
  ];

  public locations;
  private bucketsUpdated = new Subject<{buckets: BucketModel[]}>();


  constructor(private http: HttpClient, private router: Router) {}

  getBucketById(id: string): Observable<BucketModel> {
    if (BACKEND_URL) {
      return this.http.get<{
        id: string;
        name: string;
        location: string;
        content: ContentModel[];
      }>(BACKEND_URL + id);
    } else {
      return new Observable<BucketModel>((subscriber => {
        const bucketIndex = this.buckets.findIndex(i => i._id === id);
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
    if (BACKEND_URL) {
      this.http.delete<{message: string}>(BACKEND_URL + id)
        .subscribe(response => {
          const updatedBuckets = [...this.buckets];
          const bucketIndex = updatedBuckets.findIndex(i => i._id === id);

          updatedBuckets.splice(bucketIndex, 1);

          this.buckets = updatedBuckets;
          this.bucketsUpdated.next({buckets: [...this.buckets]});

          this.router.navigate(['/']);
        });
    } else {
      const updatedBuckets = [...this.buckets];
      const bucketIndex = updatedBuckets.findIndex(i => i._id === id);

      updatedBuckets.splice(bucketIndex, 1);

      this.buckets = updatedBuckets;
      this.bucketsUpdated.next({buckets: [...this.buckets]});
      console.log(this.router.getCurrentNavigation());
      this.router.navigate(['']);
    }
  }

  addFile(id: string, file: File): void {

    let postData: ContentModel | FormData;
    if (BACKEND_URL) {
      postData = new FormData();
      postData.append('fileName', file.name);


      postData.append('filePath', file);
      postData.append('modified', file.lastModified.toLocaleString());
      postData.append('size', file.size.toString());

      this.http.put(BACKEND_URL + id, file)
        .subscribe(response => {
          this.router.navigate(['bucket/' + id]);
        });
    } else {
      postData = {
        fileName: file.name,
        filePath: '',
        modified: new Date(file.lastModified),
        size: file.size
      };
      const updatedBuckets = [...this.buckets];
      const bucketIndex = updatedBuckets.findIndex(i => i._id === id);

      updatedBuckets[bucketIndex].content.unshift(postData);

      this.buckets = updatedBuckets;
      this.bucketsUpdated.next({buckets: [...this.buckets]});
    }
  }

  removeFile(fileId: string, bucketId: string): void {
    if (BACKEND_URL) {
      this.http.delete<{message: string}>(BACKEND_URL + '?fileId=' + fileId + '&bucketId=' + bucketId)
        .subscribe(response => {
          this.router.navigate(['bucket/' + bucketId]);
        });
    } else {
      const updatedBuckets = [...this.buckets];
      const bucketIndex = updatedBuckets.findIndex(i => i._id === bucketId);

      const fileIndex = this.buckets[bucketIndex].content.findIndex(x => x._id === fileId);

      updatedBuckets[bucketIndex].content.splice(fileIndex, 1);

      this.buckets = updatedBuckets;
      this.bucketsUpdated.next({buckets: [...this.buckets]});
    }
  }
}

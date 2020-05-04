import { Injectable } from '@angular/core';
import {BucketModel} from './bucket/bucket.model';
import {Observable, Subject, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {ContentModel} from './bucket/bucket-content/content.model';

const LOCATIONS_URL = environment.locationsApiUrl;
const BACKEND_URL = environment.backendApiUrl ? environment.backendApiUrl + '/buckets' : undefined;
const testBucket = environment.testBuckets ? environment.testBuckets : undefined;

interface Location {
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class BucketService {

  private buckets: BucketModel[] = testBucket ? [testBucket] : [];
  private bucketsUpdated = new Subject<{buckets: BucketModel[]}>();

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Makes a GET request to the server to retrieve a single bucket.
   *
   *
   * @returns Observable of type BucketModel
   * @param id Unique id of the bucket
   *
   */
  getBucketById(id: string): Observable<BucketModel> {
    if (BACKEND_URL) {
      return this.http.get<{
        id: string;
        name: string;
        location: string;
        content: ContentModel[];
      }>(`${BACKEND_URL}/${id}`);
    } else {
      return new Observable<BucketModel>((subscriber => {
        const bucketIndex = this.buckets.findIndex(i => i._id === id);
        const bucket = this.buckets[bucketIndex];
        subscriber.next(bucket);
      }));
    }
  }

  /**
   * Makes a GET request to the server to retrieve an array of buckets.
   * Sets the buckets field to the response.
   *
   */
  getBuckets(): void {
    if (BACKEND_URL) {
      this.http.get<{message: string, buckets: BucketModel[]}>(
        BACKEND_URL
      ).subscribe(response => {
        this.buckets = response.buckets;
        this.bucketsUpdated.next({buckets: [...this.buckets]});
      });
    } else {
      this.bucketsUpdated.next({buckets: [...this.buckets]});
    }
  }

  /**
   * Return the bucketsUpdated Subject as an Observable, to which we subscribe to monitor changes.
   *
   * @returns Observable of type BucketModel array
   */
  getBucketUpdatedListener(): Observable<{buckets: BucketModel[]}> {
    return this.bucketsUpdated.asObservable();
  }

  /**
   * Makes a GET request to the locations API to retrieve all locations.
   */
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

  /**
   * Makes a POST request to the server to add a new bucket.
   * Updates the buckets field.
   *
   * @param newBucket The bucket we want to add.
   */
  addBucket(newBucket: BucketModel): void {
    if (BACKEND_URL) {
      this.http.post<{message: string, bucket: BucketModel}>(
        BACKEND_URL,
        newBucket
      ).subscribe((response) => {
        this.buckets.push(response.bucket);

        this.bucketsUpdated.next({buckets: [...this.buckets]});
      });
    } else {
      newBucket._id = newBucket.name + 'id';
      this.buckets.push(newBucket);
      this.bucketsUpdated.next({buckets: [...this.buckets]});
    }
  }

  /**
   * Makes a delete request to the server to remove the bucket.
   * Updates the buckets field.
   *
   * @param id Of the bucket we want to delete.
   */
  deleteBucket(id: string): void {
    if (BACKEND_URL) {
      this.http.delete<{message: string}>(`${BACKEND_URL}/${id}`)
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

  /**
   * Makes a PUT request to the server to update the bucket with the new file added.
   * Updates the buckets field.
   *
   * @param id The id of the bucket we want to update.
   * @param file The File we want to add to the bucket.
   */
  addFile(id: string, file: File): void {

    let postData: ContentModel | FormData;
    if (BACKEND_URL) {
      postData = new FormData();
      postData.append('fileName', file.name);


      postData.append('filePath', file);
      postData.append('modified', file.lastModified.toLocaleString());
      postData.append('size', file.size.toString());

      this.http.put(`${BACKEND_URL}/${id}`, postData)
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

  /**
   * Makes a DELETE request to the server to remove the file from the bucket.
   *
   * @param fileId The id of the file to be removed.
   * @param bucketId The id of the bucket which's file is to be removed.
   */
  removeFile(fileId: string, bucketId: string): void {
    if (BACKEND_URL) {
      this.http.delete<{message: string}>(`${BACKEND_URL}?fileId=${fileId}&bucketId=${bucketId}`)
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

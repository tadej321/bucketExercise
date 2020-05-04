import {async, getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { BucketService } from './bucket.service';
import {BucketModel} from './bucket/bucket.model';
import {RouterTestingModule} from '@angular/router/testing';
import {ContentModel} from './bucket/bucket-content/content.model';
import {environment} from '../../environments/environment';

describe('BucketService', () => {

  let bucketService: BucketService;
  let  injector: TestBed;
  const  myProvider = environment;
  let  httpMock: HttpTestingController;
  const url = environment.backendApiUrl;

  const dummyBucket: BucketModel = {
    _id: 'testId',
    name: 'testBucket',
    location: 'testLocation',
    content: []
  };
  const dummyFileObject: ContentModel = {
    _id: 'testFileId',
    fileName: 'testFile',
    filePath: 'testPath',
    modified: new Date('1.1.2000'),
    size: 1000
  };

  const mockFile = new File(['test'], 'testFile' );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [BucketService]
    });
    httpMock = injector.inject(HttpTestingController);
    bucketService = TestBed.inject(BucketService);
  });

  injector = getTestBed();

  it('should be created', () => {
    expect(bucketService).toBeTruthy();
  });

  it('should make a get request to retrieve a single bucket', () => {

    bucketService.getBucketById(dummyBucket._id).subscribe(bucket => {
      expect(bucket).toEqual(dummyBucket);
    });

    const request = httpMock.expectOne(`${url}/buckets/${dummyBucket._id}`);

    expect(request.request.method).toEqual('GET');
    expect(request.request.body).toEqual(null);

    request.flush(dummyBucket);

    httpMock.verify();
  });

  it('should make a get request to retrieve all buckets', () => {

    bucketService.getBuckets();

    const request = httpMock.expectOne(`${url}/buckets`);

    expect(request.request.method).toEqual('GET');
    expect(request.request.body).toEqual(null);

    httpMock.verify();
  });

  it('should make a get request to retrieve all locations', () => {
    const locationsUrl = environment.locationsApiUrl;

    bucketService.getLocations().subscribe(locations => {
      expect(locations).toBe([]);
    });

    const request = httpMock.expectOne(locationsUrl);

    expect(request.request.method).toEqual('GET');
    expect(request.request.body).toEqual(null);

    httpMock.verify();
  });

  it('should make a delete request to delete the bucket', () => {
    bucketService.deleteBucket(dummyBucket._id);

    const request = httpMock.expectOne(`${url}/buckets/${dummyBucket._id}`);

    expect(request.request.method).toEqual('DELETE');
    expect(request.request.body).toEqual(null);

    request.flush(dummyBucket._id);
    httpMock.verify();
  });

  it('should make a delete request to delete a file from the bucket', () => {
    bucketService.removeFile(dummyFileObject._id, dummyBucket._id);

    const request = httpMock.expectOne(`${url}/buckets?fileId=${dummyFileObject._id}&bucketId=${dummyBucket._id}`);

    expect(request.request.method).toEqual('DELETE');
    expect(request.request.body).toEqual(null);

    httpMock.verify();
  });

  it('should make a put request for a file to be added to the bucket', () => {

    const testPostData = new FormData();

    testPostData.append('fileName', mockFile.name);
    testPostData.append('filePath', mockFile);
    testPostData.append('modified', mockFile.lastModified.toLocaleString());
    testPostData.append('size', mockFile.size.toString());

    bucketService.addFile(dummyBucket._id, mockFile);

    const request = httpMock.expectOne(`${url}/buckets/${dummyBucket._id}`);

    expect(request.request.method).toEqual('PUT');
    expect(request.request.body).toEqual(testPostData);

    request.flush(testPostData);
    httpMock.verify();
  });

  it('should make a post request to add a new bucket', async(() => {

    bucketService.addBucket(dummyBucket);

    const request = httpMock.expectOne(url + '/buckets');

    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual(dummyBucket);

    request.flush(dummyBucket);
    httpMock.verify();
  }));

  it('should subscribe and return buckets data', async((done: DoneFn) => {
    let buckets: BucketModel[];
    bucketService.getBucketUpdatedListener().subscribe(data => {
      expect(data.buckets).toEqual(buckets);
      done();
    });
  }));
});

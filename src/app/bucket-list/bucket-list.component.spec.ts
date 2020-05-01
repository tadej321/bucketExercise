import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { BucketListComponent } from './bucket-list.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BucketModel} from './bucket/bucket.model';
import {of, throwError} from 'rxjs';
import {getErrorMessage} from 'codelyzer/templateAccessibilityElementsContentRule';
import {HttpErrorResponse} from '@angular/common/http';

describe('BucketListComponent', () => {
  let component: BucketListComponent;
  let fixture: ComponentFixture<BucketListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [],
      declarations: [ BucketListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(BucketListComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not have buckets after construction', () => {
    expect(component.buckets).toEqual([]);

  });

  it('should have empty buckets when BucketService fails', fakeAsync( () => {
    const testBuckets: BucketModel[] = [];

    const bucketService = jasmine.createSpyObj('BucketService', ['getBucketUpdatedListener']);
    bucketService.getBucketUpdatedListener.and.returnValue(of(testBuckets));

    tick();

    fixture.detectChanges();

    expect(component.buckets).toEqual([]);
  }));

  it('should toggle #openCreateBucket', () => {
    expect(component.openCreateBucket).toBe(false, 'false at first');
    component.onCreateNewBucket();
    expect(component.openCreateBucket).toBe(true, 'true after click');
    component.onCreateNewBucket();
    expect(component.openCreateBucket).toBe(false, 'false after click');
  });

});

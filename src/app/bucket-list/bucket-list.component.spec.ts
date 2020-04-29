import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketListComponent } from './bucket-list.component';
import {BucketService} from './bucket.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable, Subscriber, Subscription} from 'rxjs';
import {BucketModel} from './bucket/bucket.model';
import Expected = jasmine.Expected;

describe('BucketListComponent', () => {
  let component: BucketListComponent;
  let fixture: ComponentFixture<BucketListComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [HttpClient, HttpHandler],
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

  it(' should ', async () => {
    const bucketService = fixture.debugElement.injector.get(BucketService);
    bucketService.getBucketUpdatedListener().subscribe(data => {
      expect(data.buckets).toBe(component.buckets);
    });
  });

});

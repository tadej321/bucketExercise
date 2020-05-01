import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketInfoComponent } from './bucket-info.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BucketModel} from '../bucket.model';

describe('BucketInfoComponent', () => {
  let component: BucketInfoComponent;
  let fixture: ComponentFixture<BucketInfoComponent>;

  let testBucket: BucketModel;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BucketInfoComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketInfoComponent);
    component = fixture.componentInstance;
    testBucket = {
      name: 'testName',
      location: 'testLoc',
      content: []
    };
    component.bucket = testBucket;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

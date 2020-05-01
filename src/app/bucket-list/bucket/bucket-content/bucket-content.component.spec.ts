import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketContentComponent } from './bucket-content.component';
import {BucketService} from '../../bucket.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BucketModel} from '../bucket.model';

describe('BucketContentComponent', () => {
  let component: BucketContentComponent;
  let fixture: ComponentFixture<BucketContentComponent>;

  let testBucket: BucketModel;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BucketContentComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketContentComponent);
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

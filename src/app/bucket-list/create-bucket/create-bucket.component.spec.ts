import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { CreateBucketComponent } from './create-bucket.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';

describe('CreateBucketComponent', () => {
  let component: CreateBucketComponent;
  let fixture: ComponentFixture<CreateBucketComponent>;
  let mockNgControl: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      declarations: [ CreateBucketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBucketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#filteredLocations should be undefined on construction', () => {
    expect(component.filteredLocations).toBeUndefined();
  });

});

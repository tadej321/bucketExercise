import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketContentComponent } from './bucket-content.component';

describe('BucketContentComponent', () => {
  let component: BucketContentComponent;
  let fixture: ComponentFixture<BucketContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BucketContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

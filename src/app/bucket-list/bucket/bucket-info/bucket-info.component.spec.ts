import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketInfoComponent } from './bucket-info.component';

describe('BucketInfoComponent', () => {
  let component: BucketInfoComponent;
  let fixture: ComponentFixture<BucketInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BucketInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

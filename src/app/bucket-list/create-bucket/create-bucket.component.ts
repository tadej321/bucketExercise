import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {BucketService} from '../bucket.service';
import {FormControl, NgForm, NgModel} from '@angular/forms';
import {filter, map} from 'rxjs/operators';
import {BucketModel} from '../bucket/bucket.model';

@Component({
  selector: 'app-create-bucket',
  templateUrl: './create-bucket.component.html',
  styleUrls: ['./create-bucket.component.css']
})
export class CreateBucketComponent implements OnInit {
  public locations;

  @ViewChild('locationInput', {static: false}) locationInput: FormControl;
  bucketNameInputElement = new FormControl('');
  locationInputElement = new FormControl('');

  constructor(private bucketService: BucketService) { }

  ngOnInit(): void {
  }

  filterLocations(event): void {
    this.locations = [];
    const filter = event.target.value.toUpperCase();
    this.bucketService.getLocations()
      .subscribe(data => {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < data.length; i++) {
          const locationValue = data[i].location;
          if (locationValue.toUpperCase().indexOf(filter) > -1) {
            this.locations.push(data[i].location);
          }
        }
      });


  }

  setValue(event): void {
    this.locationInputElement.setValue(event.target.value);

  }

  onCreateBucket(form: NgForm, event): void {

    const newBucket: BucketModel = {
      name: this.bucketNameInputElement.value,
      location: this.locationInputElement.value,
      content: []
    };

    this.bucketService.createBucket(newBucket);

  }
}

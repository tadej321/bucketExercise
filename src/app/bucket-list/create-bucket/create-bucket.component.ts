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
  private locations;
  public filteredLocations;

  @ViewChild('locationInput', {static: false}) locationInput: FormControl;
  bucketNameInputElement = new FormControl('');
  locationInputElement = new FormControl('');

  constructor(private bucketService: BucketService) { }

  ngOnInit(): void {
    this.bucketService.getLocations().subscribe(data => {
      this.locations = data;
    });
  }

  /**
   * Filters the locations by the provided filter.
   *
   * @param event Keyup event
   */
  filterLocations(event): void {
    this.filteredLocations = [];
    const filter = event.target.value.toUpperCase();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.locations.length; i++) {
      const locationValue = this.locations[i].location;
      if (locationValue.toUpperCase().indexOf(filter) > -1) {
        this.filteredLocations.push(this.locations[i].location);
      }
    }
  }

  /**
   * Sets the value of the selected location.
   *
   * @param event Click event
   */
  setValue(event): void {
    this.locationInputElement.setValue(event.target.value);

  }

  /**
   * Calls the addBucket API to add the bucket.
   *
   * @param form Submited form with information about the bucket
   * @param event Click event
   */
  onCreateBucket(form: NgForm, event): void {

    const newBucket: BucketModel = {
      name: this.bucketNameInputElement.value,
      location: this.locationInputElement.value,
      content: []
    };

    this.bucketService.addBucket(newBucket);

  }
}

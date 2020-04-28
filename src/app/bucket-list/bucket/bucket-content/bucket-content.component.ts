import {Component, Input, OnInit} from '@angular/core';
import {ContentModel} from './content.model';
import {BucketService} from '../../bucket.service';
import {BucketModel} from '../bucket.model';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-bucket-content',
  templateUrl: './bucket-content.component.html',
  styleUrls: ['./bucket-content.component.css']
})
export class BucketContentComponent implements OnInit {

  bucket: BucketModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bucketService: BucketService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const bucketId = params.id;
      this.bucketService.getBucketById(bucketId).subscribe(response => {
        this.bucket = response;
      });
    });
  }

  onFilePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];


    const reader = new FileReader();
    reader.onload = () => {
      this.bucketService.addFile(this.bucket.id, file);
    };
    reader.readAsDataURL(file);
  }
}

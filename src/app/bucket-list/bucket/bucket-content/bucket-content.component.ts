import {Component, Input, OnInit} from '@angular/core';
import {ContentModel} from './content.model';
import {BucketService} from '../../bucket.service';
import {BucketModel} from '../bucket.model';
import {ActivatedRoute, ParamMap, Router, UrlSegment} from '@angular/router';


@Component({
  selector: 'app-bucket-content',
  templateUrl: './bucket-content.component.html',
  styleUrls: ['./bucket-content.component.css']
})
export class BucketContentComponent implements OnInit {

  @Input() bucket: BucketModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bucketService: BucketService,
    private route: Router
  ) { }

  ngOnInit() {
  }

  onFilePicked(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.bucketService.addFile(this.bucket._id, file);
    };
    reader.readAsDataURL(file);
  }

  onRemoveFile(fileId: string): void {
    this.bucketService.removeFile(fileId, this.bucket._id);
  }
}

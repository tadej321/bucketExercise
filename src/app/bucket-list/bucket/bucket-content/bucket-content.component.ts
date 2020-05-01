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

  /**
   * Reads the selected file and calls the addFile API
   *
   * @param event Change event
   */
  onFilePicked(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.bucketService.addFile(this.bucket._id, file);
    };
    reader.readAsDataURL(file);
  }

  /**
   * Calls the removeFile API
   *
   * @param fileId Id of the file to be removed
   */
  onRemoveFile(fileId: string): void {
    if (confirm('Do you really want to delete this file?')) {
      this.bucketService.removeFile(fileId, this.bucket._id);
    }
  }
}

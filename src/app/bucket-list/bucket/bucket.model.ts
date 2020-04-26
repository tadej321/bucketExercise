import {ContentModel} from './bucket-content/content.model';

export interface BucketModel {
  name: string;
  location: string;
  content: ContentModel[];
}

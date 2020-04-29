import {ContentModel} from './bucket-content/content.model';

export interface BucketModel {
  _id?: string;
  name: string;
  location: string;
  content: ContentModel[];
}

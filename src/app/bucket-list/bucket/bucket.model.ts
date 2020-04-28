import {ContentModel} from './bucket-content/content.model';

export interface BucketModel {
  id?: string;
  name: string;
  location: string;
  content: ContentModel[];
}

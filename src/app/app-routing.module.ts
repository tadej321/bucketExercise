import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BucketListComponent} from './bucket-list/bucket-list.component';
import {BucketComponent} from './bucket-list/bucket/bucket.component';
import {BucketContentComponent} from './bucket-list/bucket/bucket-content/bucket-content.component';
import {BucketInfoComponent} from './bucket-list/bucket/bucket-info/bucket-info.component';

/*client-side routes (they must not be the same as server-side routes),
  that serve a component.html page based on the route.
  example: localhost:4200/create --- returns the specified component.html.
*/
const routes: Routes = [
  { path: '', component: BucketListComponent},
  { path: 'bucket/:id',
    component: BucketComponent,
    children: [
      { path: 'files', component: BucketContentComponent},
      { path: 'details', component: BucketInfoComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }

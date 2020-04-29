import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BucketListComponent} from './bucket-list/bucket-list.component';
import {BucketComponent} from './bucket-list/bucket/bucket.component';
import {BucketContentComponent} from './bucket-list/bucket/bucket-content/bucket-content.component';
import {BucketInfoComponent} from './bucket-list/bucket/bucket-info/bucket-info.component';
import {AuthGuard} from './authentication/auth-guard';

/*client-side routes (they must not be the same as server-side routes),
  that serve a component.html page based on the route.
  example: localhost:4200/create --- returns the specified component.html.
*/
const routes: Routes = [
  {path: 'auth', loadChildren: () => import('./authentication/auth.module').then(m => m.AuthModule)},
  { path: '', component: BucketListComponent, canActivate: [AuthGuard]},
  { path: 'bucket/:id', component: BucketComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }

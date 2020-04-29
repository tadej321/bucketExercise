import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BucketListComponent } from './bucket-list/bucket-list.component';
import { BucketComponent } from './bucket-list/bucket/bucket.component';
import { CreateBucketComponent } from './bucket-list/create-bucket/create-bucket.component';
import { BucketContentComponent } from './bucket-list/bucket/bucket-content/bucket-content.component';
import { BucketInfoComponent } from './bucket-list/bucket/bucket-info/bucket-info.component';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {AuthGuard} from './authentication/auth-guard';
import {AuthInterceptor} from './authentication/auth-interceptor';
@NgModule({
  declarations: [
    AppComponent,
    BucketListComponent,
    BucketComponent,
    CreateBucketComponent,
    BucketContentComponent,
    BucketInfoComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailPageComponent} from './detail-page/detail-page.component';
import {HeaderModule} from '../header/header.module';
import {SharedModule} from '../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [DetailPageComponent],
  imports: [
    CommonModule,
    HeaderModule,
    SharedModule,
    BrowserAnimationsModule,
    RouterModule,
    MatTableModule
  ],
  exports: [DetailPageComponent]
})
export class DetailModule { }

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailPageComponent} from './detail-page/detail-page.component';
import {HeaderModule} from '../header/header.module';


@NgModule({
  declarations: [DetailPageComponent],
  imports: [
    CommonModule,
    HeaderModule
  ],
  exports: [DetailPageComponent]
})
export class DetailModule { }

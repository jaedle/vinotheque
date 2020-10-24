import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailPageComponent } from './detail-page/detail-page.component';



@NgModule({
  declarations: [DetailPageComponent],
  imports: [
    CommonModule
  ],
  exports: [DetailPageComponent]
})
export class DetailModule { }

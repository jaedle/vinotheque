import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './error-page/error-page.component';
import {HeaderModule} from '../header/header.module';



@NgModule({
  declarations: [ErrorPageComponent],
  imports: [
    CommonModule,
    HeaderModule
  ],
  exports: [ErrorPageComponent]
})
export class ErrorModule { }

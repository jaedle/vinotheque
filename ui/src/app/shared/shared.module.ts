import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WineService} from './services/wine.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    WineService
  ]
})
export class SharedModule {
}

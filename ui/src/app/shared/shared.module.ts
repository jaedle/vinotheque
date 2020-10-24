import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WineService} from './services/wine.service';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [
    WineService
  ]
})
export class SharedModule {
}

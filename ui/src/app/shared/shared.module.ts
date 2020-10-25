import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WineService} from './services/wine.service';
import {HttpClientModule} from '@angular/common/http';
import { EmptyComponent } from './redirect/empty.component';


@NgModule({
  declarations: [EmptyComponent],
  imports: [
    HttpClientModule
  ],
  providers: [
    WineService
  ]
})
export class SharedModule {
}

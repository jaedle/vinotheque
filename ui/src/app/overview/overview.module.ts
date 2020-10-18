import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { WineService } from './services/wine.service';
import {MatChipsModule} from '@angular/material/chips';
import {RouterModule} from '@angular/router';
import { WineListComponent } from './components/wine-list/wine-list.component';

@NgModule({
  declarations: [PageComponent, WineListComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatChipsModule,
    RouterModule
  ],
  exports: [PageComponent],
  providers: [WineService],
})
export class OverviewModule {}

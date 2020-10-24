import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewPageComponent } from './page/overview-page.component';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { WineService } from '../shared/services/wine.service';
import {MatChipsModule} from '@angular/material/chips';
import {RouterModule} from '@angular/router';
import { WineListComponent } from './components/wine-list/wine-list.component';
import {MatTableModule} from '@angular/material/table';
import { WineSelectorComponent } from './components/wine-selector/wine-selector.component';
import { WineTypeSelectorComponent } from './components/wine-type-selector/wine-type-selector.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [OverviewPageComponent, WineListComponent, WineSelectorComponent, WineTypeSelectorComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatChipsModule,
    RouterModule,
    MatTableModule,
    MatExpansionModule,
    SharedModule
  ],
  exports: [OverviewPageComponent],
  providers: [],
})
export class OverviewModule {}

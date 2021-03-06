import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {OverviewModule} from './overview/overview.module';
import {APP_BASE_HREF} from '@angular/common';
import {DetailModule} from './detail/detail.module';
import {ErrorModule} from './error/error.module';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, OverviewModule, DetailModule, ErrorModule],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent],
})
export class AppModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OverviewPageComponent} from './overview/page/overview-page.component';
import {DetailPageComponent} from './detail/detail-page/detail-page.component';
import {ErrorPageComponent} from './error/error-page/error-page.component';
import {BottleResolverService} from './bottle-resolver.service';
import {FormsModule} from '@angular/forms';
import {EmptyComponent} from './shared/redirect/empty.component';

const routes: Routes = [
  {path: '', component: OverviewPageComponent},
  {path: 'wines/:id', component: DetailPageComponent},
  {path: 'link', resolve: {bottle: BottleResolverService}, component: EmptyComponent},
  {path: 'error', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }), FormsModule],
  exports: [RouterModule],
  providers: [BottleResolverService]
})
export class AppRoutingModule {}

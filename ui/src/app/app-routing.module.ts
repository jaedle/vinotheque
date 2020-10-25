import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OverviewPageComponent} from './overview/page/overview-page.component';
import {DetailPageComponent} from './detail/detail-page/detail-page.component';
import {BottleResolverService} from './bottle-resolver.service';
import {FormsModule} from '@angular/forms';
import {EmptyComponent} from './shared/redirect/empty.component';

const routes: Routes = [
  {path: '', component: OverviewPageComponent},
  {path: 'wines/:id', component: DetailPageComponent},
  {path: 'link', resolve: {bottle: BottleResolverService}, component: EmptyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule],
  providers: [BottleResolverService]
})
export class AppRoutingModule {}

import {Component, OnInit} from '@angular/core';
import {Wine, WineModel, WineType} from '../../shared/model/wine.model';
import {WineService} from '../../shared/services/wine.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss'],
})
export class OverviewPageComponent implements OnInit {

  readonly WineType = WineType;
  model: WineModel | undefined;
  wineType: WineType | undefined;

  constructor(
    private wineService: WineService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.wineService.getWines().subscribe(
      (model) => {
        this.model = model;
      },
      () => {
        this.router.navigateByUrl(`error?message=${encodeURIComponent('could not fetch wines')}`);
      },
    );
  }


  modelLoaded(): boolean {
    return this.model !== undefined;
  }

  wineSelected(wine: Wine): void {
    this.router.navigateByUrl(`/wines/${wine.id}`);
  }
}

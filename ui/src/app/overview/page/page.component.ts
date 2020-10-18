import {Component, OnInit} from '@angular/core';
import {OverviewModel, WineType} from '../model/overview.model';
import {WineService} from '../services/wine.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
  model: OverviewModel;
  view: OverviewModel;
  error = false;

  constructor(private wineService: WineService) {
  }

  ngOnInit(): void {
    this.wineService.getWines().subscribe(
      (model) => {
        this.model = model;
      },
      () => {
        this.error = true;
      },
    );
  }

  showWhiteWines(): void {
    this.model.filter(WineType.WHITE);
  }

  showRedWines(): void {
    this.model.filter(WineType.RED);
  }

  showRoseWines(): void {
    this.model.filter(WineType.ROSE);
  }

  showSparklingWines(): void {
    this.model.filter(WineType.SPARKLING);
  }
}

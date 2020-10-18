import {Component, OnInit} from '@angular/core';
import {OverviewModel, Wines, WineType} from '../model/overview.model';
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
        this.view = model;
      },
      (error) => {
        this.error = true;
      },
    );
  }

  refresh(): void {
    const whiteWines = this.model.wines.wines.filter(it => it.type === WineType.WHITE);
    this.view = this.model = new OverviewModel(new Wines(whiteWines));
  }
}

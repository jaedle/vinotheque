import { Component, OnInit } from '@angular/core';
import { OverviewModel } from '../model/overview.model';
import { WineService } from '../services/wine.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
  model: OverviewModel;
  error = false;

  constructor(private wineService: WineService) {}

  ngOnInit(): void {
    this.wineService.getWines().subscribe(
      (model) => (this.model = model),
      (error) => {
        this.error = true;
      },
    );
  }
}

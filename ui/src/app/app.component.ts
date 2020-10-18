import { Component, OnInit } from '@angular/core';
import { WineService } from './overview/services/wine.service';
import { OverviewModel } from './overview/model/overview.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  model: OverviewModel;
  error = false;

  constructor(private wineService: WineService) {}

  ngOnInit(): void {
    this.wineService.getWines().subscribe(
      (model) => (this.model = model),
      () => {
        this.error = true;
      },
    );
  }
}

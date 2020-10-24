import {Component, OnInit} from '@angular/core';
import {WineModel, WineType} from '../../shared/model/wine.model';
import {WineService} from '../../shared/services/wine.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss'],
})
export class OverviewPageComponent implements OnInit {
  private error = false;

  readonly WineType = WineType;
  model: WineModel;
  view: WineModel;
  wineType: WineType | undefined;

  constructor(private wineService: WineService, private router: Router, private activatedRoute: ActivatedRoute) {
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


  hasModel(): boolean {
    return this.model !== undefined;
  }

  hasError(): boolean {
    return this.error;
  }


}

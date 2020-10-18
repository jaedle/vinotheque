import {Component, OnInit} from '@angular/core';
import {OverviewModel, WineType} from '../model/overview.model';
import {WineService} from '../services/wine.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
  model: OverviewModel;
  view: OverviewModel;
  error = false;
  private wineType: WineType | undefined;

  constructor(private wineService: WineService, private router: Router, private activatedRoute: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.wineService.getWines().subscribe(
      (model) => {
        this.model = model;
        this.refresh();
      },
      () => {
        this.error = true;
      },
    );

    this.activatedRoute.queryParamMap.subscribe((params) => {
      const wineType: string | null = params.get('type');
      if (null == wineType) {
        this.wineType = undefined;
        return;
      } else {
        this.wineType = WineType[wineType];
      }

      this.refresh();
    });
  }

  showWhiteWines(): void {
    this.router.navigateByUrl(`?type=${WineType.WHITE}`);
  }

  showRedWines(): void {
    this.router.navigateByUrl(`?type=${WineType.RED}`);
  }

  showRoseWines(): void {
    this.router.navigateByUrl(`?type=${WineType.ROSE}`);
  }

  showSparklingWines(): void {
    this.router.navigateByUrl(`?type=${WineType.SPARKLING}`);
  }

  showAllWines(): void {
    this.router.navigateByUrl('?type=');
  }

  private refresh(): void {
    if (this.model === undefined) {
      return;
    }

    if (this.wineType === undefined) {
      this.model.resetFilter();
    } else {
      this.model.filter(this.wineType);
    }
  }
}

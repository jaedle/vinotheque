import {Component, Input, OnInit} from '@angular/core';
import {OverviewModel, WineType} from '../../model/overview.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-wine-selector',
  templateUrl: './wine-selector.component.html',
  styleUrls: ['./wine-selector.component.scss']
})
export class WineSelectorComponent implements OnInit {

  @Input() model: OverviewModel;
  readonly WineType = WineType;
  wineType: WineType | undefined;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

  }


  ngOnInit(): void {
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

    this.refresh();
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

import {Component, OnInit} from '@angular/core';
import {WineModel, WineType} from '../../shared/model/wine.model';
import {WineService} from '../services/wine.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
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

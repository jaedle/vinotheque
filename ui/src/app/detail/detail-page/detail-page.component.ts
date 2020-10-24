import {Component, OnInit} from '@angular/core';
import {WineService} from '../../shared/services/wine.service';
import {ActivatedRoute} from '@angular/router';
import {Wine} from '../../shared/model/wine.model';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {
  wine: Wine;

  constructor(private wineService: WineService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.wineService.getWine(params.get('id')).subscribe(wine => {
        this.wine = wine;
      });
    });
  }

  dataSource(): WineDetail[] | undefined {
    if (this.wine === undefined) {
      return undefined;
    }

    return [
      {key: 'Name', value: this.wine.name},
      {key: 'Winery', value: this.wine.winery},
      {key: 'Year', value: this.wine.year.toString()},
      {key: 'Grape', value: this.wine.grape},
      {key: 'Type', value: this.wine.type.toString()}
    ];
  }

}

interface WineDetail {
  key: string;
  value: string;
}

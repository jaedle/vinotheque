import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {OverviewModel, Wine, Wines, WineType} from '../model/overview.model';

@Injectable({
  providedIn: 'root',
})
export class WineService {
  constructor(private http: HttpClient) {
  }

  private static getWineType(wine: WineDto): WineType {
    switch (wine.type) {
      case 'red':
        return WineType.RED;
      case 'white':
        return WineType.WHITE;
      case 'rose':
        return WineType.ROSE;
      case 'sparkling':
        return WineType.SPARKLING;
    }
  }

  getWines(): Observable<OverviewModel> {
    return this.http.get<GetWineResponse>('/api/wines').pipe(
      map((response) => {
        return new OverviewModel(
          new Wines(response.wines.map((wine) => {
            const type = WineService.getWineType(wine);
            return new Wine(wine.name, wine.winery, type);
          })),
        );
      }),
    );
  }
}

export interface GetWineResponse {
  wines: WineDto[];
}

export interface WineDto {
  name: string;
  type: string;
  winery: string;
}

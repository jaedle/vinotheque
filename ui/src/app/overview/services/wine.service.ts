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

  getWines(): Observable<OverviewModel> {
    return this.http.get<GetWineResponse>('/api/wines').pipe(
      map((response) => {
        return new OverviewModel(
          new Wines(response.wines.map((wine) => {
            const type: WineType = wine.type === 'red' ? WineType.RED : WineType.WHITE;
            return new Wine(wine.name, type);
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
}

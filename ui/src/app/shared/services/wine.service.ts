import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Wine, WineModel, Wines, WineType} from '../model/wine.model';

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

  getWines(): Observable<WineModel> {
    return this.http.get<GetWineResponse>('/api/wines').pipe(
      map((response) => {
        return new WineModel(
          new Wines(response.wines.map((wine) => {
            const type = WineService.getWineType(wine);
            return new Wine(wine.id, wine.name, wine.winery, type, wine.grape, wine.year);
          })),
        );
      }),
    );
  }

  getWine(id: string): Observable<Wine> {
    return this.http.get<WineDto>(`/api/wines/${id}`).pipe(
      map((response) => {
        return new Wine(
          response.id,
          response.name,
          response.winery,
          WineService.getWineType(response),
          response.grape,
          response.year);
      })
    );
  }

  findByBottle(bottle: string): Observable<string> {
    return this.http.get<FindByBottleResponse>(`/api/wines/byBottle/${bottle}`)
      .pipe(
        map((res) => res.id)
      );
  }
}

export interface GetWineResponse {
  wines: WineDto[];
}

export interface WineDto {
  id: string;
  name: string;
  type: string;
  winery: string;
  grape: string;
  year: number;
}

interface FindByBottleResponse {
  id: string;
}

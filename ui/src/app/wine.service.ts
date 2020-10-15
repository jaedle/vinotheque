import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Model, Wine, Wines} from './wine';

@Injectable({
  providedIn: 'root'
})
export class WineService {

  constructor(private http: HttpClient) {
  }

  getWines(): Observable<Model> {
    return this.http.get<GetWineResponse>('/api/wines')
      .pipe(
        map((response) => {
          return new Model(
            new Wines(
              response.wines.map(wine => new Wine(wine.name)))
          );
        })
      );
  }
}

export interface GetWineResponse {
  wines: WineDto[];
}

export interface WineDto {
  name: string;
}

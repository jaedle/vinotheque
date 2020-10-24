import {TestBed} from '@angular/core/testing';

import {WineService} from './wine.service';
import {HttpClientTestingModule, HttpTestingController, } from '@angular/common/http/testing';
import {WineModel, Wine, Wines, WineType} from '../model/wine.model';

describe('WineService', () => {
  let service: WineService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(WineService);
    http = TestBed.inject(HttpTestingController);
  });

  it('creates', () => {
    expect(service).toBeTruthy();
  });

  it('fetches winelist', (done) => {
    const result = service.getWines();

    result.subscribe((model) => {
      expect(model).toEqual(
        new WineModel(new Wines([
          new Wine('id-1', 'a-red-wine', 'winery-1', WineType.RED, 'grape-1', 1991),
          new Wine('id-2', 'a-white-wine', 'winery-2', WineType.WHITE, 'grape-2', 1992),
          new Wine('id-3', 'a-rose-wine', 'winery-3', WineType.ROSE, 'grape-3', 1993),
          new Wine('id-4', 'a-sparkling-wine', 'winery-4', WineType.SPARKLING, 'grape-4', 1994),
        ])));
      done();
    });

    http
      .expectOne((req) => req.url === '/api/wines' && req.method === 'GET')
      .flush({
        wines: [
          {id: 'id-1', name: 'a-red-wine', type: 'red', winery: 'winery-1', grape: 'grape-1', year: 1991},
          {id: 'id-2', name: 'a-white-wine', type: 'white', winery: 'winery-2', grape: 'grape-2', year: 1992},
          {id: 'id-3', name: 'a-rose-wine', type: 'rose', winery: 'winery-3', grape: 'grape-3', year: 1993},
          {id: 'id-4', name: 'a-sparkling-wine', type: 'sparkling', winery: 'winery-4', grape: 'grape-4', year: 1994},
        ],
      });
  });

  it('fetches single wine', (done) => {
    const result = service.getWine('id-1');

    result.subscribe((model) => {
      expect(model).toEqual(
        new Wine('id-1', 'a-red-wine', 'winery-1', WineType.RED, 'grape-1', 1991)
      );
      done();
    });

    http
      .expectOne((req) => req.url === '/api/wines/id-1' && req.method === 'GET')
      .flush(
        {id: 'id-1', name: 'a-red-wine', type: 'red', winery: 'winery-1', grape: 'grape-1', year: 1991},
      );

  });
});

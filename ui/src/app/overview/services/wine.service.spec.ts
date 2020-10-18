import {TestBed} from '@angular/core/testing';

import {WineService} from '../services/wine.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {OverviewModel, Wine, Wines, WineType} from '../model/overview.model';

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
        new OverviewModel(new Wines([
          new Wine('a-red-wine', WineType.RED),
          new Wine('a-white-wine', WineType.WHITE),
          new Wine('a-rose-wine', WineType.ROSE),
          new Wine('a-sparkling-wine', WineType.SPARKLING),
        ])));
      done();
    });

    http
      .expectOne((req) => req.url === '/api/wines' && req.method === 'GET')
      .flush({
        wines: [
          {name: 'a-red-wine', type: 'red'},
          {name: 'a-white-wine', type: 'white'},
          {name: 'a-rose-wine', type: 'rose'},
          {name: 'a-sparkling-wine', type: 'sparkling'},
        ],
      });
  });
});

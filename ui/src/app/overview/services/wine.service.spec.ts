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
          new Wine('a-red-wine', 'winery-1', WineType.RED, 'grape-1'),
          new Wine('a-white-wine', 'winery-2', WineType.WHITE, 'grape-2'),
          new Wine('a-rose-wine', 'winery-3', WineType.ROSE, 'grape-3'),
          new Wine('a-sparkling-wine', 'winery-4', WineType.SPARKLING, 'grape-4'),
        ])));
      done();
    });

    http
      .expectOne((req) => req.url === '/api/wines' && req.method === 'GET')
      .flush({
        wines: [
          {name: 'a-red-wine', type: 'red', winery: 'winery-1', grape: 'grape-1'},
          {name: 'a-white-wine', type: 'white', winery: 'winery-2', grape: 'grape-2'},
          {name: 'a-rose-wine', type: 'rose', winery: 'winery-3', grape: 'grape-3'},
          {name: 'a-sparkling-wine', type: 'sparkling', winery: 'winery-4', grape: 'grape-4'},
        ],
      });
  });
});

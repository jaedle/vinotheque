import {TestBed} from '@angular/core/testing';

import {WineService} from './wine.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Model, Wine, Wines} from './wine';

describe('WineService', () => {
  let service: WineService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
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
      expect(model).toEqual(new Model(new Wines([
        new Wine('wine-1'),
        new Wine('wine-2')
      ])));
      done();
    });

    http
      .expectOne((req) => req.url === '/api/wines' && req.method === 'GET')
      .flush({
        wines: [
          {name: 'wine-1'},
          {name: 'wine-2'},
        ]
      });
  });
});

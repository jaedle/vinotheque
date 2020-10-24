import {RequestMock, Selector} from "testcafe";

const wineId = `/887479c5-1190-4897-a742-504a619ea4d`;

const wines = RequestMock()
  .onRequestTo('http://localhost:4200/api/wines')
  .respond({
    wines: [
      {id: wineId, name: 'name', type: 'red', winery: 'a-winery', grape: 'a-grape', year: 'Shiraz'},
    ],
  });

fixture`Detail page`
  .page`http://localhost:4200/wines`
  .requestHooks(wines);


test('is on detail page', async (t) => {
  await t.expect(Selector('body').innerText).contains('Wine Detail Page');
});


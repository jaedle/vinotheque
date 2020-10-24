import {RequestMock, Selector} from "testcafe";

const aWineId = 'a95ac96c-ced7-4d3e-9aa6-9fb513a46c2c';

const aWineName = 'Great Shiraz';
const aWinery = 'a-winery-1';
const aGrape = 'Shiraz';
const wine = RequestMock()
  .onRequestTo('http://localhost:4200/api/wines/' + aWineId)
  .respond(
    {
      id: aWineId,
      name: aWineName,
      type: 'red',
      winery: aWinery,
      grape: aGrape,
      year: 2001
    },
  );


fixture`Wine Detail Page`.page`http://localhost:4200/wines/${aWineId}`.requestHooks(wine);

test('title is correct', async (t) => {
  await t.expect(Selector('body').innerText).contains('Wine Detail Page');
});

function assertShowsDetail(t, key: string, expected: string) {
  return t.expect(
    Selector('tr')
      .find('td').withText(key).sibling().withText(expected)
      .visible
  ).eql(true);
}

test('shows wine details', async (t) => {
  await assertShowsDetail(t, "Name", aWineName);
  await assertShowsDetail(t, "Type", 'RED');
  await assertShowsDetail(t, "Winery", aWinery);
  await assertShowsDetail(t, "Year", '2001');
  await assertShowsDetail(t, "Grape", aGrape);
});


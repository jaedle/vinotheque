import {RequestMock, Selector} from 'testcafe';

const aRedWine = 'Great Shiraz';
const anotherRedWine = 'Wodden Pinot Noir';
const aWhiteWine = 'Banana Chardonnay';
const aSparklingWine = 'Mighty Bubbly';
const aRoseWine = 'Rubin Rose';

const winery1 = 'a-winery-1'
const winery2 = 'a-winery-2'
const winery3 = 'a-winery-3'
const winery4 = 'a-winery-4'
const winery5 = 'a-winery-5'

const red = 'red';
const white = 'white';
const sparkling = 'sparkling';
const rose = 'rose';

const wines = RequestMock()
  .onRequestTo('http://localhost:4200/api/wines')
  .respond({
    wines: [{name: aRedWine, type: red, winery: winery1},
      {name: anotherRedWine, type: red, winery: winery2},
      {name: aWhiteWine, type: white, winery: winery3},
      {name: aSparklingWine, type: sparkling, winery: winery4},
      {name: aRoseWine, type: rose, winery: winery5}
    ],
  });

const failure = RequestMock()
  .onRequestTo('http://localhost:4200/api/wines')
  .respond(null, 404);

fixture`Vinotheque`.page`http://localhost:4200/`.requestHooks(wines);

test('title is correct', async (t) => {
  await t.expect(Selector('title').innerText).eql('Vinotheque');
});

test('shows wines', async (t) => {
  await assertShowsWineWithDetails(t, aRedWine, winery1);
  await assertShowsWineWithDetails(t, anotherRedWine, winery2);
  await assertShowsWineWithDetails(t, aWhiteWine, winery3);
  await assertShowsWineWithDetails(t, aSparklingWine, winery4);
  await assertShowsWineWithDetails(t, aRoseWine, winery5);
});

async function assertShowsWineWithDetails(t, name: string, winery: string) {
  await t.expect(Selector('.wine').child('.wine-name').withText(name).visible).eql(true);
  await t.expect(Selector('.wine').child('.winery').withText(winery).visible).eql(true);
}

async function assertShowsWine(t, name: string) {
  return t.expect(Selector('.wine-name').withText(name).visible).eql(true);
}

test('shows only white wines on selection', async (t) => {
  await t.click(Selector('#show-white-wines'));

  await assertShowsWine(t, aWhiteWine);
  await assertDoesNotShowWine(t, aRedWine);
  await assertDoesNotShowWine(t, anotherRedWine);
  await assertDoesNotShowWine(t, aSparklingWine);
  await assertDoesNotShowWine(t, aRoseWine);
});

test('shows only red wines on selection', async (t) => {
  await t.click(Selector('#show-red-wines'));

  await assertShowsWine(t, aRedWine);
  await assertShowsWine(t, anotherRedWine);
  await assertDoesNotShowWine(t, aWhiteWine);
  await assertDoesNotShowWine(t, aSparklingWine);
  await assertDoesNotShowWine(t, aRoseWine);
});

test('shows only rose wines on selection', async (t) => {
  await t.click(Selector('#show-rose-wines'));

  await assertShowsWine(t, aRoseWine);
  await assertDoesNotShowWine(t, aSparklingWine);
  await assertDoesNotShowWine(t, aRedWine);
  await assertDoesNotShowWine(t, anotherRedWine);
  await assertDoesNotShowWine(t, aWhiteWine);
});

test('shows only sparkling wines on selection', async (t) => {
  await t.click(Selector('#show-sparkling-wines'));

  await assertShowsWine(t, aSparklingWine);
  await assertDoesNotShowWine(t, aRoseWine);
  await assertDoesNotShowWine(t, aRedWine);
  await assertDoesNotShowWine(t, anotherRedWine);
  await assertDoesNotShowWine(t, aWhiteWine);
});

test('remembers wine selection on refresh', async (t) => {
  await t.click(Selector('#show-sparkling-wines'));

  await t.eval(() => location.reload(true));

  await assertShowsWine(t, aSparklingWine);
  await assertDoesNotShowWine(t, aRoseWine);
  await assertDoesNotShowWine(t, aRedWine);
  await assertDoesNotShowWine(t, anotherRedWine);
  await assertDoesNotShowWine(t, aWhiteWine);
});

test('shows all wines again after filter selection', async (t) => {
  await t.click(Selector('#show-sparkling-wines'));
  await t.click(Selector('#show-all-wines'));

  await assertShowsWine(t, aRedWine);
  await assertShowsWine(t, anotherRedWine);
  await assertShowsWine(t, aWhiteWine);
  await assertShowsWine(t, aSparklingWine);
  await assertShowsWine(t, aRoseWine);
});

async function assertDoesNotShowWine(t, name: string) {
  return t.expect(Selector('.wine-name', {timeout: 0}).withText(name).visible).eql(false);
}

function generateWines(type: string, count: number) {
  const wines = [];
  for (let i = 0; i < count; i++) {
    wines.push(
      {name: `${type}-wine-${i}`, type: type, winery: `${type}-winery-${i}`}
    );
  }
  return wines;
}

function wineReponse() {
  return {
    wines: [
      ...generateWines(sparkling, 15),
      ...generateWines(white, 32),
      ...generateWines(rose, 11),
      ...generateWines(red, 10),
    ],
  };
}

const countResponse = RequestMock()
  .onRequestTo('http://localhost:4200/api/wines')
  .respond(wineReponse());

fixture`counts wines`.page`http://localhost:4200/`.requestHooks(countResponse);
test('shows count of wines', async (t) => {
  await t.expect(Selector('#show-all-wines').innerText).contains("(68)");
  await t.expect(Selector('#show-sparkling-wines').innerText).contains("(15)");
  await t.expect(Selector('#show-white-wines').innerText).contains("(32)");
  await t.expect(Selector('#show-rose-wines').innerText).contains("(11)");
  await t.expect(Selector('#show-red-wines').innerText).contains("(10)");
});

fixture`Error`.page`http://localhost:4200/`.requestHooks(failure);

test('shows error message', async (t) => {
  await t
    .expect(Selector('.content').innerText)
    .eql('could not fetch wines');
});

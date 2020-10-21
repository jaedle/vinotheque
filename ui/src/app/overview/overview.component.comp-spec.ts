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

const aRedWineGrape = 'Shiraz';
const anotherRedWineGrape = 'Pinot Noir';
const aWhiteWineGrape = 'Chardonnay';
const aSparklingWineGrape = 'Riesling';
const aRoseWineGrape = 'Sangiovese';

const aRedWineYear = 2001;
const anotherRedWineYear = 2010;
const aWhiteWineYear = 2015;
const aSparklingWineYear = 2019;
const aRoseWineYear = 2018;

const wines = RequestMock()
  .onRequestTo('http://localhost:4200/api/wines')
  .respond({
    wines: [
      {name: aRedWine, type: red, winery: winery1, grape: aRedWineGrape, year: aRedWineYear},
      {name: anotherRedWine, type: red, winery: winery2, grape: anotherRedWineGrape, year: anotherRedWineYear},
      {name: aWhiteWine, type: white, winery: winery3, grape: aWhiteWineGrape, year: aWhiteWineYear},
      {name: aSparklingWine, type: sparkling, winery: winery4, grape: aSparklingWineGrape, year: aSparklingWineYear},
      {name: aRoseWine, type: rose, winery: winery5, grape: aRoseWineGrape, year: aRoseWineYear}
    ],
  });

const failure = RequestMock()
  .onRequestTo('http://localhost:4200/api/wines')
  .respond(null, 404);


const toggleWineTypeFilter = Selector('#filter-types');
const whiteWinesButton = Selector('#show-white-wines');
const redWinesButton = Selector('#show-red-wines');
const sparklingWinesButton = Selector('#show-sparkling-wines');
const roseWinesButton = Selector('#show-rose-wines');

fixture`Vinotheque`.page`http://localhost:4200/`.requestHooks(wines);

test('title is correct', async (t) => {
  await t.expect(Selector('title').innerText).eql('Vinotheque');
});

test('shows all wines on no selection', async (t) => {
  await assertShowsWineWithDetails(t, aRedWine, winery1, aRedWineGrape, aRedWineYear);
  await assertShowsWineWithDetails(t, anotherRedWine, winery2, anotherRedWineGrape, anotherRedWineYear);
  await assertShowsWineWithDetails(t, aWhiteWine, winery3, aWhiteWineGrape, aWhiteWineYear);
  await assertShowsWineWithDetails(t, aSparklingWine, winery4, aSparklingWineGrape, aSparklingWineYear);
  await assertShowsWineWithDetails(t, aRoseWine, winery5, aRoseWineGrape, aRoseWineYear);
});

async function assertShowsWineWithDetails(t, name: string, winery: string, grape: string, year: number) {
  const currentWine = Selector('.wine').child('.wine-name').withText(name);
  await t.expect(currentWine.visible).eql(true);
  await t.expect(currentWine.sibling('.winery').withText(winery).visible).eql(true);
  await t.expect(currentWine.sibling('.grape').withText(grape).visible).eql(true);
  await t.expect(currentWine.sibling('.year').withText(year.toString()).visible).eql(true);
}

test('wine type selection is closed by default', async (t) => {
  await t.expect(Selector('#show-white-wines', {timeout: 0}).visible).eql(false);
});

test('shows only white wines on selection', async (t) => {
  await t.click(toggleWineTypeFilter);
  await t.click(whiteWinesButton);

  await assertShowsWine(t, aWhiteWine);
  await assertDoesNotShowWines(t, aRedWine, anotherRedWine, aSparklingWine, aRoseWine);
});

async function assertDoesNotShowWines(t, ...names: string[]) {
  for (let name of names) {
    await assertDoesNotShowWine(t, name);
  }
}

async function assertDoesNotShowWine(t, name: string) {
  return t.expect(Selector('.wine-name', {timeout: 0}).withText(name).visible).eql(false);
}

async function assertShowsWine(t, name: string) {
  return t.expect(Selector('.wine-name').withText(name).visible).eql(true);
}


test('shows only red wines on selection', async (t) => {
  await t.click(toggleWineTypeFilter);
  await t.click(redWinesButton);

  await assertShowsWines(t, aRedWine, anotherRedWine);
  await assertDoesNotShowWines(t, aWhiteWine, aSparklingWine, aRoseWine);
});

async function assertShowsWines(t, ...names: string[]) {
  for (let name of names) {
    await assertShowsWine(t, name);
  }
}

test('shows only rose wines on selection', async (t) => {
  await t.click(toggleWineTypeFilter);
  await t.click(roseWinesButton);

  await assertShowsWine(t, aRoseWine);
  await assertDoesNotShowWines(t, aSparklingWine, aRedWine, anotherRedWine, aWhiteWine);
});

test('shows only sparkling wines on selection', async (t) => {
  await t.click(toggleWineTypeFilter);
  await t.click(sparklingWinesButton);

  await assertShowsWine(t, aSparklingWine);
  await assertDoesNotShowWines(t, aRoseWine, aRedWine, anotherRedWine, aWhiteWine);
});

test('remembers wine selection on refresh', async (t) => {
  await t.click(toggleWineTypeFilter);
  await t.click(sparklingWinesButton);

  await t.eval(() => location.reload());

  await assertShowsWine(t, aSparklingWine);
  await assertDoesNotShowWines(t, aRoseWine, aRedWine, anotherRedWine, aWhiteWine);
});

test('shows all wines again after filter selection', async (t) => {
  await t.click(toggleWineTypeFilter);
  await t.click(sparklingWinesButton);
  await t.click(sparklingWinesButton);

  await assertShowsWines(t, aRedWine, anotherRedWine, aWhiteWine, aSparklingWine, aRoseWine);
});

test.skip('aggregates wine type filters', async (t) => {
  await t.click(toggleWineTypeFilter);
  await t.click(sparklingWinesButton);
  await t.click(redWinesButton);

  await assertShowsWines(t, aSparklingWine, aRedWine, anotherRedWine);
  await assertDoesNotShowWines(t, aWhiteWine, aRoseWine);
});


function generateWines(type: string, count: number) {
  const wines = [];
  for (let i = 0; i < count; i++) {
    wines.push(
      {
        name: `${type}-wine-${i}`,
        type: type,
        winery: `${type}-winery-${i}`,
        grape: `${type}-grape-${i}`,
        year: 1990 + i
      }
    );
  }
  return wines;
}

const countFixture = {
  sparkling: 15,
  white: 32,
  rose: 11,
  red: 10,
};


function wineResponse() {
  return {
    wines: [
      ...generateWines(sparkling, countFixture.sparkling),
      ...generateWines(white, countFixture.white),
      ...generateWines(rose, countFixture.rose),
      ...generateWines(red, countFixture.red),
    ],
  };
}

const countResponse = RequestMock()
  .onRequestTo('http://localhost:4200/api/wines')
  .respond(wineResponse());

fixture`counts wines`.page`http://localhost:4200/`.requestHooks(countResponse);
test('shows count of wines', async (t) => {
  await t.click(toggleWineTypeFilter);

  await t.expect(sparklingWinesButton.innerText).contains(`(${countFixture.sparkling})`);
  await t.expect(whiteWinesButton.innerText).contains(`(${countFixture.white})`);
  await t.expect(roseWinesButton.innerText).contains(`(${countFixture.rose})`);
  await t.expect(redWinesButton.innerText).contains(`(${countFixture.red})`);
});

fixture`Error`.page`http://localhost:4200/`.requestHooks(failure);

test('shows error message', async (t) => {
  await t
    .expect(Selector('.content').innerText)
    .eql('could not fetch wines');
});

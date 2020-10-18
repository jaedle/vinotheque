import {RequestMock, Selector} from 'testcafe';

const aRedWine = 'Great Shiraz';
const anotherRedWine = 'Wodden Pinot Noir';
const aWhiteWine = 'Banana Chardonnay';
const aSparklingWine = 'Mighty Bubbly';
const aRoseWine = 'Rubin Rose';

const red = 'red';
const white = 'white';
const sparkling = 'sparkling';
const rose = 'rose';

const wines = RequestMock()
  .onRequestTo('http://localhost:4200/api/wines')
  .respond({
    wines: [{name: aRedWine, type: red},
      {name: anotherRedWine, type: red},
      {name: aWhiteWine, type: white},
      {name: aSparklingWine, type: sparkling},
      {name: aRoseWine, type: rose}
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
  await assertShowsWine(t, aRedWine);
  await assertShowsWine(t, anotherRedWine);
  await assertShowsWine(t, aWhiteWine);
  await assertShowsWine(t, aSparklingWine);
  await assertShowsWine(t, aRoseWine);
});

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

test('shows all wines again after filter selection',  async (t) => {
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

fixture`Error`.page`http://localhost:4200/`.requestHooks(failure);

test('shows error message', async (t) => {
  await t
    .expect(Selector('.content').innerText)
    .eql('could not fetch wines');
});

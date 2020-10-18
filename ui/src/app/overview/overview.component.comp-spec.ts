import {RequestMock, Selector} from 'testcafe';

const aRedWine = 'Great Shiraz';
const anotherRedWine = 'Wodden Pinot Noir';
const aWhiteWine = 'Banana Chardonnay';
const redWine = 'red';
const whiteWine = 'white';

const wines = RequestMock()
  .onRequestTo('http://localhost:4200/api/wines')
  .respond({
    wines: [{name: aRedWine, type: redWine},
      {name: anotherRedWine, type: redWine},
      {name: aWhiteWine, type: whiteWine}
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
});

async function assertShowsWine(t, name: string) {
  return t.expect(Selector('.wine-name').withText(name).visible).eql(true);
}

test('shows only selected wines', async (t) => {
  await t.click(Selector('#show-white-wines'));

  await assertShowsWine(t, aWhiteWine);
  await assertDoesNotShowWine(t, aRedWine);
  await assertDoesNotShowWine(t, anotherRedWine);
});

async function assertDoesNotShowWine(t, name: string) {
  return t.expect(Selector('.wine-name').withText(name).visible).eql(false);
}

fixture`Error`.page`http://localhost:4200/`.requestHooks(failure);

test('shows error message', async (t) => {
  await t
    .expect(Selector('.content').innerText)
    .eql('could not fetch wines');
});

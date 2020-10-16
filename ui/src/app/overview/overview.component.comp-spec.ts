import {RequestMock, Selector} from 'testcafe';

const aRedWine = 'Great Shiraz';
const anotherRedWine = 'Wodden Pinot Noir';
const aWhiteWine = 'Banana Chardonnay';

const winelist = RequestMock()
  .onRequestTo('http://localhost:4200/api/wines')
  .respond({
      "wines": [
        {"name": aRedWine},
        {"name": anotherRedWine},
        {"name": aWhiteWine}
      ]
    }
  )

const failure = RequestMock()
  .onRequestTo('http://localhost:4200/api/wines')
  .respond(null, 404);


fixture`Vinotheque`
  .page`http://localhost:4200/`
  .requestHooks(winelist);

test('title is correct', async t => {
  await t
    .expect(Selector("title").innerText).eql('Vinotheque');
});

test('shows wines', async t => {
  await assertShowsWine(t, aRedWine);
  await assertShowsWine(t, anotherRedWine);
  await assertShowsWine(t, aWhiteWine);
});


async function assertShowsWine(t, name: string) {
  return t
    .expect(Selector('.wine-name').withText(name).visible).eql(true);
}

fixture`Error`
  .page`http://localhost:4200/`
  .requestHooks(failure);

test('shows error message', async t => {
  await t.expect(Selector(".content").withText("").innerText).eql('could not fetch wines');
});

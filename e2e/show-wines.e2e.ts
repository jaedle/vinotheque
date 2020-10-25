import {Selector} from 'testcafe';

fixture`Vinotheque`.page`http://localhost:8000/`;

test('shows wine overview', async (t) => {
  await t
      .expect(Selector('.wine-name').withText('Great Shiraz').visible)
      .eql(true);
});

test('shows wine details', async (t) => {
  await t.click(Selector('.wine-name').withText('Great Shiraz'));

  await t.expect(Selector('body').withText('RED').visible).eql(true);
});

fixture`External links`.page`http://localhost:8000/link?bottle=1337`;

test('opens wine details by bottle id', async (t) => {
  await t.expect(Selector('body').withText('RED').visible).eql(true);
});


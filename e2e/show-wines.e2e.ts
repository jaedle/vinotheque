import {Selector} from 'testcafe';

fixture`Vinotheque`.page`http://localhost:8000/`;

test('wine overview', async (t) => {
  await t
      .expect(Selector('.wine-name').withText('Great Shiraz').visible)
      .eql(true);
});

test('ui details', async (t) => {
  await t.click(Selector('.wine-name').withText('Great Shiraz'));

  await t.expect(Selector('body').withText('RED').visible).eql(true);
});

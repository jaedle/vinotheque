import {Selector} from "testcafe";

fixture`Vinotheque`.page`http://localhost:4200/wines/id-1`;

test('title is correct', async (t) => {
  await t.expect(Selector('body').innerText).contains('Wine Detail Page');
});

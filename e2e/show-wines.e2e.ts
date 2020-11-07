import {Selector} from 'testcafe';

fixture`Vinotheque`.page`https://vinotheque.foo.bar:8443/`;

async function login(t: TestController) {
  await t.typeText(Selector("#username"), "drink");
  await t.typeText(Selector("#password"), "wine");
  await t.click(Selector("button"));
}

test('shows wine overview', async (t) => {
  await login(t);

  await t
      .expect(Selector('.wine-name').withText('Great Shiraz').visible)
      .eql(true);
});

test('shows wine details', async (t) => {
  await login(t);

  await t.click(Selector('.wine-name').withText('Great Shiraz'));

  await t.expect(Selector('body').withText('RED').visible).eql(true);
});

fixture`External links`.page`https://vinotheque.foo.bar:8443/link?bottle=1337`;

// temporary disabled because of https://github.com/greenpau/caddy-auth-jwt/issues/38
test.skip('opens wine details by bottle id', async (t) => {
  await login(t);

  await t.expect(Selector('body').withText('RED').visible).eql(true);
});


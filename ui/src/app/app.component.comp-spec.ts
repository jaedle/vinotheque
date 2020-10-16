import {Selector} from 'testcafe';

import {RequestMock} from 'testcafe';

const mock = RequestMock()
  .onRequestTo('http://localhost:4200/api/wines')
  .respond({
      "wines": [
        {"name": "Great Shiraz"},
        {"name": "Wodden Pinot Noir"}
      ]
    }
  )

fixture`Vinotheque`
  .page`http://localhost:4200/`
  .requestHooks(mock);

test('title is correct', async t => {
  await t
    .expect(Selector("title").innerText).eql('Vinotheque');
});

test('shows wines', async t => {
  await t
    .expect(Selector('.wine-name').withText('Great Shiraz').visible).eql(true);
  await t
    .expect(Selector('.wine-name').withText('Wodden Pinot Noir').visible).eql(true);
});

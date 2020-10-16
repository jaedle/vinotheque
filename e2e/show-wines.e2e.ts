import {Selector} from 'testcafe';

fixture`Vinotheque`
    .page`http://localhost:8000/`;

test('ui fetches wines from backend', async t => {
    await t
        .expect(Selector('.wine-name').withText('Great Shiraz').visible).eql(true);
});

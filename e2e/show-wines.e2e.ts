import {Selector} from 'testcafe';

fixture`Vinotheque`
    .page`http://localhost:8000/`;

test('Title is correct', async t => {
    await t
        .expect(Selector("title").innerText).eql('Vinotheque');
});

test('shows wines', async t => {
    await t
        .expect(Selector('.wine-name').withText('Great Shiraz').visible).eql(true);
    await t
        .expect(Selector('.wine-name').withText('Wodden Pinot Noir').visible).eql(true);
});

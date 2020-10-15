import {Selector} from 'testcafe';

fixture`Vinotheque`
    .page`http://localhost:8000/`;

test('Title is correct', async t => {
    await t
        .expect(Selector("title").innerText).eql('Vinotheque');
});

test('shows wines', async t => {
    await t
        .expect(Selector('li').withText('Great Shiraz').visible).eql(true);
    await t
        .expect(Selector('li').withText('Wodden Pinot Noir').visible).eql(true);
});

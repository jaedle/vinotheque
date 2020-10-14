import { Selector } from 'testcafe';

fixture`Vinotheque`
    .page`http://localhost:4200/`;

test('Title is correct', async t => {
    await t
        .expect(Selector("title").innerText).eql('Vinotheque');
});

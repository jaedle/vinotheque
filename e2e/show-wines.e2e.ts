import { Selector } from 'testcafe';

fixture`Vinotheque`
    .page`http://localhost:8000/`;

test('Title is correct', async t => {
    await t
        .expect(Selector("title").innerText).eql('Vinotheque');
});

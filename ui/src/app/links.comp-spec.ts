import {ClientFunction, RequestMock, Selector} from "testcafe";

const aWineId = 'a95ac96c-ced7-4d3e-9aa6-9fb513a46c2c';

const aBottle = '1';
const anUnknownBottle = '2';

const wine = RequestMock()
  .onRequestTo(`http://localhost:4200/api/wines/byBottle/${aBottle}`)
  .respond({id: aWineId});


fixture`Links`.page`http://localhost:4200/link?bottle=${aBottle}`.requestHooks(wine);

test('opens wine detail page by bottle if exists', async (t) => {
  const getLocation = ClientFunction(() => document.location.href);

  await t
    .expect(getLocation()).eql(`http://localhost:4200/wines/${aWineId}`);
});

const notFound = RequestMock()
  .onRequestTo(`http://localhost:4200/api/wines/byBottle/${anUnknownBottle}`)
  .respond(undefined, 404);

fixture`unknown bottle`.page`http://localhost:4200/link?bottle=${anUnknownBottle}`.requestHooks(notFound);

test('shows error if bottle is unknown', async (t) => {
  await t.expect(Selector('body').innerText).contains(`Could not find bottle: ${anUnknownBottle}`);
});

fixture.skip`Wrong links`.page`http://localhost:4200/link?bottle=${aBottle}`.requestHooks(wine);

test('shows error on invalid link', async (t) => {
  await t.expect(Selector('body').innerText).eql('Could not find bottle');
});

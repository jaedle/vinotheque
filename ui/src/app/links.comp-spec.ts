import {ClientFunction, RequestMock} from "testcafe";

const aWineId = 'a95ac96c-ced7-4d3e-9aa6-9fb513a46c2c';

const aBottle = '1';

const wine = RequestMock()
  .onRequestTo(`http://localhost:4200/api/wines/byBottle/${aBottle}`)
  .respond({id: aWineId});

fixture`Links`.page`http://localhost:4200/link?bottle=${aBottle}`.requestHooks(wine);

test('opens wine detail page by bottle if exists', async (t) => {
  const getLocation = ClientFunction(() => document.location.href);

  await t
    .expect(getLocation()).eql(`http://localhost:4200/wines/${aWineId}`);
});

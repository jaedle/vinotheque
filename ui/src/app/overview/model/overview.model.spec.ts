import {OverviewModel, Wine, Wines, WineType} from './overview.model';

describe('OverviewModelSpec', () => {
  const aRedWine = new Wine('a-red-wine', 'TODO', WineType.RED);
  const aWhiteWine = new Wine('a-white-wine', 'TODO', WineType.WHITE);
  const aSparklingWine = new Wine('a-sparkling-wine', 'TODO', WineType.SPARKLING);
  const aRoseWine = new Wine('a-sparkling-wine', 'TODO', WineType.ROSE);

  it('sohws all wines on beginning', () => {
    const model = new OverviewModel(new Wines([aRedWine, aWhiteWine, aSparklingWine, aRoseWine]));

    expect(model.getWines()).toEqual(new Wines([aRedWine, aWhiteWine, aSparklingWine, aRoseWine]));
  });

  it('shows only white wines if filtered', () => {
    const model = new OverviewModel(new Wines([aRedWine, aWhiteWine, aSparklingWine, aRoseWine]));

    model.filter(WineType.WHITE);

    expect(model.getWines()).toEqual((new Wines([aWhiteWine])));
  });

  it('shows only red wines if filtered', () => {
    const model = new OverviewModel(new Wines([aRedWine, aWhiteWine, aSparklingWine, aRoseWine]));

    model.filter(WineType.RED);

    expect(model.getWines()).toEqual(new Wines([aRedWine]));
  });

  it('shows only sparkling wines if filtered', () => {
    const model = new OverviewModel(new Wines([aRedWine, aWhiteWine, aSparklingWine, aRoseWine]));

    model.filter(WineType.SPARKLING);

    expect(model.getWines()).toEqual(new Wines([aSparklingWine]));
  });

  it('shows only rose wines if filtered', () => {
    const model = new OverviewModel(new Wines([aRedWine, aWhiteWine, aSparklingWine, aRoseWine]));

    model.filter(WineType.ROSE);

    expect(model.getWines()).toEqual(new Wines([aRoseWine]));
  });

  it('resets filter', () => {
    const model = new OverviewModel(new Wines([aRedWine, aWhiteWine, aSparklingWine, aRoseWine]));
    model.filter(WineType.ROSE);
    model.resetFilter();

    expect(model.getWines()).toEqual(new Wines([aRedWine, aWhiteWine, aSparklingWine, aRoseWine]));
  });
});

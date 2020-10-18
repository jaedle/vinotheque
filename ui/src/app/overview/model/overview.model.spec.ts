import {OverviewModel, Wine, Wines, WineType} from './overview.model';

describe('OverviewModelSpec', () => {
  const aRedWine = new Wine('a-red-wine', WineType.RED);
  const aWhiteWine = new Wine('a-white-wine', WineType.WHITE);
  const aSparklingWine = new Wine('a-sparkling-wine', WineType.SPARKLING);
  const aRoseWine = new Wine('a-sparkling-wine', WineType.ROSE);

  it('sohws all wines on beginning', () => {
    const model = new OverviewModel(new Wines([aRedWine, aWhiteWine, aSparklingWine, aRoseWine]));

    expect(model.getWines()).toEqual([aRedWine, aWhiteWine, aSparklingWine, aRoseWine]);
  });

  it('shows only white wines if filtered', () => {
    const model = new OverviewModel(new Wines([aRedWine, aWhiteWine, aSparklingWine, aRoseWine]));

    model.filter(WineType.WHITE);

    expect(model.getWines()).toEqual([aWhiteWine]);
  });

  it('shows only red wines if filtered', () => {
    const model = new OverviewModel(new Wines([aRedWine, aWhiteWine, aSparklingWine, aRoseWine]));

    model.filter(WineType.RED);

    expect(model.getWines()).toEqual([aRedWine]);
  });

  it('shows only sparkling wines if filtered', () => {
    const model = new OverviewModel(new Wines([aRedWine, aWhiteWine, aSparklingWine, aRoseWine]));

    model.filter(WineType.SPARKLING);

    expect(model.getWines()).toEqual([aSparklingWine]);
  });

  it('shows only rose wines if filtered', () => {
    const model = new OverviewModel(new Wines([aRedWine, aWhiteWine, aSparklingWine, aRoseWine]));

    model.filter(WineType.ROSE);

    expect(model.getWines()).toEqual([aRoseWine]);
  });

  it('resets filter', () => {
    const model = new OverviewModel(new Wines([aRedWine, aWhiteWine, aSparklingWine, aRoseWine]));
    model.filter(WineType.ROSE);
    model.resetFilter();

    expect(model.getWines()).toEqual([aRedWine, aWhiteWine, aSparklingWine, aRoseWine]);
  });
});

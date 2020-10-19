import {OverviewModel, Wine, Wines, WineType} from './overview.model';


describe('OverviewModelSpec', () => {
  const aRedWine = new Wine('a-red-wine', 'TODO', WineType.RED, 'TODO', 1010);
  const aWhiteWine = new Wine('a-white-wine', 'TODO', WineType.WHITE, 'TODO', 1010);
  const aSparklingWine = new Wine('a-sparkling-wine', 'TODO', WineType.SPARKLING, 'TODO', 1010);
  const aRoseWine = new Wine('a-sparkling-wine', 'TODO', WineType.ROSE, 'TODO', 1010);

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

  it('counts wines', () => {
    const model = new OverviewModel(new Wines([
      ...generateWines(WineType.RED, 10),
      ...generateWines(WineType.WHITE, 15),
      ...generateWines(WineType.SPARKLING, 12),
      ...generateWines(WineType.ROSE, 5)
    ]));

    expect(model.count()).toEqual(10 + 15 + 12 + 5);
    expect(model.countFor(WineType.RED)).toEqual(10);
    expect(model.countFor(WineType.WHITE)).toEqual(15);
    expect(model.countFor(WineType.SPARKLING)).toEqual(12);
    expect(model.countFor(WineType.ROSE)).toEqual(5);
  });

  function generateWines(type: string, count: number): Wine[] {
    const wines = [];
    for (let i = 0; i < count; i++) {
      wines.push(
        {name: `${type}-wine-${i}`, type, winery: `${type}-winery-${i}`}
      );
    }

    return wines;
  }
});

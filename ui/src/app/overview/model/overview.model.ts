export class OverviewModel {

  private active: WineType | undefined;

  constructor(public readonly wines: Wines) {
    this.active = undefined;
  }

  getWines(): Wines {
    if (this.active === undefined) {
      return this.wines;
    }

    return new Wines(this.wines.wines.filter(wine => wine.type === this.active));
  }

  filter(type: WineType): void {
    this.active = type;
  }

  resetFilter(): void {
    this.active = undefined;
  }

  countFor(type: WineType): number {
    return this.wines.wines.filter(wine => wine.type === type).length;
  }

  count(): number {
    return this.wines.wines.length;
  }
}

export class Wines {
  constructor(public readonly wines: Wine[]) {
  }
}

export class Wine {
  constructor(public readonly name: string,
              public readonly winery: string,
              public readonly type: WineType,
              public readonly grape: string) {
  }
}

export enum WineType {
  RED = 'RED',
  WHITE = 'WHITE',
  SPARKLING = 'SPARKLING',
  ROSE = 'ROSE',
}

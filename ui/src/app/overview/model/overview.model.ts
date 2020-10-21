export class OverviewModel {

  private active: WineType[];

  constructor(public readonly wines: Wines) {
    this.resetFilter();
  }

  getWines(): Wines {
    if (this.active.length === 0) {
      return this.wines;
    }

    const wines = this.wines.wines.filter(wine => {
      for (const type of this.active) {
        if (wine.type === type) {
          return true;
        }
      }
      return false;
    });
    return new Wines(wines);
  }
  resetFilter(): void {
    this.active = [];
  }

  filter(type: WineType[]): void {
    this.active = type;
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
              public readonly grape: string,
              public readonly year: number) {
  }
}

export enum WineType {
  RED = 'RED',
  WHITE = 'WHITE',
  SPARKLING = 'SPARKLING',
  ROSE = 'ROSE',
}

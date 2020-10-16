export class OverviewModel {
  constructor(public readonly wines: Wines) {
  }
}

export class Wines {
  constructor(public readonly wines: Wine[]) {
  }
}

export class Wine {
  constructor(public readonly name: string) {
  }
}

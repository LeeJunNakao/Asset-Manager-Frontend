export class CustomSet<T> extends Set {
  constructor(arr: T[]) {
    super(arr);
  }

  add(value: T) {
    const stringifiedValue = JSON.stringify(value);
    const stringifiedObjects = Array.from(this.values()).map((o) =>
      JSON.stringify(o)
    );

    const parsedValues = stringifiedObjects.includes(stringifiedValue)
      ? stringifiedObjects.filter((o) => o !== stringifiedValue)
      : [...stringifiedObjects, stringifiedValue];

    this.clear();
    parsedValues.forEach((o) => super.add(JSON.parse(o)));

    return this;
  }
}

import { sortByDate } from 'utils/parser/date';

export type Item = {
  date: Date;
  isPurchase: boolean;
  quantity: number;
  value: number;
};

type SumData = {
  quantity: number;
  value: number;
};

const reduceItems = (acc: SumData, curr: Item) => ({
  value: acc.value + curr.value,
  quantity: acc.quantity + curr.quantity,
});

const weightedSum = (acc: SumData, curr: SumData) => ({
  value: acc.value + curr.value * curr.quantity,
  quantity: acc.quantity + curr.quantity,
});

export class AvgPriceCalculator {
  private sortedItems: Item[];
  private sellItems: Item[];
  private purchaseItems: Item[];
  private reducedSold: SumData;

  constructor(private items: Item[]) {
    this.sortedItems = items.sort(sortByDate);
    this.purchaseItems = this.sortedItems.filter((i) => i.isPurchase);
    this.sellItems = this.sortedItems
      .filter((i) => !i.isPurchase)
      .map((i) => ({ ...i, quantity: i.quantity * -1 }));
    this.reducedSold = this.sellItems.reduce(reduceItems, {
      value: 0,
      quantity: 0,
    });
  }

  private reduceSoldItems(boughtItems: Item[], totalSold: number): Item[] {
    const [currBought, ...restBought] = boughtItems;
    const currBalance = (currBought?.quantity || 0) + totalSold;

    if (!currBalance) return restBought;
    if (restBought.length && currBalance < 0) {
      return this.reduceSoldItems(restBought, currBalance);
    }

    return [{ ...currBought, quantity: currBalance }, ...restBought];
  }

  calculate(): number {
    const purchasesDeducted = this.reduceSoldItems(
      this.purchaseItems,
      this.reducedSold.quantity
    );

    const summedPurchases = purchasesDeducted.reduce(weightedSum, {
      quantity: 0,
      value: 0,
    });

    return summedPurchases.quantity
      ? summedPurchases.value / summedPurchases.quantity
      : 0;
  }
}

export default AvgPriceCalculator;

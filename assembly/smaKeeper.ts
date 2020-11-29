import { SlidingWindowArr } from './slidingWindowArr';


function sum(arr: f32[]): f32 {
  let sum: f32 = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

export class SmaKeeper {
  private period: i32;
  private historyValues: SlidingWindowArr;
  private currentSma: f32 = 0;
  constructor(period: i32) {
    this.period = period;
    this.historyValues = new SlidingWindowArr(this.period);
  }

  add(val: f32): void {
    if (this.historyValues.length() >= this.period) {
      // we need to reduce the first value and add the last value
      const periodF32 = this.period as f32;
      this.currentSma = this.currentSma - this.historyValues.first() / periodF32 + val / periodF32;
      this.historyValues.push(val);
    } else {
      // the length hasn't reached max, we can just add to new sma
      this.historyValues.push(val);
      const lenF32 = this.historyValues.length() as f32;
      this.currentSma = sum(this.historyValues.toUnorderedArr()) / lenF32;
    }
  }

  get(): f32 {
    if (this.historyValues.length() === 0) {
      throw new Error(`SmaKeeper cannot get sma when there is no value added yet`);
    }
    return this.currentSma;
  }

  length(): i32 {
    return this.historyValues.length();
  }

  getPeriod(): i32 {
    return this.period;
  }
}

// The entry file of your WebAssembly module.

export class SlidingWindowArr {
  private arr: f32[] = [];
  private maxLen: i32;
  private cursor: i32 = 0;

  constructor(maxLen: i32) {
    this.maxLen = maxLen;
  }

  setMaxLen(maxLen: i32): void {
    this.maxLen = maxLen;
  }

  toUnorderedArr(): f32[] {
    return this.arr;
  }

  toOrderedArr(): f32[] {
    const ret: f32[] = new Array(this.arr.length);
    for (let i = 0; i < this.arr.length; i++) {
      ret[i] = this.get(i);
    }
    return ret;
  }

  getMaxLen(): i32 {
    return this.maxLen;
  }

  push(val: f32): void {
    const arr = this.arr;
    if (arr.length < this.maxLen) {
      arr.push(val);
    } else {
      arr[this.cursor % this.maxLen] = val;
      this.cursor++;
    }
  }

  get(i: i32): f32 {
    let newI = i;
    if (i < 0) {
      newI = this.arr.length + i;
    }
    return this.arr[(this.cursor + newI) % this.maxLen];
  }

  set(i: i32, item: f32): void {
    this.arr[(this.cursor + i) % this.maxLen] = item;
  }

  first(): f32 {
    return this.get(0);
  }

  last(): f32 {
    return this.get(this.arr.length - 1);
  }

  length(): i32 {
    return this.arr.length;
  }

  isFull(): boolean {
    return this.arr.length === this.maxLen;
  }
}

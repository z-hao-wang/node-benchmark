import { SmaKeeper } from './smaKeeper';
export class ReceiveTrade {
    smaKeepers: SmaKeeper[];
    constructor(count: i32) {
        this.smaKeepers = [new SmaKeeper(count), new SmaKeeper(count), new SmaKeeper(count), new SmaKeeper(count), new SmaKeeper(count)]
    }

    add(val: f32): void {
        for (let i = 0; i < this.smaKeepers.length; i++) {
            this.smaKeepers[i].add(val);
        }
    }

    get(): f32 {
        return this.smaKeepers[0].get();
    }
}

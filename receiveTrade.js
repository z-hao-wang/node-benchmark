const { SmaKeeper } = require('./smaKeeper');
class ReceiveTrade {

  constructor(count) {
    this.smaKeepers = [new SmaKeeper(count)]
  }

  add(val) {
    for (let i = 0; i < this.smaKeepers.length; i++) {
      this.smaKeepers[i].add(val);
    }
  }

  get() {
    return this.smaKeepers[0].get();
  }
}

module.exports = { ReceiveTrade };
function getEma(periods, price, prevEMA = price) {
  const k = 2 / (periods + 1);
  return price * k + prevEMA * (1 - k);
}

const { sum } = require('./common');

class EmaKeeper {
  period = 0;
  dataLen = 0;
  ema = 0;
  // only used for length not reached period
  historyValues = [];

  constructor(options ) {
    this.period = options.period;
  }

  add(price) {
    this.dataLen++;
    if (this.dataLen < this.period) {
      this.historyValues.push(price);
    } else if (this.dataLen === this.period) {
      this.historyValues.push(price);
      this.ema = sum(this.historyValues) / this.historyValues.length;
    } else {
      this.ema = getEma(this.period, price, this.ema);
    }
    return this.ema;
  }

  peekNext(price) {
    return getEma(this.period, price, this.ema);
  }

  get() {
    return this.ema;
  }
}

module.exports = {
  EmaKeeper
}
const { MacdKeeper } = require('./macdKeeper');
const { SmaKeeper } = require('./smaKeeper');
const cpp = require('bindings')('cpp');
(() => {
  async function main() {

    const rand = Math.random;
    const tfArr = [
      {
        r: 10000,
      },
    ];
    let j = 0;
    while (j++ < 5000000) {
      const lastTf = tfArr[tfArr.length - 1];
      tfArr.push({
        r: lastTf.r * (1 + rand() * 0.0002 - 0.0001),
      });
    }

    const startTs = Date.now();
    let i = 0;
    while (i++ < 2) {
      const macd = new MacdKeeper({ fastPeriod: 12, slowPeriod: 26, signalPeriod: 9 });
      const sma = new SmaKeeper({ period: 3000 });
      // tfArr.forEach(tf => macd.add(tf.r));
      tfArr.forEach(tf => sma.add(tf.r));
      console.log(`round ${i} sma=${sma.get()} took:${Date.now() - startTs}`,);
    }
    console.log(`====benchmark nodejs total took ${Date.now() - startTs}`);

    const startTs2 = Date.now();
    i = 0;
    while (i++ < 2) {
      const sma = new cpp.SmaKeeper(3000);
      tfArr.forEach(tf => sma.add(tf.r));
      console.log(`round ${i} sma=${sma.get()} took:${Date.now() - startTs2}`,);
    }
    console.log(`====benchmark cpp total took ${Date.now() - startTs2}`);
  }

  main();
})();
// node index.js

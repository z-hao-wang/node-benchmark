const { MacdKeeper } = require('./macdKeeper');
const { SmaKeeper } = require('./smaKeeper');
const { ReceiveTrade } = require('./receiveTrade');
const cpp = require('bindings')('cpp');
const WebAssembly = require("./index");
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

    let startTs = Date.now();
    let i = 0;
    while (i++ < 1) {
      // const macd = new MacdKeeper({ fastPeriod: 12, slowPeriod: 26, signalPeriod: 9 });
      const receiver = new SmaKeeper( 3000 );
      // tfArr.forEach(tf => macd.add(tf.r));
      tfArr.forEach(tf => receiver.add(tf.r));
      console.log(`round ${i} sma=${receiver.get()} took:${Date.now() - startTs}`,);
    }
    console.log(`====benchmark nodejs total took ${Date.now() - startTs}`);

    startTs = Date.now();
    i = 0;
    while (i++ < 1) {
      const sma = new cpp.SmaKeeper(3000);
      tfArr.forEach(tf => sma.add(tf.r));
      console.log(`round ${i} sma=${sma.get()} took:${Date.now() - startTs}`,);
    }
    console.log(`====benchmark cpp total took ${Date.now() - startTs}`);

    startTs = Date.now();
    i = 0;
    while (i++ < 1) {
      const receiver = new WebAssembly.SmaKeeper(3000);
      tfArr.forEach(tf => receiver.add(tf.r));
      console.log(`round ${i} sma=${receiver.get()} took:${Date.now() - startTs}`,);
    }
    console.log(`====benchmark wasm total took ${Date.now() - startTs}`);
  }

  main();
})();
// npm run asbuild && node benchmark.js

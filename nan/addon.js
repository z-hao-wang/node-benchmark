var addon = require('bindings')('addon');
var Benchmark = require('benchmark')
var suite = new Benchmark.Suite;
var { SmaKeeper } = require('../smaKeeper');
(() => {
  // async function main() {
  //
  //   const rand = Math.random;
  //   const tfArr = [
  //     {
  //       r: 10000,
  //     },
  //   ];
  //   let j = 0;
  //   while (j++ < 5000000) {
  //     const lastTf = tfArr[tfArr.length - 1];
  //     tfArr.push({
  //       r: lastTf.r * (1 + rand() * 0.0002 - 0.0001),
  //     });
  //   }
  //
  //   let startTs = Date.now();
  //   let i = 0;
  //
  //   while (i++ < 1) {
  //     const sma = new addon.MyObject(3000);
  //     tfArr.forEach(tf => sma.add(tf.r));
  //     console.log(`round ${i} sma=${sma.get()} took:${Date.now() - startTs}`,);
  //   }
  //   console.log(`====benchmark cpp nan total took ${Date.now() - startTs}`);
  // }
  //
  // main();
  // const tfArr = [
  //   {
  //     r: 10000,
  //   },
  // ];
  // let j = 0;
  // while (j++ < 5000000) {
  //   const lastTf = tfArr[tfArr.length - 1];
  //   tfArr.push({
  //     r: lastTf.r * (1 + rand() * 0.0002 - 0.0001),
  //   });
  // }
})();

suite.add(`c++ addon`, function () {
  const sma = new addon.MyObject(300);
  let i = 0;
  while(i++ < 50000) {
    sma.add(Math.random());
  }
}).add(`pure cpp`, function () {
  const sma = new addon.MyObject(300);
  sma.pureCpp();
}).add(`js native`, function () {
  const sma = new SmaKeeper(300);
  let i = 0;
  while(i++ < 50000) {
    sma.add(Math.random());
  }
})
  .on('cycle', cycle)
  .on('complete', complete).run();
function cycle(event) {
  console.log(String(event.target));
}
function complete(a,b) {
  console.log('Fastest: ' + this.filter('fastest').map('name'));
  console.log('Slowest: ' + this.filter('slowest').map('name'));
}
/*
c++ addon x 282 ops/sec ±3.52% (76 runs sampled)
js native x 883 ops/sec ±2.58% (80 runs sampled)
pure cpp x 1,454 ops/sec ±1.57% (88 runs sampled)
*/
const assert = require("assert");
const myModule = require("..");

const ret = myModule.SlidingWindowArr(3000);
ret.push(1);
ret.push(78);
console.log(`ret`, ret.last());
console.log("ok");

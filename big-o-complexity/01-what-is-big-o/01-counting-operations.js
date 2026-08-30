// Big-O describes how the WORK a function does grows as its input grows
// — not how many seconds it takes (that depends on your CPU, what else
// is running, etc.), but how many "steps" it needs, as a function of n.
//
// The cleanest way to see this: don't measure time, COUNT operations.

function sumArrayCountingOps(arr) {
  let sum = 0;
  let operations = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    operations++; // one addition per element — that's the "step" we're counting
  }

  return { sum, operations };
}

module.exports = { sumArrayCountingOps };

if (require.main === module) {
  for (const n of [10, 100, 1000, 10000]) {
    const arr = new Array(n).fill(1);
    const { operations } = sumArrayCountingOps(arr);
    console.log(`n = ${n.toString().padStart(6)}  ->  ${operations} operations`);
  }

  // Notice: operations === n, every single time, on every machine, in
  // every run. Double n, operations double. That EXACT relationship —
  // "operations grow proportionally to n" — is what we mean when we say
  // this function is O(n). It has nothing to do with how fast your CPU
  // happens to be today.
}

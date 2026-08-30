// If Big-O is about "how much work", why not just time the function with
// a stopwatch instead? Because wall-clock time is noisy and machine-
// dependent — the SAME code can report different timings from run to
// run, while the operation COUNT (file 1) never changes. This file
// proves that noise exists, so you can see why Big-O avoids it.

function sumArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) sum += arr[i];
  return sum;
}

if (require.main === module) {
  const arr = new Array(1_000_000).fill(1);

  console.log("Timing the exact same function, on the exact same input, 3 times:");
  for (let run = 1; run <= 3; run++) {
    const start = performance.now();
    sumArray(arr);
    const end = performance.now();
    console.log(`  run ${run}: ${(end - start).toFixed(3)} ms`);
  }

  console.log("\nThose numbers likely differ between runs — CPU scheduling,");
  console.log("JIT warmup, other processes, all add noise. But the operation");
  console.log("count from 01-counting-operations.js for this same input is");
  console.log("ALWAYS exactly 1,000,000, no matter what else is happening on");
  console.log("this machine. That's why Big-O talks about growth in steps,");
  console.log("not milliseconds — steps are a property of the ALGORITHM;");
  console.log("milliseconds are a property of the algorithm PLUS the machine");
  console.log("PLUS everything else running on it right now.");
}

module.exports = { sumArray };

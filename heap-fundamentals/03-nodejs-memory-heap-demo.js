// This file demonstrates the OTHER "heap" — the memory heap — to make
// the distinction from files 1 and 2 completely concrete, not just
// theoretical. Node's process.memoryUsage() reports on the V8 engine's
// memory heap: the region of memory where your program's objects,
// arrays, and strings actually live while the program runs.
//
// heapUsed / heapTotal below have ZERO relationship to whether any array
// in your program happens to satisfy the max-heap or min-heap PROPERTY
// from files 1 and 2. They're two unrelated ideas that both happen to be
// called "heap" in English.

const { buildMaxHeap } = require("./02-heapify-array.js");

if (require.main === module) {
  const before = process.memoryUsage();
  console.log("Memory heap BEFORE allocating anything:");
  console.log("  heapUsed :", (before.heapUsed / 1024 / 1024).toFixed(2), "MB");
  console.log("  heapTotal:", (before.heapTotal / 1024 / 1024).toFixed(2), "MB");

  // Allocate a big array — this uses MEMORY-heap space, completely
  // regardless of whether the array's contents satisfy the heap
  // PROPERTY. An array of random junk uses just as much memory-heap
  // space as a perfectly valid max-heap of the same length.
  const bigArray = new Array(1_000_000).fill(0).map(() => Math.random());
  const heapVersion = buildMaxHeap(bigArray); // now it ALSO satisfies the heap property

  const after = process.memoryUsage();
  console.log("\nMemory heap AFTER allocating a 1,000,000-element array:");
  console.log("  heapUsed :", (after.heapUsed / 1024 / 1024).toFixed(2), "MB");
  console.log("  heapTotal:", (after.heapTotal / 1024 / 1024).toFixed(2), "MB");

  console.log("\nThat memory usage would be IDENTICAL whether or not");
  console.log("heapVersion satisfies the max-heap property. The memory");
  console.log("heap doesn't know or care about heap PROPERTIES — it's");
  console.log("just where the array's 1,000,000 numbers physically live");
  console.log("while your program runs. Two different meanings of");
  console.log("'heap', not two views of the same thing.");

  console.log("\n(array length kept:", heapVersion.length, "— just to stop the");
  console.log("array from being garbage-collected before memoryUsage() runs)");
}

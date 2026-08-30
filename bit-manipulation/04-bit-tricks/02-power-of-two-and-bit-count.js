// Both tricks here reuse the same move: n & (n - 1) clears the LOWEST
// set bit of n. A power of two has only one set bit, so clearing it
// leaves 0 — that single fact drives both functions below.

function showBits(n, width = 8) {
  return n.toString(2).padStart(width, "0");
}

function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}

function countSetBits(n) {
  let count = 0;
  while (n > 0) {
    n = n & (n - 1); // clear the lowest set bit
    count++;
  }
  return count;
}

module.exports = { isPowerOfTwo, countSetBits };

if (require.main === module) {
  console.log("8 =", showBits(8), "is power of two:", isPowerOfTwo(8)); // true
  console.log("7 =", showBits(7), "is power of two:", isPowerOfTwo(7)); // false
  console.log("1 =", showBits(1), "is power of two:", isPowerOfTwo(1)); // true (2^0)
  console.log("0 is power of two:", isPowerOfTwo(0)); // false — 0 has no bits at all

  console.log("countSetBits(10) =", countSetBits(10)); // 2  (1010 has two 1s)
  console.log("countSetBits(255) =", countSetBits(255)); // 8  (11111111)
  console.log("countSetBits(0) =", countSetBits(0)); // 0

  // Watch the trick clear one bit per loop:
  let n = 10; // 1010
  console.log("Walking n & (n-1) for 10:");
  while (n > 0) {
    console.log(" ", showBits(n), "->", showBits(n & (n - 1)));
    n = n & (n - 1);
  }
}

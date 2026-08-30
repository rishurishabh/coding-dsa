// Four recipes for touching ONE bit position, all built from a "mask" —
// a number with a 1 in exactly the position you care about and 0
// everywhere else. The mask is what lets you touch one bit without
// disturbing any other.

function showBits(n, width = 8) {
  return n.toString(2).padStart(width, "0");
}

// Check: is bit i set? Slide it down to the last position, read it.
function checkBit(n, i) {
  return ((n >> i) & 1) === 1;
}

// Set: force bit i to 1. OR with a mask that's 1 only at position i.
function setBit(n, i) {
  return n | (1 << i);
}

// Clear: force bit i to 0. AND with a mask that's 0 only at position i.
function clearBit(n, i) {
  return n & ~(1 << i);
}

// Toggle: flip bit i. XOR with a mask that's 1 only at position i.
function toggleBit(n, i) {
  return n ^ (1 << i);
}

module.exports = { checkBit, setBit, clearBit, toggleBit };

if (require.main === module) {
  const n = 10; // 0000 1010
  console.log("n =", showBits(n), `(${n})`);

  console.log("checkBit(n, 1) =", checkBit(n, 1)); // true  — bit 1 is set
  console.log("checkBit(n, 0) =", checkBit(n, 0)); // false — bit 0 is not set

  console.log("setBit(n, 2) =", showBits(setBit(n, 2)), `(${setBit(n, 2)})`); // 14
  console.log("clearBit(setBit(n, 2), 2) =", showBits(clearBit(setBit(n, 2), 2))); // back to 10
  console.log("toggleBit(n, 2) =", showBits(toggleBit(n, 2)), `(${toggleBit(n, 2)})`); // 14 (was off, now on)
  console.log("toggleBit(n, 1) =", showBits(toggleBit(n, 1)), `(${toggleBit(n, 1)})`); // 8 (was on, now off)
}

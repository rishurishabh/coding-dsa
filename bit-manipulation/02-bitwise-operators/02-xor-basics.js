// XOR ( ^ ): "exactly one is on, not both" — like a hallway light with two
// switches, one at each end. Flip either switch and the light toggles;
// flip both and you're back to where you started.
//
// The two identities below are worth memorizing on sight — they're the
// entire foundation of the 18-bitwise-xor pattern later in this repo.

function showBits(n, width = 8) {
  return n.toString(2).padStart(width, "0");
}

if (require.main === module) {
  const a = 12; // 1100
  const b = 10; // 1010

  console.log("a =", showBits(a), `(${a})`);
  console.log("b =", showBits(b), `(${b})`);
  console.log("a ^ b =", showBits(a ^ b), `(${a ^ b})`); // 0110 = 6 — columns that DISAGREE

  // Identity 1: a thing XORed with itself always cancels to 0.
  console.log("9 ^ 9 =", 9 ^ 9); // 0 — same number, every column agrees, every column cancels

  // Identity 2: XORing with 0 changes nothing.
  console.log("9 ^ 0 =", 9 ^ 0); // 9 — no column disagrees with all-zeros

  // Put both together: XOR a whole list of numbers where everything
  // appears TWICE except one value — the pairs cancel each other out
  // (identity 1), leaving just the odd one out (identity 2 keeps it
  // untouched by the running 0 it started from).
  const nums = [4, 1, 2, 1, 2];
  let result = 0;
  for (const n of nums) result ^= n;
  console.log("XOR of [4,1,2,1,2] =", result); // 4 — the only value without a pair

  // A classic use of the "toggle" idea: swap two variables without a
  // temporary third variable (interview trivia — not how you'd actually
  // swap in real code, but it shows XOR's toggle nature in action).
  let x = 5;
  let y = 9;
  x = x ^ y;
  y = x ^ y; // now holds original x
  x = x ^ y; // now holds original y
  console.log("swapped:", x, y); // 9 5
}

module.exports = { showBits };

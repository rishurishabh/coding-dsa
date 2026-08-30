// Right shift ( >> ): slide every bit one column to the right; whatever
// falls off the end is gone. Each slide halves the number, rounding down
// — exactly like sliding decimal digits right divides by 10 and drops
// the remainder.

function showBits(n, width = 8) {
  return n.toString(2).padStart(width, "0");
}

if (require.main === module) {
  console.log(showBits(20), "= 20");
  console.log(showBits(20 >> 1), "= 20>>1 =", 20 >> 1); // 10 — one slide, /2
  console.log(showBits(20 >> 2), "= 20>>2 =", 20 >> 2); // 5  — two slides, /4

  // Odd numbers show the "rounds down" behavior clearly:
  console.log(showBits(21 >> 1), "= 21>>1 =", 21 >> 1); // 10, not 10.5

  // A classic use: binary search's midpoint, without risking overflow
  // from (low + high) / 2 in languages where that matters.
  const low = 3;
  const high = 9;
  console.log("mid =", (low + high) >> 1); // 6

  // Reading bits off a number one at a time by repeatedly shifting and
  // checking the last bit — this is exactly how 04-bit-tricks' "check a
  // bit" trick and the decimal/binary converters from module 1 work
  // under the hood.
  let n = 13; // 1101
  const bits = [];
  while (n > 0) {
    bits.push(n & 1); // last bit
    n = n >> 1; // drop it, slide the rest down
  }
  console.log("bits of 13, read off low to high:", bits); // [1,0,1,1]
}

module.exports = { showBits };

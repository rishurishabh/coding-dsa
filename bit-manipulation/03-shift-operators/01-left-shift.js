// Left shift ( << ): slide every bit one column to the left, fill the
// gap on the right with a 0. Each slide doubles the number — exactly
// like sliding decimal digits left multiplies by 10.

function showBits(n, width = 8) {
  return n.toString(2).padStart(width, "0");
}

if (require.main === module) {
  console.log(showBits(5), "= 5");
  console.log(showBits(5 << 1), "= 5<<1 =", 5 << 1); // 10 — one slide, x2
  console.log(showBits(5 << 2), "= 5<<2 =", 5 << 2); // 20 — two slides, x4
  console.log(showBits(5 << 3), "= 5<<3 =", 5 << 3); // 40 — three slides, x8

  // A very common use: building up a bitmask one flag at a time.
  // 1<<0 = 0001, 1<<1 = 0010, 1<<2 = 0100 — each shift picks out a
  // DIFFERENT single switch, useful for representing "flag number i".
  for (let i = 0; i < 4; i++) {
    console.log(`1<<${i} =`, showBits(1 << i), `(${1 << i})`);
  }
}

module.exports = { showBits };

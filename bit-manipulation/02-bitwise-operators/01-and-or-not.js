// AND ( & ): "both must be on" — like a lock needing two keys turned at once.
// OR  ( | ): "at least one is on" — like a doorbell wired to two buttons.
// NOT ( ~ ): "flip it" — the only one-number operator.
//
// Each of AND/OR looks at two numbers ONE COLUMN AT A TIME. Nothing that
// happens in one column affects any other column — that's what makes
// these operations so cheap.

function showBits(n, width = 8) {
  return n.toString(2).padStart(width, "0");
}

if (require.main === module) {
  const a = 12; // 1100
  const b = 10; // 1010

  console.log("a =", showBits(a), `(${a})`);
  console.log("b =", showBits(b), `(${b})`);

  console.log("a & b =", showBits(a & b), `(${a & b})`); // 1000 = 8 — only column with two 1s
  console.log("a | b =", showBits(a | b), `(${a | b})`); // 1110 = 14 — every column with at least one 1

  // A very common real use of AND: check if a number is even or odd by
  // looking at only its LAST bit — 1 means odd, 0 means even. Every other
  // bit is irrelevant, so masking with 1 throws them all away at once.
  console.log("7 & 1 =", 7 & 1, "(odd)");
  console.log("8 & 1 =", 8 & 1, "(even)");

  // NOT surprises people in JavaScript: it doesn't just flip the visible
  // bits, it flips ALL 32 bits (including the invisible leading zeros),
  // which for a signed number means ~n = -(n + 1).
  console.log("~5 =", ~5); // -6, because JS numbers have a sign bit
  console.log("~0 =", ~0); // -1
}

module.exports = { showBits };

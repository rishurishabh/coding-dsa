// Idea: the reverse of file 1. Each digit of a binary string has a
// "weight" — 1, 2, 4, 8, 16, ... doubling as you move left, just like
// decimal digits have weights 1, 10, 100, ... going up by ×10. To read
// the number back out, multiply each digit by its weight and add.
//
// Worked example for "1101":
//   digit:   1     1     0     1
//   weight:  8     4     2     1
//   value:   8  +  4  +  0  +  1  =  13

function binaryToDecimal(binaryStr) {
  let total = 0;
  let weight = 1; // starts at 2^0 = 1, doubles each step moving right-to-left

  for (let i = binaryStr.length - 1; i >= 0; i--) {
    const digit = Number(binaryStr[i]); // 0 or 1
    total += digit * weight;
    weight *= 2; // next position to the left is worth double
  }

  return total;
}

module.exports = { binaryToDecimal };

if (require.main === module) {
  console.log(binaryToDecimal("1101")); // 13
  console.log(binaryToDecimal("1010")); // 10
  console.log(binaryToDecimal("0")); // 0
  console.log(binaryToDecimal("11111111")); // 255 — all 8 switches on

  // Sanity check against JavaScript's own built-in parser:
  console.log(binaryToDecimal("11001000") === parseInt("11001000", 2)); // true
}

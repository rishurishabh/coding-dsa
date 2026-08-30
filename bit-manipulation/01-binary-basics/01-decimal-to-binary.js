// Idea: to find a number's binary "switches", keep dividing by 2 and
// writing down the remainder (0 or 1). The remainder tells you whether
// that position's switch is ON or OFF. Read the remainders bottom-to-top
// (the LAST remainder you compute is the FIRST digit of the answer).
//
// Worked example for 13:
//   13 / 2 = 6 remainder 1   <- collect this first, it goes at the END
//    6 / 2 = 3 remainder 0
//    3 / 2 = 1 remainder 1
//    1 / 2 = 0 remainder 1   <- collect this last, it goes at the START
//   stop when the number reaches 0
//   remainders collected in order: 1,0,1,1 -> reverse -> "1101"

function decimalToBinary(n) {
  if (n === 0) return "0";

  let remainders = [];
  let num = n;

  while (num > 0) {
    remainders.push(num % 2); // 0 or 1 — is this position's switch on?
    num = Math.floor(num / 2); // move to the next, more significant position
  }

  return remainders.reverse().join("");
}

module.exports = { decimalToBinary };

if (require.main === module) {
  console.log(decimalToBinary(13)); // "1101"  (8+4+0+1)
  console.log(decimalToBinary(10)); // "1010"  (8+0+2+0)
  console.log(decimalToBinary(0)); // "0"
  console.log(decimalToBinary(255)); // "11111111" — all 8 switches on

  // Sanity check against JavaScript's own built-in converter:
  console.log(decimalToBinary(200) === (200).toString(2)); // true
}

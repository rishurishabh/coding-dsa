// Pattern: Brian Kernighan's trick — `n & (n-1)` clears exactly the LOWEST
// set bit of n, nothing else. Counting how many times that can happen
// before n hits 0 counts the set bits directly.
// When:
//   - count the number of 1 bits in a number (LeetCode 191), or the same
//     count for every number from 0 to n (LeetCode 338)
// Why:
//   - `n - 1` flips every bit from the lowest set bit downward (borrow
//     propagates through the trailing zeros); ANDing that with n keeps
//     only the bits ABOVE the lowest set bit, which erases just that one
//     bit — looping this counts set bits in O(popcount) steps instead of
//     checking all 32/64 bit positions one by one
//   - for counting ALL of 0..n at once, `n & (n-1)` is also a SMALLER
//     number already computed earlier in the same pass — so each answer
//     is "one more than an answer already sitting in the result array"

function hammingWeight(n) {
  let count = 0;
  while (n !== 0) {
    n &= n - 1; // clear the lowest set bit
    count++;
  }
  return count;
}

function countBits(n) {
  const result = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    result[i] = result[i & (i - 1)] + 1; // one more bit than the number with its lowest bit cleared
  }
  return result;
}

// Demo
if (require.main === module) {
  console.log(hammingWeight(11)); // 3 (1011)
  console.log(countBits(5)); // [0,1,1,2,1,2]
}

module.exports = { hammingWeight, countBits };

// Structure: a hash map used as a "have I seen this value before" lookup,
// built and queried in the SAME single pass over the array.
// When:
//   - finding a pair (or any fixed-size combination) that satisfies a sum
//     condition, in one linear pass instead of comparing every pair
// Why:
//   - the brute-force pair check is O(n^2) — every element against every
//     other element
//   - for each number, only ONE specific complement value would complete
//     the pair — checking "has this exact complement been seen already?"
//     is an O(1) average-case hash map lookup, turning the whole scan
//     into O(n)
//   - storing the complement's INDEX (not just that it exists) is what
//     lets this return which two positions matched, not just whether a
//     match exists

function twoSum(nums, target) {
  const seen = new Map(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement), i];
    seen.set(nums[i], i);
  }
  return null;
}

// Demo
if (require.main === module) {
  console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
  console.log(twoSum([3, 2, 4], 6)); // [1, 2]
}

module.exports = { twoSum };

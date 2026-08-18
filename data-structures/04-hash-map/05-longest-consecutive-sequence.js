// Structure: a hash SET used purely for O(1) membership checks — not to
// store any derived value, just to answer "does this number exist in
// the array?" instantly instead of scanning for it.
// When:
//   - finding the longest run of consecutive integers in an unsorted
//     array, faster than sorting first (which would be O(n log n))
// Why:
//   - a number only starts counting a NEW sequence if (num - 1) is not
//     in the set — that check alone guarantees every sequence gets
//     walked exactly once in total, from its true start, never from
//     the middle
//   - without that guard, every number would attempt its own walk
//     forward, and a run of length k would get re-walked from k
//     different starting points — O(n * k) instead of O(n)
//   - each individual number is visited by the inner while-loop at most
//     once across the ENTIRE function, even though it's nested inside
//     the outer loop — the total work across all sequences is O(n)

function longestConsecutiveSequence(nums) {
  const set = new Set(nums);
  let longest = 0;

  for (const num of set) {
    if (set.has(num - 1)) continue; // not a sequence start, skip

    let length = 1;
    let current = num;
    while (set.has(current + 1)) {
      current++;
      length++;
    }
    longest = Math.max(longest, length);
  }
  return longest;
}

// Demo
if (require.main === module) {
  console.log(longestConsecutiveSequence([100, 4, 200, 1, 3, 2])); // 4 (1,2,3,4)
}

module.exports = { longestConsecutiveSequence };

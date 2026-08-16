// Pattern: bitmask window — window/prefix state packed into one integer instead
// of a Map, using AND/OR/XOR as O(1) set operations.
// When:
//   - "no two elements in the window share a set bit" (Longest Nice Subarray):
//     genuine two-pointer window, state = OR of elements currently inside
//   - "each tracked category's count must be even/odd" (vowels in even counts):
//     prefix-XOR bitmask + hashmap of the earliest index each state was seen
// Why:
//   - a handful of booleans (bit i set? count i even or odd?) fit into one
//     integer, so window/prefix updates are O(1) integer ops instead of Map writes

// LeetCode 2401 — Longest Nice Subarray: every pair in the subarray has AND == 0,
// i.e. no two numbers share a set bit. True expand/shrink window: `mask` is the
// OR of the window's current elements; a conflict (mask & nums[right] !== 0)
// means some element still in the window shares a bit, so shrink until it's gone.
function longestNiceSubarray(nums) {
  let left = 0;
  let mask = 0;
  let best = 0;

  for (let right = 0; right < nums.length; right++) {
    while ((mask & nums[right]) !== 0) {
      mask ^= nums[left]; // remove leaving element's bits from the window state
      left++;
    }
    mask |= nums[right];
    best = Math.max(best, right - left + 1);
  }
  return best;
}

// LeetCode 1371 — longest substring where every vowel appears an even number of
// times. Not a shrinking window: state = XOR-parity bitmask of the 5 vowels seen
// so far (bit i flips each time vowel i appears). Two prefixes with the SAME mask
// mean every vowel occurred an even number of times in between, so the substring
// between them is valid. Same "earliest index wins" idea as file 08, applied to
// a bitmask key instead of a prefix sum.
function findTheLongestSubstring(s) {
  const VOWELS = "aeiou";
  const seen = new Map([[0, -1]]); // bitmask -> earliest index with that state
  let state = 0;
  let best = 0;

  for (let i = 0; i < s.length; i++) {
    const vowelIdx = VOWELS.indexOf(s[i]);
    if (vowelIdx !== -1) state ^= (1 << vowelIdx);

    if (seen.has(state)) {
      best = Math.max(best, i - seen.get(state));
    } else {
      seen.set(state, i);
    }
  }
  return best;
}

// Demo
if (require.main === module) {
  console.log("longest nice subarray:", longestNiceSubarray([1, 3, 8, 48, 10])); // 3 ([3,8,48])
  console.log("longest even-vowel substring:", findTheLongestSubstring("eleetminicoworoep")); // 13
}

module.exports = { longestNiceSubarray, findTheLongestSubstring };

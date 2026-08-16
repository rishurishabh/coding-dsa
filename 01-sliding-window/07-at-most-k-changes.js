// Pattern: "at most K violations" window — count of exceptions replaces a strict valid/invalid check.
// When:
//   - longest substring with at most K character replacements
//   - max consecutive ones III (flip at most K zeros)
// Why:
//   - window is valid while (windowSize - mostFrequentCount) <= K
//   - length never shrinks below its best-so-far: once a size is hit, left and right
//     advance together, so only the best length needs tracking, not the window itself

function characterReplacement(s, k) {
  const counts = new Array(26).fill(0);
  const A = "A".charCodeAt(0);
  let left = 0;
  let maxFreq = 0; // highest single-char count seen so far; can go stale after a shrink, but that's fine — it only needs to grow to beat the current best
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    const idx = s.charCodeAt(right) - A;
    counts[idx]++;
    maxFreq = Math.max(maxFreq, counts[idx]);

    const windowSize = right - left + 1;
    if (windowSize - maxFreq > k) {
      // too many chars would need replacing; shrink from the left
      counts[s.charCodeAt(left) - A]--;
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}

// Same at-most-K-violations idea as characterReplacement, specialized to 0/1 arrays
function longestOnes(nums, k) {
  let left = 0;
  let zeroCount = 0;
  let best = 0;

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) zeroCount++;

    while (zeroCount > k) {
      if (nums[left] === 0) zeroCount--;
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}

// Demo
if (require.main === module) {
  console.log("longest with <=2 replacements:", characterReplacement("AABABBA", 2)); // 5
  console.log("longest ones with <=2 flips:", longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2)); // 6
}

module.exports = { characterReplacement, longestOnes };

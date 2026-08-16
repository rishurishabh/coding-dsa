// Pattern: last-seen-index jump — violation has ONE identifiable cause, so `left`
// can jump straight past it instead of stepping forward one element at a time.
// When:
//   - longest substring without repeating characters
// Why:
//   - optimization on top of variable-size window: the while-loop shrink becomes
//     an O(1) jump because the exact index that caused the duplicate is known

function lengthOfLongestSubstring(s) {
  const lastSeen = new Map();
  let left = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (lastSeen.has(ch) && lastSeen.get(ch) >= left) {
      left = lastSeen.get(ch) + 1; // jump left past the duplicate
    }
    lastSeen.set(ch, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}

// Demo
if (require.main === module) {
  console.log("longest unique substring:", lengthOfLongestSubstring("abcabcbb")); // 3 ("abc")
  console.log("longest unique substring:", lengthOfLongestSubstring("pwwkew")); // 3 ("wke")
}

module.exports = { lengthOfLongestSubstring };

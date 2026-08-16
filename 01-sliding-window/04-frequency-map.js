// Pattern: window + frequency counter — match window's char distribution against a target.
// When:
//   - anagram / permutation-in-string
//   - minimum window substring, find-all-anagrams
// Why:
//   - same expand/shrink skeleton as variable-size window, but validity check is
//     "does counter satisfy target" instead of a numeric comparison

function minWindow(s, t) {
  if (t.length === 0 || s.length < t.length) return "";

  const need = new Map();
  for (const ch of t) need.set(ch, (need.get(ch) || 0) + 1);

  let missing = t.length; // count of chars still needed
  let left = 0;
  let start = 0;
  let end = 0; // end === 0 means "no window found yet"

  for (let right = 1; right <= s.length; right++) {
    const ch = s[right - 1];
    if (need.has(ch)) {
      if (need.get(ch) > 0) missing--;
      need.set(ch, need.get(ch) - 1);
    }

    if (missing === 0) {
      // shrink extra chars off the left
      while (!need.has(s[left]) || need.get(s[left]) < 0) {
        if (need.has(s[left])) need.set(s[left], need.get(s[left]) + 1);
        left++;
      }
      if (end === 0 || right - left < end - start) {
        start = left;
        end = right;
      }
    }
  }
  return s.slice(start, end);
}

// Find all start indices of anagrams of `p` in `s` (fixed-size + frequency map combo)
function findAnagrams(s, p) {
  const result = [];
  if (s.length < p.length) return result;

  const need = new Array(26).fill(0);
  const window = new Array(26).fill(0);
  const A = "a".charCodeAt(0);
  for (const ch of p) need[ch.charCodeAt(0) - A]++;

  for (let i = 0; i < s.length; i++) {
    window[s.charCodeAt(i) - A]++;
    if (i >= p.length) window[s.charCodeAt(i - p.length) - A]--;
    if (i >= p.length - 1 && need.every((v, idx) => v === window[idx])) {
      result.push(i - p.length + 1);
    }
  }
  return result;
}

// Demo
if (require.main === module) {
  console.log("min window:", minWindow("ADOBECODEBANC", "ABC")); // "BANC"
  console.log("anagram starts:", findAnagrams("cbaebabacd", "abc")); // [0, 6]
}

module.exports = { minWindow, findAnagrams };

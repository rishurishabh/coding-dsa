// Pattern: same interval-DP grid as variant 1, but dp[i][j] is now a
// BOOLEAN — "is s[i..j] a palindrome, contiguously" — not a length, and
// not allowed to skip characters the way a subsequence can.
// When:
//   - the longest run needs to be CONTIGUOUS (a true substring), not a
//     subsequence with gaps allowed — mirrors the substring-vs-subsequence
//     split in [21-lcs-family](../21-lcs-family/README.md)
// Why:
//   - s[i..j] is a palindrome exactly when its ends match AND everything
//     strictly inside (s[i+1..j-1]) is ALSO a palindrome — there's no
//     fallback like variant 1's "drop one end and keep going", because
//     dropping a character here would break contiguity
//   - the `len < 4` guard handles intervals of length 2-3 directly:
//     length 2 needs only the ends to match; length 3's inside is a
//     single character, always a palindrome on its own
//   - unlike variant 1 (which only reads the bottom-right corner), the
//     answer here can come from ANY cell — the longest true substring
//     isn't guaranteed to end at the last index

function longestPalindromicSubstring(s) {
  const n = s.length;
  if (n === 0) return "";
  const dp = Array.from({ length: n }, () => new Array(n).fill(false));
  let start = 0;
  let maxLen = 1;

  for (let i = 0; i < n; i++) dp[i][i] = true;

  for (let len = 2; len <= n; len++) {
    for (let i = 0; i + len - 1 < n; i++) {
      const j = i + len - 1;
      if (s[i] === s[j] && (len < 4 || dp[i + 1][j - 1])) {
        dp[i][j] = true;
        if (len > maxLen) {
          start = i;
          maxLen = len;
        }
      }
    }
  }
  return s.slice(start, start + maxLen);
}

// Demo
if (require.main === module) {
  console.log(longestPalindromicSubstring("babad")); // "bab" (or "aba")
  console.log(longestPalindromicSubstring("cbbd")); // "bb"
}

module.exports = { longestPalindromicSubstring };

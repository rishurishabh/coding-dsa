// Pattern: the exact same boolean interval-DP table as variant 2, read a
// different way — count every `true` cell instead of tracking the single
// longest one.
// When:
//   - every palindromic substring needs counting, not just the longest —
//     the same relationship as [19-01-knapsack](../19-01-knapsack/README.md)'s
//     existence-vs-counting variants, one grid read two ways
// Why:
//   - the palindrome check itself is identical to variant 2 — s[i..j] is
//     a palindrome iff the ends match and the inside is one too
//   - the only difference is what happens once a cell is confirmed
//     `true`: instead of comparing against a running max length, it's
//     simply tallied — every true cell is exactly one valid answer,
//     since (i, j) pairs are already unique substrings by construction

function countPalindromicSubstrings(s) {
  const n = s.length;
  const dp = Array.from({ length: n }, () => new Array(n).fill(false));
  let count = 0;

  for (let i = 0; i < n; i++) {
    dp[i][i] = true;
    count++;
  }

  for (let len = 2; len <= n; len++) {
    for (let i = 0; i + len - 1 < n; i++) {
      const j = i + len - 1;
      if (s[i] === s[j] && (len < 4 || dp[i + 1][j - 1])) {
        dp[i][j] = true;
        count++;
      }
    }
  }
  return count;
}

// Demo
if (require.main === module) {
  console.log(countPalindromicSubstrings("abc")); // 3 ("a","b","c")
  console.log(countPalindromicSubstrings("aaa")); // 6 ("a","a","a","aa","aa","aaa")
}

module.exports = { countPalindromicSubstrings };

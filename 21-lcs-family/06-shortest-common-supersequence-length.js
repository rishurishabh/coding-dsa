// Pattern: reduce to variant 1 via a counting argument — the shortest
// string containing both a and b as subsequences is built from every
// character of both, minus the characters they could share on one pass.
// When:
//   - given two strings, find the length of the shortest string that has
//     BOTH as subsequences (not "find the string itself" — just how long
//     it has to be)
// Why:
//   - any shared subsequence only needs to be "typed once" in the
//     supersequence — every character NOT part of the shared subsequence
//     still needs its own slot from whichever string it came from
//   - total characters typed = |a| + |b|, minus one copy of every
//     character in their LCS (since those characters get double-counted
//     otherwise, once from each string) — so the answer is exactly
//     |a| + |b| - LCS(a, b)

function shortestCommonSupersequenceLength(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  const lcsLength = dp[a.length][b.length];
  return a.length + b.length - lcsLength;
}

// Demo
if (require.main === module) {
  console.log(shortestCommonSupersequenceLength("abac", "cab")); // 5 (LeetCode 1092 example)
}

module.exports = { shortestCommonSupersequenceLength };

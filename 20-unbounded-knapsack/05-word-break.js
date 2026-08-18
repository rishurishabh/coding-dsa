// Pattern: boolean reachability, unbounded — same shape as coin-change
// reachability, but the "coins" are dictionary words (variable-length,
// matched by substring) instead of fixed numbers.
// When:
//   - given a string and a dictionary of words (each reusable any number
//     of times), decide whether the string can be segmented into a
//     sequence of dictionary words back to back
// Why:
//   - dp[i] is true if s[0..i) can be fully segmented — for each end
//     index i, try every word: if the word fits right before i AND
//     dp[i - word.length] was already true, then dp[i] is reachable too
//   - unbounded because nothing stops the same word from being used to
//     extend the string again later — there's no "used" tracking, only
//     "is this prefix length reachable"

function wordBreak(s, wordDict) {
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= s.length; i++) {
    for (const word of wordDict) {
      if (word.length <= i && dp[i - word.length] && s.slice(i - word.length, i) === word) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
}

// Demo
if (require.main === module) {
  console.log(wordBreak("leetcode", ["leet", "code"])); // true
  console.log(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"])); // false
}

module.exports = { wordBreak };

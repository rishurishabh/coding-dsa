// Pattern: TWO DPs layered together — variant 2's boolean interval table,
// built first, then used as an O(1) lookup inside a SECOND, plain 1D DP
// over cut positions.
// When:
//   - a string needs splitting into the fewest possible pieces such that
//     every piece is itself a palindrome
// Why:
//   - answering "is s[i..j] a palindrome?" over and over while searching
//     for cut points would be expensive if recomputed each time — so the
//     full boolean table is built ONCE, up front, exactly like variant 2
//   - cuts[j] = minimum cuts needed for the prefix s[0..j] — for every
//     earlier index i where s[i..j] is a palindrome (an O(1) check
//     against the precomputed table), that whole suffix could be the
//     LAST piece, so cuts[j] = min(cuts[j], cuts[i-1] + 1)
//   - if s[0..j] is itself a palindrome, zero cuts are needed for that
//     prefix at all — the inner loop's i = 0 case, handled by treating
//     cuts[-1] as -1 so the "+1" lands on 0

function minPalindromeCuts(s) {
  const n = s.length;
  if (n === 0) return 0;

  const isPalindrome = Array.from({ length: n }, () => new Array(n).fill(false));
  for (let i = 0; i < n; i++) isPalindrome[i][i] = true;
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i + len - 1 < n; i++) {
      const j = i + len - 1;
      if (s[i] === s[j] && (len < 4 || isPalindrome[i + 1][j - 1])) {
        isPalindrome[i][j] = true;
      }
    }
  }

  const cuts = new Array(n).fill(Infinity);
  for (let j = 0; j < n; j++) {
    if (isPalindrome[0][j]) {
      cuts[j] = 0;
      continue;
    }
    for (let i = 1; i <= j; i++) {
      if (isPalindrome[i][j]) {
        cuts[j] = Math.min(cuts[j], cuts[i - 1] + 1);
      }
    }
  }
  return cuts[n - 1];
}

// Demo
if (require.main === module) {
  console.log(minPalindromeCuts("aab")); // 1 -> "aa" | "b"
  console.log(minPalindromeCuts("a")); // 0, already a palindrome
  console.log(minPalindromeCuts("ab")); // 1 -> "a" | "b"
}

module.exports = { minPalindromeCuts };

// Pattern: the "choice" is WHERE to cut, not which element to take — every
// recursive call tries every possible next partition boundary, not every
// remaining item.
// When:
//   - partition a string into pieces that are all palindromes, and return
//     every way to do it (LeetCode 131)
// Why:
//   - the search space isn't "which subset of characters" — it's "where do
//     the cuts go" — so the loop advances an END index over every
//     possible next substring, only recursing into cuts that produce a
//     valid (palindromic) piece, pruning everything else immediately
//   - same choose/explore/un-choose skeleton as every other variant here,
//     with the "is this choice even legal" check (palindrome or not)
//     happening BEFORE the recursive call, not after

function isPalindrome(str) {
  let l = 0;
  let r = str.length - 1;
  while (l < r) {
    if (str[l] !== str[r]) return false;
    l++;
    r--;
  }
  return true;
}

function partition(s) {
  const result = [];
  const path = [];

  function backtrack(start) {
    if (start === s.length) {
      result.push([...path]);
      return;
    }
    for (let end = start + 1; end <= s.length; end++) {
      const piece = s.slice(start, end);
      if (!isPalindrome(piece)) continue; // illegal cut — skip without recursing
      path.push(piece);
      backtrack(end);
      path.pop();
    }
  }

  backtrack(0);
  return result;
}

// Demo
if (require.main === module) {
  console.log(partition("aab")); // [["a","a","b"],["aa","b"]]
}

module.exports = { partition };

// Pattern: converging pointers used to VERIFY symmetry, not search for a value.
// When:
//   - valid palindrome (ignoring non-alphanumeric characters)
//   - valid palindrome II — allowed to delete at most one character
// Why:
//   - no target to compare against; the only question at each step is "do the
//     two ends match", so the pointers just converge and bail out (or branch)
//     on the first mismatch instead of choosing a direction to move

function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0;
  let right = clean.length - 1;

  while (left < right) {
    if (clean[left] !== clean[right]) return false;
    left++;
    right--;
  }
  return true;
}

// Allowed one deletion: on a mismatch, try skipping either side and see if
// the rest is a palindrome — branches into two converging checks instead of one.
function validPalindromeII(s) {
  const isPalinRange = (str, left, right) => {
    while (left < right) {
      if (str[left] !== str[right]) return false;
      left++;
      right--;
    }
    return true;
  };

  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) {
      return isPalinRange(s, left + 1, right) || isPalinRange(s, left, right - 1);
    }
    left++;
    right--;
  }
  return true;
}

// Demo
if (require.main === module) {
  console.log("is palindrome:", isPalindrome("A man, a plan, a canal: Panama")); // true
  console.log("valid with 1 deletion:", validPalindromeII("abca")); // true (remove 'b' or 'c')
}

module.exports = { isPalindrome, validPalindromeII };

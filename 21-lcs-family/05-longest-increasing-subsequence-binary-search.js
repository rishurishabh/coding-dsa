// Pattern: not DP at all — a greedy + binary search technique (patience
// sorting) that answers the same question as variant 4 in O(n log n)
// instead of O(n^2), by tracking only the SMALLEST possible tail for
// each achievable subsequence length.
// When:
//   - same problem as variant 4 (length of the longest strictly
//     increasing subsequence), but n is large enough that O(n^2) DP is
//     too slow and only the LENGTH is needed (not the subsequence itself,
//     without extra bookkeeping)
// Why:
//   - tails[k] holds the smallest possible tail value among all
//     increasing subsequences of length k+1 seen so far — keeping it
//     small leaves the most room for future numbers to extend it
//   - for each new number, binary search tails for the first entry >= it
//     and overwrite that entry (this number gives an equal-or-better,
//     i.e. smaller, tail for that length); if the number is bigger than
//     every tail, it extends the longest subsequence found so far by one
//   - tails is NOT the actual LIS (its contents can mix across several
//     different real subsequences) — only its LENGTH is meaningful

function lengthOfLISBinarySearch(nums) {
  const tails = [];

  for (const num of nums) {
    let lo = 0;
    let hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < num) lo = mid + 1;
      else hi = mid;
    }
    tails[lo] = num;
  }
  return tails.length;
}

// Demo
if (require.main === module) {
  console.log(lengthOfLISBinarySearch([10, 9, 2, 5, 3, 7, 101, 18])); // 4, same answer as variant 4
}

module.exports = { lengthOfLISBinarySearch };

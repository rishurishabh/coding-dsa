// Pattern: map a 2D index space onto a 1D one — the matrix is fully sorted
// if read row by row, so it behaves exactly like a flat sorted array once
// the index math translates between the two.
// When:
//   - an m x n matrix where each row is sorted and the first element of
//     each row is greater than the last element of the previous row —
//     effectively one long sorted sequence wrapped into a grid (LeetCode 74)
// Why:
//   - `mid` runs over a virtual flat index `0..rows*cols-1`; converting it
//     to `(row, col)` via `Math.floor(mid / cols)` and `mid % cols` is the
//     only new step — everything else is identical to variant 1's halving loop
//   - avoids a slower two-phase search (binary search rows, then binary
//     search within a row): one search over the whole matrix instead of two

function searchMatrix(matrix, target) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let lo = 0;
  let hi = rows * cols - 1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    const value = matrix[Math.floor(mid / cols)][mid % cols];
    if (value === target) return true;
    if (value < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return false;
}

// Demo
if (require.main === module) {
  const matrix = [
    [1, 3, 5, 7],
    [10, 11, 16, 20],
    [23, 30, 34, 60],
  ];
  console.log(searchMatrix(matrix, 3)); // true
  console.log(searchMatrix(matrix, 13)); // false
}

module.exports = { searchMatrix };

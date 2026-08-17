// Pattern: constraint satisfaction — every choice must additionally survive
// a legality check against every choice made so far, not just avoid
// picking the same slot twice.
// When:
//   - place n queens on an n x n board so none attack each other (LeetCode 51)
// Why:
//   - one queen per row is a given (this loop's structure already
//     guarantees that), so the real choice per row is WHICH COLUMN — and
//     that choice is legal only if no earlier queen shares its column or
//     either diagonal
//   - three Sets tracking occupied columns and both diagonal directions
//     turn "is this square attacked" into an O(1) check instead of
//     re-scanning every previously placed queen — the diagonals are
//     identified by the constant `row - col` (one diagonal direction) and
//     `row + col` (the other), which is why a Set keyed on those sums/differences works

function solveNQueens(n) {
  const result = [];
  const cols = new Set();
  const diag1 = new Set(); // row - col is constant along a "\" diagonal
  const diag2 = new Set(); // row + col is constant along a "/" diagonal
  const queenCol = []; // queenCol[row] = column that row's queen sits in

  function backtrack(row) {
    if (row === n) {
      result.push(queenCol.map((c) => ".".repeat(c) + "Q" + ".".repeat(n - c - 1)));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue; // attacked — illegal
      cols.add(col); diag1.add(row - col); diag2.add(row + col);
      queenCol.push(col);

      backtrack(row + 1);

      queenCol.pop();
      cols.delete(col); diag1.delete(row - col); diag2.delete(row + col);
    }
  }

  backtrack(0);
  return result;
}

// Demo
if (require.main === module) {
  const solutions = solveNQueens(4);
  console.log(`${solutions.length} solutions for n=4`); // 2 solutions
  console.log(solutions[0].join(" / "));
}

module.exports = { solveNQueens };

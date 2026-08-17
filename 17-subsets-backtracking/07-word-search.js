// Pattern: backtracking on a grid — the "choice" at each step is which
// neighboring cell to move into, and the undo step has to restore a cell
// that was temporarily borrowed as a visited-marker.
// When:
//   - does a word exist as a path of adjacent cells in a grid, using each
//     cell at most once per path (LeetCode 79)
// Why:
//   - marking a cell visited by overwriting it (then restoring the
//     original character on the way back out) avoids needing a separate
//     visited grid — the same "mutate, recurse, un-mutate" discipline as
//     every other variant, just applied to the board itself instead of a
//     path array
//   - failing fast the moment a cell doesn't match the next required
//     letter — before recursing into any of its neighbors — is what keeps
//     this from exploring paths that were already doomed at step one

function exist(board, word) {
  const rows = board.length;
  const cols = board[0].length;

  function backtrack(r, c, i) {
    if (i === word.length) return true; // matched every character
    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== word[i]) return false;

    const original = board[r][c];
    board[r][c] = "#"; // mark visited by borrowing the cell itself

    const found =
      backtrack(r + 1, c, i + 1) ||
      backtrack(r - 1, c, i + 1) ||
      backtrack(r, c + 1, i + 1) ||
      backtrack(r, c - 1, i + 1);

    board[r][c] = original; // restore before returning, whether found or not
    return found;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (backtrack(r, c, 0)) return true;
    }
  }
  return false;
}

// Demo
if (require.main === module) {
  const board = [
    ["A", "B", "C", "E"],
    ["S", "F", "C", "S"],
    ["A", "D", "E", "E"],
  ];
  console.log(exist(board, "ABCCED")); // true
  console.log(exist(board, "ABCB")); // false — can't reuse the same B
}

module.exports = { exist };

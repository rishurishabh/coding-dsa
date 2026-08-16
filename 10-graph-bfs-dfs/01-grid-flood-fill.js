// Pattern: DFS flood fill — a grid IS a graph; each cell is a node, and its
// up/down/left/right neighbors are its edges. This is the foundation every
// other variant in this module builds on.
// When:
//   - count connected regions of matching cells (LeetCode 200, "Number of
//     Islands")
// Why:
//   - unlike a tree, a grid has no single root and can revisit a cell from
//     multiple directions — marking a cell visited THE MOMENT it's entered
//     (not after processing it) is what keeps the DFS from looping forever
//     or double-counting the same island

function numIslands(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const g = grid.map((row) => [...row]); // clone: don't mutate the caller's grid
  let count = 0;

  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || g[r][c] !== "1") return;
    g[r][c] = "0"; // mark visited immediately, before recursing further
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (g[r][c] === "1") {
        count++; // found a new island's first cell
        dfs(r, c); // claim every connected cell so it's never counted again
      }
    }
  }
  return count;
}

// Demo
if (require.main === module) {
  const grid = [
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1"],
  ];
  console.log(numIslands(grid)); // 3
}

module.exports = { numIslands };

// Pattern: single-source BFS, tracking distance — the level-size snapshot
// itself IS the distance counter, since BFS visits nodes in strictly
// increasing order of distance from the start.
// When:
//   - shortest path between two cells in an unweighted grid, moving in any
//     of 8 directions (LeetCode 1091)
// Why:
//   - DFS would find A path, not the SHORTEST one, and would need to explore
//     every path to compare lengths; BFS guarantees the first time the
//     target is dequeued, it's via the shortest possible route — no
//     comparison needed, just stop as soon as it's reached

function shortestPathBinaryMatrix(grid) {
  const n = grid.length;
  if (grid[0][0] !== 0 || grid[n - 1][n - 1] !== 0) return -1;

  const dirs = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];
  const visited = new Set(["0,0"]);
  let queue = [[0, 0]];
  let steps = 1;

  while (queue.length) {
    const next = [];
    for (const [r, c] of queue) {
      if (r === n - 1 && c === n - 1) return steps;
      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        const key = `${nr},${nc}`;
        if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 0 && !visited.has(key)) {
          visited.add(key);
          next.push([nr, nc]);
        }
      }
    }
    queue = next;
    steps++;
  }
  return -1;
}

// Demo
if (require.main === module) {
  console.log(shortestPathBinaryMatrix([[0, 1], [1, 0]])); // 2
  console.log(shortestPathBinaryMatrix([[0, 0, 0], [1, 1, 0], [1, 1, 0]])); // 4
  console.log(shortestPathBinaryMatrix([[1, 0, 0], [1, 1, 0], [1, 1, 0]])); // -1
}

module.exports = { shortestPathBinaryMatrix };

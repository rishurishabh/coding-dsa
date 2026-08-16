// Pattern: multi-source BFS — instead of one starting node, EVERY starting
// point is pushed into the queue before the first level even begins.
// When:
//   - all rotten oranges spread simultaneously; find the time until no
//     fresh orange remains (LeetCode 994)
// Why:
//   - all sources are distance 0 from themselves, at the same time — seeding
//     the queue with all of them before draining the first level means the
//     level-size snapshot (same trick as 08-tree-bfs) now measures "one
//     minute of simultaneous spread" instead of one node's single step
//   - running BFS once from every source together is equivalent to (and
//     much cheaper than) running single-source BFS from each source
//     separately and taking the minimum

function orangesRotting(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const g = grid.map((row) => [...row]);
  const queue = [];
  let fresh = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (g[r][c] === 2) queue.push([r, c]); // every rotten orange is a source
      else if (g[r][c] === 1) fresh++;
    }
  }

  let minutes = 0;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  while (queue.length && fresh > 0) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const [r, c] = queue.shift();
      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && g[nr][nc] === 1) {
          g[nr][nc] = 2;
          fresh--;
          queue.push([nr, nc]);
        }
      }
    }
    minutes++;
  }
  return fresh === 0 ? minutes : -1;
}

// Demo
if (require.main === module) {
  console.log(orangesRotting([[2, 1, 1], [1, 1, 0], [0, 1, 1]])); // 4
  console.log(orangesRotting([[2, 1, 1], [0, 1, 1], [1, 0, 1]])); // -1 (unreachable fresh orange)
}

module.exports = { orangesRotting };

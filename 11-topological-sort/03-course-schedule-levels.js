// Pattern: Kahn's algorithm, drained level by level — the same
// level-size-snapshot trick from 08-tree-bfs, applied to the in-degree
// queue instead of a tree.
// When:
//   - courses can be taken in parallel if their prerequisites are already
//     satisfied; how many semesters (rounds) are needed at minimum to
//     finish everything (LeetCode 1136-style, "Parallel Courses")
// Why:
//   - variant 1 gives A valid order but throws away timing information —
//     snapshotting the queue's size before draining it means "every node
//     drained in this pass has no dependency on any other node in this
//     same pass", so they can all happen in the same semester at once

function minNumberOfSemesters(n, edges) {
  const adj = Array.from({ length: n }, () => []);
  const indegree = new Array(n).fill(0);
  for (const [from, to] of edges) {
    adj[from].push(to);
    indegree[to]++;
  }

  let queue = [];
  for (let node = 0; node < n; node++) {
    if (indegree[node] === 0) queue.push(node);
  }

  let semesters = 0;
  let processed = 0;
  while (queue.length) {
    const next = [];
    for (const node of queue) { // everything in `queue` right now: one semester
      processed++;
      for (const neighbor of adj[node]) {
        indegree[neighbor]--;
        if (indegree[neighbor] === 0) next.push(neighbor);
      }
    }
    queue = next;
    semesters++;
  }

  return processed === n ? semesters : -1; // cycle: some courses never become available
}

// Demo
if (require.main === module) {
  console.log(minNumberOfSemesters(4, [[0, 1], [0, 2], [1, 3], [2, 3]])); // 3: {0}, {1,2}, {3}
}

module.exports = { minNumberOfSemesters };

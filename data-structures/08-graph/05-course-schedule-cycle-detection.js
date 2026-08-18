// Structure: an adjacency list walked with DFS that tracks THREE states
// per vertex (unvisited, in-progress, done) instead of a plain visited
// boolean — the extra state is what makes cycle detection possible in a
// DIRECTED graph.
// When:
//   - determining whether a directed graph has a cycle at all — e.g.
//     whether a set of prerequisites can ever be completed, or whether
//     a dependency graph is buildable
// Why:
//   - a plain visited/unvisited boolean (enough for undirected
//     connectivity, see variant 4) isn't enough here: revisiting an
//     already-FINISHED vertex is normal in a directed graph (two
//     different vertices can both point to a shared dependency) and is
//     NOT a cycle
//   - the third state — "in progress" (currently on the recursion
//     stack, not yet finished) — is what actually signals a cycle: if
//     DFS reaches a vertex that's still in-progress higher up the SAME
//     call stack, that path loops back on itself
//   - [11-topological-sort](../../11-topological-sort/README.md) solves
//     a closely related question with Kahn's algorithm (BFS + in-degree
//     counting) instead — this file's three-color DFS is a genuinely
//     different mechanism for detecting the same kind of cycle

const UNVISITED = 0, IN_PROGRESS = 1, DONE = 2;

function canFinish(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  for (const [course, prereq] of prerequisites) {
    adj[prereq].push(course); // prereq must be taken before course
  }

  const state = new Array(numCourses).fill(UNVISITED);

  function hasCycle(v) {
    if (state[v] === IN_PROGRESS) return true; // loop back onto the current path
    if (state[v] === DONE) return false; // already fully explored, safe

    state[v] = IN_PROGRESS;
    for (const next of adj[v]) {
      if (hasCycle(next)) return true;
    }
    state[v] = DONE;
    return false;
  }

  for (let v = 0; v < numCourses; v++) {
    if (state[v] === UNVISITED && hasCycle(v)) return false;
  }
  return true;
}

// Demo
if (require.main === module) {
  console.log(canFinish(2, [[1, 0]])); // true — take 0, then 1
  console.log(canFinish(2, [[1, 0], [0, 1]])); // false — 0 needs 1, 1 needs 0
}

module.exports = { canFinish };

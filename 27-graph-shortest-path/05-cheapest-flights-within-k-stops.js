// Pattern: Bounded Bellman-Ford — shortest path with a hop-count limit
// When: "shortest path" is constrained by how many edges it's allowed to
//       use (K stops) — plain Dijkstra/Bellman-Ford have no concept of a
//       hop limit, they'd happily return a cheaper path that uses too many.
// Why it works: Bellman-Ford's relaxation rounds already have a natural
//       meaning — after i rounds, dist[v] is the shortest path to v using
//       AT MOST i edges. So just stop after K+1 rounds instead of running
//       to convergence. The one subtlety: relax from a SNAPSHOT of the
//       previous round's distances, not the array being written to —
//       otherwise a single round could chain two relaxations together and
//       silently use one extra edge, breaking the round-count guarantee.
//
// LC787: Cheapest Flights Within K Stops — src to dst, at most K stops
// (i.e. at most K+1 edges).

function findCheapestPrice(n, flights, src, dst, k) {
  let dist = new Array(n).fill(Infinity);
  dist[src] = 0;

  for (let round = 0; round <= k; round++) {
    const snapshot = [...dist]; // read from last round, write to this one
    for (const [u, v, w] of flights) {
      if (dist[u] !== Infinity && dist[u] + w < snapshot[v]) {
        snapshot[v] = dist[u] + w;
      }
    }
    dist = snapshot;
  }

  return dist[dst] === Infinity ? -1 : dist[dst];
}

module.exports = { findCheapestPrice };

if (require.main === module) {
  const flights = [[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]];
  console.log(findCheapestPrice(4, flights, 0, 3, 1)); // 700

  const flights2 = [[0, 1, 100], [1, 2, 100], [0, 2, 500]];
  console.log(findCheapestPrice(3, flights2, 0, 2, 1)); // 200
  console.log(findCheapestPrice(3, flights2, 0, 2, 0)); // 500
}

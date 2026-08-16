// Pattern: build the graph FIRST, then run Kahn's algorithm — half of this
// problem is extracting edges from constraints that don't look like a graph
// at all.
// When:
//   - given a list of words already sorted according to some alien
//     alphabet's ordering, reconstruct that ordering (LeetCode 269)
// Why:
//   - two adjacent words in sorted order reveal exactly one fact: at their
//     first differing character, the earlier word's character comes before
//     the later word's — that's one edge per adjacent word pair, nothing more
//   - a word that's a longer PREFIX-EXTENSION of the word before it (e.g.
//     "abc" appearing after "ab") is a contradiction no ordering can satisfy
//     — no valid sort exists, same as a cycle would produce

function alienOrder(words) {
  const adj = new Map(); // char -> Set of chars that must come after it
  const indegree = new Map();

  for (const word of words) {
    for (const ch of word) {
      if (!indegree.has(ch)) {
        indegree.set(ch, 0);
        adj.set(ch, new Set());
      }
    }
  }

  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i];
    const w2 = words[i + 1];
    const minLen = Math.min(w1.length, w2.length);
    let foundDifference = false;

    for (let j = 0; j < minLen; j++) {
      if (w1[j] !== w2[j]) {
        if (!adj.get(w1[j]).has(w2[j])) {
          adj.get(w1[j]).add(w2[j]);
          indegree.set(w2[j], indegree.get(w2[j]) + 1);
        }
        foundDifference = true;
        break;
      }
    }
    if (!foundDifference && w1.length > w2.length) return ""; // "abc" before "ab": contradiction
  }

  const queue = [];
  for (const [ch, deg] of indegree) if (deg === 0) queue.push(ch);

  let result = "";
  while (queue.length) {
    const ch = queue.shift();
    result += ch;
    for (const next of adj.get(ch)) {
      indegree.set(next, indegree.get(next) - 1);
      if (indegree.get(next) === 0) queue.push(next);
    }
  }

  return result.length === indegree.size ? result : ""; // fewer chars output: a cycle in the constraints
}

// Demo
if (require.main === module) {
  console.log(alienOrder(["wrt", "wrf", "er", "ett", "rftt"])); // "wertf"
  console.log(alienOrder(["z", "x", "z"])); // "" — z before x before z is a contradiction
}

module.exports = { alienOrder };

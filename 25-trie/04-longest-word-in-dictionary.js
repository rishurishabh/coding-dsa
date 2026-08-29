// Pattern: Trie DFS restricted to "buildable" paths
// When: the answer must be constructible one unit at a time, where every
//       intermediate state along the way has to independently satisfy some
//       condition (here: every prefix must itself be a complete word).
// Why it works: mark every inserted word's end node. A DFS from the root
//       that only steps into a child when that child is ALSO an end-of-word
//       node explores exactly the set of words buildable one character at a
//       time from other words — no separate validity check per candidate,
//       the trie structure enforces it as you walk.
//
// LC720: Longest Word in Dictionary — find the longest word that can be
// built one character at a time by other words in the list (every prefix
// along the way must also be in the list). Ties broken lexicographically.

class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

function longestWord(words) {
  const root = new TrieNode();

  for (const word of words) {
    let node = root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch);
    }
    node.isEndOfWord = true;
  }

  let best = "";

  function dfs(node, path) {
    if (path.length > best.length) best = path;

    for (const ch of [...node.children.keys()].sort()) {
      const child = node.children.get(ch);
      if (child.isEndOfWord) dfs(child, path + ch); // only step into "buildable" nodes
    }
  }

  dfs(root, "");
  return best;
}

module.exports = { longestWord };

if (require.main === module) {
  console.log(longestWord(["w", "wo", "wor", "worl", "world"])); // "world"
  console.log(longestWord(["a", "banana", "app", "appl", "ap", "apply", "apple"])); // "apple"
}

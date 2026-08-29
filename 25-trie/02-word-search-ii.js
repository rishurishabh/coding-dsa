// Pattern: Trie + grid backtracking
// When: searching a grid for many target words at once — a plain per-word
//       DFS would rescan the same cells once per word (O(words * cells *
//       4^L)); a trie lets every word that shares a prefix share the same
//       DFS exploration of that prefix.
// Why it works: instead of checking "does this path spell word W", the DFS
//       checks "is this path still a valid prefix of ANY remaining word" —
//       one trie walk prunes all of them together. A found word's node is
//       marked so it isn't reported twice via a different path.
//
// LC212: Word Search II — given a grid of letters and a list of words,
// return every word found by moving up/down/left/right through the grid
// without reusing a cell.

class TrieNode {
  constructor() {
    this.children = new Map();
    this.word = null; // set to the full word at the node that completes it
  }
}

function buildTrie(words) {
  const root = new TrieNode();
  for (const word of words) {
    let node = root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch);
    }
    node.word = word;
  }
  return root;
}

function findWords(board, words) {
  const root = buildTrie(words);
  const rows = board.length;
  const cols = board[0].length;
  const found = new Set();

  function dfs(r, c, node) {
    const ch = board[r][c];
    const next = node.children.get(ch);
    if (!next) return; // no word in the trie continues with this letter

    if (next.word !== null) {
      found.add(next.word);
      next.word = null; // avoid re-adding the same word via another path
    }

    board[r][c] = "#"; // mark visited
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] !== "#") {
        dfs(nr, nc, next);
      }
    }
    board[r][c] = ch; // restore

    // Prune the trie: once a subtree has no children and no live word left,
    // future DFS calls skip it entirely (kept simple here since it's not
    // required for correctness, just a speedup on large inputs).
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dfs(r, c, root);
    }
  }

  return [...found];
}

module.exports = { findWords };

if (require.main === module) {
  const board = [
    ["o", "a", "a", "n"],
    ["e", "t", "a", "e"],
    ["i", "h", "k", "r"],
    ["i", "f", "l", "v"],
  ];
  console.log(findWords(board, ["oath", "pea", "eat", "rain"]).sort());
  // [ 'eat', 'oath' ]
}

// Pattern: Trie with wildcard search
// When: search needs to support a "matches any single character" wildcard
//       alongside exact lookups — a plain search() can't express that.
// Why it works: a normal trie walk follows exactly one child per step. A
//       wildcard just means "try every child at this step instead of one",
//       turning the walk into a small DFS/branching search that still only
//       explores paths consistent with characters seen so far — it doesn't
//       degrade into scanning the whole dictionary.
//
// LC211: Design Add and Search Words Data Structure — addWord(word) then
// search(word) where '.' in the search pattern matches any single letter.

class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

class WordDictionary {
  constructor() {
    this.root = new TrieNode();
  }

  addWord(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch);
    }
    node.isEndOfWord = true;
  }

  search(word) {
    const dfs = (node, i) => {
      if (i === word.length) return node.isEndOfWord;

      const ch = word[i];
      if (ch === ".") {
        for (const child of node.children.values()) {
          if (dfs(child, i + 1)) return true;
        }
        return false;
      }

      const next = node.children.get(ch);
      return next !== undefined && dfs(next, i + 1);
    };

    return dfs(this.root, 0);
  }
}

module.exports = { WordDictionary };

if (require.main === module) {
  const wd = new WordDictionary();
  wd.addWord("bad");
  wd.addWord("dad");
  wd.addWord("mad");
  console.log(wd.search("pad")); // false
  console.log(wd.search("bad")); // true
  console.log(wd.search(".ad")); // true
  console.log(wd.search("b..")); // true
}

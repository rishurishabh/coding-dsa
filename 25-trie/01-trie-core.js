// Pattern: Trie (prefix tree) — core structure
// When: you need to test membership of, or search by prefix over, a large
//       set of strings that share a lot of common prefixes.
// Why it works: each node represents one character position; a path from
//       the root spells out a prefix. Strings that share a prefix share the
//       same path, so a set of N strings of length L costs O(N*L) nodes
//       worst case, not O(N*L) per lookup — insert/search/startsWith are
//       all O(word length), independent of how many other words exist.

class TrieNode {
  constructor() {
    this.children = new Map(); // char -> TrieNode
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch);
    }
    node.isEndOfWord = true;
  }

  // Walks to the node at the end of `prefix`, or null if the path breaks.
  _walk(prefix) {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children.has(ch)) return null;
      node = node.children.get(ch);
    }
    return node;
  }

  search(word) {
    const node = this._walk(word);
    return node !== null && node.isEndOfWord;
  }

  startsWith(prefix) {
    return this._walk(prefix) !== null;
  }
}

module.exports = { Trie, TrieNode };

if (require.main === module) {
  const trie = new Trie();
  trie.insert("apple");
  console.log(trie.search("apple")); // true
  console.log(trie.search("app")); // false
  console.log(trie.startsWith("app")); // true
  trie.insert("app");
  console.log(trie.search("app")); // true
}

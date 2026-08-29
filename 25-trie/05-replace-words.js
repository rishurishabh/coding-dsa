// Pattern: Trie shortest-prefix match
// When: replacing each word in text with the shortest matching entry from a
//       dictionary of prefixes ("roots") — a hash set could confirm exact
//       membership but can't cheaply find the SHORTEST prefix that matches.
// Why it works: walking the trie character by character naturally visits
//       prefixes in increasing length order, so the first end-of-word node
//       hit along the walk is, by construction, the shortest matching root
//       — stop immediately instead of checking all possible prefix lengths.
//
// LC648: Replace Words — given a dictionary of word roots and a sentence,
// replace every derivative word with its shortest root (a word with no
// matching root is left unchanged).

class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

function replaceWords(roots, sentence) {
  const root = new TrieNode();

  for (const r of roots) {
    let node = root;
    for (const ch of r) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch);
    }
    node.isEndOfWord = true;
  }

  function shortestRoot(word) {
    let node = root;
    let prefix = "";

    for (const ch of word) {
      if (!node.children.has(ch)) return word; // no root matches at all
      node = node.children.get(ch);
      prefix += ch;
      if (node.isEndOfWord) return prefix; // shortest match found — stop
    }

    return word; // whole word walked with no root ending along the way
  }

  return sentence.split(" ").map(shortestRoot).join(" ");
}

module.exports = { replaceWords };

if (require.main === module) {
  console.log(replaceWords(["cat", "bat", "rat"], "the cattle was rattled by the battery"));
  // "the cat was rat by the bat"
  console.log(replaceWords(["a", "b", "c"], "aadsfasf absfasf ac aa"));
  // "a a a a"
}

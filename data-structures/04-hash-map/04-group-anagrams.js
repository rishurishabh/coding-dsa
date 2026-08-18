// Structure: a hash map keyed not by the raw input, but by a TRANSFORMED
// version of it — every anagram of a word maps to the exact same key,
// so grouping becomes a single pass of "compute key, append to bucket."
// When:
//   - items need to be grouped by some property that isn't the item's
//     literal value, but something derived from it
// Why:
//   - two strings are anagrams exactly when their sorted characters are
//     identical — sorting each word canonicalizes it into a shared key
//     that every anagram of it also produces
//   - once the key is canonical, grouping is just a hash map lookup per
//     word: O(1) average to find (or create) the right bucket, instead
//     of comparing every word against every other word — O(n) buckets
//     total instead of O(n^2) comparisons

function groupAnagrams(words) {
  const groups = new Map(); // sorted-signature -> array of original words
  for (const word of words) {
    const key = word.split("").sort().join("");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(word);
  }
  return Array.from(groups.values());
}

// Demo
if (require.main === module) {
  console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
  // [["eat","tea","ate"],["tan","nat"],["bat"]]
}

module.exports = { groupAnagrams };

# Bitmasking for Subsets — Practice Problems

1. **By hand, no code**: for the list `["Pen", "Book", "Ruler"]`, write
   out what subset `mask = 6` represents, then check with
   [01-represent-subset-as-bitmask.js](01-represent-subset-as-bitmask.js).

2. **Subsets** (LeetCode 78)
   - Task: return every possible subset of a list of numbers
   - Pattern: [Variant 2](02-iterate-all-subsets.js) — count 0 to 2ⁿ−1,
     decode each mask. Compare against the recursive solution in
     [17-subsets-backtracking](../../17-subsets-backtracking/README.md) —
     same output, very different mechanism

3. **Partition to K Equal Sum Subsets** (LeetCode 698) — harder, once
   comfortable
   - Task: can an array be split into k groups of equal sum?
   - Pattern: [Variant 1](01-represent-subset-as-bitmask.js)'s
     encode/decode, used to track "which numbers have been used so far"
     as a single number instead of a visited array

4. **Single Number** (LeetCode 136) — full circle
   - Now that you've seen how a group of items becomes one number, go
     back to [02-bitwise-operators](../02-bitwise-operators/README.md)
     and look at variant 2 again — XOR cancellation is doing a very
     similar trick, just with a different operator

## This is the last module in this track
See [../index.md](../index.md) for the full list, and
[18-bitwise-xor](../../18-bitwise-xor/README.md) for where these ideas
get used to solve interview problems.

# DP on Grids

![DP on Grids mechanism map: dp[i][j] as a literal grid cell, filled by movement direction, and a diagram for each of the 5 variants](diagram.svg)

Interactive version: [diagram.html](diagram.html) (open in a browser)

## What
- `dp[i][j]` indexes a literal grid COORDINATE — not a substring interval
  like [22-palindromic-subsequence](../22-palindromic-subsequence/README.md),
  and not two sequences being compared like
  [21-lcs-family](../21-lcs-family/README.md)
- Almost every variant only ever moves right or down, so the grid fills
  top-left to bottom-right — except when the problem's dependencies run
  the other way, which flips the fill direction entirely (variant 5)
- What changes between variants is the combining operator (sum vs. min),
  how many neighbors feed each cell (two vs. three), and — once — which
  corner the fill even starts from

## When to use it
Applies when:
1. Movement through a 2D grid is constrained to a small, fixed set of
   directions (commonly right/down), and the answer only needs the
   start and end corners
2. Each cell's value depends only on its immediate neighbors in the
   allowed directions — no need to consider the whole path that led there
3. The dependency direction isn't obviously forward — if what a cell
   needs depends on cells AHEAD of it rather than behind, the fill has
   to run backward (variant 5's signal to watch for)

## Why it works
- Restricting movement to right/down means a cell has at most two
  possible predecessors — summing or comparing just those two collapses
  an exponential number of paths into one pass over the grid
- Filling top-left to bottom-right guarantees every predecessor is
  already computed by the time a cell needs it — the same "state, not
  path" guarantee every DP pattern in this repo relies on
- When a cell's requirement is defined in terms of what comes AFTER it
  (variant 5), that guarantee only holds if the fill runs bottom-right
  to top-left instead — the grid shape doesn't change, only the order

## Five variants
Same right/down grid shape, three times, then one structural break
(three neighbors instead of two) and one directional break (backward
fill) to show where the pattern's assumptions stop holding.

| File | Variant | Use when |
|---|---|---|
| [01-unique-paths.js](01-unique-paths.js) | Sum of two neighbors | counting paths through an open grid |
| [02-unique-paths-with-obstacles.js](02-unique-paths-with-obstacles.js) | Same recurrence, one guard | some cells are blocked and unreachable |
| [03-minimum-path-sum.js](03-minimum-path-sum.js) | Min of two neighbors | minimizing accumulated cost instead of counting paths |
| [04-maximal-square.js](04-maximal-square.js) | Min of THREE neighbors | the answer needs a full square, not just a path |
| [05-dungeon-game.js](05-dungeon-game.js) | Same shape, filled backward | a cell's requirement depends on what's still ahead, not behind |

Each file is runnable standalone: `node 0X-name.js` prints a demo run.

See [problems.md](problems.md) for a suggested practice order.

// Splits `items` into pages: `first` items on the first page, at most `next` on
// each middle page and at most `last` on the final page, which leaves room for
// the totals. The final page always keeps at least one item.
// Usage: {{#each (paginate items first=2 next=3 last=2)}}…{{/each}}
function paginate(items, options) {
  const list = Array.isArray(items) ? items : [];
  const { first, next, last } = options.hash;
  if (![first, next, last].every((n) => Number.isInteger(n) && n > 0)) {
    throw new Error("paginate: `first`, `next` and `last` must be positive integers");
  }

  if (list.length <= first) return [list];

  const pages = [list.slice(0, first)];
  let rest = list.slice(first);
  while (rest.length > last) {
    const size = Math.min(next, rest.length - 1);
    pages.push(rest.slice(0, size));
    rest = rest.slice(size);
  }
  pages.push(rest);
  return pages;
}

module.exports = paginate;

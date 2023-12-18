function not(a, b, options) {
  return a !== b ? options.fn(this) : null;
}

module.exports = not;

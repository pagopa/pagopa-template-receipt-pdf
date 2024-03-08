module.exports = function eq(a, b, options) {
  return a === b ? options.fn(this) : options.inverse(this);
};

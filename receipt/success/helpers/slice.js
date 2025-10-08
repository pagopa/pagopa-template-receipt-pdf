function slice(arr, start, end) {
  return !Array.isArray(arr) ? [] : arr.slice(start, typeof end === "number" ? end : undefined);
}

module.exports = slice;

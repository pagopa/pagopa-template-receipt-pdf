var not = function () {};

not.register = function (Handlebars) {
  Handlebars.registerHelper('not', function (a, b, options) {
    return a !== b ? options.fn(this) : null;
  });
};

module.exports = not;

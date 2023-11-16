var lowercase = function () {};

lowercase.register = function (Handlebars) {
  Handlebars.registerHelper("lowercase", function (str) {
    return str.toLowerCase();
  });
};

module.exports = lowercase;

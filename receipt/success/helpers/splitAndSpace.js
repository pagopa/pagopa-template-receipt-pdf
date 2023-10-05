var splitAndSpace = function () {};

splitAndSpace.register = function (Handlebars) {
  Handlebars.registerHelper("splitAndSpace", function (str) {
    return str.match(/(.{2,4})/gy).join(" ");
  });
};

module.exports = splitAndSpace;

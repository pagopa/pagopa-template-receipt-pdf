const fs = require("fs");
const Handlebars = require("handlebars");

// Import helpers
const eq = require("../helpers/eq.js");
const not = require("../helpers/not.js");
const splitAndSpace = require("../helpers/splitAndSpace");
const lowercase = require("../helpers/lowercase.js");

// Register the helpers
Handlebars.registerHelper("eq", eq);
Handlebars.registerHelper("not", not);
Handlebars.registerHelper("splitAndSpace", splitAndSpace);
Handlebars.registerHelper("lowercase", lowercase);

const templateFile = fs.readFileSync("template.hbs", "utf8");
const template = Handlebars.compile(templateFile);

// Load the data for the template
const data = require("../json/authenticated-pdf.json");

// Generate the HTML
const html = template(data);

// Save the HTML to a file
fs.writeFileSync("template.html", html);

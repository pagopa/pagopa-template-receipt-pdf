const fs = require("fs");
let { readFileSync, readdirSync } = require('fs');
const Handlebars = require("handlebars");
const path = require('node:path');

// Utils functions
const getFiles = source => readdirSync(source, { withFileTypes: true })
  .filter(dirent => !dirent.isDirectory())
  .map(dirent => dirent.name)
const importFile = (filePath, fileName) => readFileSync(`${filePath}/${fileName}`, "utf8");
const requireFile = (filePath, fileName) => require(`${filePath}/${fileName}`);

// Dynamically imports helpers
const helpersPath = '../helpers';

const helperFiles = getFiles(`${helpersPath}`);
for (let helperFile of helperFiles) {
  const helper = requireFile(`${helpersPath}/`, path.parse(`${helpersPath}/${helperFile}`).name);
  Handlebars.registerHelper(
    path.parse(`${helpersPath}/${helperFile}`).name, helper);
}

const templateFile = fs.readFileSync("template.hbs", "utf8");
const template = Handlebars.compile(templateFile);

// Load the data for the template
const data = require("../json/authenticated-pdf.json");

// Generate the HTML
const html = template(data);

// Save the HTML to a file
fs.writeFileSync("template.html", html);
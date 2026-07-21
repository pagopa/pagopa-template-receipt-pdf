"use strict";

const { v4: uuidv4 } = require("uuid");
const puppeteer = require("puppeteer");
const path = require("path");

const transactionID = uuidv4(); // ex 'F57E2F8E-25FF-4183-AB7B-4A5EC1A96644'

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const htmlFile = path.resolve("template.html");

  await page.goto(`file://${htmlFile}`, { waitUntil: "networkidle2" });

  // Use the document's <title> as the PDF metadata title, so the accessible
  // document title stays in sync with the single source of truth in the template.
  const title = await page.title();

  await page.pdf({
    path: `pagopa-receipt-${transactionID}.pdf`,
    format: "A4",
    title,
    landscape: false,
    printBackground: true,
  });

  await browser.close();
})();

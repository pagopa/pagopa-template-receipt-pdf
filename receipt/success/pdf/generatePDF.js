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
  await page.pdf({
    path: `pagopa-receipt-${transactionID}.pdf`,
    format: "A4",
    landscape: false,
    printBackground: true,
  });

  await browser.close();
})();

"use strict";

/* Imported from "html-validate/node": the package root ships a browser-safe
   build whose default loader ignores .htmlvalidate.json on disk. */
const {
    HtmlValidate,
    FileSystemConfigLoader,
    formatterFactory,
} = require("html-validate/node");
const path = require("path");

const htmlFile = path.resolve("template.html");

(async () => {
    const htmlvalidate = new HtmlValidate(new FileSystemConfigLoader());
    const report = await htmlvalidate.validateFile(htmlFile);

    if (!report.valid) {
        const format = formatterFactory("stylish");
        console.error(format(report.results));
        console.error(
            `❌ ${htmlFile} is not valid HTML. The PDF was not generated.`
        );
        process.exit(1);
    }

    console.log("✅ template.html is valid HTML.");
})();

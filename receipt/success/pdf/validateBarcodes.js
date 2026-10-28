"use strict";

/* Checks the geometry of every barcode in template.html: narrow bar (X), bar
   height and quiet zones. The PDF is printed from this same Chromium render. */
const puppeteer = require("puppeteer");
const path = require("path");

// CSS defines 1in = 96px, and 1in = 25.4 mm
const MM_PER_PX = 25.4 / 96;
const A4_WIDTH_MM = 210;

// pagoPA spec: narrow bar 0.25–0.30 mm, bars ~14 mm high, ±10% tolerance
const X_MIN_MM = 0.25;
const X_MAX_MM = 0.3;
const HEIGHT_MM = 14;
const TOLERANCE = 0.1;
// Code 128 (ISO/IEC 15417): blank margin of at least 10 × X on each side
const QUIET_ZONE_X = 10;

const htmlFile = path.resolve("template.html");

(async () => {
    const browser = await puppeteer.launch();
    const errors = [];
    let count = 0;

    try {
        const page = await browser.newPage();
        // Laid out as printed: print styles, A4 width. Rendered at 4x, so thin
        // marks next to a barcode aren't lost
        await page.emulateMediaType("print");
        await page.setViewport({
            width: Math.floor(A4_WIDTH_MM / MM_PER_PX),
            height: 1200,
            deviceScaleFactor: 4,
        });
        await page.goto(`file://${htmlFile}`, { waitUntil: "networkidle2" });

        // The mm measured here are the PDF's only if it isn't rescaled: content
        // wider than A4 makes Chromium shrink the whole PDF, barcodes included
        const contentWidthMm =
            (await page.evaluate(() => document.documentElement.scrollWidth)) * MM_PER_PX;
        if (contentWidthMm > A4_WIDTH_MM + 0.5) {
            errors.push(
                `Content is ${contentWidthMm.toFixed(1)} mm wide: wider than A4, the PDF would be shrunk to fit`
            );
        }

        // Pixels in a screenshot that aren't (near) white
        const inkPixels = (png) =>
            page.evaluate(async (src) => {
                const img = new Image();
                img.src = `data:image/png;base64,${src}`;
                await img.decode();
                const canvas = new OffscreenCanvas(img.width, img.height);
                const context = canvas.getContext("2d");
                context.drawImage(img, 0, 0);
                const { data } = context.getImageData(0, 0, img.width, img.height);
                let ink = 0;
                for (let i = 0; i < data.length; i += 4) {
                    if (data[i] + data[i + 1] + data[i + 2] < 3 * 240) ink++;
                }
                return ink;
            }, png);

        for (const barcode of await page.$$(".transaction-detail-barcode")) {
            count++;
            const box = await barcode.evaluate(async (el) => {
                await el.decode();
                const rect = el.getBoundingClientRect();
                const svg = atob(el.getAttribute("src").split(",")[1]);
                return {
                    x: rect.x + window.scrollX,
                    y: rect.y + window.scrollY,
                    width: rect.width,
                    height: rect.height,
                    // With `scale: 1` the viewBox width is the number of modules
                    modules: Number(svg.match(/viewBox="0 0 (\d+)/)[1]),
                };
            });
            const label = `barcode ${count}`;

            const xMm = (box.width * MM_PER_PX) / box.modules;
            if (xMm < X_MIN_MM - 0.0005 || xMm > X_MAX_MM + 0.0005) {
                errors.push(`${label}: X is ${xMm.toFixed(3)} mm, outside ${X_MIN_MM}–${X_MAX_MM} mm`);
            }

            const heightMm = box.height * MM_PER_PX;
            if (Math.abs(heightMm - HEIGHT_MM) > HEIGHT_MM * TOLERANCE) {
                errors.push(`${label}: bars are ${heightMm.toFixed(1)} mm high, not ${HEIGHT_MM} mm ±${TOLERANCE * 100}%`);
            }

            // Strips start half a pixel off the symbol, clear of its antialiased edge
            const quietZone = (QUIET_ZONE_X * xMm) / MM_PER_PX;
            const strips = {
                left: { x: box.x - quietZone - 0.5, y: box.y, width: quietZone, height: box.height },
                right: { x: box.x + box.width + 0.5, y: box.y, width: quietZone, height: box.height },
            };
            for (const [side, clip] of Object.entries(strips)) {
                const png = await page.screenshot({ clip, encoding: "base64", captureBeyondViewport: true });
                if (await inkPixels(png)) {
                    errors.push(`${label}: ${side} quiet zone (${QUIET_ZONE_X} × X) isn't blank`);
                }
            }
        }
    } finally {
        await browser.close();
    }

    if (errors.length) {
        console.error(errors.map((error) => `  ${error}`).join("\n"));
        console.error(`❌ ${errors.length} barcode check(s) failed. The PDF was not generated.`);
        process.exit(1);
    }

    console.log(
        count
            ? `✅ ${count} barcode(s) within X, bar height and quiet zone limits.`
            : "✅ No barcodes to check."
    );
})();

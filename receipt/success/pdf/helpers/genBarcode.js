const bwipjs = require("bwip-js");

// pagoPA spec for receipt barcodes: narrow bar 0.25–0.30 mm, bars ~14 mm high.
const X_DIMENSION_MM = 0.3;
// 14 mm + 7%, within the ±10% tolerance: still in spec when printed at 85%
const BAR_HEIGHT_MM = 15;

// Plain Code 128 (no FNC1, no GS1 Application Identifiers)
// Scanners read back exactly `value` without interpreting it as GS1 data
function genBarcode(value) {
  const svg = bwipjs.toSVG({
    bcid: "code128",
    text: String(value),
    scale: 1,
    includetext: false,
  });

  // With `scale: 1` the viewBox width is the number of modules, so the
  // printed width is exactly modules × X; only the height is stretched
  const modules = Number(svg.match(/viewBox="0 0 (\d+)/)[1]);
  const width = (modules * X_DIMENSION_MM).toFixed(2);

  const sized = svg.replace(
    "<svg ",
    `<svg width="${width}mm" height="${BAR_HEIGHT_MM}mm" preserveAspectRatio="none" `
  );

  return `data:image/svg+xml;base64,${Buffer.from(sized).toString("base64")}`;
}

module.exports = genBarcode;

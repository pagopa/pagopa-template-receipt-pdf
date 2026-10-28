// Cart items that fit on each page, measured on A4 with a subject and a debtor
// on every item. A barcode adds a ~18 mm row to its item, so fewer fit.
// `first`: first page, when a continuation page follows
// `next`: continuation page, which also ends with the totals
const ITEMS_PER_PAGE = {
  default: { first: 3, next: 4 },
  barcode: { first: 2, next: 2 },
};

function itemsPerPage(items, page) {
  const hasBarcode = Array.isArray(items) && items.some((item) => item.showBarcode);
  return ITEMS_PER_PAGE[hasBarcode ? "barcode" : "default"][page];
}

module.exports = itemsPerPage;

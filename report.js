const { CSV_report } = require('./CSV');

function printReport(pages) {
  const sortedPages = sortPages(pages);
  console.log('\n\n==========REPORT==========\n');
  for (const sortedPage of sortedPages) {
    const url = sortedPage[0];
    const hits = sortedPage[1];
    console.log(`Found ${hits} internal links to ${url}`);
    const link = new CSV_report(hits, url);
    link.saveAsCSV();
  }
  console.log('\n==========END REPORT===========');
}

function sortPages(pages) {
  const pagesArr = Object.entries(pages);
  pagesArr.sort((a, b) => {
    return b[1] - a[1];
  });
  return pagesArr;
}

module.exports = { sortPages, printReport };

const { appendFileSync } = require('fs');

class CSV_report {
  constructor(hits, url) {
    this.hits = hits;
    this.url = url;
  }

  saveAsCSV() {
    const hyperLink = `=HYPERLINK('https://${this.url}','${this.url}')`;
    const csv = `${hyperLink}, ${this.hits} internal links\n`;
    try {
      appendFileSync('./report.csv', csv);
    } catch (err) {
      console.log(err.message);
    }
  }
}
module.exports = { CSV_report };

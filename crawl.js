const { JSDOM } = require('jsdom');

async function crawlPage(baseURL, currentURL, pages) {
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);

  if (currentURLObj.hostname !== baseURLObj.hostname) return pages;

  const normalisedCurrentURL = normaliseURL(currentURL);
  if (pages[normalisedCurrentURL] > 0) {
    pages[normalisedCurrentURL]++;
    return pages;
  }

  pages[normalisedCurrentURL] = 1;

  console.log(`Actively crawling ${normalisedCurrentURL}`);
  try {
    const resp = await fetch(currentURL);

    if (resp.status > 399) {
      console.log(
        `Error in fetch with status code: ${resp.status} on page ${currentURL}`
      );
      return pages;
    }

    const contentType = resp.headers.get('content-type');
    if (!contentType.includes('text/html')) {
      console.log(
        `Not html resp, content type: ${contentType} on page ${currentURL}`
      );
      return pages;
    }

    const htmlBody = await resp.text();

    const nextURLs = getURLsfromHTML(htmlBody, baseURL);

    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages);
    }
  } catch (err) {
    console.log(`Error in fetch: ${err.message} on page ${currentURL}`);
  }
  return pages;
}

function normaliseURL(urlString) {
  if (urlString.endsWith('/')) {
    urlString = urlString.slice(0, -1);
  }
  const URLObj = new URL(urlString);
  const hostPath = `${URLObj.hostname}${URLObj.pathname}`;
  return hostPath;
}

function getURLsfromHTML(htmlString, baseURL) {
  const urls = [];

  const dom = new JSDOM(htmlString);
  dom.window.document.querySelectorAll('a').forEach((link) => {
    if (link.href.startsWith('/')) {
      // Relative url
      try {
        const urlObj = new URL(`${baseURL}${link.href}`);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`Error with relative url: ${err.message}`);
      }
    } else {
      // absolute url
      try {
        const urlObj = new URL(link.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`Error with absolute url: ${err.message}`);
      }
    }
  });
  return urls;
}

module.exports = { normaliseURL, getURLsfromHTML, crawlPage };

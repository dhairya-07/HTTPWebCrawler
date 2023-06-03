const { test, expect } = require('@jest/globals');
const { normaliseURL, getURLsfromHTML } = require('./crawl.js');

test('normalise', () => {
  const input = 'https://blog.boot.dev/path';
  const actual = normaliseURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toEqual(expected);
});

test('strip protocol', () => {
  const input = 'https://blog.boot.dev/path';
  const actual = normaliseURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toEqual(expected);
});

test('strip http', () => {
  const input = 'http://blog.boot.dev/path';
  const actual = normaliseURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toEqual(expected);
});

test('Trailing slashes', () => {
  const input = 'https://blog.boot.dev/path/';
  const actual = normaliseURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toEqual(expected);
});

test('Capitals', () => {
  const input = 'https://BLOG.boot.dev/path/';
  const actual = normaliseURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toEqual(expected);
});

test('Get absolute url from HTML', () => {
  const inputHTML = `
  <html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
    </body>
  </html>`;
  const baseURL = 'https://blog.boot.dev/path';

  const actual = getURLsfromHTML(inputHTML, baseURL);
  const expected = ['https://blog.boot.dev/'];
  expect(actual).toEqual(expected);
});

test('Relative URL', () => {
  const inputHTML = `
  <html>
    <body>
        <a href="/path/roadmap"><span>Go to Boot.dev</span></a>
    </body>
  </html>`;
  const baseURL = 'https://blog.boot.dev';

  const actual = getURLsfromHTML(inputHTML, baseURL);
  const expected = ['https://blog.boot.dev/path/roadmap'];
  expect(actual).toEqual(expected);
});

test('Multiple urls', () => {
  const inputHTML = `
    <html>
      <body>
          <a href="https://blog.boot.dev/path1/"><span>Go to Boot.dev</span></a>
          <a href="/path2"><span>Go to Boot.dev</span></a>
      </body>
    </html>`;
  const baseURL = 'https://blog.boot.dev';

  const actual = getURLsfromHTML(inputHTML, baseURL);
  const expected = [
    'https://blog.boot.dev/path1/',
    'https://blog.boot.dev/path2',
  ];
  expect(actual).toEqual(expected);
});

test('Invalid URLs', () => {
  const inputHTML = `
    <html>
      <body>
          <a href="invalid"><span>invalid url</span></a>
      </body>
    </html>`;
  const baseURL = 'https://blog.boot.dev';

  const actual = getURLsfromHTML(inputHTML, baseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});

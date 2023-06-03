const { test, expect } = require('@jest/globals');
const { sortPages } = require('./report');

test('Sort pages', () => {
  const input = {
    'https://wagslane.dev/path1': 5,
    'https://wagslane.dev': 3,
    'https://wagslane.dev/path2': 1,
    'https://wagslane.dev/path3': 4,
    'https://wagslane.dev/path4': 2,
  };
  const actual = sortPages(input);

  const expected = [
    ['https://wagslane.dev/path1', 5],
    ['https://wagslane.dev/path3', 4],
    ['https://wagslane.dev', 3],
    ['https://wagslane.dev/path4', 2],
    ['https://wagslane.dev/path2', 1],
  ];
  expect(actual).toEqual(expected);
});

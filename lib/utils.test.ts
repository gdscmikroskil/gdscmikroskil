import { describe, expect, test } from 'vitest';

import { compactName } from '~/lib/utils';

describe('compactName', () => {
  test.each([
    {
      input: 'John Doe With Fit Very Name Long', // 32
      expected: 'John Doe With Fit Very Name Long', // 32
    },
    {
      input: 'John Doe With Fit Name Long', // 27
      expected: 'John Doe With Fit Name Long', // 27
    },
    {
      input: 'John Doe With Fit Very Name Long Extra', // 38
      expected: 'John Doe With Fit Very Name Long', // 32
    },
    {
      input: 'John Doe With Fit Very Name Extra', // 33
      expected: 'John Doe With Fit Very Name', // 27
    },
    {
      input: 'JohnDoeWithFitVeryVeryNameLongxxy', // 32
      expected: 'JohnDoeWithFitVeryVeryNameLongxx', // 32
    },
  ])('compactName($input)', ({ input, expected }) => {
    expect(compactName(input)).toBe(expected);
  });
});

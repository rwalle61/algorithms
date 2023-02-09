describe('longestCommonSubsequence', () => {
  // Assumptions:
  // 1 <= text1.length, text2.length <= 1000
  // text1 and text2 consist of only lowercase English characters.

  // Best Computational Runtime:
  // runtime (n^2?): probably similar to longest increasing subsequence?
  // space (>1): probably need to store stuff

  // Solutions:

  // brute - try every possible subsequence
  // runtime (2^(mn))
  // space (1)

  // brute recurse
  // runtime (2^(min of m or n))
  // space (n): recursive stack

  // bottom up with 2D cache
  // runtime (m*n)
  // space (m*n)

  describe('brute recurse', () => {
    // runtime complexity:
    // best (min of m or n): both strings identical
    // worst (2^(max of m or n)): both strings completely different, need to check longest string
    // normal (2^(max of m or n))

    // space complexity:
    // best (min of m or n): both strings identical
    // worst (max of m or n): need to check longest string
    // normal (max of m or n)

    const longestCommonSubsequenceRecursive = (
      a: string,
      b: string,
      aIndex: number,
      bIndex: number,
    ): number => {
      if (aIndex === a.length || bIndex === b.length) {
        return 0;
      }

      if (a[aIndex] === b[bIndex]) {
        return (
          1 + longestCommonSubsequenceRecursive(a, b, aIndex + 1, bIndex + 1)
        );
      }

      return Math.max(
        longestCommonSubsequenceRecursive(a, b, aIndex + 1, bIndex),
        longestCommonSubsequenceRecursive(a, b, aIndex, bIndex + 1),
      );
    };

    const longestCommonSubsequence = (a: string, b: string): number =>
      longestCommonSubsequenceRecursive(a, b, 0, 0);

    it('edge: repeated characters', () => {
      expect(longestCommonSubsequence('aa', 'a')).toBe(1);
      expect(longestCommonSubsequence('a', 'aa')).toBe(1);
    });

    it('edge: length 0', () => {
      expect(longestCommonSubsequence('a', '')).toBe(0);
      expect(longestCommonSubsequence('', 'a')).toBe(0);
      expect(longestCommonSubsequence('', '')).toBe(0);
    });

    it('acceptance', () => {
      expect(longestCommonSubsequence('abcde', 'ace')).toBe(3);
      expect(longestCommonSubsequence('abc', 'abc')).toBe(3);
      expect(longestCommonSubsequence('abc', 'def')).toBe(0);
    });
  });

  describe('bottom up with 2D cache', () => {
    // runtime complexity:
    // best (m*n)
    // worst (m*n)
    // normal m*n): always store

    // space complexity:
    // best (m*n)
    // worst (m*n)
    // normal (m*n): recursive stack always the same

    const longestCommonSubsequence = (a: string, b: string): number => {
      const cache: number[][] = new Array(a.length + 1)
        .fill(null)
        .map(() => new Array<number>(b.length + 1).fill(0));

      for (let j = a.length - 1; j >= 0; j--) {
        for (let i = b.length - 1; i >= 0; i--) {
          const aChar = a[j];
          const bChar = b[i];
          if (aChar === bChar) {
            cache[j][i] = 1 + cache[j + 1][i + 1];
          } else {
            cache[j][i] = Math.max(cache[j + 1][i], cache[j][i + 1]);
          }
        }
      }

      return cache[0][0];
    };

    it('edge: repeated characters', () => {
      expect(longestCommonSubsequence('aa', 'a')).toBe(1);
      expect(longestCommonSubsequence('a', 'aa')).toBe(1);
    });

    it('edge: length 0', () => {
      expect(longestCommonSubsequence('a', '')).toBe(0);
      expect(longestCommonSubsequence('', 'a')).toBe(0);
      expect(longestCommonSubsequence('', '')).toBe(0);
    });

    it('acceptance', () => {
      expect(longestCommonSubsequence('abcde', 'ace')).toBe(3);
      expect(longestCommonSubsequence('abc', 'abc')).toBe(3);
      expect(longestCommonSubsequence('abc', 'def')).toBe(0);
    });
  });
});

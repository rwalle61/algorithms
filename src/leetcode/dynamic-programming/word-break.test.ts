describe('wordBreak', () => {
  // Assumptions:
  // 1 <= s.length <= 300
  // 1 <= wordDict.length <= 1000
  // 1 <= wordDict[i].length <= 20
  // s and wordDict[i] consist of only lowercase English letters.
  // All the strings of wordDict are unique.

  // Best Computational Runtime:
  // runtime (s.len * wordDict.len * len of each word)
  // space (s.len): min cache

  // Solutions:

  // brute (recursive)
  // runtime (2^s.len)
  // space (s.len): recursive stack

  // top-down dp cache (recursive)
  // runtime (s.len * wordDict.len * len of each word)
  // space (s.len + wordDict.len): recursive stack + cache

  // bottom-up dp cache (iterate)
  // runtime (s.len * wordDict.len * len of each word)
  // space (s.len): cache

  describe('brute (recursive)', () => {
    // runtime complexity:
    // best (s.len + wordDict.len): no words in wordDict
    // worst (2^s.len): every letter in wordDict
    // normal (2^s.len)

    // space complexity:
    // best (wordDict.len): no words in wordDict
    // worst (s.len): every letter in wordDict
    // normal (s.len)

    const wordBreakRecursive = (
      s: string,
      set: Set<string>,
      i: number,
    ): boolean => {
      let word = '';
      let newIndex = i;

      while (s[newIndex]) {
        word += s[newIndex];

        newIndex += 1;

        if (set.has(word) && wordBreakRecursive(s, set, newIndex)) {
          return true;
        }
      }

      return !word.length;
    };

    const wordBreak = (s: string, wordDict: string[]): boolean =>
      wordBreakRecursive(s, new Set(wordDict), 0);

    it('normal case', () => {
      expect(wordBreak('ab', ['a', 'b'])).toBe(true);
      expect(wordBreak('ab', ['a'])).toBe(false);
      expect(wordBreak('ab', ['b'])).toBe(false);

      expect(wordBreak('leetcode', ['leet', 'code'])).toBe(true);
    });

    it('reuse word', () => {
      expect(wordBreak('applepenapple', ['apple', 'pen'])).toBe(true);
    });

    it('multiple matches where only one works', () => {
      expect(wordBreak('leetcode', ['le', 'leet', 'code'])).toBe(true);
      expect(wordBreak('leetcode', ['le', 'leet', 'etcode'])).toBe(true);
    });

    it('empty string', () => {
      expect(wordBreak('', ['apple', 'pen'])).toBe(true);
      expect(wordBreak('', [])).toBe(true);
    });

    it('big', () => {
      expect(
        wordBreak('aaaaaaaaaaaaaaaaaaaaaab', [
          'a',
          'aa',
          'aaa',
          'aaaa',
          'aaaaa',
        ]),
      ).toBe(false);
    });

    it('acceptance', () => {
      expect(wordBreak('leetcode', ['leet', 'code'])).toBe(true);

      expect(wordBreak('applepenapple', ['apple', 'pen'])).toBe(true);

      expect(
        wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat']),
      ).toBe(false);
    });
  });

  describe('top-down dp cache (recursive)', () => {
    // runtime complexity:
    // best (s.len + wordDict.len): no words in wordDict
    // worst (s.len * wordDict.len): every letter in wordDict
    // normal (s.len * wordDict.len)

    // space complexity:
    // best (wordDict.len): no words in wordDict
    // worst (s.len * wordDict.len): every letter in wordDict
    // normal (s.len * wordDict.len)

    const wordBreakRecursive = (
      s: string,
      set: Set<string>,
      i: number,
      checkedIndices: Set<number>,
    ): boolean => {
      let word = '';
      let newIndex = i;

      if (checkedIndices.has(newIndex)) {
        return false;
      }

      while (s[newIndex]) {
        word += s[newIndex];

        newIndex += 1;

        if (
          set.has(word) &&
          wordBreakRecursive(s, set, newIndex, checkedIndices)
        ) {
          return true;
        }
      }

      checkedIndices.add(i);

      return !word.length;
    };

    const wordBreak = (s: string, wordDict: string[]): boolean =>
      wordBreakRecursive(s, new Set(wordDict), 0, new Set());

    it('normal case', () => {
      expect(wordBreak('ab', ['a', 'b'])).toBe(true);
      expect(wordBreak('ab', ['a'])).toBe(false);
      expect(wordBreak('ab', ['b'])).toBe(false);

      expect(wordBreak('leetcode', ['leet', 'code'])).toBe(true);
    });

    it('reuse word', () => {
      expect(wordBreak('applepenapple', ['apple', 'pen'])).toBe(true);
    });

    it('multiple matches where only one works', () => {
      expect(wordBreak('leetcode', ['le', 'leet', 'code'])).toBe(true);
      expect(wordBreak('leetcode', ['le', 'leet', 'etcode'])).toBe(true);
    });

    it('empty string', () => {
      expect(wordBreak('', ['apple', 'pen'])).toBe(true);
      expect(wordBreak('', [])).toBe(true);
    });

    it('big', () => {
      expect(
        wordBreak('aaaaaaaaaaaaaaaaaaaaaab', [
          'a',
          'aa',
          'aaa',
          'aaaa',
          'aaaaa',
        ]),
      ).toBe(false);
    });

    it('acceptance', () => {
      expect(wordBreak('leetcode', ['leet', 'code'])).toBe(true);

      expect(wordBreak('applepenapple', ['apple', 'pen'])).toBe(true);

      expect(
        wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat']),
      ).toBe(false);
    });
  });

  describe('bottom-up dp cache (iterate)', () => {
    // runtime complexity:
    // best (s.len * wordDict.len): no letters match start of any words in wordDict
    // worst (s.len * wordDict.len * len of each word): every letter in wordDict
    // normal (s.len * wordDict.len * len of each word)

    // space complexity:
    // best (1): no words in wordDict
    // worst (s.len): every letter in wordDict
    // normal (s.len)

    const wordBreak = (s: string, wordDict: string[]): boolean => {
      const dp: Record<number, boolean> = { [s.length]: true };

      for (let i = s.length - 1; i >= 0; i--) {
        for (const word of wordDict) {
          if (dp[i]) {
            break;
          }
          for (let j = 0; j < word.length; j++) {
            if (s[i + j] !== word[j]) {
              break;
            }
            if (j === word.length - 1) {
              dp[i] ||= dp[i + word.length];
            }
          }
        }
      }

      return dp[0] || false;
    };

    it('normal case', () => {
      expect(wordBreak('ab', ['a', 'b'])).toBe(true);
      expect(wordBreak('ab', ['a'])).toBe(false);
      expect(wordBreak('ab', ['b'])).toBe(false);

      expect(wordBreak('leetcode', ['leet', 'code'])).toBe(true);
    });

    it('reuse word', () => {
      expect(wordBreak('applepenapple', ['apple', 'pen'])).toBe(true);
    });

    it('multiple matches where only one works', () => {
      expect(wordBreak('leetcode', ['le', 'leet', 'code'])).toBe(true);
      expect(wordBreak('leetcode', ['le', 'leet', 'etcode'])).toBe(true);
    });

    it('empty string', () => {
      expect(wordBreak('', ['apple', 'pen'])).toBe(true);
      expect(wordBreak('', [])).toBe(true);
    });

    it('big', () => {
      expect(
        wordBreak('aaaaaaaaaaaaaaaaaaaaaab', [
          'a',
          'aa',
          'aaa',
          'aaaa',
          'aaaaa',
        ]),
      ).toBe(false);
    });

    it('acceptance', () => {
      expect(wordBreak('leetcode', ['leet', 'code'])).toBe(true);

      expect(wordBreak('applepenapple', ['apple', 'pen'])).toBe(true);

      expect(
        wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat']),
      ).toBe(false);
    });
  });
});

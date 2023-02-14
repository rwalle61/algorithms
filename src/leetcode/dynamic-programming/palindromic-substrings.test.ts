describe('palindromicSubstrings', () => {
  // Assumptions:
  // 1 <= s.length <= 1000
  // s consist of only digits and English letters.

  // Best Computational Runtime:
  // runtime (n^2): brute is n^3, probably can't do in n. No sorted as this is chars, so no `log n` sorted backtracking
  // space (1): not sure if need to store anything

  // Solutions:

  // brute
  // runtime (n^3): for each element, see if it's the start of a substring
  // space (1): just track indices

  // expand around centres
  // runtime (n^2): for each element, count substrings as you expand
  // space (1): just track indices

  describe('brute', () => {
    // runtime complexity:
    // best (1): immediately found
    // worst (n^3):
    // normal (n^3)

    // space complexity:
    // best (1):
    // worst (n):
    // normal (n)

    const isPalindrome = (
      string: string,
      startIndex: number,
      endIndex: number,
    ) => {
      const substringLength = endIndex + 1 - startIndex;
      const halfLength = substringLength / 2;
      const middleLeft = startIndex + Math.ceil(halfLength) - 1;
      const middleRight = startIndex + Math.floor(halfLength);
      for (let i = 0; i < halfLength; i++) {
        const left = middleLeft - i;
        const right = middleRight + i;
        if (string[left] !== string[right]) {
          return false;
        }
      }
      return true;
    };

    const palindromicSubstrings = (string: string): number => {
      let count = 0;

      for (let left = 0; left < string.length; left++) {
        for (let right = left; right < string.length; right++) {
          if (isPalindrome(string, left, right)) {
            count++;
          }
        }
      }
      return count;
    };

    it('big', () => {
      expect(palindromicSubstrings('a'.repeat(1000))).toBe(500500);
    });

    it('acceptance', () => {
      expect(palindromicSubstrings('abc')).toBe(3);
      expect(palindromicSubstrings('aaa')).toBe(6);
    });
  });

  describe('expand around centres', () => {
    // runtime complexity:
    // best (1): immediately found
    // worst (n^2):
    // normal (n^2)

    // space complexity:
    // best (1):
    // worst (n)
    // normal (n)

    const countPalindromes = (
      middleLeft: number,
      middleRight: number,
      string: string,
    ): number => {
      let count = 0;
      let left = middleLeft;
      let right = middleRight;

      while (
        left >= 0 &&
        right < string.length &&
        string[left] === string[right]
      ) {
        count++;

        left--;
        right++;
      }

      return count;
    };

    const palindromicSubstrings = (string: string): number => {
      let count = 0;

      for (let middleLeft = 0; middleLeft < string.length; middleLeft++) {
        count += countPalindromes(middleLeft, middleLeft, string);
        count += countPalindromes(middleLeft, middleLeft + 1, string);
      }
      return count;
    };

    it('normal case', () => {
      expect(palindromicSubstrings('')).toBe(0);
      expect(palindromicSubstrings('a')).toBe(1);
      expect(palindromicSubstrings('ab')).toBe(2);
      expect(palindromicSubstrings('aa')).toBe(3);
    });

    it('big', () => {
      expect(palindromicSubstrings('a'.repeat(1000))).toBe(500500);
    });

    it('acceptance', () => {
      expect(palindromicSubstrings('abc')).toBe(3);
      expect(palindromicSubstrings('aaa')).toBe(6);
    });
  });
});

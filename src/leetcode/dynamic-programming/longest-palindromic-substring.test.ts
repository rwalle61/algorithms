describe('longestPalindromicSubstring', () => {
  // Assumptions:
  // 1 <= s.length <= 1000
  // s consist of only digits and English letters.

  // Best Computational Runtime:
  // runtime (n^2): brute is n^3, probably can't do in n. Don't think there's log n sorted backtracking
  // space (1): not sure if need to store anything

  // Solutions:

  // brute
  // runtime (n^3): for each element, see if it's the start of the longest possible substring
  // space (1): just track indices

  // dp with cache (copied from https://zkf85.github.io/2019/03/26/leetcode-005-longest-palindrome)
  // runtime (n^2): for each element, see if it's the start of the longest possible substring
  // space (n^2 -> n): cache solved palindromes

  // expand around centres
  // runtime (n^2): for each element, see if the longest substring around it is the overall longest
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

    const longestPalindromicSubstring = (string: string): string => {
      let startOfLongestPalindrome = 0;
      let endOfLongestPalindrome = 0;

      for (let i = 0; i < string.length; i++) {
        for (let j = i; j < string.length; j++) {
          if (isPalindrome(string, i, j)) {
            const isNewPalindromeLongerThanCurrentLongest =
              j - i > endOfLongestPalindrome - startOfLongestPalindrome;
            if (isNewPalindromeLongerThanCurrentLongest) {
              startOfLongestPalindrome = i;
              endOfLongestPalindrome = j;
            }
          }
        }
      }
      return string.substring(
        startOfLongestPalindrome,
        endOfLongestPalindrome + 1,
      );
    };

    it('normal cases', () => {
      expect(longestPalindromicSubstring('a')).toBe('a');
      expect(longestPalindromicSubstring('ab')).toBe('a');
      expect(longestPalindromicSubstring('aa')).toBe('aa');
      expect(longestPalindromicSubstring('aba')).toBe('aba');
      expect(longestPalindromicSubstring('abc')).toBe('a');
    });

    it('big', () => {
      const string = 'a'.repeat(1000);
      expect(longestPalindromicSubstring(string)).toBe(string);
    });

    it('acceptance', () => {
      expect(longestPalindromicSubstring('babad')).toBe('bab');
      expect(longestPalindromicSubstring('cbbd')).toBe('bb');
    });
  });

  describe('dp with cache', () => {
    // runtime complexity:
    // best (1): immediately found
    // worst (n^2)
    // normal (n^2)

    // TODO understand how this works and how a 1D cache can be used instead
    // space complexity:
    // best (1):
    // worst (n^2 -> n)
    // normal (n^2 -> n)

    const longestPalindromicSubstring = (string: string): string => {
      let startOfLongestPalindrome = 0;
      let endOfLongestPalindrome = 0;

      const isPalindromeCache: boolean[][] = new Array(string.length)
        .fill(null)
        .map(() => new Array<boolean>(string.length).fill(false));
      // const isPalindromeCache: boolean[] = new Array<boolean>(
      //   string.length,
      // ).fill(false);

      for (let end = 0; end < string.length; end++) {
        for (let start = 0; start <= end; start++) {
          let isPalindrome = false;

          if (start === end) {
            isPalindrome = true;
          } else if (start + 1 === end) {
            isPalindrome = string[start] === string[end];
          } else {
            isPalindrome =
              isPalindromeCache[end - 1][start + 1] &&
              // isPalindromeCache[start + 1] &&
              string[start] === string[end];
          }
          isPalindromeCache[end][start] = isPalindrome;
          // isPalindromeCache[start] = isPalindrome;

          const isNewPalindromeLongerThanCurrentLongest =
            end - start > endOfLongestPalindrome - startOfLongestPalindrome;

          if (isPalindrome && isNewPalindromeLongerThanCurrentLongest) {
            startOfLongestPalindrome = start;
            endOfLongestPalindrome = end;
          }
        }
      }

      return string.substring(
        startOfLongestPalindrome,
        endOfLongestPalindrome + 1,
      );
    };

    it('normal cases', () => {
      expect(longestPalindromicSubstring('a')).toBe('a');
      expect(longestPalindromicSubstring('ab')).toBe('a');
      expect(longestPalindromicSubstring('aa')).toBe('aa');
      expect(longestPalindromicSubstring('aba')).toBe('aba');
      expect(longestPalindromicSubstring('abba')).toBe('abba');
      expect(longestPalindromicSubstring('abc')).toBe('a');
      expect(longestPalindromicSubstring('abbc')).toBe('bb');
    });

    it('big', () => {
      const string = 'a'.repeat(1000);
      expect(longestPalindromicSubstring(string)).toBe(string);
    });

    it('acceptance', () => {
      expect(longestPalindromicSubstring('babad')).toBe('bab');
      expect(longestPalindromicSubstring('cbbd')).toBe('bb');
    });
  });

  describe('expand around centres', () => {
    // runtime complexity:
    // best (1): immediately found
    // worst (n^2)
    // normal (n^2)

    // space complexity:
    // best (1):
    // worst (n):
    // normal (n)

    type Palindrome = {
      start: number;
      end: number;
    };

    const getLongestPalindrome = (
      middleLeft: number,
      middleRight: number,
      string: string,
      currentLongest: Palindrome,
    ): Palindrome => {
      const newCurrentLongest = currentLongest;

      let left = middleLeft;
      let right = middleRight;

      while (
        left >= 0 &&
        right < string.length &&
        string[left] === string[right]
      ) {
        const isNewPalindromeLongerThanCurrentLongest =
          right - left > newCurrentLongest.end - newCurrentLongest.start;

        if (isNewPalindromeLongerThanCurrentLongest) {
          newCurrentLongest.start = left;
          newCurrentLongest.end = right;
        }
        left--;
        right++;
      }
      return newCurrentLongest;
    };

    const longestPalindromicSubstring = (string: string): string => {
      let currentLongest: Palindrome = {
        start: 0,
        end: 0,
      };

      for (let middleLeft = 0; middleLeft < string.length; middleLeft++) {
        currentLongest = getLongestPalindrome(
          middleLeft,
          middleLeft,
          string,
          currentLongest,
        );
        currentLongest = getLongestPalindrome(
          middleLeft,
          middleLeft + 1,
          string,
          currentLongest,
        );
      }
      return string.substring(currentLongest.start, currentLongest.end + 1);
    };

    it('normal cases', () => {
      expect(longestPalindromicSubstring('a')).toBe('a');
      expect(longestPalindromicSubstring('ab')).toBe('a');
      expect(longestPalindromicSubstring('aa')).toBe('aa');
      expect(longestPalindromicSubstring('aba')).toBe('aba');
      expect(longestPalindromicSubstring('abba')).toBe('abba');
      expect(longestPalindromicSubstring('abc')).toBe('a');
      expect(longestPalindromicSubstring('abbc')).toBe('bb');
    });

    it('big', () => {
      const string = 'a'.repeat(1000);
      expect(longestPalindromicSubstring(string)).toBe(string);
    });

    it('acceptance', () => {
      expect(longestPalindromicSubstring('babad')).toBe('bab');
      expect(longestPalindromicSubstring('cbbd')).toBe('bb');
    });
  });
});

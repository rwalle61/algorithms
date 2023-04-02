describe('isAnagram', () => {
  // Assumptions:
  // 1 <= s.length, t.length <= 5 * 10^4
  // s and t consist of lowercase English letters.

  // Best Computational Runtime:
  // runtime (s.length)
  // space (1)

  // Solutions:

  // cache frequencies in t
  // runtime (s.length ^ 2): check s and t are same length and have same frequencies of letters
  // space (1)

  // sort first
  // runtime (s.length log s.length): check s and t are same length and are in same order
  // space (1)

  // cache frequencies separately
  // runtime (s.length): check s and t are same length and have same frequencies of letters
  // space (s.length): cache frequency of each letter

  // cache prime factors (because generating at runtime would increase time complexity)
  // runtime (s.length): check s and t are same length and have same product after converting letters to prime numbers
  // space (charset size)

  // Follow up - What if the inputs contain Unicode characters? How would you adapt your solution to such a case?
  // Original q has only max 26 letters, which is fairly constant
  // Unicode has ~150k letters, so caching the frequency of each letter would be better

  describe('cache frequencies in t', () => {
    // runtime complexity:
    // best (1): s and t different length
    // worst (s.length ^ 2): s and t same length and is anagram
    // normal (s.length ^ 2)

    // space complexity:
    // best (1)
    // worst (1)
    // normal (1)

    // strings are immutable in JS, Java, Python, but given a char array, this solution would work
    const isAnagram = ([...s]: string, [...t]: string): boolean => {
      if (s.length !== t.length) {
        return false;
      }
      for (const charS of s) {
        let found = false;
        for (let i = 0; i < t.length; i++) {
          const charT = t[i];
          if (charS === charT) {
            found = true;
            // eslint-disable-next-line no-param-reassign
            t[i] = 'NULL';
            break;
          }
        }
        if (!found) {
          return false;
        }
      }
      return true;
    };

    it('empty string', () => {
      expect(isAnagram('', '')).toBe(true);
      expect(isAnagram('', 'a')).toBe(false);
      expect(isAnagram('a', '')).toBe(false);
    });

    it('different length', () => {
      expect(isAnagram('a', 'aa')).toBe(false);
    });

    it('different frequencies', () => {
      expect(isAnagram('aba', 'abb')).toBe(false);
    });

    it('acceptance', () => {
      expect(isAnagram('anagram', 'nagaram')).toBe(true);
      expect(isAnagram('rat', 'car')).toBe(false);
    });
  });

  describe('sort first', () => {
    // runtime complexity:
    // best (1): s and t different length
    // worst (s.length log s.length): s and t same length and is anagram
    // normal (s.length log s.length)

    // space complexity:
    // best (1)
    // worst (1)
    // normal (1)

    const isAnagram = (s: string, t: string): boolean => {
      if (s.length !== t.length) {
        return false;
      }

      // If strings could be sorted in n log n time with no extra space
      const sString = [...s].sort();
      const tString = [...t].sort();

      for (let i = 0; i < s.length; i++) {
        if (sString[i] !== tString[i]) {
          return false;
        }
      }
      return true;
    };

    it('empty string', () => {
      expect(isAnagram('', '')).toBe(true);
      expect(isAnagram('', 'a')).toBe(false);
      expect(isAnagram('a', '')).toBe(false);
    });

    it('different length', () => {
      expect(isAnagram('a', 'aa')).toBe(false);
    });

    it('different frequencies', () => {
      expect(isAnagram('aba', 'abb')).toBe(false);
    });

    it('acceptance', () => {
      expect(isAnagram('anagram', 'nagaram')).toBe(true);
      expect(isAnagram('rat', 'car')).toBe(false);
    });
  });

  describe('cache frequencies separately', () => {
    // runtime complexity:
    // best (1): s and t different length
    // worst (s.length): s and t same length
    // normal (s.length)

    // space complexity:
    // best (1): s and t different length
    // worst (s.length): s and t same length
    // normal (s.length)

    const isAnagram = (s: string, t: string): boolean => {
      if (s.length !== t.length) {
        return false;
      }

      const cache: Record<string, number> = {};

      for (const char of s) {
        cache[char] = (cache[char] || 0) + 1;
      }
      for (const char of t) {
        if (!cache[char]) {
          return false;
        }
        cache[char] -= 1;
      }
      return true;
    };

    it('empty string', () => {
      expect(isAnagram('', '')).toBe(true);
      expect(isAnagram('', 'a')).toBe(false);
      expect(isAnagram('a', '')).toBe(false);
    });

    it('different length', () => {
      expect(isAnagram('a', 'aa')).toBe(false);
    });

    it('different frequencies', () => {
      expect(isAnagram('aba', 'abb')).toBe(false);
    });

    it('acceptance', () => {
      expect(isAnagram('anagram', 'nagaram')).toBe(true);
      expect(isAnagram('rat', 'car')).toBe(false);
    });
  });

  describe('cache prime factors', () => {
    // runtime complexity:
    // best (1): s and t different length
    // worst (s.length): s and t same length
    // normal (s.length)

    // space complexity:
    // best (1): s and t different length
    // worst (charset size): s and t same length. Since not sure if can generate primes with n runtime
    // normal (charset size)

    const isAnagram = (s: string, t: string): boolean => {
      if (s.length !== t.length) {
        return false;
      }

      const primes = [
        2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67,
        71, 73, 79, 83, 89, 97, 101,
      ];

      const toPrime = (char: string) =>
        primes[char.charCodeAt(0) - 'a'.charCodeAt(0)];

      const STARTING_PRODUCT = 1;

      let primeProduct = STARTING_PRODUCT;

      for (const char of s) {
        primeProduct *= toPrime(char);
      }
      for (const char of t) {
        primeProduct /= toPrime(char);
      }
      return primeProduct === STARTING_PRODUCT;
    };

    it('empty string', () => {
      expect(isAnagram('', '')).toBe(true);
      expect(isAnagram('', 'a')).toBe(false);
      expect(isAnagram('a', '')).toBe(false);
    });

    it('different length', () => {
      expect(isAnagram('a', 'aa')).toBe(false);
    });

    it('different frequencies', () => {
      expect(isAnagram('aba', 'abb')).toBe(false);
    });

    it('acceptance', () => {
      expect(isAnagram('anagram', 'nagaram')).toBe(true);
      expect(isAnagram('rat', 'car')).toBe(false);
    });
  });
});

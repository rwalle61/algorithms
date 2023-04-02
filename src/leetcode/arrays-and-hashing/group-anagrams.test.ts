describe('groupAnagrams', () => {
  // Assumptions:
  // 1 <= strs.length <= 104
  // 0 <= strs[i].length <= 100
  // strs[i] consists of lowercase English letters.
  // n == average str length

  // Best Computational Runtime:
  // runtime (strs.length * n)
  // space (strs.length?): probably not constant if just checking each char once

  // Solutions:

  // group by prime product (or frequency list as a string)
  // runtime (strs.length * n): for each string, calculate prime product, and cache in group
  // space (charset size + strs.length)

  // group by sorted words
  // runtime (strs.length * n log n): for each string, sort and add to correct index of output array
  // space (strs.length)

  describe('group by prime product', () => {
    // runtime complexity:
    // best (strs.length * n)
    // worst (strs.length * n)
    // normal (strs.length * n)

    // space complexity:
    // best (charset size + strs.length)
    // worst (charset size + strs.length)
    // normal (charset size + strs.length)

    const groupAnagrams = (strs: string[]): string[][] => {
      const primes = [
        2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67,
        71, 73, 79, 83, 89, 97, 101,
      ];

      const toPrime = (char: string) =>
        primes[char.charCodeAt(0) - 'a'.charCodeAt(0)];

      const groups = new Map<number, string[]>();

      for (const string of strs) {
        let primeProduct = 1;
        for (const char of string) {
          primeProduct *= toPrime(char);
        }
        const group = groups.get(primeProduct) || [];
        group.push(string);
        groups.set(primeProduct, group);
      }

      const output: string[][] = [];

      for (const group of groups.values()) {
        output.push(group);
      }

      return output;
    };

    it('acceptance', () => {
      expect(
        // groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']),
        groupAnagrams(['bat', 'nat', 'ate', 'tan', 'eat', 'tea']),
      ).toStrictEqual([['bat'], ['nat', 'tan'], ['ate', 'eat', 'tea']]);

      expect(groupAnagrams([''])).toStrictEqual([['']]);

      expect(groupAnagrams(['a'])).toStrictEqual([['a']]);
    });
  });

  describe('group by sorted words', () => {
    // runtime complexity:
    // best (strs.length * n log n)
    // worst (strs.length * n log n)
    // normal (strs.length * n log n)

    // space complexity:
    // best (strs.length)
    // worst (strs.length)
    // normal (strs.length)

    const groupAnagrams = (strs: string[]): string[][] => {
      const groups = new Map<string, string[]>();

      for (const string of strs) {
        const sortedString = [...string].sort().join('');
        const group = groups.get(sortedString) || [];
        group.push(string);
        groups.set(sortedString, group);
      }

      const output: string[][] = [];

      for (const group of groups.values()) {
        output.push(group);
      }

      return output;
    };

    it('acceptance', () => {
      expect(
        // groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']),
        groupAnagrams(['bat', 'nat', 'ate', 'tan', 'eat', 'tea']),
      ).toStrictEqual([['bat'], ['nat', 'tan'], ['ate', 'eat', 'tea']]);

      expect(groupAnagrams([''])).toStrictEqual([['']]);

      expect(groupAnagrams(['a'])).toStrictEqual([['a']]);
    });
  });
});

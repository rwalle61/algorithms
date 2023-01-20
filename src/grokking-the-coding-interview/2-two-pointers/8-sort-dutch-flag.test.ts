// Given an array containing 0s, 1s and 2s, sort the array in-place. You should
// treat numbers of the array as objects, hence, we can't count 0s, 1s, and 2s
// to recreate the array.

describe('sortDutchFlag', () => {
  // Assumptions:

  // Best Computational Runtime:
  // runtime (n): clever swapping, 1 pass
  // space (1): sort in place

  // Solutions:

  // brute
  // runtime (n): for each number, store in 0s 1s or 2s array, then replace original array with 0s 1s then 2s
  // space (n): store all numbers once

  // 3 pointers
  // runtime (n): track 0s and 2s sections, then iterate through moving 0s to 0s section, 2s to 2s section, and leaving 1s in place
  // space (1)

  describe('brute', () => {
    // runtime complexity:
    // best (n): check every element
    // worst (n): check every element
    // average (n): check every element
    // normal (n)

    // space complexity:
    // best (n): store every element
    // worst (n): store every element
    // average (n): store every element
    // normal (n)

    type FlagNumber = 0 | 1 | 2;

    const sortDutchFlag = (array: FlagNumber[]): FlagNumber[] => {
      const groups = {
        0: [] as FlagNumber[],
        1: [] as FlagNumber[],
        2: [] as FlagNumber[],
      };

      for (const number of array) {
        groups[number].push(number);
      }
      return groups[0].concat(groups[1]).concat(groups[2]);
    };

    it('mixed', () => {
      expect(sortDutchFlag([0, 2, 1])).toStrictEqual([0, 1, 2]);
      expect(sortDutchFlag([0, 1, 2, 2, 1, 0, 0, 2, 1])).toStrictEqual([
        0, 0, 0, 1, 1, 1, 2, 2, 2,
      ]);
    });

    it('already sorted', () => {
      expect(sortDutchFlag([0, 1, 2])).toStrictEqual([0, 1, 2]);
      expect(sortDutchFlag([0, 0, 0, 1, 1, 1, 2, 2, 2])).toStrictEqual([
        0, 0, 0, 1, 1, 1, 2, 2, 2,
      ]);
    });

    it('reverse', () => {
      expect(sortDutchFlag([2, 1, 0])).toStrictEqual([0, 1, 2]);
      expect(sortDutchFlag([2, 2, 2, 1, 1, 1, 0, 0, 0])).toStrictEqual([
        0, 0, 0, 1, 1, 1, 2, 2, 2,
      ]);
    });

    it('edge: empty array', () => {
      expect(sortDutchFlag([])).toStrictEqual([]);
    });

    it('edge: only 0s', () => {
      expect(sortDutchFlag([0])).toStrictEqual([0]);
      expect(sortDutchFlag([0, 0])).toStrictEqual([0, 0]);
      expect(sortDutchFlag([0, 0, 0])).toStrictEqual([0, 0, 0]);
      expect(sortDutchFlag([0, 0, 0, 0])).toStrictEqual([0, 0, 0, 0]);
    });

    it('edge: only 1s', () => {
      expect(sortDutchFlag([1])).toStrictEqual([1]);
      expect(sortDutchFlag([1, 1])).toStrictEqual([1, 1]);
      expect(sortDutchFlag([1, 1, 1])).toStrictEqual([1, 1, 1]);
      expect(sortDutchFlag([1, 1, 1, 1])).toStrictEqual([1, 1, 1, 1]);
    });

    it('edge: only 2s', () => {
      expect(sortDutchFlag([2])).toStrictEqual([2]);
      expect(sortDutchFlag([2, 2])).toStrictEqual([2, 2]);
      expect(sortDutchFlag([2, 2, 2])).toStrictEqual([2, 2, 2]);
      expect(sortDutchFlag([2, 2, 2, 2])).toStrictEqual([2, 2, 2, 2]);
    });

    it('acceptance', () => {
      expect(sortDutchFlag([1, 0, 2, 1, 0])).toStrictEqual([0, 0, 1, 1, 2]);
      expect(sortDutchFlag([2, 2, 0, 1, 2, 0])).toStrictEqual([
        0, 0, 1, 2, 2, 2,
      ]);
    });
  });

  describe('3 pointers', () => {
    // runtime complexity:
    // best (n): check every element
    // worst (n): check every element
    // average (n): check every element
    // normal (n)

    // space complexity:
    // best (1)
    // worst (1)
    // average (1)
    // normal (1)

    const swapAtIndexes = (array: unknown[], i: number, j: number) => {
      // eslint-disable-next-line no-param-reassign
      [array[i], array[j]] = [array[j], array[i]];
    };
    type FlagNumber = 0 | 1 | 2;

    const sortDutchFlag = (array: FlagNumber[]): FlagNumber[] => {
      let insert0 = 0;
      let insert2 = array.length - 1;
      let i = 0;

      while (i <= insert2) {
        if (array[i] === 0) {
          swapAtIndexes(array, insert0, i);
          insert0++;
          i++;
        } else if (array[i] === 1) {
          i++;
        } else {
          // (array[i] === 2)
          swapAtIndexes(array, i, insert2);
          insert2--;
        }
      }

      return array;
    };

    it('mixed', () => {
      expect(sortDutchFlag([0, 2, 1])).toStrictEqual([0, 1, 2]);
      expect(sortDutchFlag([0, 1, 2, 2, 1, 0, 0, 2, 1])).toStrictEqual([
        0, 0, 0, 1, 1, 1, 2, 2, 2,
      ]);
    });

    it('already sorted', () => {
      expect(sortDutchFlag([0, 1, 2])).toStrictEqual([0, 1, 2]);
      expect(sortDutchFlag([0, 0, 0, 1, 1, 1, 2, 2, 2])).toStrictEqual([
        0, 0, 0, 1, 1, 1, 2, 2, 2,
      ]);
    });

    it('reverse', () => {
      expect(sortDutchFlag([2, 1, 0])).toStrictEqual([0, 1, 2]);
      expect(sortDutchFlag([2, 2, 2, 1, 1, 1, 0, 0, 0])).toStrictEqual([
        0, 0, 0, 1, 1, 1, 2, 2, 2,
      ]);
    });

    it('edge: empty array', () => {
      expect(sortDutchFlag([])).toStrictEqual([]);
    });

    it('edge: only 0s', () => {
      expect(sortDutchFlag([0])).toStrictEqual([0]);
      expect(sortDutchFlag([0, 0])).toStrictEqual([0, 0]);
      expect(sortDutchFlag([0, 0, 0])).toStrictEqual([0, 0, 0]);
      expect(sortDutchFlag([0, 0, 0, 0])).toStrictEqual([0, 0, 0, 0]);
    });

    it('edge: only 1s', () => {
      expect(sortDutchFlag([1])).toStrictEqual([1]);
      expect(sortDutchFlag([1, 1])).toStrictEqual([1, 1]);
      expect(sortDutchFlag([1, 1, 1])).toStrictEqual([1, 1, 1]);
      expect(sortDutchFlag([1, 1, 1, 1])).toStrictEqual([1, 1, 1, 1]);
    });

    it('edge: only 2s', () => {
      expect(sortDutchFlag([2])).toStrictEqual([2]);
      expect(sortDutchFlag([2, 2])).toStrictEqual([2, 2]);
      expect(sortDutchFlag([2, 2, 2])).toStrictEqual([2, 2, 2]);
      expect(sortDutchFlag([2, 2, 2, 2])).toStrictEqual([2, 2, 2, 2]);
    });

    it('acceptance', () => {
      expect(sortDutchFlag([1, 0, 2, 1, 0])).toStrictEqual([0, 0, 1, 1, 2]);
      expect(sortDutchFlag([2, 2, 0, 1, 2, 0])).toStrictEqual([
        0, 0, 1, 2, 2, 2,
      ]);
    });
  });
});

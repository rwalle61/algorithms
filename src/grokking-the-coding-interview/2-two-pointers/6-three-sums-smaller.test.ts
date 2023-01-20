// Given an array arr of unsorted numbers and a target sum, count all triplets
// in it such that arr[i] + arr[j] + arr[k] < target where i, j, and k are three
// different indices. Write a function to return the count of such triplets.

describe('threeSumsSmaller', () => {
  // Assumptions:

  // Best Computational Runtime:
  // runtime (n^2): similar to 3Sum (reduce problem to list of 2-sums)
  //
  // space (1)

  // Solutions:

  // brute
  // runtime (n^3): for each number, for each other number check if combining with any other number sums to under target (n^3).
  // space (1)

  // pre-sort + 2-sum
  // runtime (n^2): sort numbers (n log n) then for each (n) use sorted 2-sum (n) to move towards nearest target, saving all combinations at each step
  // space (1)

  // hashmap
  // runtime (n^2): still need to do a list of 2-sum
  // space (n): overwrite 1 dict to store anti-sums

  describe('brute (slight optimisation)', () => {
    // runtime complexity:
    // best ((1/2n)^3): check every combination (except already seen ones)
    // worst ((1/2n)^3): check every combination (except already seen ones)
    // average ((1/2n)^3): check every combination (except already seen ones)
    // normal (n^3)

    // space complexity:
    // best (1)
    // worst (1)
    // average (1)
    // normal (1)

    const threeSumsSmaller = (array: number[], target: number): number => {
      const sortedArray = array.sort((a, b) => a - b);

      let numTriplets = 0;

      let i = 0;
      while (
        sortedArray[i] + sortedArray[i + 1] + sortedArray[i + 2] <
        target
      ) {
        let left = i + 1;
        while (
          sortedArray[i] + sortedArray[left] + sortedArray[left + 1] <
          target
        ) {
          let right = left + 1;
          while (
            right < sortedArray.length &&
            sortedArray[i] + sortedArray[left] + sortedArray[right] < target
          ) {
            numTriplets += 1;
            right++;
          }
          left++;
        }

        i++;
      }
      return numTriplets;
    };

    it('normal cases', () => {
      // 123
      // 124
      // 125
      // 126
      // 134
      // 135
      // 234
      expect(threeSumsSmaller([1, 2, 3, 4, 5, 6], 10)).toBe(7);
      // -2 -1 0
      // -2 -1 1
      // -2 -1 2
      // -2  0 1
      expect(threeSumsSmaller([-2, -1, 0, 1, 2, 3], 0)).toBe(4);
    });

    it('edge: array length < 3', () => {
      expect(threeSumsSmaller([], 0)).toBe(0);
      expect(threeSumsSmaller([0], 0)).toBe(0);
      expect(threeSumsSmaller([0, 0], 0)).toBe(0);
    });

    it('acceptance', () => {
      // example 1
      expect(threeSumsSmaller([-1, 0, 2, 3], 3)).toBe(2);
      // example 2
      expect(threeSumsSmaller([-1, 4, 2, 1, 3], 5)).toBe(4);
    });
  });

  describe('pre-sort + 2 sum', () => {
    // runtime complexity:
    // best (n^2): finding target sum makes no difference
    // worst (n^2): finding target sum makes no difference
    // average (n^2): finding target sum makes no difference
    // normal (n^2)

    // space complexity:
    // best (1)
    // worst (1)
    // average (1)
    // normal (1)

    const threeSumsSmaller = (array: number[], target: number): number => {
      const sortedArray = array.sort((a, b) => a - b);

      let count = 0;

      let i = 0;
      while (i < sortedArray.length) {
        let left = i + 1;
        let right = sortedArray.length - 1;
        while (left < right) {
          const tripletSum =
            sortedArray[i] + sortedArray[left] + sortedArray[right];
          if (tripletSum < target) {
            count += right - left;
            left++;
          } else {
            right--;
          }
        }

        i++;
      }
      return count;
    };

    it('normal cases', () => {
      // 123
      // 124
      // 125
      // 126
      // 134
      // 135
      // 234
      expect(threeSumsSmaller([1, 2, 3, 4, 5, 6], 10)).toBe(7);
      // -2 -1 0
      // -2 -1 1
      // -2 -1 2
      // -2  0 1
      expect(threeSumsSmaller([-2, -1, 0, 1, 2, 3], 0)).toBe(4);
    });

    it('edge: array length < 3', () => {
      expect(threeSumsSmaller([], 0)).toBe(0);
      expect(threeSumsSmaller([0], 0)).toBe(0);
      expect(threeSumsSmaller([0, 0], 0)).toBe(0);
    });

    it('acceptance', () => {
      // example 1
      expect(threeSumsSmaller([-1, 0, 2, 3], 3)).toBe(2);
      // example 2
      expect(threeSumsSmaller([-1, 4, 2, 1, 3], 5)).toBe(4);
    });
  });
});

describe('longestIncreasingSubsequence', () => {
  // Assumptions:
  // 1 <= nums.length <= 2500
  // -104 <= nums[i] <= 104

  // Best Computational Runtime:
  // runtime (>n): need to search whole problem space + do some backtracking
  // space (>1): probably need to store stuff to avoid brute solution

  // Solutions:

  // brute - try every possible subsequence
  // runtime (2^n)
  // space (1)

  // iterate in reverse & cache lengths
  // runtime (n^2)
  // space (n)

  // iterate & cache min subsequence end number for all lengths, lookup using binary search
  // runtime (n log n) (or n^2 if lookup using sequential search)
  // space (n)

  describe('iterate in reverse & cache', () => {
    // runtime complexity:
    // best (1): list length 0
    // worst (n^2)
    // normal (n^2): have to try every possible starting point, and for each try every possible next step

    // space complexity:
    // best (n)
    // worst (n)
    // normal (n): always store lengths of every starting point

    const longestIncreasingSubsequence = (nums: number[]): number => {
      if (nums.length === 0) {
        return 0;
      }

      const maxLengthAtIndices: number[] = new Array<number>(nums.length).fill(
        1,
      );

      for (let i = nums.length - 1; i >= 0; i--) {
        for (let j = i + 1; j < nums.length; j++) {
          if (nums[i] < nums[j]) {
            maxLengthAtIndices[i] = Math.max(
              maxLengthAtIndices[i],
              1 + maxLengthAtIndices[j],
            );
          }
        }
      }

      return Math.max(...maxLengthAtIndices);
    };

    it('always ascending', () => {
      expect(longestIncreasingSubsequence([1, 2, 3])).toBe(3);
    });

    it('always descending', () => {
      expect(longestIncreasingSubsequence([3, 2, 1])).toBe(1);
    });

    it('unsorted', () => {
      expect(longestIncreasingSubsequence([1, 3, 2])).toBe(2);
      expect(longestIncreasingSubsequence([1, 4, 2, 3])).toBe(3);
    });

    it('negatives', () => {
      expect(longestIncreasingSubsequence([-3, -2, -1])).toBe(3);
      expect(longestIncreasingSubsequence([-1, -2, -3])).toBe(1);
      expect(longestIncreasingSubsequence([-4, -1, -3, -2])).toBe(3);
    });

    it('repeated numbers', () => {
      expect(longestIncreasingSubsequence([1, 1, 2])).toBe(2);
      expect(longestIncreasingSubsequence([2, 2, 1])).toBe(1);
    });

    it('edge: length 0', () => {
      expect(longestIncreasingSubsequence([])).toBe(0);
    });

    it('acceptance', () => {
      expect(longestIncreasingSubsequence([10, 9, 2, 5, 3, 7, 101, 18])).toBe(
        4,
      );
      expect(longestIncreasingSubsequence([0, 1, 0, 3, 2, 3])).toBe(4);
      expect(longestIncreasingSubsequence([7, 7, 7, 7, 7, 7, 7])).toBe(1);
    });
  });

  describe('iterate & cache', () => {
    // runtime complexity:
    // best (1): list length 0
    // worst (n log n)
    // normal (n): search entire problem space

    // space complexity:
    // best (1): descending list
    // worst (n): ascending list
    // normal (n)

    const binarySearchIndexOfFirstLargerNumber = (
      target: number,
      sortedArray: number[],
      start: number,
      end: number,
      indexOfCurrentFirstLargerNumber: number | null,
    ): number | null => {
      if (end < start) {
        return indexOfCurrentFirstLargerNumber;
      }

      const midIndex = start + Math.floor((end - start) / 2);
      const midNumber = sortedArray[midIndex];
      if (midNumber >= target) {
        return binarySearchIndexOfFirstLargerNumber(
          target,
          sortedArray,
          start,
          midIndex - 1,
          midIndex,
        );
      }
      return binarySearchIndexOfFirstLargerNumber(
        target,
        sortedArray,
        midIndex + 1,
        end,
        indexOfCurrentFirstLargerNumber,
      );
    };

    const indexOfFirstLargerNumber = (
      target: number,
      sortedArray: number[],
    ): number | null =>
      binarySearchIndexOfFirstLargerNumber(
        target,
        sortedArray,
        0,
        sortedArray.length - 1,
        null,
      );

    const longestIncreasingSubsequence = (nums: number[]): number => {
      const minEndNumberForSubsequenceLengths: number[] = [];

      for (const number of nums) {
        const insertionIndex =
          indexOfFirstLargerNumber(number, minEndNumberForSubsequenceLengths) ??
          minEndNumberForSubsequenceLengths.length;
        minEndNumberForSubsequenceLengths[insertionIndex] = number;
      }

      return minEndNumberForSubsequenceLengths.length;
    };

    it('always ascending', () => {
      expect(longestIncreasingSubsequence([1, 2, 3])).toBe(3);
    });

    it('always descending', () => {
      expect(longestIncreasingSubsequence([3, 2, 1])).toBe(1);
    });

    it('unsorted', () => {
      expect(longestIncreasingSubsequence([1, 3, 2])).toBe(2);
      expect(longestIncreasingSubsequence([1, 4, 2, 3])).toBe(3);
    });

    it('negatives', () => {
      expect(longestIncreasingSubsequence([-3, -2, -1])).toBe(3);
      expect(longestIncreasingSubsequence([-1, -2, -3])).toBe(1);
      expect(longestIncreasingSubsequence([-4, -1, -3, -2])).toBe(3);
    });

    it('repeated numbers', () => {
      expect(longestIncreasingSubsequence([1, 1, 2])).toBe(2);
      expect(longestIncreasingSubsequence([2, 2, 1])).toBe(1);
    });

    it('edge: length 0', () => {
      expect(longestIncreasingSubsequence([])).toBe(0);
    });

    it('acceptance', () => {
      expect(longestIncreasingSubsequence([10, 9, 2, 5, 3, 7, 101, 18])).toBe(
        4,
      );
      expect(longestIncreasingSubsequence([0, 1, 0, 3, 2, 3])).toBe(4);
      expect(longestIncreasingSubsequence([7, 7, 7, 7, 7, 7, 7])).toBe(1);
    });
  });
});

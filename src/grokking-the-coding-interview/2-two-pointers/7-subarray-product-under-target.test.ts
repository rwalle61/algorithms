// Given an array with positive numbers and a positive target number, find all
// of its contiguous subarrays whose product is less than the target number.

describe('subarrayProductUnderTarget', () => {
  // Assumptions:

  // Best Computational Runtime:
  // runtime (n^3): for each number (n), check the boundary (n), then save every segment combination between them (n)
  // space (n): in worst case, subarray could have length n

  // Solutions:

  // brute / two pointers / sliding window
  // runtime (n^3): for each number (n) iterate across while product stays under target (n) and at each step add current subarray (n).
  // space (n): in worst case, subarray could have length n

  describe('brute / two pointers / sliding window', () => {
    // runtime complexity:
    // best (n): every element >= target
    // worst (n^3): every element < target
    // average (n^3): depends on input
    // normal (n^3)

    // space complexity:
    // best (1): every element >= target
    // worst (n): every element < target. Reuse same temp array (size n)
    // average (n): depends on input. Reuse same temp array (size n)
    // normal (n)

    const subarrayProductUnderTarget = (
      array: number[],
      target: number,
    ): number[][] => {
      const subarrays: number[][] = [];

      let left = 0;
      while (left < array.length) {
        const subarray: number[] = []; // takes n space
        let product = 1;
        let right = left;
        while (right < array.length) {
          product *= array[right];
          if (product > target) {
            break;
          }
          subarray.push(array[right]);
          subarrays.push([...subarray]);
          right++;
        }

        left++;
      }
      return subarrays;
    };

    it('normal case', () => {
      expect(subarrayProductUnderTarget([1, 2, 3, 4], 10)).toIncludeAllMembers([
        [1],
        [2],
        [1, 2],
        [3],
        [1, 2, 3],
        [2, 3],
        [4],
      ]);
    });

    it('all products under target', () => {
      expect(
        subarrayProductUnderTarget([1, 2, 3, 4], Infinity),
      ).toIncludeAllMembers([
        [1],
        [2],
        [1, 2],
        [3],
        [1, 2, 3],
        [4],
        [1, 2, 3, 4],
        [2, 3, 4],
        [3, 4],
      ]);
    });

    it('edge: empty array', () => {
      expect(subarrayProductUnderTarget([], 2)).toStrictEqual([]);
    });

    it('edge: array length 1', () => {
      expect(subarrayProductUnderTarget([1], 2)).toStrictEqual([[1]]);
    });

    it('acceptance', () => {
      // example 1
      expect(subarrayProductUnderTarget([2, 5, 3, 10], 30)).toIncludeAllMembers(
        [[2], [5], [2, 5], [3], [5, 3], [10]],
      );
      // example 2
      expect(subarrayProductUnderTarget([8, 2, 6, 5], 50)).toIncludeAllMembers([
        [8],
        [2],
        [8, 2],
        [6],
        [2, 6],
        [5],
        [6, 5],
      ]);
    });
  });
});

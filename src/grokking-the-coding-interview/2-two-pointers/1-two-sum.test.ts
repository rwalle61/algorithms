// Given an array of sorted numbers and a target sum, find a pair in the array
// whose sum is equal to the given target. Write a function to return the
// indices of the two numbers (i.e. the pair) such that they add up to the given
// target.

describe('twoSum', () => {
  // Assumptions:
  // 2 indices must be different
  // input array length >= 2
  // two sum always exists

  // Best Computational Runtime:
  // runtime (n): iterate through array once
  // space (1): don't need to store anything

  // Solutions:

  // 2 pointers brute
  // runtime (n^2): for each number, check the other/remaining numbers for a two-sum
  // space (1): just store pointers

  // 2 pointers brute 2
  // runtime (n log n): for each number, check the other numbers (with (log n) binary search because input array is sorted) for a two-sum
  // space (1): just store pointers

  // 2 pointers smart
  // runtime (n): pointers traverse array once
  // space (1): just store pointers

  // 1 pointer + hash table
  // runtime (n): pointer traverses array twice
  // space (n): store string in table

  describe('2 pointers smart', () => {
    // Start with pointers at each end, move pointer to increase or decrease number as necessary

    // runtime complexity:
    // best (1): if immediately found target sum
    // worst (n): if target sum right at end
    // average (n/2)
    // normal (n)

    // space complexity:
    // best (1): just need to store pointers
    // worst (1): just need to store pointers
    // average (1): just need to store pointers
    // normal (1)

    const twoSum = (array: number[], target: number): [number, number] => {
      let left = 0;
      let right = array.length - 1;

      while (array[left] + array[right] !== target) {
        if (array[left] + array[right] < target) {
          left += 1;
        } else {
          right -= 1;
        }
      }
      return [left, right];
    };

    it("don't move pointers", () => {
      expect(twoSum([1, 2], 3)).toStrictEqual([0, 1]);
    });

    it('move only left pointer', () => {
      expect(twoSum([1, 2, 3], 5)).toStrictEqual([1, 2]);
    });

    it('move only right pointer', () => {
      expect(twoSum([1, 2, 3], 3)).toStrictEqual([0, 1]);
    });

    it('move both pointers', () => {
      expect(twoSum([1, 2, 3, 5], 5)).toStrictEqual([1, 2]);
    });

    it('edge: multiple solutions exist', () => {
      expect(twoSum([1, 2, 3, 4], 5)).toStrictEqual([0, 3]);
    });

    it('edge: input array has 0s', () => {
      expect(twoSum([0, 0], 0)).toStrictEqual([0, 1]);
      expect(twoSum([-2, 0, 0], 0)).toStrictEqual([1, 2]);
      expect(twoSum([0, 0, 1], 0)).toStrictEqual([0, 1]);
    });

    it('edge: negative numbers', () => {
      expect(twoSum([-1, 1], 0)).toStrictEqual([0, 1]);
      expect(twoSum([-2, -1, 1], 0)).toStrictEqual([1, 2]);
      expect(twoSum([-1, 1, 2], 0)).toStrictEqual([0, 1]);
    });

    it('acceptance', () => {
      // example 1
      expect(twoSum([1, 2, 3, 4, 6], 6)).toStrictEqual([1, 3]);
      // example 2
      expect(twoSum([2, 5, 9, 11], 11)).toStrictEqual([0, 2]);
    });
  });
});

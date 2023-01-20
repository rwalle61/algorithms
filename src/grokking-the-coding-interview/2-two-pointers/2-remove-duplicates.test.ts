// Given an array of sorted numbers, remove all duplicate number instances from
// it in-place, such that each element appears only once. The relative order of
// the elements should be kept the same and you should not use any extra space
// so that that the solution have a space complexity of (1). Move all the unique
// elements at the beginning of the array and after moving return the length of
// the subarray that has no duplicate in it.

describe('removeDuplicates', () => {
  // Assumptions:
  // input array length >= 2

  // Best Computational Runtime:
  // runtime (n): iterate through array once
  // space (1): question specifies it

  // Solutions:

  // 2 pointers brute
  // runtime (n^2): for each number (n), check the remaining numbers for dups, if find one then move to end and shift every previous element forwards (n)
  // space (1): just store pointers

  // 2 pointers smart
  // runtime (n): pointers traverse array once
  // space (1): just store pointers

  // 1 pointer + hash table
  // runtime (n): pointer traverses array twice
  // space (n): store string in table. But question requires (1)

  describe('2 pointers smart', () => {
    // 1st pointer tracks current unique element, 2nd pointer finds next unique element.

    // runtime complexity:
    // best (n): check all elements for duplicates
    // worst (n): check all elements for duplicates
    // average (n)
    // normal (n)

    // space complexity:
    // best (1): just store pointers
    // worst (1): just store pointers
    // average (1): just store pointers
    // normal (1)

    const removeDuplicates = (
      array: number[],
    ): { array: number[]; numUniqueElements: number } => {
      let left = 0;
      let right = 0;

      while (right < array.length) {
        if (array[left] !== array[right]) {
          const temp = array[right];
          // eslint-disable-next-line no-param-reassign
          array[right] = array[left + 1];
          // eslint-disable-next-line no-param-reassign
          array[left + 1] = temp;
          left += 1;
        }
        right += 1;
      }
      return { array, numUniqueElements: left + 1 };
    };

    it('no duplicates', () => {
      expect(removeDuplicates([1, 2])).toStrictEqual({
        array: [1, 2],
        numUniqueElements: 2,
      });
      expect(removeDuplicates([1, 2, 3, 4])).toStrictEqual({
        array: [1, 2, 3, 4],
        numUniqueElements: 4,
      });
    });

    it('only duplicates', () => {
      expect(removeDuplicates([1, 1])).toStrictEqual({
        array: [1, 1],
        numUniqueElements: 1,
      });
      expect(removeDuplicates([1, 1, 1, 1])).toStrictEqual({
        array: [1, 1, 1, 1],
        numUniqueElements: 1,
      });
    });

    it('some duplicates', () => {
      expect(removeDuplicates([1, 1, 2])).toStrictEqual({
        array: [1, 2, 1],
        numUniqueElements: 2,
      });
      expect(removeDuplicates([1, 1, 2, 2, 3, 3, 4, 4, 5, 5])).toStrictEqual({
        array: [1, 2, 3, 4, 5, 3, 2, 4, 1, 5],
        numUniqueElements: 5,
      });
      expect(removeDuplicates([1, 1, 2, 2, 3, 4, 4])).toStrictEqual({
        array: [1, 2, 3, 4, 1, 2, 4],
        numUniqueElements: 4,
      });
    });

    it('acceptance', () => {
      // example 1
      expect(removeDuplicates([2, 3, 3, 3, 6, 9, 9])).toStrictEqual({
        array: [2, 3, 6, 9, 3, 3, 9],
        numUniqueElements: 4,
      });
      // example 2
      expect(removeDuplicates([2, 2, 2, 11])).toStrictEqual({
        array: [2, 11, 2, 2],
        numUniqueElements: 2,
      });
    });
  });
});

// Given a sorted array, create a new array containing squares of all the
// numbers of the input array in the sorted order.

describe('squareArray', () => {
  // Assumptions:

  // Best Computational Runtime:
  // runtime: (n) iterate through array once
  // space: (n) create new array

  // Solutions:

  // brute
  // runtime (n log n): square numbers (n) then sort (n log n)
  // space (n): create new array

  // 2 pointers
  // runtime (n): find first non-negative number (n) then move 2 pointers outwards to build array of squares
  // space (n): create new array

  // 2 pointers simpler
  // runtime (n): move 2 pointers inwards to build array of squares
  // space (n): create new array

  describe('2 pointers simpler', () => {
    // move 2 pointers inwards to build array of squares

    // runtime complexity:
    // best (n): square every number
    // worst (n): square every number
    // average (n): square every number
    // normal (n):

    // space complexity:
    // best (n): create new array
    // worst (n): create new array
    // average (n): create new array
    // normal (n)

    const squareArray = (array: number[]): number[] => {
      const squaredArray = new Array(array.length);
      let left = 0;
      let right = array.length - 1;
      let insertPointer = squaredArray.length - 1;

      while (left <= right) {
        const leftSquare = array[left] ** 2;
        const rightSquare = array[right] ** 2;
        if (leftSquare > rightSquare) {
          squaredArray[insertPointer] = leftSquare;
          left++;
        } else {
          squaredArray[insertPointer] = rightSquare;
          right--;
        }
        insertPointer--;
      }

      return squaredArray;
    };

    it('positive numbers only', () => {
      expect(squareArray([1])).toStrictEqual([1]);
      expect(squareArray([1, 2, 3])).toStrictEqual([1, 4, 9]);
      expect(squareArray([0, 1])).toStrictEqual([0, 1]);
    });

    it('negative numbers only', () => {
      expect(squareArray([-1])).toStrictEqual([1]);
      expect(squareArray([-3, -2, -1])).toStrictEqual([1, 4, 9]);
      expect(squareArray([-1, 0])).toStrictEqual([0, 1]);
    });

    it('both positive and negative numbers', () => {
      expect(squareArray([-1, 1])).toStrictEqual([1, 1]);
      expect(squareArray([-1, 0, 1])).toStrictEqual([0, 1, 1]);
      expect(squareArray([-2, 0, 1])).toStrictEqual([0, 1, 4]);
    });

    it('edge: empty array', () => {
      expect(squareArray([])).toStrictEqual([]);
    });

    it('acceptance', () => {
      // example 1
      expect(squareArray([-2, -1, 0, 2, 3])).toStrictEqual([0, 1, 4, 4, 9]);
      // example 2
      expect(squareArray([-3, -1, 0, 1, 2])).toStrictEqual([0, 1, 1, 4, 9]);
    });
  });
});

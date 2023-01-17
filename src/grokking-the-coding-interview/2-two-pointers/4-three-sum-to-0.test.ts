// Given an array of unsorted numbers, find all unique triplets in it that add
// up to zero.

describe('threeSumTo0', () => {
  // Assumptions:

  // Best Computational Runtime:
  // runtime (n^2): can't do better than reducing this to a list of 2-sums
  // space (1)

  // Solutions:

  // brute
  // runtime (n^3): for each number, for each other number check if combining with any other number sums to 0 (n^3). Then remove duplicate triplets (by comparing each to all others) (n^2)
  // space (1)

  // pre-sort + 2-sum
  // runtime (n^2): sort numbers (n log n) then for each (n) use sorted 2-sum (n) to find sum to 0. Avoid duplicate triplets by fast-forwarding pointers through sorted array (skipping duplicates)
  // space (1): need to output triplets

  // hashmap
  // runtime (n^2): still need to do a list of 2-sum
  // space (n): overwrite 1 dict to store anti-sums

  describe('pre-sort + 2-sum', () => {
    // runtime complexity:
    // best (n^2): have to check every number
    // worst (n^2): have to check every number
    // average (n^2): have to check every number
    // normal (n^2)

    // space complexity:
    // best (1)
    // worse (1)
    // average (1)
    // normal (1)

    type Triplet = [number, number, number];

    const threeSumTo0 = (array: number[]): Triplet[] => {
      const sortedArray = array.sort((a, b) => a - b);

      const triplets: Triplet[] = [];

      let i = 0;
      while (i < sortedArray.length) {
        const tripletStart = sortedArray[i];
        const targetSum = -tripletStart;

        let left = i + 1;
        let right = sortedArray.length - 1;
        while (left < right) {
          const currentLeft = sortedArray[left];
          const currentRight = sortedArray[right];
          const currentSum = currentLeft + currentRight;
          if (currentSum === targetSum) {
            triplets.push([tripletStart, currentLeft, currentRight]);
            while (currentLeft === sortedArray[left]) {
              left++;
            }
            // Don't need an inner loop to move `right` leftwards because once we
            // increment `left` to a new number, `right` will be too big, so the
            // outer loop will move it leftwards
            right--;
          } else if (currentSum < targetSum) {
            left++;
          } else {
            right--;
          }
        }
        while (sortedArray[i] === tripletStart) {
          i++;
        }
      }
      return triplets;
    };

    it('many duplicates', () => {
      expect(threeSumTo0([0, 0, 0, 0])).toStrictEqual([[0, 0, 0]]);
      expect(
        threeSumTo0([
          -2, -2, -2, -2, -1, -1, -1, -1, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2,
        ]),
      ).toStrictEqual([
        [-2, 0, 2],
        [-2, 1, 1],
        [-1, -1, 2],
        [-1, 0, 1],
        [0, 0, 0],
      ]);
    });

    it('edge: array length < 3', () => {
      expect(threeSumTo0([])).toStrictEqual([]);
      expect(threeSumTo0([0])).toStrictEqual([]);
      expect(threeSumTo0([0, 0])).toStrictEqual([]);
    });

    it('acceptance', () => {
      // example 1
      expect(threeSumTo0([-3, 0, 1, 2, -1, 1, -2])).toStrictEqual([
        [-3, 1, 2],
        [-2, 0, 2],
        [-2, 1, 1],
        [-1, 0, 1],
      ]);
      // example 2
      expect(threeSumTo0([-5, 2, -1, -2, 3])).toStrictEqual([
        [-5, 2, 3],
        [-2, -1, 3],
      ]);
    });
  });
});

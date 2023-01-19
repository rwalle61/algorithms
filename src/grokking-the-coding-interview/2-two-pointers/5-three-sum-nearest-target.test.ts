// Given an array of unsorted numbers and a target number, find a triplet in the
// array whose sum is as close to the target number as possible, return the sum
// of the triplet. If there are more than one such triplet, return the sum of
// the triplet with the smallest sum.

describe('threeSumNearestTarget', () => {
  // Assumptions:

  // Best Computational Runtime:
  // runtime (n^2): similar to 3Sum (reduce problem to list of 2-sums)
  // space (1)

  // Solutions:

  // brute
  // runtime (n^3): for each number, for each other number combining with all other numbers and keep sum if nearest (n^3).
  // space (1)

  // pre-sort + 2-sum
  // runtime (n^2): sort numbers (n log n) then for each (n) use sorted 2-sum (n) to find sum to 0.
  // space (1)

  // hashmap
  // runtime (n^2): still need to do a list of 2-sum
  // space (n): overwrite 1 dict to store anti-sums

  describe('pre-sort + 2-sum', () => {
    // runtime complexity:
    // best (1): immediately find target
    // worst (n^2): never find target
    // average (n^2): depends on input
    // normal (n^2)

    // space complexity:
    // best (1)
    // worse (1)
    // average (1)
    // normal (1)

    const threeSumNearestTarget = (array: number[], target: number): number => {
      const sortedArray = array.sort((a, b) => a - b);

      let nearestSum = Infinity;

      let i = 0;
      while (i < sortedArray.length) {
        let left = i + 1;
        let right = sortedArray.length - 1;
        while (left < right) {
          const currentSum =
            sortedArray[i] + sortedArray[left] + sortedArray[right];
          const currentDiff = Math.abs(target - currentSum);
          const nearestDiff = Math.abs(target - nearestSum);
          if (
            currentDiff < nearestDiff ||
            (currentDiff === nearestDiff && currentSum < nearestSum)
          ) {
            nearestSum = currentSum;
          }
          if (currentSum === target) {
            return currentSum;
          }
          if (currentSum < target) {
            left++;
          } else {
            right--;
          }
        }

        i++;
      }
      return nearestSum;
    };

    it('unsorted array', () => {
      expect(threeSumNearestTarget([1, 2, 1, 0], 2)).toBe(2);
    });

    it('return smallest of multiple nearest sums', () => {
      expect(threeSumNearestTarget([0, 0, 1, 3], 2)).toBe(1);
      expect(threeSumNearestTarget([0, 0, -1, -3], -2)).toBe(-3);
    });

    it('edge: array length < 3', () => {
      expect(threeSumNearestTarget([], 0)).toBe(Infinity);
      expect(threeSumNearestTarget([0], 0)).toBe(Infinity);
      expect(threeSumNearestTarget([0, 0], 0)).toBe(Infinity);
    });

    it('acceptance', () => {
      // example 1
      expect(threeSumNearestTarget([-2, 0, 1, 2], 2)).toBe(1);
      // example 2
      expect(threeSumNearestTarget([-3, -1, 1, 2], 1)).toBe(0);
    });
  });
});

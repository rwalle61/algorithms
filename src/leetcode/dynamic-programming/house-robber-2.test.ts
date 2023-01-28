import { range } from '../../../utils';

describe('maxMoneyCyclicCyclic', () => {
  // Assumptions:
  // 1 <= nums.length <= 100
  // 0 <= nums[i] <= 1000

  // Best Computational Runtime:
  // runtime (n)
  // space (1)

  // Solutions:

  // Same as "house robber 1" but choose max of either first or last elements (as the cycle means we have to choose one of them)

  describe('iterate up', () => {
    // runtime complexity:
    // best (1): list length 0
    // worst (n)
    // normal (n): search entire problem space

    // space complexity:
    // best (1)
    // worst (1)
    // normal (1)

    const maxMoney = (
      nums: number[],
      startIndex: number,
      endIndex: number,
    ): number => {
      let maxUpToCurrentHouse = 0;
      let maxUpToPrevHouse = 0;

      for (let i = startIndex; i <= endIndex; i++) {
        const temp = maxUpToCurrentHouse;
        maxUpToCurrentHouse = Math.max(
          nums[i] + maxUpToPrevHouse,
          maxUpToCurrentHouse,
        );
        maxUpToPrevHouse = temp;
      }

      return maxUpToCurrentHouse;
    };

    const maxMoneyCyclic = (nums: number[]): number =>
      nums.length === 1
        ? nums[0]
        : Math.max(
            maxMoney(nums, 0, nums.length - 2),
            maxMoney(nums, 1, nums.length - 1),
          );

    it('edge: no houses', () => {
      expect(maxMoneyCyclic([])).toBe(0);
    });

    it('edge: 1 house', () => {
      expect(maxMoneyCyclic([1])).toBe(1);
    });

    it('big', () => {
      expect(maxMoneyCyclic(range(40))).toBe(400);
    });

    it('acceptance', () => {
      expect(maxMoneyCyclic([2, 3, 2])).toBe(3);
      expect(maxMoneyCyclic([1, 2, 3, 1])).toBe(4);
      expect(maxMoneyCyclic([1, 2, 3])).toBe(3);
    });
  });
});

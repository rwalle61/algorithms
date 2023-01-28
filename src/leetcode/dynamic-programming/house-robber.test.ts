import { range } from '../../../utils';

describe('maxMoney', () => {
  // Assumptions:
  // 1 <= nums.length <= 100
  // 0 <= nums[i] <= 400

  // Best Computational Runtime:
  // runtime (n): search whole problem space
  // space (1)

  // Solutions:

  // Same as "climbing stairs", just track money at each step / house

  describe('brute recurse', () => {
    // runtime complexity:
    // best (1): list length 0
    // worst (2^n?)
    // normal (2^n?)

    // space complexity:
    // best (1)
    // worst (n)
    // normal (n): recursive call stack

    const maxMoneyUpToHouse = (nums: number[], houseIndex: number): number =>
      houseIndex < 0
        ? 0
        : Math.max(
            nums[houseIndex] + maxMoneyUpToHouse(nums, houseIndex - 2),
            maxMoneyUpToHouse(nums, houseIndex - 1),
          );

    const maxMoney = (nums: number[]): number =>
      maxMoneyUpToHouse(nums, nums.length - 1);

    it('edge: no houses', () => {
      expect(maxMoney([])).toBe(0);
    });

    it('edge: 1 house', () => {
      expect(maxMoney([1])).toBe(1);
    });

    it('big', () => {
      // expect(maxMoney(range(40))).toBe(400); // slow
    });

    it('acceptance', () => {
      expect(maxMoney([1, 2, 3, 1])).toBe(4);
      expect(maxMoney([2, 7, 9, 3, 1])).toBe(12);
    });
  });

  describe('single recurse up', () => {
    // runtime complexity:
    // best (1)
    // worst (n)
    // normal (n): search entire problem space

    // space complexity:
    // best (n)
    // worst (n)
    // normal (n): recursive call stack

    const maxMoneyUpToHouse = (
      nums: number[],
      houseIndex: number,
      maxUpToPrevHouse: number,
      maxUpToPrevPrevHouse: number,
    ): number => {
      if (houseIndex === nums.length) {
        return maxUpToPrevHouse;
      }

      const maxUpToCurrentHouse = Math.max(
        nums[houseIndex] + maxUpToPrevPrevHouse,
        maxUpToPrevHouse,
      );

      return maxMoneyUpToHouse(
        nums,
        houseIndex + 1,
        maxUpToCurrentHouse,
        maxUpToPrevHouse,
      );
    };

    const maxMoney = (nums: number[]): number =>
      maxMoneyUpToHouse(nums, 0, 0, 0);

    it('edge: no houses', () => {
      expect(maxMoney([])).toBe(0);
    });

    it('edge: 1 house', () => {
      expect(maxMoney([1])).toBe(1);
    });

    it('big', () => {
      expect(maxMoney(range(40))).toBe(400);
    });

    it('acceptance', () => {
      expect(maxMoney([1, 2, 3, 1])).toBe(4);
      expect(maxMoney([2, 7, 9, 3, 1])).toBe(12);
    });
  });

  describe('iterate up', () => {
    // runtime complexity:
    // best (1): list length 0
    // worst (n)
    // normal (n): search entire problem space

    // space complexity:
    // best (1)
    // worst (1)
    // normal (1)

    const maxMoney = (nums: number[]): number => {
      let maxUpToCurrentHouse = 0;
      let maxUpToPrevHouse = 0;

      for (let i = 0; i < nums.length; i++) {
        const temp = maxUpToCurrentHouse;
        maxUpToCurrentHouse = Math.max(
          nums[i] + maxUpToPrevHouse,
          maxUpToCurrentHouse,
        );
        maxUpToPrevHouse = temp;
      }

      return maxUpToCurrentHouse;
    };

    it('edge: no houses', () => {
      expect(maxMoney([])).toBe(0);
    });

    it('edge: 1 house', () => {
      expect(maxMoney([1])).toBe(1);
    });

    it('big', () => {
      expect(maxMoney(range(40))).toBe(400);
    });

    it('acceptance', () => {
      expect(maxMoney([1, 2, 3, 1])).toBe(4);
      expect(maxMoney([2, 7, 9, 3, 1])).toBe(12);
    });
  });
});

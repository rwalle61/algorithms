describe('maxProduct', () => {
  // Assumptions:
  // 1 <= nums.length <= 2 * 104
  // -10 <= nums[i] <= 10
  // The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

  // Best Computational Runtime:
  // runtime (n)
  // space (1) or (n)

  // Solutions:

  // brute
  // runtime (n^2): try every start & end point
  // space (1)

  // dp - cache?
  // runtime (n)
  // space (n)

  // clever iterate?
  // runtime (n)
  // space (1)

  describe('brute (with optimisation)', () => {
    // runtime complexity:
    // best (n): every start is 0
    // worst (n^2): try every start & end point
    // normal (n^2)

    // space complexity:
    // best (1)
    // worst (1)
    // normal (1)

    const maxProduct = (nums: number[]): number => {
      let max = -Infinity;

      for (let i = 0; i < nums.length; i++) {
        let current = nums[i];
        max = Math.max(max, current);
        for (let j = i + 1; j < nums.length; j++) {
          current *= nums[j];
          if (current === 0) {
            // optimisation
            break;
          }
          max = Math.max(max, current);
        }
      }
      return max;
    };

    it('empty array', () => {
      expect(maxProduct([])).toBe(-Infinity);
    });

    it('array all positive', () => {
      expect(maxProduct([1, 2, 3, 4])).toBe(24);
    });

    it('array all negative', () => {
      expect(maxProduct([-1, -2, -3, -4])).toBe(24);
      expect(maxProduct([-1, -2, -3])).toBe(6);
      expect(maxProduct([-2, -1, -3])).toBe(3);
      expect(maxProduct([-2, -1, -3, -4])).toBe(24);
    });

    it('array contains 0', () => {
      expect(maxProduct([1, 0])).toBe(1);
      expect(maxProduct([0, 1])).toBe(1);

      expect(maxProduct([1, 2, 0, 3, 4])).toBe(12);
      expect(maxProduct([3, 4, 0, 1, 2])).toBe(12);

      expect(maxProduct([-1, -2, 0, -3])).toBe(2);
      expect(maxProduct([-1, -2, 0, -3, -4])).toBe(12);
      expect(maxProduct([-3, -4, 0, -1, -2])).toBe(12);
    });

    it('max product <= 0', () => {
      expect(maxProduct([-2])).toBe(-2);

      expect(maxProduct([0])).toBe(0);
      expect(maxProduct([-1, 0, -1])).toBe(0);
    });

    it('max product >0 but array has negatives', () => {
      // drop first negative
      expect(maxProduct([2, 2, -1, 5])).toBe(5);
      expect(maxProduct([2, 2, -1, 3, -3, -5])).toBe(45);

      // drop last negative
      expect(maxProduct([5, -1, 2, 2])).toBe(5);
      expect(maxProduct([-5, -3, 3, -1, 2, 2])).toBe(45);
    });

    it('big', () => {
      expect(maxProduct(new Array<number>(2000).fill(0))).toBe(0);
      expect(maxProduct(new Array<number>(2000).fill(1))).toBe(1);
    });

    it('acceptance', () => {
      expect(maxProduct([2, 3, -2, 4])).toBe(6);
      expect(maxProduct([-2, 0, -1])).toBe(0);
    });
  });

  describe('dp smart', () => {
    // runtime complexity:
    // best (n): check entire array
    // worst (n):
    // normal (n)

    // space complexity:
    // best (1)
    // worst (1)
    // normal (1)
    const DEFAULT_PRODUCT = 1;

    const maxProduct = (nums: number[]): number => {
      let positives = DEFAULT_PRODUCT;
      let allNums = DEFAULT_PRODUCT;

      let seenANegative = false;
      let upToFirstNegative = DEFAULT_PRODUCT;

      let max = -Infinity;

      for (const num of nums) {
        allNums *= num;

        if (num > 0) {
          positives *= num;
        } else if (num === 0) {
          positives = DEFAULT_PRODUCT;
          allNums = DEFAULT_PRODUCT;

          seenANegative = false;
          upToFirstNegative = DEFAULT_PRODUCT;
        } else {
          if (!seenANegative) {
            seenANegative = true;
            upToFirstNegative = num * positives;
          }
          positives = DEFAULT_PRODUCT;
        }

        max = Math.max(
          max,
          num,
          ...[positives, allNums, allNums / upToFirstNegative].filter(
            (product) => product !== DEFAULT_PRODUCT,
          ),
          seenANegative ? allNums : -Infinity,
        );
      }
      return max;
    };

    it('empty array', () => {
      expect(maxProduct([])).toBe(-Infinity);
    });

    it('array all positive', () => {
      expect(maxProduct([1, 2, 3, 4])).toBe(24);
    });

    it('array all negative', () => {
      expect(maxProduct([-1, -2, -3, -4])).toBe(24);
      expect(maxProduct([-2, -1, -3, -4])).toBe(24);
      expect(maxProduct([-1, -1])).toBe(1);

      expect(maxProduct([-1, -2, -3])).toBe(6);
      expect(maxProduct([-2, -1, -3])).toBe(3);
      expect(maxProduct([-1, -1, -1])).toBe(1);
    });

    it('array contains 0', () => {
      expect(maxProduct([1, 0])).toBe(1);
      expect(maxProduct([0, 1])).toBe(1);

      expect(maxProduct([1, 2, 0, 3, 4])).toBe(12);
      expect(maxProduct([3, 4, 0, 1, 2])).toBe(12);

      expect(maxProduct([-1, -2, 0, -3])).toBe(2);
      expect(maxProduct([-1, -2, 0, -3, -4])).toBe(12);
      expect(maxProduct([-3, -4, 0, -1, -2])).toBe(12);
    });

    it('max product <= 0', () => {
      expect(maxProduct([-2])).toBe(-2);

      expect(maxProduct([0])).toBe(0);
      expect(maxProduct([-1, 0, -1])).toBe(0);
    });

    it('max product >0 but array has negatives', () => {
      // drop first negative
      expect(maxProduct([2, 2, -1, 5])).toBe(5);
      expect(maxProduct([2, 2, -1, 3, -3, -5])).toBe(45);

      // drop last negative
      expect(maxProduct([5, -1, 2, 2])).toBe(5);
      expect(maxProduct([-5, -3, 3, -1, 2, 2])).toBe(45);
    });

    it('big', () => {
      expect(maxProduct(new Array<number>(2000).fill(0))).toBe(0);
      expect(maxProduct(new Array<number>(2000).fill(1))).toBe(1);
    });

    it('acceptance', () => {
      expect(maxProduct([2, 3, -2, 4])).toBe(6);
      expect(maxProduct([-2, 0, -1])).toBe(0);
    });
  });

  describe('dp smartest', () => {
    // runtime complexity:
    // best (n): check entire array
    // worst (n):
    // normal (n)

    // space complexity:
    // best (1)
    // worst (1)
    // normal (1)
    const DEFAULT_PRODUCT = 1;

    const maxProduct = (nums: number[]): number => {
      let max = DEFAULT_PRODUCT;
      let min = DEFAULT_PRODUCT;

      let result = -Infinity;

      for (const num of nums) {
        [max, min] = [
          Math.max(num * max, num * min, num),
          Math.min(num * max, num * min, num),
        ];
        result = Math.max(result, max);
      }
      return result;
    };

    it('empty array', () => {
      expect(maxProduct([])).toBe(-Infinity);
    });

    it('array all positive', () => {
      expect(maxProduct([1, 2, 3, 4])).toBe(24);
    });

    it('array all negative', () => {
      expect(maxProduct([-1, -2, -3, -4])).toBe(24);
      expect(maxProduct([-2, -1, -3, -4])).toBe(24);
      expect(maxProduct([-1, -1])).toBe(1);

      expect(maxProduct([-1, -2, -3])).toBe(6);
      expect(maxProduct([-2, -1, -3])).toBe(3);
      expect(maxProduct([-1, -1, -1])).toBe(1);
    });

    it('array contains 0', () => {
      expect(maxProduct([1, 0])).toBe(1);
      expect(maxProduct([0, 1])).toBe(1);

      expect(maxProduct([1, 2, 0, 3, 4])).toBe(12);
      expect(maxProduct([3, 4, 0, 1, 2])).toBe(12);

      expect(maxProduct([-1, -2, 0, -3])).toBe(2);
      expect(maxProduct([-1, -2, 0, -3, -4])).toBe(12);
      expect(maxProduct([-3, -4, 0, -1, -2])).toBe(12);
    });

    it('max product <= 0', () => {
      expect(maxProduct([-2])).toBe(-2);

      expect(maxProduct([0])).toBe(0);
      expect(maxProduct([-1, 0, -1])).toBe(0);
    });

    it('max product >0 but array has negatives', () => {
      // drop first negative
      expect(maxProduct([2, 2, -1, 5])).toBe(5);
      expect(maxProduct([2, 2, -1, 3, -3, -5])).toBe(45);

      // drop last negative
      expect(maxProduct([5, -1, 2, 2])).toBe(5);
      expect(maxProduct([-5, -3, 3, -1, 2, 2])).toBe(45);
    });

    it('big', () => {
      expect(maxProduct(new Array<number>(2000).fill(0))).toBe(0);
      expect(maxProduct(new Array<number>(2000).fill(1))).toBe(1);
    });

    it('acceptance', () => {
      expect(maxProduct([2, 3, -2, 4])).toBe(6);
      expect(maxProduct([-2, 0, -1])).toBe(0);
    });
  });
});

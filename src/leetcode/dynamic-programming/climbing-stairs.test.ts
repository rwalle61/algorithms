describe('waysToClimb', () => {
  // Assumptions:
  // 1 <= n <= 45

  // Best Computational Runtime:
  // runtime (n)
  // space (1)

  // Solutions:

  // brute recurse down
  // runtime (2^n?)
  // space (n)

  // recurse down with cache
  // runtime (2^n?)
  // space (n)

  // recurse up
  // runtime (n)
  // space (n)

  // simple
  // runtime (n)
  // space (1)

  describe('brute recurse down', () => {
    // runtime complexity:
    // best (1): n is base case
    // worst (2^n?): n is big
    // average (2^n?)
    // normal (2^n?)

    // space complexity:
    // best (1): n is base case
    // worst (n): recursive call stack
    // average (n): recursive call stack
    // normal (n)

    const waysToClimb = (n: number): number => {
      if (n === 1) {
        return 1;
      }
      if (n === 2) {
        return 2;
      }

      return waysToClimb(n - 1) + waysToClimb(n - 2);
    };

    it('acceptance', () => {
      expect(waysToClimb(1)).toBe(1);
      expect(waysToClimb(2)).toBe(2);
      expect(waysToClimb(3)).toBe(3);
      expect(waysToClimb(4)).toBe(5);
      expect(waysToClimb(5)).toBe(8);
      expect(waysToClimb(6)).toBe(13);
      // expect(waysToClimb(45)).toBe(1836311903); // slow
    });
  });

  describe('recurse down with cache', () => {
    // runtime complexity:
    // best (1): n is base case
    // worst (2^n?): n is big
    // average (2^n?)
    // normal (2^n?)

    // space complexity:
    // best (1): n is base case
    // worst (n): recursive call stack, cache
    // average (n): recursive call stack, cache
    // normal (n)

    type Cache = Record<number, number>;

    const waysToClimbWithCache = (n: number, cache: Cache): number => {
      if (!(n in cache)) {
        // eslint-disable-next-line no-param-reassign
        cache[n] =
          waysToClimbWithCache(n - 1, cache) +
          waysToClimbWithCache(n - 2, cache);
      }

      return cache[n];
    };

    const waysToClimb = (n: number): number => {
      const cache: Cache = {
        1: 1,
        2: 2,
      };

      return waysToClimbWithCache(n, cache);
    };

    it('acceptance', () => {
      expect(waysToClimb(1)).toBe(1);
      expect(waysToClimb(2)).toBe(2);
      expect(waysToClimb(3)).toBe(3);
      expect(waysToClimb(4)).toBe(5);
      expect(waysToClimb(5)).toBe(8);
      expect(waysToClimb(6)).toBe(13);
      expect(waysToClimb(45)).toBe(1836311903);
    });
  });

  describe('recurse up', () => {
    // runtime complexity:
    // best (1): n is base case
    // worst (n)
    // average (n)
    // normal (n)

    // space complexity:
    // best (1): n is base case
    // worst (n): recursive call stack
    // average (n): recursive call stack
    // normal (n)

    const waysToClimbToTarget = (
      stepsUntilTarget: number,
      currentWays: number,
      prevWays: number,
    ): number =>
      stepsUntilTarget
        ? waysToClimbToTarget(
            stepsUntilTarget - 1,
            currentWays + prevWays,
            currentWays,
          )
        : currentWays;

    const waysToClimb = (n: number): number => waysToClimbToTarget(n, 1, 0);

    it('acceptance', () => {
      expect(waysToClimb(1)).toBe(1);
      expect(waysToClimb(2)).toBe(2);
      expect(waysToClimb(3)).toBe(3);
      expect(waysToClimb(4)).toBe(5);
      expect(waysToClimb(5)).toBe(8);
      expect(waysToClimb(6)).toBe(13);
      expect(waysToClimb(45)).toBe(1836311903);
    });
  });

  describe('simple', () => {
    // runtime complexity:
    // best (1): n is 1
    // worst (n)
    // average (n)
    // normal (n)

    // space complexity:
    // best (1)
    // worst (1)
    // average (1)
    // normal (1)

    const waysToClimb = (n: number): number => {
      let prevWays = 0;
      let currentWays = 1;

      for (let i = 1; i <= n; i++) {
        const temp = currentWays;
        currentWays += prevWays;
        prevWays = temp;
      }

      return currentWays;
    };

    it('acceptance', () => {
      expect(waysToClimb(1)).toBe(1);
      expect(waysToClimb(2)).toBe(2);
      expect(waysToClimb(3)).toBe(3);
      expect(waysToClimb(4)).toBe(5);
      expect(waysToClimb(5)).toBe(8);
      expect(waysToClimb(6)).toBe(13);
      expect(waysToClimb(45)).toBe(1836311903);
    });
  });
});

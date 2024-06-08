describe('coinChange', () => {
  // Assumptions:
  // 1 <= coins.length <= 12
  // 1 <= coins[i] <= 2^31 - 1
  // 0 <= amount <= 104

  // Best Computational Runtime:
  // runtime (coins.length * amount): dynamic programming usually requires solving all of the problem space
  // space (amount): dynamic programming usually requires storing previous solutions

  // Solutions:

  // bottom up with cache
  // runtime (coins.length * amount)
  // space (amount)

  describe('bottom up with cache', () => {
    // runtime complexity:
    // best (1): immediately found
    // worst (coins.length * amount): if coins are all prime factors and only need the smallest one
    // average (coins.length * amount)
    // normal (coins.length * amount)

    // space complexity:
    // best (1): immediately found
    // worst (amount): capped at `amount` because we prioritise big coins so we only check fastest way to each number
    // average (amount)
    // normal (amount)

    const coinChange = (coins: number[], amount: number): number => {
      const amountToNumCoins: Record<number, number> = { 0: 0 };

      const stack: number[] = [0];

      while (stack.length) {
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        const currentAmount = stack.pop()!;

        if (currentAmount === amount) {
          return amountToNumCoins[currentAmount];
        }

        for (const coin of coins) {
          const nextAmount = currentAmount + coin;

          if (nextAmount <= amount) {
            amountToNumCoins[nextAmount] = amountToNumCoins[currentAmount] + 1;
            stack.push(nextAmount); // faster than using a queue as we prioritise the big coins,
            // which also means we don't arrive at the same number twice (since we already found it using the biggest coin)
          }
        }
      }

      return -1;
    };

    it('amount is one coin', () => {
      expect(coinChange([1, 2, 5], 1)).toBe(1);
      expect(coinChange([1, 2, 5], 2)).toBe(1);
      expect(coinChange([1, 2, 5], 5)).toBe(1);
    });

    it('big', () => {
      expect(coinChange([1, 2, 5], 50)).toBe(10);
      expect(coinChange([1, 2, 5], 51)).toBe(11);
      expect(coinChange([1, 2, 5], 100)).toBe(20);
      expect(coinChange([1, 2, 5], 101)).toBe(21);
    });

    it('acceptance', () => {
      expect(coinChange([1, 2, 5], 11)).toBe(3);
      expect(coinChange([2], 3)).toBe(-1);
      expect(coinChange([1], 0)).toBe(0);
    });
  });
});

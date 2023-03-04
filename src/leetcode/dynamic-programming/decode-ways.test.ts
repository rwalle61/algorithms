describe('numDecodings', () => {
  // Assumptions:
  // 1 <= s.length <= 100
  // s contains only digits and may contain leading zero(s).

  // Best Computational Runtime:
  // runtime (n)
  // space (1)

  // Solutions:

  // brute recurse down
  // runtime (2^n?)
  // space (n)

  // recurse down with cache
  // runtime (n)
  // space (n)

  // recurse up with cache
  // runtime (n)
  // space (n)

  // simple
  // runtime (n)
  // space (1)

  describe('simple', () => {
    // runtime complexity:
    // best (1): leading 0
    // worst (n)
    // average (n)
    // normal (n)

    // space complexity:
    // best (1)
    // worst (1)
    // average (1)
    // normal (1)

    const numDecodings = (s: string): number => {
      if (s[0] === '0') {
        return 0;
      }

      let prevNum = 0;
      let currentNum = 1;

      for (let i = 0; i < s.length; i++) {
        // 00, 30, 40, ... 90
        if (s[i] !== '1' && s[i] !== '2' && s[i + 1] === '0') {
          return 0;
        }

        const temp = prevNum;
        prevNum = currentNum;

        if (
          s[i - 1] !== '0' &&
          s[i] !== '0' &&
          s[i + 1] !== '0' &&
          parseInt(`${s[i - 1]}${s[i]}`, 10) <= 26
        ) {
          currentNum += temp;
        }
      }

      return currentNum;
    };

    it('normal (no 0, 10, >26)', () => {
      expect(numDecodings('1')).toBe(1);
      expect(numDecodings('11')).toBe(2);
      expect(numDecodings('111')).toBe(3);
      expect(numDecodings('1111')).toBe(5);
      expect(numDecodings('11111')).toBe(8);
      expect(numDecodings('111111')).toBe(13);
    });

    it('0 at start', () => {
      expect(numDecodings('0')).toBe(0);
      expect(numDecodings('06')).toBe(0);
      expect(numDecodings('00')).toBe(0);
    });

    it('0 after start', () => {
      expect(numDecodings('100')).toBe(0);
      expect(numDecodings('100111')).toBe(0);

      expect(numDecodings('30')).toBe(0);
      expect(numDecodings('130')).toBe(0);
    });

    it('0 after >27', () => {
      expect(numDecodings('1730')).toBe(0);
      expect(numDecodings('730')).toBe(0);
      expect(numDecodings('4960')).toBe(0);
    });

    it('only 10', () => {
      expect(numDecodings('10')).toBe(1);
      expect(numDecodings('1010')).toBe(1);
      expect(numDecodings('101010')).toBe(1);
    });

    it('10 at start', () => {
      expect(numDecodings('101')).toBe(1);
      expect(numDecodings('1011')).toBe(2);
      expect(numDecodings('10111')).toBe(3);
    });

    it('10 at end', () => {
      expect(numDecodings('1110')).toBe(2);
    });

    it('10 in middle', () => {
      expect(numDecodings('1101')).toBe(1);
    });

    it('only >26', () => {
      expect(numDecodings('27')).toBe(1);
      expect(numDecodings('33')).toBe(1);
      expect(numDecodings('333')).toBe(1);
      expect(numDecodings('3333')).toBe(1);
    });

    it('>26 at start', () => {
      expect(numDecodings('271')).toBe(1);
      expect(numDecodings('2711')).toBe(2);
      expect(numDecodings('27111')).toBe(3);
    });

    it('>26 at end', () => {
      expect(numDecodings('127')).toBe(2);
      expect(numDecodings('1127')).toBe(3);
      expect(numDecodings('11127')).toBe(5);
    });

    it('>26 in middle', () => {
      expect(numDecodings('1271')).toBe(2);
      expect(numDecodings('12711')).toBe(4);
      expect(numDecodings('112711')).toBe(6);

      expect(numDecodings('113111')).toBe(9);
    });

    it('both 10 and >26', () => {
      expect(numDecodings('1201234')).toBe(3);
    });

    it('acceptance', () => {
      expect(numDecodings('11106')).toBe(2);
      expect(numDecodings('12')).toBe(2);
      expect(numDecodings('226')).toBe(3);
      expect(numDecodings('06')).toBe(0);
      expect(numDecodings('123123')).toBe(9);
    });
  });
});

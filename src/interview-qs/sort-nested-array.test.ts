// Sort a nested array

describe('sortNestedArray', () => {
  // Assumptions:
  // array is primitive, can be recreated
  // don't need a stable sort

  // Best Computational Runtime:
  // the best unstable sorting algo (heap sort) takes n log n and space 1
  // the fastest stable sorting algo (merge sort) takes n log n and space n
  // the least memory stable sorting algo (selection sort / bubble sort) takes n^2 and space 1
  // so our will be one of those

  // Solutions:

  // brute
  // runtime (n log n): extract (n), sort (n log n), replace (n)
  // space (n): store extracted list

  describe('brute', () => {
    type NestedArray = (number | NestedArray)[];

    // runtime complexity:
    // best (n log n): always extract every element and sort it
    // worst (n log n): always extract every element and sort it
    // average (n log n): always extract every element and sort it
    // normal (n log n)

    // space complexity:
    // best (n): always store every element
    // worst (n): always store every element
    // average (n): always store every element
    // normal (n)

    describe('serialise', () => {
      const sortNestedArray = <T extends unknown[]>(array: T): T => {
        const serialisedArray = JSON.stringify(array);

        const tempArray: number[] = [];

        for (const char of serialisedArray) {
          const number = parseInt(char, 10);
          const isNumber = !Number.isNaN(number);
          if (isNumber) {
            tempArray.push(number);
          }
        }
        tempArray.sort((a, b) => a - b);

        const sortedArray: string[] = [];

        for (let i = 0; i < serialisedArray.length; i++) {
          const char = serialisedArray[i];
          const isNumber = !Number.isNaN(parseInt(char, 10));
          if (isNumber) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            sortedArray.push(tempArray.shift()!.toString());
          } else {
            sortedArray.push(char);
          }
        }

        const sortedSerialisedArray = sortedArray.join('');

        return JSON.parse(sortedSerialisedArray) as T;
      };

      it('1 level', () => {
        expect(sortNestedArray([3, 2, 1])).toStrictEqual([1, 2, 3]);
        expect(sortNestedArray([2, 3, 1])).toStrictEqual([1, 2, 3]);
        expect(sortNestedArray([1, 2, 3])).toStrictEqual([1, 2, 3]);
      });
      it('2 levels', () => {
        expect(sortNestedArray([[3], [2], 1])).toStrictEqual([[1], [2], 3]);
      });

      it('3 levels', () => {
        expect(sortNestedArray([[3], [[2]], 1])).toStrictEqual([[1], [[2]], 3]);
      });

      it('acceptance', () => {
        expect(
          sortNestedArray([9, [8, 7], [6, [5, [4]]], 3, 2, 1]),
        ).toStrictEqual([1, [2, 3], [4, [5, [6]]], 7, 8, 9]);

        expect(
          sortNestedArray([9, [3, 7], [6, [2, [4]]], 8, 5, 1]),
        ).toStrictEqual([1, [2, 3], [4, [5, [6]]], 7, 8, 9]);
      });
    });

    describe("don't serialise", () => {
      const traverseArrayAndExtract = (
        array: NestedArray,
        tempArray: number[],
      ) => {
        for (let i = 0; i < array.length; i++) {
          const element = array[i];
          if (typeof element === 'number') {
            tempArray.push(element);
          } else {
            traverseArrayAndExtract(element, tempArray);
          }
        }
      };

      const traverseArrayAndInsert = (
        array: NestedArray,
        tempArray: number[],
      ) => {
        for (let i = 0; i < array.length; i++) {
          const element = array[i];
          if (typeof element === 'number') {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, no-param-reassign
            array[i] = tempArray.shift()!;
          } else {
            traverseArrayAndInsert(element, tempArray);
          }
        }
      };

      const sortNestedArray = <T extends NestedArray>(array: T): T => {
        const tempArray: number[] = [];

        traverseArrayAndExtract(array, tempArray);

        tempArray.sort((a, b) => a - b);

        traverseArrayAndInsert(array, tempArray);

        return array;
      };

      it('1 level', () => {
        expect(sortNestedArray([3, 2, 1])).toStrictEqual([1, 2, 3]);
        expect(sortNestedArray([2, 3, 1])).toStrictEqual([1, 2, 3]);
        expect(sortNestedArray([1, 2, 3])).toStrictEqual([1, 2, 3]);
      });
      it('2 levels', () => {
        expect(sortNestedArray([[3], [2], 1])).toStrictEqual([[1], [2], 3]);
      });

      it('3 levels', () => {
        expect(sortNestedArray([[3], [[2]], 1])).toStrictEqual([[1], [[2]], 3]);
      });

      it('acceptance', () => {
        expect(
          sortNestedArray([9, [8, 7], [6, [5, [4]]], 3, 2, 1]),
        ).toStrictEqual([1, [2, 3], [4, [5, [6]]], 7, 8, 9]);

        expect(
          sortNestedArray([9, [3, 7], [6, [2, [4]]], 8, 5, 1]),
        ).toStrictEqual([1, [2, 3], [4, [5, [6]]], 7, 8, 9]);
      });
    });
  });
});

import { link } from './link';
import { ListNode } from './ListNode';

describe('mergeKLists', () => {
  // Assumptions:
  // k == lists.length
  // 0 <= k <= 104
  // 0 <= lists[i].length <= 500
  // -104 <= lists[i][j] <= 104
  // lists[i] is sorted in ascending order.
  // The sum of lists[i].length will not exceed 104.
  // n == average list length

  // Best Computational Runtime:
  // runtime (every element): have to check every element
  // space (1): reuse existing nodes

  // Solutions:

  // brute iterate
  // runtime (k^2 * n): since sum of nodes = k * n
  // space (1): reuse existing nodes

  // fold half the lists into the other half & repeat log k times
  // runtime (log k * k * n)
  // space (1): reuse existing nodes

  // some heap solution

  describe('brute iterate', () => {
    // runtime complexity:
    // best (k^2 * n)
    // worst (k^2 * n)
    // normal (k^2 * n)

    // space complexity:
    // best (1)
    // worst (1): reuse existing nodes
    // normal (1)

    const mergeKLists = (lists: Array<ListNode | null>): ListNode | null => {
      const dummy = new ListNode(0, null);
      let current: ListNode = dummy;

      let minIndex = -1;

      while (current) {
        minIndex = -1;

        for (let i = 0; i < lists.length; i++) {
          const list = lists[i];
          if (list && list.val < (lists[minIndex]?.val ?? Infinity)) {
            minIndex = i;
          }
        }

        if (minIndex === -1) {
          break;
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        current.next = lists[minIndex]!;
        current = current.next;

        // eslint-disable-next-line no-param-reassign
        lists[minIndex] = current.next;
      }

      return dummy.next;
    };

    it('even k', () => {
      expect(mergeKLists([link([1, 3]), link([2, 4])])).toStrictEqual(
        link([1, 2, 3, 4]),
      );
      expect(
        mergeKLists([link([1, 5]), link([2, 6]), link([3, 7]), link([4, 8])]),
      ).toStrictEqual(link([1, 2, 3, 4, 5, 6, 7, 8]));
    });

    it('odd k', () => {
      expect(mergeKLists([link([1, 3])])).toStrictEqual(link([1, 3]));
      expect(
        mergeKLists([link([1, 4]), link([2, 5]), link([3, 6])]),
      ).toStrictEqual(link([1, 2, 3, 4, 5, 6]));
    });

    it('empty lists', () => {
      expect(mergeKLists([null, link([1, 2])])).toStrictEqual(link([1, 2]));
      expect(mergeKLists([link([1, 2]), null])).toStrictEqual(link([1, 2]));
      expect(mergeKLists([link([1, 2]), null, link([1, 2])])).toStrictEqual(
        link([1, 1, 2, 2]),
      );
      expect(mergeKLists([null])).toBeNull();

      expect(
        mergeKLists([
          link([1, 2]),
          null,
          null,
          null,
          null,
          null,
          null,
          link([1, 2]),
        ]),
      ).toStrictEqual(link([1, 1, 2, 2]));
    });

    it('no lists', () => {
      expect(mergeKLists([])).toBeNull();
    });

    it('falsy node value', () => {
      expect(mergeKLists([link([0]), link([1])])).toStrictEqual(link([0, 1]));
    });

    it('acceptance', () => {
      expect(
        mergeKLists([link([1, 4, 5]), link([1, 3, 4]), link([2, 6])]),
      ).toStrictEqual(link([1, 1, 2, 3, 4, 4, 5, 6]));

      expect(mergeKLists([])).toBeNull();

      expect(mergeKLists([null])).toBeNull();
    });
  });

  describe('fold lists into each other', () => {
    // runtime complexity:
    // best (log k * k * n)
    // worst (log k * k * n)
    // normal (log k * k * n)

    // space complexity:
    // best (1)
    // worst (1): reuse existing nodes
    // normal (1)

    const mergeTwoLists = (
      list1: ListNode | null,
      list2: ListNode | null,
    ): ListNode | null => {
      if (!list1) {
        return list2;
      }

      if (!list2) {
        return list1;
      }

      let [current, other] =
        list1.val < list2.val ? [list1, list2] : [list2, list1];
      const head = current;

      while (current.next) {
        if (current.next.val > other.val) {
          [current.next, other] = [other, current.next];
        }
        current = current.next;
      }
      current.next = other;

      return head;
    };

    it('mergeTwoLists', () => {
      expect(mergeTwoLists(link([1]), null)).toStrictEqual(link([1]));
      expect(mergeTwoLists(null, link([1]))).toStrictEqual(link([1]));

      expect(mergeTwoLists(link([1]), link([2]))).toStrictEqual(link([1, 2]));

      expect(mergeTwoLists(link([1, 3]), link([2]))).toStrictEqual(
        link([1, 2, 3]),
      );
      expect(mergeTwoLists(link([2]), link([1, 3]))).toStrictEqual(
        link([1, 2, 3]),
      );

      expect(mergeTwoLists(link([1, 3]), link([2, 4]))).toStrictEqual(
        link([1, 2, 3, 4]),
      );

      expect(mergeTwoLists(link([1, 3]), null)).toStrictEqual(link([1, 3]));

      expect(mergeTwoLists(null, link([1, 3]))).toStrictEqual(link([1, 3]));
    });

    const mergeKLists = (lists: Array<ListNode | null>): ListNode | null => {
      let listsLength = lists.length;

      if (!listsLength) {
        return null;
      }

      while (listsLength > 1) {
        let i = 0;
        let reinsertionIndex = 0;

        while (i < listsLength) {
          const list1 = lists[i];
          if (!list1) {
            i += 1;
            // eslint-disable-next-line no-continue
            continue;
          }
          const j = i + 1;
          const list2 = lists[j];

          // eslint-disable-next-line no-param-reassign
          lists[i] = null;
          // eslint-disable-next-line no-param-reassign
          lists[j] = null;
          // eslint-disable-next-line no-param-reassign
          lists[reinsertionIndex] = mergeTwoLists(list1, list2);

          i = j + 1;
          reinsertionIndex += 1;
        }
        listsLength = reinsertionIndex;
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return lists[0]!;
    };

    it('even k', () => {
      expect(mergeKLists([link([1, 3]), link([2, 4])])).toStrictEqual(
        link([1, 2, 3, 4]),
      );
      expect(
        mergeKLists([link([1, 5]), link([2, 6]), link([3, 7]), link([4, 8])]),
      ).toStrictEqual(link([1, 2, 3, 4, 5, 6, 7, 8]));
    });

    it('odd k', () => {
      expect(mergeKLists([link([1, 3])])).toStrictEqual(link([1, 3]));
      expect(
        mergeKLists([link([1, 4]), link([2, 5]), link([3, 6])]),
      ).toStrictEqual(link([1, 2, 3, 4, 5, 6]));
    });

    it('empty lists', () => {
      expect(mergeKLists([null, link([1, 2])])).toStrictEqual(link([1, 2]));
      expect(mergeKLists([link([1, 2]), null])).toStrictEqual(link([1, 2]));
      expect(mergeKLists([link([1, 2]), null, link([1, 2])])).toStrictEqual(
        link([1, 1, 2, 2]),
      );
      expect(mergeKLists([null])).toBeNull();

      expect(
        mergeKLists([
          link([1, 2]),
          null,
          null,
          null,
          null,
          null,
          null,
          link([1, 2]),
        ]),
      ).toStrictEqual(link([1, 1, 2, 2]));
    });

    it('no lists', () => {
      expect(mergeKLists([])).toBeNull();
    });

    it('falsy node value', () => {
      expect(mergeKLists([link([0]), link([1])])).toStrictEqual(link([0, 1]));
    });

    it('acceptance', () => {
      expect(
        mergeKLists([link([1, 4, 5]), link([1, 3, 4]), link([2, 6])]),
      ).toStrictEqual(link([1, 1, 2, 3, 4, 4, 5, 6]));

      expect(mergeKLists([])).toBeNull();

      expect(mergeKLists([null])).toBeNull();
    });
  });
});

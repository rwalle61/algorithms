import { link } from './link';
import { ListNode } from './ListNode';

describe('mergeTwoLists', () => {
  // Assumptions:
  // The number of nodes in both lists is in the range [0, 50].
  // -100 <= Node.val <= 100
  // Both list1 and list2 are sorted in non-decreasing order.
  // The list should be made by splicing together the nodes of the first two lists.

  // Best Computational Runtime:
  // runtime (m+n): have to traverse entire list
  // space (1): reuse existing nodes

  // Solutions:

  // iterate
  // runtime (m+n): have to traverse entire list
  // space (1): reuse existing nodes

  // recurse
  // runtime (m+n): have to traverse entire list
  // space (m+n): recursive stack

  describe('iterate', () => {
    // runtime complexity:
    // best (m+n)
    // worst (m+n)
    // normal (m+n)

    // space complexity (ignoring array syntax):
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
        if (other.val < current.next.val) {
          [current.next, other] = [other, current.next];
        }
        current = current.next;
      }
      current.next = other;

      return head;
    };

    it('even lengths', () => {
      expect(mergeTwoLists(link([1]), link([2]))).toStrictEqual(link([1, 2]));
      expect(mergeTwoLists(link([2]), link([1]))).toStrictEqual(link([1, 2]));
      expect(mergeTwoLists(link([1, 3]), link([2, 4]))).toStrictEqual(
        link([1, 2, 3, 4]),
      );
      expect(mergeTwoLists(link([2, 4]), link([1, 3]))).toStrictEqual(
        link([1, 2, 3, 4]),
      );
    });

    it('uneven lengths', () => {
      expect(mergeTwoLists(link([1]), link([2, 3]))).toStrictEqual(
        link([1, 2, 3]),
      );
      expect(mergeTwoLists(link([2, 3]), link([1]))).toStrictEqual(
        link([1, 2, 3]),
      );
    });

    it('empty lists', () => {
      expect(mergeTwoLists(link([]), link([1, 2]))).toStrictEqual(link([1, 2]));
      expect(mergeTwoLists(link([1, 2]), link([]))).toStrictEqual(link([1, 2]));
      expect(mergeTwoLists(link([]), link([]))).toStrictEqual(link([]));
    });

    it('acceptance', () => {
      expect(mergeTwoLists(link([1, 2, 4]), link([1, 3, 4]))).toStrictEqual(
        link([1, 1, 2, 3, 4, 4]),
      );
      expect(mergeTwoLists(link([]), link([]))).toStrictEqual(link([]));
      expect(mergeTwoLists(link([]), link([0]))).toStrictEqual(link([0]));
    });
  });

  describe('recurse', () => {
    // runtime complexity:
    // best (m+n)
    // worst (m+n)
    // normal (m+n)

    // space complexity:
    // best (m+n)
    // worst (m+n): recursive stack
    // normal (m+n)

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

      const [current, other] =
        list1.val < list2.val ? [list1, list2] : [list2, list1];

      current.next = mergeTwoLists(current.next, other);

      return current;
    };

    it('even lengths', () => {
      expect(mergeTwoLists(link([1]), link([2]))).toStrictEqual(link([1, 2]));
      expect(mergeTwoLists(link([2]), link([1]))).toStrictEqual(link([1, 2]));
      expect(mergeTwoLists(link([1, 3]), link([2, 4]))).toStrictEqual(
        link([1, 2, 3, 4]),
      );
      expect(mergeTwoLists(link([2, 4]), link([1, 3]))).toStrictEqual(
        link([1, 2, 3, 4]),
      );
    });

    it('uneven lengths', () => {
      expect(mergeTwoLists(link([1]), link([2, 3]))).toStrictEqual(
        link([1, 2, 3]),
      );
      expect(mergeTwoLists(link([2, 3]), link([1]))).toStrictEqual(
        link([1, 2, 3]),
      );
    });

    it('empty lists', () => {
      expect(mergeTwoLists(link([]), link([1, 2]))).toStrictEqual(link([1, 2]));
      expect(mergeTwoLists(link([1, 2]), link([]))).toStrictEqual(link([1, 2]));
      expect(mergeTwoLists(link([]), link([]))).toStrictEqual(link([]));
    });

    it('acceptance', () => {
      expect(mergeTwoLists(link([1, 2, 4]), link([1, 3, 4]))).toStrictEqual(
        link([1, 1, 2, 3, 4, 4]),
      );
      expect(mergeTwoLists(link([]), link([]))).toStrictEqual(link([]));
      expect(mergeTwoLists(link([]), link([0]))).toStrictEqual(link([0]));
    });
  });
});

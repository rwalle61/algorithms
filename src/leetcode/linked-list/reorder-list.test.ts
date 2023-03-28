import { link } from './link';
import { ListNode } from './ListNode';

describe('reorderList', () => {
  // Assumptions:
  // modify head in-place.
  // The number of nodes in the list is in the range [1, 5 * 104].
  // 1 <= Node.val <= 1000

  // Best Computational Runtime:
  // runtime (n): have to traverse entire list
  // space (1)

  // Solutions:

  // brute fast & slow pointers
  // runtime (n^2): slow pointer tracks ascending list, fast pointer finds next descending element
  // space (1)

  // fast & slow pointers + 2 pointers
  // runtime (n): reverse 2nd half of list, then merge from start and end
  // space (n)

  describe('brute fast & slow pointers', () => {
    // runtime complexity:
    // best (n^2)
    // worst (n^2)
    // normal (n^2)

    // space complexity:
    // best (1)
    // worst (1)
    // normal (1)

    const reorderList = (head: ListNode | null): ListNode | null => {
      let slow = head;

      while (slow?.next?.next) {
        let fast = slow;
        while (fast.next?.next) {
          fast = fast.next;
        }
        const penultimateNode = fast;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const lastNode = fast.next!;

        lastNode.next = slow.next;
        slow.next = lastNode;
        penultimateNode.next = null;

        slow = lastNode.next;
      }

      return head;
    };

    it('empty list', () => {
      expect(reorderList(link([]))).toStrictEqual(link([]));
    });

    it('length 1', () => {
      expect(reorderList(link([1]))).toStrictEqual(link([1]));
    });

    it('acceptance', () => {
      expect(reorderList(link([1, 2, 3, 4]))).toStrictEqual(link([1, 4, 2, 3]));
      expect(reorderList(link([1, 2, 3, 4, 5]))).toStrictEqual(
        link([1, 5, 2, 4, 3]),
      );
    });
  });

  describe('fast & slow pointers + 2 pointers', () => {
    // runtime complexity:
    // best (n)
    // worst (n)
    // normal (n)

    // space complexity:
    // best (1)
    // worst (1)
    // normal (1)

    const reorderList = (head: ListNode | null): ListNode | null => {
      // get to midpoint
      let slow = head;
      let fast = head?.next;

      while (slow && fast?.next) {
        slow = slow.next;
        fast = fast.next.next;
      }

      // reverse 2nd half
      let prevSlow: ListNode | null = null;

      while (slow) {
        const originalSlowNext = slow.next;
        const originalSlow = slow;

        slow.next = prevSlow;

        prevSlow = originalSlow;
        slow = originalSlowNext;
      }

      // merge halves
      let right = prevSlow;
      let left = head;

      while (left && right) {
        const originalNext = left.next;
        const originalReversedNext = right.next;

        left.next = right;
        right.next = originalNext;

        left = originalNext;
        right = originalReversedNext;
      }

      return head;
    };

    it('empty list', () => {
      expect(reorderList(link([]))).toStrictEqual(link([]));
    });

    it('length 1', () => {
      expect(reorderList(link([1]))).toStrictEqual(link([1]));
    });

    it('acceptance', () => {
      expect(reorderList(link([1, 2, 3, 4]))).toStrictEqual(link([1, 4, 2, 3]));
      expect(reorderList(link([1, 2, 3, 4, 5]))).toStrictEqual(
        link([1, 5, 2, 4, 3]),
      );
    });
  });
});

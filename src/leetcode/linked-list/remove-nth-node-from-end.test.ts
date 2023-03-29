import { link } from './link';
import { ListNode } from './ListNode';

describe('removeNthFromEnd', () => {
  // Assumptions:
  // The number of nodes in the list is sz.
  // 1 <= sz <= 30
  // 0 <= Node.val <= 100
  // 1 <= n <= sz

  // Best Computational Runtime:
  // runtime (n): have to traverse entire list
  // space (1)

  // Solutions:

  // fast & slow pointers
  // runtime (n): traverse entire list. Fast pointer takes 2 steps, slow pointer takes 1, if cycle fast will catch slow
  // space (1)

  describe('fast & slow pointers', () => {
    // runtime complexity:
    // best (n)
    // worst (n)
    // normal (n)

    // space complexity:
    // best (1)
    // worst (1)
    // normal (1)

    const removeNthFromEnd = (
      head: ListNode | null,
      n: number,
    ): ListNode | null => {
      if (!head) {
        return null;
      }

      let slow = head;
      let fast: ListNode | null = head;

      let i = 0;

      while (fast && n >= i) {
        fast = fast.next;
        i += 1;
      }

      while (slow.next && fast) {
        slow = slow.next;
        fast = fast.next;
      }

      if (i === n) {
        return slow.next;
      }

      slow.next = slow.next?.next || null;

      return head;
    };

    it('length 0', () => {
      expect(removeNthFromEnd(link([]), 0)).toStrictEqual(link([]));
    });

    it('length 1', () => {
      expect(removeNthFromEnd(link([1]), 1)).toStrictEqual(link([]));
    });

    it('length n', () => {
      expect(removeNthFromEnd(link([1, 2]), 2)).toStrictEqual(link([2]));
    });

    it('acceptance', () => {
      expect(removeNthFromEnd(link([1, 2, 3, 4, 5]), 2)).toStrictEqual(
        link([1, 2, 3, 5]),
      );
      expect(removeNthFromEnd(link([1]), 1)).toStrictEqual(link([]));
      expect(removeNthFromEnd(link([1, 2]), 1)).toStrictEqual(link([1]));
    });
  });

  describe('fast & slow pointers (with dummy start node)', () => {
    // runtime complexity:
    // best (n)
    // worst (n)
    // normal (n)

    // space complexity:
    // best (1)
    // worst (1)
    // normal (1)

    const removeNthFromEnd = (
      head: ListNode | null,
      n: number,
    ): ListNode | null => {
      if (!head) {
        return null;
      }

      const dummy = new ListNode(0, head);

      let slow = dummy;
      let fast: ListNode | null = head;

      let i = 0;

      while (fast && n > i) {
        fast = fast.next;
        i += 1;
      }

      while (slow.next && fast) {
        slow = slow.next;
        fast = fast.next;
      }

      slow.next = slow.next?.next || null;

      return dummy.next;
    };

    it('length 0', () => {
      expect(removeNthFromEnd(link([]), 0)).toStrictEqual(link([]));
    });

    it('length 1', () => {
      expect(removeNthFromEnd(link([1]), 1)).toStrictEqual(link([]));
    });

    it('length n', () => {
      expect(removeNthFromEnd(link([1, 2]), 2)).toStrictEqual(link([2]));
    });

    it('acceptance', () => {
      expect(removeNthFromEnd(link([1, 2, 3, 4, 5]), 2)).toStrictEqual(
        link([1, 2, 3, 5]),
      );
      expect(removeNthFromEnd(link([1]), 1)).toStrictEqual(link([]));
      expect(removeNthFromEnd(link([1, 2]), 1)).toStrictEqual(link([1]));
    });
  });
});

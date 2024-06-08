// Given the head of a singly linked list, reverse the list, and return the
// reversed list

import { link } from './link';
import type { ListNode } from './ListNode';

describe('reverseList', () => {
  // Assumptions:
  // The number of nodes in the list is the range [0, 5000].
  // -5000 <= Node.val <= 5000

  // Best Computational Runtime:
  // runtime (n): have to traverse entire list
  // space (1): reuse existing nodes

  // Solutions:

  // iterate
  // runtime (n): have to traverse entire list
  // space (1): reuse existing nodes

  // recurse
  // runtime (n): have to traverse entire list
  // space (n): recursive stack

  describe('iterate', () => {
    // runtime complexity:
    // best (n)
    // worst (n)
    // normal (n)

    // space complexity:
    // best (1)
    // worst (1): reuse existing nodes
    // normal (1)

    const reverseList = (head: ListNode | null): ListNode | null => {
      let current = head;
      let prev = null;

      while (current) {
        [current.next, prev, current] = [prev, current, current.next];
      }

      return prev;
    };

    it('acceptance', () => {
      expect(reverseList(link([1, 2, 3, 4, 5]))).toStrictEqual(
        link([5, 4, 3, 2, 1]),
      );
      expect(reverseList(link([1, 2]))).toStrictEqual(link([2, 1]));
      expect(reverseList(link([]))).toStrictEqual(link([]));
    });
  });

  describe('recurse', () => {
    // runtime complexity:
    // best (n)
    // worst (n)
    // normal (n)

    // space complexity:
    // best (n): recursive stack
    // worst (n)
    // normal (n)

    // alternative:
    // const reverseListRecursive2 = (head: ListNode): ListNode => {
    //   let newHead = head;

    //   const tail = head.next;
    //   if (tail) {
    //     newHead = reverseListRecursive2(tail);
    //     tail.next = head;
    //   }

    //   // eslint-disable-next-line no-param-reassign
    //   head.next = null;

    //   return newHead;
    // };

    const reverseListRecursive = (
      head: ListNode,
      prev: ListNode | null,
    ): ListNode | null => {
      const tail = head.next;
      // eslint-disable-next-line no-param-reassign
      head.next = prev;

      if (tail) {
        return reverseListRecursive(tail, head);
      }
      return head;
    };

    const reverseList = (head: ListNode | null): ListNode | null =>
      !head ? null : reverseListRecursive(head, null);

    it('acceptance', () => {
      expect(reverseList(link([1, 2, 3, 4, 5]))).toStrictEqual(
        link([5, 4, 3, 2, 1]),
      );
      expect(reverseList(link([1, 2]))).toStrictEqual(link([2, 1]));
      expect(reverseList(link([]))).toStrictEqual(link([]));
    });
  });
});

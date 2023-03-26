import { ListNode } from './ListNode';

describe('hasCycle', () => {
  // Assumptions:
  // The number of the nodes in the list is in the range [0, 104].
  // -105 <= Node.val <= 105
  // pos is -1 or a valid index in the linked-list.

  // Best Computational Runtime:
  // runtime (n): have to traverse entire list
  // space (1)

  // Solutions:

  // fast + slow pointers
  // runtime (n): traverse entire list. Fast pointer takes 2 steps, slow pointer takes 1, if cycle fast will catch slow
  // space (1)

  const linkWithCycle = (
    list: number[],
    cycleStartPosition: number,
  ): ListNode | null => {
    if (!list.length) {
      return null;
    }

    const head = new ListNode(list[0]);
    let current = head;
    let cycleStartNode = cycleStartPosition === 0 ? current : null;

    for (let i = 1; i < list.length; i++) {
      const element = list[i];
      const node = new ListNode(element);

      current.next = node;
      current = node;

      if (i === cycleStartPosition) {
        cycleStartNode = node;
      }

      if (i === list.length - 1 && cycleStartNode) {
        node.next = cycleStartNode;
      }
    }
    return head;
  };

  describe('fast + slow pointers', () => {
    // runtime complexity:
    // best (n)
    // worst (n)
    // normal (n)

    // space complexity:
    // best (1)
    // worst (1)
    // normal (1)

    const hasCycle = (head: ListNode | null): boolean => {
      let slow = head;
      let fast = head;
      while (slow && fast?.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
          return true;
        }
      }
      return false;
    };

    it('empty list', () => {
      expect(hasCycle(linkWithCycle([], -1))).toBe(false);
    });

    it('acceptance', () => {
      expect(hasCycle(linkWithCycle([3, 2, 0, -4], 1))).toBe(true);
      expect(hasCycle(linkWithCycle([1, 2], 0))).toBe(true);
      expect(hasCycle(linkWithCycle([1], -1))).toBe(false);
    });
  });

  describe('fast + slow pointer (recursive)', () => {
    // runtime complexity:
    // best (n)
    // worst (n)
    // normal (n)

    // space complexity:
    // best (n)
    // worst (n): recursive stack
    // normal (n)

    const hasCycleRecursive = (
      slow: ListNode | null,
      fast: ListNode | null,
    ): boolean => {
      if (!slow || !fast?.next) {
        return false;
      }
      if (slow === fast) {
        return true;
      }
      return hasCycleRecursive(slow.next, fast.next.next);
    };

    const hasCycle = (head: ListNode | null): boolean =>
      hasCycleRecursive(head, head);

    it('empty list', () => {
      expect(hasCycle(linkWithCycle([], -1))).toBe(false);
    });

    it('acceptance', () => {
      expect(hasCycle(linkWithCycle([3, 2, 0, -4], 1))).toBe(true);
      expect(hasCycle(linkWithCycle([1, 2], 0))).toBe(true);
      expect(hasCycle(linkWithCycle([1], -1))).toBe(false);
    });
  });
});

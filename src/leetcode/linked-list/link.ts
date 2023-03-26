import { ListNode } from './ListNode';

export const link = (list: number[]): ListNode | null => {
  if (!list.length) {
    return null;
  }

  const head = new ListNode(list[0]);
  let current = head;

  for (const element of list.slice(1)) {
    const node = new ListNode(element);
    current.next = node;
    current = node;
  }
  return head;
};

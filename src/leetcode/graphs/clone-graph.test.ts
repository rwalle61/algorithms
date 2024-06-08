import { Queue } from './Queue';
import { Stack } from './Stack';

describe('cloneGraph', () => {
  // Assumptions:
  // The number of nodes in the graph is in the range [0, 100].
  // 1 <= Node.val <= 100
  // Node.val is unique for each node.
  // There are no repeated edges and no self-loops in the graph.
  // The Graph is connected and all nodes can be visited starting from the given node.

  // Best Computational Runtime:
  // runtime (??):
  // space (??):

  // Solutions:

  // DFS recursive
  // runtime (edges + vertices): only visit each node once
  // space (edges + vertices): stack has max height (length of longest edge chain), cache has max length of all nodes (vertices)

  // Build adjacency list - DFS stack
  // runtime (edges + vertices): only visit each node once
  // space (edges + vertices): stack has max height (length of longest edge chain), cache has max length of all nodes (vertices)

  // Build adjacency list - BFS
  // runtime (edges + vertices): only visit each node once
  // space (vertices): queue has max width of edges, cache has max length of all nodes (vertices)

  class Node {
    val: number;

    neighbors: Node[];

    constructor(val?: number, neighbors?: Node[]) {
      this.val = val === undefined ? 0 : val;
      this.neighbors = neighbors === undefined ? [] : neighbors;
    }
  }

  describe('build adjacency list - DFS recursive', () => {
    // runtime complexity:
    // best (e+v): are all shapes/trees equally performant?
    // worst (e+v):
    // average (e+v)
    // normal (e+v)

    // space complexity:
    // best (e+v): stack has max length of edges, cache has max length of all nodes (vertices)
    // worst (e+v):
    // average (e+v)
    // normal (e+v)

    const clone = (node: Node, clones: Record<number, Node>): Node => {
      if (clones[node.val]) {
        return clones[node.val];
      }

      const copy = new Node(node.val);

      // eslint-disable-next-line no-param-reassign
      clones[node.val] = copy;

      for (const neighbor of node.neighbors) {
        const clonedNeighbor = clone(neighbor, clones);
        copy.neighbors.push(clonedNeighbor);
      }

      return copy;
    };

    const cloneGraph = (node: Node | null): Node | null =>
      node ? clone(node, {}) : null;

    it('0 nodes', () => {
      expect(cloneGraph(null)).toBeNull();
    });

    it('returns a copy not the original', () => {
      const node1 = new Node(1);

      expect(cloneGraph(node1)).not.toBe(node1);
    });

    it('1 node', () => {
      const node1 = new Node(1);

      expect(cloneGraph(node1)).toStrictEqual(node1);
    });

    it('2 nodes', () => {
      const node1 = new Node(1);
      const node2 = new Node(2);

      node1.neighbors = [node2];
      node2.neighbors = [node1];

      expect(cloneGraph(node1)).toStrictEqual(node1);
    });

    it('3 nodes', () => {
      const node1 = new Node(1);
      const node2 = new Node(2);
      const node3 = new Node(3);

      node1.neighbors = [node2, node3];
      node2.neighbors = [node1, node3];
      node3.neighbors = [node1, node2];

      expect(cloneGraph(node1)).toStrictEqual(node1);
    });

    it('not circular', () => {
      const node1 = new Node(1);
      const node2 = new Node(2);
      const node3 = new Node(3);

      node1.neighbors = [node2, node3];
      node2.neighbors = [node1];
      node3.neighbors = [node1];

      expect(cloneGraph(node1)).toStrictEqual(node1);
    });

    it('acceptance (4 nodes - square)', () => {
      const node1 = new Node(1);
      const node2 = new Node(2);
      const node3 = new Node(3);
      const node4 = new Node(4);

      node1.neighbors = [node2, node4];
      node2.neighbors = [node1, node3];
      node3.neighbors = [node2, node4];
      node4.neighbors = [node1, node3];

      expect(cloneGraph(node1)).toStrictEqual(node1);
    });
  });

  describe('build adjacency list - DFS stack', () => {
    // runtime complexity:
    // best (e+v): are all shapes/trees equally performant?
    // worst (e+v):
    // average (e+v)
    // normal (e+v)

    // space complexity:
    // best (e+v): stack has max length of edges, cache has max length of all nodes (vertices)
    // worst (e+v):
    // average (e+v)
    // normal (e+v)

    const cloneGraph = (node: Node | null): Node | null => {
      if (!node) {
        return null;
      }

      const clones: Node[] = [];

      const stack = new Stack<Node>();
      stack.add(node);

      while (!stack.isEmpty()) {
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        const current = stack.peek()!;

        clones[current.val] = new Node(current.val, current.neighbors);

        const unseenNeighbor = current.neighbors.find(
          ({ val }) => !clones[val],
        );

        if (unseenNeighbor) {
          stack.add(unseenNeighbor);
        } else {
          stack.remove();
        }
      }

      for (let i = 1; i < clones.length; i++) {
        clones[i].neighbors = clones[i].neighbors.map(({ val }) => clones[val]);
      }

      return clones[1];
    };

    it('0 nodes', () => {
      expect(cloneGraph(null)).toBeNull();
    });

    it('returns a copy not the original', () => {
      const node1 = new Node(1);

      expect(cloneGraph(node1)).not.toBe(node1);
    });

    it('1 node', () => {
      const node1 = new Node(1);

      expect(cloneGraph(node1)).toStrictEqual(node1);
    });

    it('2 nodes', () => {
      const node1 = new Node(1);
      const node2 = new Node(2);

      node1.neighbors = [node2];
      node2.neighbors = [node1];

      expect(cloneGraph(node1)).toStrictEqual(node1);
    });

    it('3 nodes', () => {
      const node1 = new Node(1);
      const node2 = new Node(2);
      const node3 = new Node(3);

      node1.neighbors = [node2, node3];
      node2.neighbors = [node1, node3];
      node3.neighbors = [node1, node2];

      expect(cloneGraph(node1)).toStrictEqual(node1);
    });

    it('not circular', () => {
      const node1 = new Node(1);
      const node2 = new Node(2);
      const node3 = new Node(3);

      node1.neighbors = [node2, node3];
      node2.neighbors = [node1];
      node3.neighbors = [node1];

      expect(cloneGraph(node1)).toStrictEqual(node1);
    });

    it('acceptance (4 nodes - square)', () => {
      const node1 = new Node(1);
      const node2 = new Node(2);
      const node3 = new Node(3);
      const node4 = new Node(4);

      node1.neighbors = [node2, node4];
      node2.neighbors = [node1, node3];
      node3.neighbors = [node2, node4];
      node4.neighbors = [node1, node3];

      expect(cloneGraph(node1)).toStrictEqual(node1);
    });
  });

  describe('build adjacency list - BFS', () => {
    // runtime complexity:
    // best (e+v): are all shapes/trees equally performant?
    // worst (e+v):
    // average (e+v)
    // normal (e+v)

    // space complexity:
    // best (e+v): queue has max width of edges, cache has max length of all nodes (vertices)
    // worst (e+v):
    // average (e+v)
    // normal (e+v)

    const cloneGraph = (node: Node | null): Node | null => {
      if (!node) {
        return null;
      }

      const clones: Node[] = [];

      const queue = new Queue<Node>();
      queue.add(node);

      while (!queue.isEmpty()) {
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        const current = queue.remove()!;

        clones[current.val] = new Node(current.val, current.neighbors);

        current.neighbors
          .filter(({ val }) => !clones[val])
          .forEach((neighbor) => {
            queue.add(neighbor);
          });
      }

      for (let i = 1; i < clones.length; i++) {
        clones[i].neighbors = clones[i].neighbors.map(({ val }) => clones[val]);
      }

      return clones[1];
    };

    it('0 nodes', () => {
      expect(cloneGraph(null)).toBeNull();
    });

    it('returns a copy not the original', () => {
      const node1 = new Node(1);

      expect(cloneGraph(node1)).not.toBe(node1);
    });

    it('1 node', () => {
      const node1 = new Node(1);

      expect(cloneGraph(node1)).toStrictEqual(node1);
    });

    it('2 nodes', () => {
      const node1 = new Node(1);
      const node2 = new Node(2);

      node1.neighbors = [node2];
      node2.neighbors = [node1];

      expect(cloneGraph(node1)).toStrictEqual(node1);
    });

    it('3 nodes', () => {
      const node1 = new Node(1);
      const node2 = new Node(2);
      const node3 = new Node(3);

      node1.neighbors = [node2, node3];
      node2.neighbors = [node1, node3];
      node3.neighbors = [node1, node2];

      expect(cloneGraph(node1)).toStrictEqual(node1);
    });

    it('not circular', () => {
      const node1 = new Node(1);
      const node2 = new Node(2);
      const node3 = new Node(3);

      node1.neighbors = [node2, node3];
      node2.neighbors = [node1];
      node3.neighbors = [node1];

      expect(cloneGraph(node1)).toStrictEqual(node1);
    });

    it('acceptance (4 nodes - square)', () => {
      const node1 = new Node(1);
      const node2 = new Node(2);
      const node3 = new Node(3);
      const node4 = new Node(4);

      node1.neighbors = [node2, node4];
      node2.neighbors = [node1, node3];
      node3.neighbors = [node2, node4];
      node4.neighbors = [node1, node3];

      expect(cloneGraph(node1)).toStrictEqual(node1);
    });
  });
});

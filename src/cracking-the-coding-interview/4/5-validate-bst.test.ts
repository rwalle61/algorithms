// Check if a binary tree is a binary search tree

describe('isBinarySearchTree', () => {
  // Assumptions:
  // duplicates allowed

  // BCR:
  // runtime (number of nodes)
  // space (longest branch height)

  class TreeNode {
    public left?: TreeNode;

    public right?: TreeNode;

    constructor(
      public val: number,
      { left, right }: { left?: TreeNode; right?: TreeNode } = {},
    ) {
      this.left = left;
      this.right = right;
    }
  }

  // Solutions:

  // Not BFS because we need to know the min and max values each node can take, which depend on its ancestors

  // DFS in-order traversal would work if there are no duplicates or if duplicates
  // are allowed on both sides, because then we can just check the order always
  // ascends. But if duplicates are allowed only on one side, then we need to
  // track the direction of the duplicate, which would be tricky

  describe('DFS pre-order traversal', () => {
    // runtime complexity:
    // best (1): if immediately clear it is not a binary search tree
    // worst (n): if is binary search tree
    // average (n): but short-circuits when not a binary search tree

    // space complexity:
    // best (1): if immediately clear it is not a binary search tree
    // worst (longest branch height = log n for a balanced tree)
    // average (longest branch height = log n for a balanced tree)

    const isBinarySearchTree = (
      node: TreeNode | undefined,
      min = -Infinity,
      max = Infinity,
    ): boolean => {
      if (!node) {
        return true;
      }

      const { val, left, right } = node;

      if (val > max || val <= min) {
        return false;
      }
      return (
        isBinarySearchTree(left, min, val) &&
        isBinarySearchTree(right, val, max)
      );
    };

    it('depth 0', () => {
      expect(isBinarySearchTree(undefined)).toBeTrue();
    });

    it('depth 1', () => {
      expect(isBinarySearchTree(new TreeNode(3))).toBeTrue();
    });

    it('depth 2: left', () => {
      expect(
        isBinarySearchTree(new TreeNode(3, { left: new TreeNode(2) })),
      ).toBeTrue();
      expect(
        isBinarySearchTree(new TreeNode(3, { left: new TreeNode(3) })),
      ).toBeTrue();
      expect(
        isBinarySearchTree(new TreeNode(3, { left: new TreeNode(4) })),
      ).toBeFalse();
    });

    it('depth 2: right', () => {
      expect(
        isBinarySearchTree(new TreeNode(3, { right: new TreeNode(4) })),
      ).toBeTrue();
      expect(
        isBinarySearchTree(new TreeNode(3, { right: new TreeNode(3) })),
      ).toBeFalse();
    });

    it('depth 2: left + right', () => {
      expect(
        isBinarySearchTree(
          new TreeNode(3, { left: new TreeNode(3), right: new TreeNode(4) }),
        ),
      ).toBeTrue();

      expect(
        isBinarySearchTree(
          new TreeNode(3, { left: new TreeNode(3), right: new TreeNode(3) }),
        ),
      ).toBeFalse();
    });

    it('depth 3: left -> right', () => {
      expect(
        isBinarySearchTree(
          new TreeNode(3, {
            left: new TreeNode(1, { right: new TreeNode(2) }),
          }),
        ),
      ).toBeTrue();
      expect(
        isBinarySearchTree(
          new TreeNode(3, {
            left: new TreeNode(1, { right: new TreeNode(4) }),
          }),
        ),
      ).toBeFalse();
    });

    it('depth 3: right -> left', () => {
      expect(
        isBinarySearchTree(
          new TreeNode(3, {
            right: new TreeNode(5, { left: new TreeNode(4) }),
          }),
        ),
      ).toBeTrue();
      expect(
        isBinarySearchTree(
          new TreeNode(3, {
            right: new TreeNode(5, { left: new TreeNode(3) }),
          }),
        ),
      ).toBeFalse();
    });

    it('depth 4: left -> right -> right', () => {
      expect(
        isBinarySearchTree(
          new TreeNode(3, {
            left: new TreeNode(1, {
              right: new TreeNode(2, { right: new TreeNode(3) }),
            }),
          }),
        ),
      ).toBeTrue();
      expect(
        isBinarySearchTree(
          new TreeNode(3, {
            left: new TreeNode(1, {
              right: new TreeNode(2, { right: new TreeNode(4) }),
            }),
          }),
        ),
      ).toBeFalse();
    });

    it('depth 4: right -> left -> left', () => {
      expect(
        isBinarySearchTree(
          new TreeNode(3, {
            right: new TreeNode(6, {
              left: new TreeNode(5, { left: new TreeNode(4) }),
            }),
          }),
        ),
      ).toBeTrue();
      expect(
        isBinarySearchTree(
          new TreeNode(3, {
            right: new TreeNode(6, {
              left: new TreeNode(5, { left: new TreeNode(3) }),
            }),
          }),
        ),
      ).toBeFalse();
    });

    it('edge: negative numbers', () => {
      expect(isBinarySearchTree(new TreeNode(0))).toBeTrue();
      expect(isBinarySearchTree(new TreeNode(-1))).toBeTrue();

      expect(
        isBinarySearchTree(new TreeNode(0, { left: new TreeNode(-1) })),
      ).toBeTrue();
      expect(
        isBinarySearchTree(new TreeNode(0, { left: new TreeNode(0) })),
      ).toBeTrue();
      expect(
        isBinarySearchTree(new TreeNode(0, { left: new TreeNode(1) })),
      ).toBeFalse();

      expect(
        isBinarySearchTree(new TreeNode(0, { right: new TreeNode(1) })),
      ).toBeTrue();
      expect(
        isBinarySearchTree(new TreeNode(0, { right: new TreeNode(0) })),
      ).toBeFalse();
      expect(
        isBinarySearchTree(new TreeNode(0, { right: new TreeNode(-1) })),
      ).toBeFalse();
    });

    it('acceptance', () => {
      expect(
        isBinarySearchTree(
          new TreeNode(8, {
            left: new TreeNode(4, {
              left: new TreeNode(2),
              right: new TreeNode(6),
            }),
            right: new TreeNode(10, {
              right: new TreeNode(20),
            }),
          }),
        ),
      ).toBeTrue();

      expect(
        isBinarySearchTree(
          new TreeNode(8, {
            left: new TreeNode(4, {
              left: new TreeNode(2),
              right: new TreeNode(12),
            }),
            right: new TreeNode(10, {
              right: new TreeNode(20),
            }),
          }),
        ),
      ).toBeFalse();
    });
  });
});

import { Queue } from './Queue';
import { Stack } from './Stack';

describe('numberOfIslands', () => {
  // Assumptions:
  // m == grid.length
  // n == grid[i].length
  // 1 <= m, n <= 300
  // grid[i][j] is '0' or '1'.

  // Best Computational Runtime:
  // runtime (mn): cache each cell so no need to re-check
  // space (1) reuse input grid

  // Solutions:

  // DFS (recursive) with cache
  // runtime (mn): check every cell
  // space (mn): re-use input grid to cache seen cells, but recursive call stack could include whole island

  // DFS (stack) with cache
  // runtime (mn): check every cell
  // space (mn): re-use input grid to cache seen cells, but DFS stack could include whole island

  // BFS with cache
  // runtime (mn): check every cell
  // space (m+n): re-use input grid to cache seen cells, but BFS queue could include a kite of similar length to the grid perimeter

  const WATER = '0';
  const LAND = '1';
  const seen = 'S';

  type Cell = typeof WATER | typeof LAND | typeof seen;

  type Grid = readonly Cell[][];

  type Coordinates = readonly [number, number];

  describe('DFS (recursive) with cache', () => {
    // runtime complexity:
    // best (mn): no islands
    // worst (mn): all one big island
    // average (mn)
    // normal (mn)

    // space complexity:
    // best (1): no islands
    // worst (mn): recursive call stack when all one big island
    // average (mn)
    // normal (mn)

    const seeConnectedLand = ([x, y]: Coordinates, grid: Grid): 0 | 1 => {
      const isUnseenLand = grid[y]?.[x] === LAND;
      if (!isUnseenLand) {
        return 0;
      }

      // eslint-disable-next-line no-param-reassign
      grid[y][x] = seen;

      const left = [x - 1, y] as const;
      const right = [x + 1, y] as const;
      const up = [x, y - 1] as const;
      const down = [x, y + 1] as const;

      const neighbours = [left, right, up, down];

      neighbours.forEach((neighbour) => {
        seeConnectedLand(neighbour, grid);
      });

      return 1;
    };

    const numberOfIslands = (grid: Grid): number => {
      let count = 0;

      for (let j = 0; j < grid.length; j++) {
        for (let i = 0; i < grid[0].length; i++) {
          count += seeConnectedLand([i, j], grid);
        }
      }

      return count;
    };

    it('edge: empty grid', () => {
      expect(numberOfIslands([])).toBe(0);
    });

    it('edge: only 1 row', () => {
      expect(numberOfIslands([['1']])).toBe(1);
      expect(numberOfIslands([['0']])).toBe(0);
    });

    it('no islands', () => {
      expect(
        numberOfIslands([
          ['0', '0'],
          ['0', '0'],
        ]),
      ).toBe(0);
    });

    it('acceptance', () => {
      expect(
        numberOfIslands([
          ['1', '1', '1', '1', '0'],
          ['1', '1', '0', '1', '0'],
          ['1', '1', '0', '0', '0'],
          ['0', '0', '0', '0', '0'],
        ]),
      ).toBe(1);
      expect(
        numberOfIslands([
          ['1', '1', '0', '0', '0'],
          ['1', '1', '0', '0', '0'],
          ['0', '0', '1', '0', '0'],
          ['0', '0', '0', '1', '1'],
        ]),
      ).toBe(3);
    });
  });

  describe('DFS (stack) with cache', () => {
    // runtime complexity:
    // best (mn): no islands
    // worst (mn): all one big island
    // average (mn)
    // normal (mn)

    // space complexity:
    // best (1): no islands
    // worst (mn): search stack when all one big island
    // average (mn)
    // normal (mn)

    const isUnseenLand = ([x, y]: Coordinates, grid: Grid) =>
      grid[y]?.[x] === LAND;

    const markIslandSeen = (searchStack: Stack<Coordinates>, grid: Grid) => {
      while (!searchStack.isEmpty()) {
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        const [x, y] = searchStack.peek()!;

        // eslint-disable-next-line no-param-reassign
        grid[y][x] = seen;

        const left = [x - 1, y] as const;
        const right = [x + 1, y] as const;
        const up = [x, y - 1] as const;
        const down = [x, y + 1] as const;

        const neighbours = [left, right, up, down];

        const unseenNeighbour = neighbours.find((neighbour) =>
          isUnseenLand(neighbour, grid),
        );

        if (unseenNeighbour) {
          searchStack.add(unseenNeighbour);
        } else {
          searchStack.remove();
        }
      }
    };

    const numberOfIslands = (grid: Grid): number => {
      let count = 0;

      for (let j = 0; j < grid.length; j++) {
        for (let i = 0; i < grid[0].length; i++) {
          const coordinates = [i, j] as const;
          if (isUnseenLand(coordinates, grid)) {
            count++;
            const searchStack = new Stack<Coordinates>();
            searchStack.add(coordinates);
            markIslandSeen(searchStack, grid);
          }
        }
      }

      return count;
    };

    it('edge: empty grid', () => {
      expect(numberOfIslands([])).toBe(0);
    });

    it('edge: only 1 row', () => {
      expect(numberOfIslands([['1']])).toBe(1);
      expect(numberOfIslands([['0']])).toBe(0);
    });

    it('no islands', () => {
      expect(
        numberOfIslands([
          ['0', '0'],
          ['0', '0'],
        ]),
      ).toBe(0);
    });

    it('acceptance', () => {
      expect(
        numberOfIslands([
          ['1', '1', '1', '1', '0'],
          ['1', '1', '0', '1', '0'],
          ['1', '1', '0', '0', '0'],
          ['0', '0', '0', '0', '0'],
        ]),
      ).toBe(1);
      expect(
        numberOfIslands([
          ['1', '1', '0', '0', '0'],
          ['1', '1', '0', '0', '0'],
          ['0', '0', '1', '0', '0'],
          ['0', '0', '0', '1', '1'],
        ]),
      ).toBe(3);
    });
  });

  describe('BFS with cache', () => {
    // runtime complexity:
    // best (mn): no islands
    // worst (mn): all one big island
    // average (mn)
    // normal (mn)

    // space complexity:
    // best (1): no islands
    // worst (m+n): when all one big island, queue could include a kite of similar length to the grid perimeter
    // average (m+n)
    // normal (m+n)

    const isUnseenLand = ([x, y]: Coordinates, grid: Grid) =>
      grid[y]?.[x] === LAND;

    const markIslandSeen = (searchQueue: Queue<Coordinates>, grid: Grid) => {
      while (!searchQueue.isEmpty()) {
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        const [x, y] = searchQueue.remove()!;

        // eslint-disable-next-line no-param-reassign
        grid[y][x] = seen;

        const left = [x - 1, y] as const;
        const right = [x + 1, y] as const;
        const up = [x, y - 1] as const;
        const down = [x, y + 1] as const;

        const neighbours = [left, right, up, down];

        neighbours
          .filter((neighbour) => isUnseenLand(neighbour, grid))
          .forEach((neighbour) => {
            const [neighbourX, neighbourY] = neighbour;
            // eslint-disable-next-line no-param-reassign
            grid[neighbourY][neighbourX] = seen; // so we don't re-check it later
            searchQueue.add(neighbour);
          });
      }
    };

    const numberOfIslands = (grid: Grid): number => {
      let count = 0;

      for (let j = 0; j < grid.length; j++) {
        for (let i = 0; i < grid[0].length; i++) {
          const coordinates = [i, j] as const;
          if (isUnseenLand(coordinates, grid)) {
            count++;
            const searchQueue = new Queue<Coordinates>();
            searchQueue.add(coordinates);
            markIslandSeen(searchQueue, grid);
          }
        }
      }

      return count;
    };

    it('edge: empty grid', () => {
      expect(numberOfIslands([])).toBe(0);
    });

    it('edge: only 1 row', () => {
      expect(numberOfIslands([['1']])).toBe(1);
      expect(numberOfIslands([['0']])).toBe(0);
    });

    it('no islands', () => {
      expect(
        numberOfIslands([
          ['0', '0'],
          ['0', '0'],
        ]),
      ).toBe(0);
    });

    it('acceptance', () => {
      expect(
        numberOfIslands([
          ['1', '1', '1', '1', '0'],
          ['1', '1', '0', '1', '0'],
          ['1', '1', '0', '0', '0'],
          ['0', '0', '0', '0', '0'],
        ]),
      ).toBe(1);
      expect(
        numberOfIslands([
          ['1', '1', '0', '0', '0'],
          ['1', '1', '0', '0', '0'],
          ['0', '0', '1', '0', '0'],
          ['0', '0', '0', '1', '1'],
        ]),
      ).toBe(3);
    });
  });
});

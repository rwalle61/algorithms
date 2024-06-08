import { Queue } from './Queue';
import { Stack } from './Stack';

describe('cellsToPacificAtlantic', () => {
  // Assumptions:
  // m == heights.length
  // n == heights[r].length
  // 1 <= m, n <= 200
  // 0 <= heights[r][c] <= 105

  // Best Computational Runtime:
  // runtime (mn): cache each cell so no need to re-check
  // space (mn)

  // Solutions:

  // DFS with cache
  // runtime (mn): outside-in
  // space (mn)

  // BFS with cache
  // runtime (mn): outside-in
  // space (mn)

  type HeightGrid = readonly number[][];

  type CellsToOcean = boolean[][];

  type Coordinates = readonly [number, number];

  describe('DFS (recursive) with cache', () => {
    // runtime complexity:
    // best (2m + 2n): only edges reach oceans
    // worst (2mn): every cell reaches both oceans
    // average (mn): depends
    // normal (mn)

    // space complexity:
    // best (mn): cache every cell
    // worst (mn)
    // average (mn)
    // normal (mn)

    const canReachOcean = (
      x: number,
      y: number,
      heights: HeightGrid,
      cellsToOcean: CellsToOcean,
    ) => {
      if (cellsToOcean[y][x]) {
        return;
      }

      // eslint-disable-next-line no-param-reassign
      cellsToOcean[y][x] = true;

      const height = heights[y][x];

      const canFlowFromLeft = heights[y][x - 1] >= height;
      const canFlowFromRight = heights[y][x + 1] >= height;
      const canFlowFromUp = heights[y - 1]?.[x] >= height;
      const canFlowFromDown = heights[y + 1]?.[x] >= height;

      if (canFlowFromLeft) {
        canReachOcean(x - 1, y, heights, cellsToOcean);
      }
      if (canFlowFromRight) {
        canReachOcean(x + 1, y, heights, cellsToOcean);
      }
      if (canFlowFromUp) {
        canReachOcean(x, y - 1, heights, cellsToOcean);
      }
      if (canFlowFromDown) {
        canReachOcean(x, y + 1, heights, cellsToOcean);
      }
    };

    const cellsToPacificAtlantic = (heights: HeightGrid): Coordinates[] => {
      const cellsToPacific: CellsToOcean = new Array(heights.length)
        .fill(null)
        .map(() => new Array<boolean>(heights[0].length).fill(false));

      const cellsToAtlantic: CellsToOcean = new Array(heights.length)
        .fill(null)
        .map(() => new Array<boolean>(heights[0].length).fill(false));

      const lastColumn = (heights[0] || []).length - 1;
      const lastRow = heights.length - 1;

      for (let j = 0; j <= lastRow; j++) {
        canReachOcean(0, j, heights, cellsToPacific);
        canReachOcean(lastColumn, j, heights, cellsToAtlantic);
      }
      for (let i = 0; i <= lastColumn; i++) {
        canReachOcean(i, 0, heights, cellsToPacific);
        canReachOcean(i, lastRow, heights, cellsToAtlantic);
      }

      const result: Coordinates[] = [];

      for (let j = 0; j < heights.length; j++) {
        for (let i = 0; i < heights[0].length; i++) {
          if (cellsToPacific[j][i] && cellsToAtlantic[j][i]) {
            // "result[i] = [row i, column i]"
            result.push([j, i]);
          }
        }
      }

      return result;
    };

    it('edge: no island', () => {
      expect(cellsToPacificAtlantic([])).toIncludeSameMembers([]);
    });

    it('can all reach both oceans (assymetrical island)', () => {
      expect(cellsToPacificAtlantic([[1, 1]])).toIncludeSameMembers([
        [0, 0],
        [0, 1],
      ]);
      expect(cellsToPacificAtlantic([[1], [1]])).toIncludeSameMembers([
        [0, 0],
        [1, 0],
      ]);
    });

    it('can all reach both oceans (symmetrical island)', () => {
      expect(cellsToPacificAtlantic([[1]])).toIncludeSameMembers([[0, 0]]);
      expect(
        cellsToPacificAtlantic([
          [1, 1],
          [1, 1],
        ]),
      ).toIncludeSameMembers([
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
      ]);
      expect(
        cellsToPacificAtlantic([
          [2, 1],
          [1, 2],
        ]),
      ).toIncludeSameMembers([
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
      ]);
      expect(
        cellsToPacificAtlantic([
          [1, 1, 1],
          [1, 1, 1],
          [1, 1, 1],
        ]),
      ).toIncludeSameMembers([
        [0, 0],
        [1, 0],
        [2, 0],
        [0, 1],
        [1, 1],
        [2, 1],
        [0, 2],
        [1, 2],
        [2, 2],
      ]);
    });

    it('cant all reach both oceans', () => {
      expect(
        cellsToPacificAtlantic([
          [1, 9],
          [9, 1],
        ]),
      ).toIncludeSameMembers([
        [0, 1],
        [1, 0],
      ]);
      expect(
        cellsToPacificAtlantic([
          [9, 9, 9],
          [9, 1, 9],
          [9, 9, 9],
        ]),
      ).toIncludeSameMembers([
        [0, 0],
        [1, 0],
        [2, 0],
        [0, 1],
        // no [1, 1]
        [2, 1],
        [0, 2],
        [1, 2],
        [2, 2],
      ]);
    });

    it('acceptance', () => {
      expect(
        cellsToPacificAtlantic([
          [1, 2, 2, 3, 5],
          [3, 2, 3, 4, 4],
          [2, 4, 5, 3, 1],
          [6, 7, 1, 4, 5],
          [5, 1, 1, 2, 4],
        ]),
      ).toIncludeSameMembers([
        [0, 4],
        [1, 3],
        [1, 4],
        [2, 2],
        [3, 0],
        [3, 1],
        [4, 0],
      ]);
      expect(cellsToPacificAtlantic([[1]])).toIncludeSameMembers([[0, 0]]);
    });
  });

  const findCellsToOcean = (
    heights: HeightGrid,
    searchCollection: Stack<Coordinates> | Queue<Coordinates>,
  ) => {
    const cellsToOcean: CellsToOcean = new Array(heights.length)
      .fill(null)
      .map(() => new Array<boolean>(heights[0].length).fill(false));

    while (!searchCollection.isEmpty()) {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      const [x, y] = searchCollection.remove()!;

      cellsToOcean[y][x] = true;

      const left = [x - 1, y] as const;
      const right = [x + 1, y] as const;
      const up = [x, y - 1] as const;
      const down = [x, y + 1] as const;
      const neighbours = [left, right, up, down];

      const inBounds = ([cellX, cellY]: Coordinates) =>
        heights[cellY]?.[cellX] !== undefined;

      const canFlowToCell = ([neighbourX, neighbourY]: Coordinates) =>
        heights[neighbourY][neighbourX] >= heights[y][x];

      const notSeen = ([cellX, cellY]: Coordinates) =>
        !cellsToOcean[cellY][cellX];

      neighbours
        .filter(inBounds)
        .filter(canFlowToCell)
        .filter(notSeen)
        // TODO even with a queue this isn't strictly DFS, as we check the whole level (like BFS) before checking the next depth
        .forEach(([neighbourX, neighbourY]) => {
          cellsToOcean[neighbourY][neighbourX] = true; // so we don't re-check it later
          searchCollection.add([neighbourX, neighbourY]);
        });
    }

    return cellsToOcean;
  };

  describe('DFS (stack) with cache', () => {
    // runtime complexity:
    // best (2m + 2n): only edges reach oceans
    // worst (2mn): every cell reaches both oceans
    // average (mn): depends
    // normal (mn)

    // space complexity:
    // best (mn): cache every cell
    // worst (mn)
    // average (mn)
    // normal (mn)

    const cellsToPacificAtlantic = (heights: HeightGrid): Coordinates[] => {
      const lastColumn = (heights[0] || []).length - 1;
      const lastRow = heights.length - 1;

      const pacificSearchQueue = new Queue<Coordinates>();
      const atlanticSearchQueue = new Queue<Coordinates>();

      for (let j = 0; j <= lastRow; j++) {
        pacificSearchQueue.add([0, j]);
        atlanticSearchQueue.add([lastColumn, j]);
      }
      for (let i = 0; i <= lastColumn; i++) {
        pacificSearchQueue.add([i, 0]);
        atlanticSearchQueue.add([i, lastRow]);
      }

      const cellsToPacific = findCellsToOcean(heights, pacificSearchQueue);
      const cellsToAtlantic = findCellsToOcean(heights, atlanticSearchQueue);

      const result: Coordinates[] = [];

      for (let j = 0; j < heights.length; j++) {
        for (let i = 0; i < heights[0].length; i++) {
          if (cellsToPacific[j][i] && cellsToAtlantic[j][i]) {
            // "result[i] = [row i, column i]"
            result.push([j, i]);
          }
        }
      }

      return result;
    };

    it('edge: no island', () => {
      expect(cellsToPacificAtlantic([])).toIncludeSameMembers([]);
    });

    it('can all reach both oceans (assymetrical island)', () => {
      expect(cellsToPacificAtlantic([[1, 1]])).toIncludeSameMembers([
        [0, 0],
        [0, 1],
      ]);
      expect(cellsToPacificAtlantic([[1], [1]])).toIncludeSameMembers([
        [0, 0],
        [1, 0],
      ]);
    });

    it('can all reach both oceans (symmetrical island)', () => {
      expect(cellsToPacificAtlantic([[1]])).toIncludeSameMembers([[0, 0]]);
      expect(
        cellsToPacificAtlantic([
          [1, 1],
          [1, 1],
        ]),
      ).toIncludeSameMembers([
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
      ]);
      expect(
        cellsToPacificAtlantic([
          [2, 1],
          [1, 2],
        ]),
      ).toIncludeSameMembers([
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
      ]);
      expect(
        cellsToPacificAtlantic([
          [1, 1, 1],
          [1, 1, 1],
          [1, 1, 1],
        ]),
      ).toIncludeSameMembers([
        [0, 0],
        [1, 0],
        [2, 0],
        [0, 1],
        [1, 1],
        [2, 1],
        [0, 2],
        [1, 2],
        [2, 2],
      ]);
    });

    it('cant all reach both oceans', () => {
      expect(
        cellsToPacificAtlantic([
          [1, 9],
          [9, 1],
        ]),
      ).toIncludeSameMembers([
        [0, 1],
        [1, 0],
      ]);
      expect(
        cellsToPacificAtlantic([
          [9, 9, 9],
          [9, 1, 9],
          [9, 9, 9],
        ]),
      ).toIncludeSameMembers([
        [0, 0],
        [1, 0],
        [2, 0],
        [0, 1],
        // no [1, 1]
        [2, 1],
        [0, 2],
        [1, 2],
        [2, 2],
      ]);
    });

    it('acceptance', () => {
      expect(
        cellsToPacificAtlantic([
          [1, 2, 2, 3, 5],
          [3, 2, 3, 4, 4],
          [2, 4, 5, 3, 1],
          [6, 7, 1, 4, 5],
          [5, 1, 1, 2, 4],
        ]),
      ).toIncludeSameMembers([
        [0, 4],
        [1, 3],
        [1, 4],
        [2, 2],
        [3, 0],
        [3, 1],
        [4, 0],
      ]);
      expect(cellsToPacificAtlantic([[1]])).toIncludeSameMembers([[0, 0]]);
    });
  });

  describe('BFS with cache', () => {
    // runtime complexity:
    // best (2m + 2n): only edges reach oceans
    // worst (2mn): every cell reaches both oceans
    // average (mn): depends
    // normal (mn)

    // space complexity:
    // best (mn): cache every cell
    // worst (mn)
    // average (mn)
    // normal (mn)

    const cellsToPacificAtlantic = (heights: HeightGrid): Coordinates[] => {
      const lastColumn = (heights[0] || []).length - 1;
      const lastRow = heights.length - 1;

      const pacificSearchStack = new Stack<Coordinates>();
      const atlanticSearchStack = new Stack<Coordinates>();

      for (let j = 0; j <= lastRow; j++) {
        pacificSearchStack.add([0, j]);
        atlanticSearchStack.add([lastColumn, j]);
      }
      for (let i = 0; i <= lastColumn; i++) {
        pacificSearchStack.add([i, 0]);
        atlanticSearchStack.add([i, lastRow]);
      }

      const cellsToPacific = findCellsToOcean(heights, pacificSearchStack);
      const cellsToAtlantic = findCellsToOcean(heights, atlanticSearchStack);

      const result: Coordinates[] = [];

      for (let j = 0; j < heights.length; j++) {
        for (let i = 0; i < heights[0].length; i++) {
          if (cellsToPacific[j][i] && cellsToAtlantic[j][i]) {
            // "result[i] = [row i, column i]"
            result.push([j, i]);
          }
        }
      }

      return result;
    };

    it('edge: no island', () => {
      expect(cellsToPacificAtlantic([])).toIncludeSameMembers([]);
    });

    it('can all reach both oceans (assymetrical island)', () => {
      expect(cellsToPacificAtlantic([[1, 1]])).toIncludeSameMembers([
        [0, 0],
        [0, 1],
      ]);
      expect(cellsToPacificAtlantic([[1], [1]])).toIncludeSameMembers([
        [0, 0],
        [1, 0],
      ]);
    });

    it('can all reach both oceans (symmetrical island)', () => {
      expect(cellsToPacificAtlantic([[1]])).toIncludeSameMembers([[0, 0]]);
      expect(
        cellsToPacificAtlantic([
          [1, 1],
          [1, 1],
        ]),
      ).toIncludeSameMembers([
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
      ]);
      expect(
        cellsToPacificAtlantic([
          [2, 1],
          [1, 2],
        ]),
      ).toIncludeSameMembers([
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
      ]);
      expect(
        cellsToPacificAtlantic([
          [1, 1, 1],
          [1, 1, 1],
          [1, 1, 1],
        ]),
      ).toIncludeSameMembers([
        [0, 0],
        [1, 0],
        [2, 0],
        [0, 1],
        [1, 1],
        [2, 1],
        [0, 2],
        [1, 2],
        [2, 2],
      ]);
    });

    it('cant all reach both oceans', () => {
      expect(
        cellsToPacificAtlantic([
          [9, 9, 9],
          [9, 1, 9],
          [9, 9, 9],
        ]),
      ).toIncludeSameMembers([
        [0, 0],
        [1, 0],
        [2, 0],
        [0, 1],
        // no [1, 1]
        [2, 1],
        [0, 2],
        [1, 2],
        [2, 2],
      ]);
      expect(
        cellsToPacificAtlantic([
          [1, 9],
          [9, 1],
        ]),
      ).toIncludeSameMembers([
        [0, 1],
        [1, 0],
      ]);
    });

    it('acceptance', () => {
      expect(
        cellsToPacificAtlantic([
          [1, 2, 2, 3, 5],
          [3, 2, 3, 4, 4],
          [2, 4, 5, 3, 1],
          [6, 7, 1, 4, 5],
          [5, 1, 1, 2, 4],
        ]),
      ).toIncludeSameMembers([
        [0, 4],
        [1, 3],
        [1, 4],
        [2, 2],
        [3, 0],
        [3, 1],
        [4, 0],
      ]);
      expect(cellsToPacificAtlantic([[1]])).toIncludeSameMembers([[0, 0]]);
    });
  });
});

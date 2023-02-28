import { bigPrerequisites } from './course-schedule-big-prerequisites';
import { Queue } from './Queue';

describe('canFinish', () => {
  // Assumptions:
  // 1 <= numCourses <= 2000
  // 0 <= prerequisites.length <= 5000
  // prerequisites[i].length == 2
  // 0 <= ai, bi < numCourses
  // All the pairs prerequisites[i] are unique.

  // Best Computational Runtime:
  // runtime (edges + vertices):
  // space (vertices?):

  // Solutions:

  // DFS with cache
  // runtime (edges + vertices): only visit each node once
  // space (edges + vertices): stack has max height (length of longest edge chain), cache has max length of all nodes (vertices)

  // BFS with cache
  // runtime (edges + vertices): only visit each node once
  // space (vertices): queue has max width of edges, cache has max length of all nodes (vertices)

  describe('DFS with cache', () => {
    // runtime complexity:
    // best (max(numCourses / prerequisites)):
    // worst (max(numCourses / prerequisites)):
    // average (max(numCourses / prerequisites))
    // normal (max(numCourses / prerequisites))

    // space complexity:
    // best (min(numCourses / prerequisites)):
    // worst (min(numCourses / prerequisites)):
    // average (min(numCourses / prerequisites))
    // normal (min(numCourses / prerequisites))

    const Seen = 'Seen';

    type AdjacencyList = Map<number, number[] | typeof Seen>;

    const isCircular = (
      course: number,
      adjacencyList: AdjacencyList,
    ): boolean => {
      const prerequisites = adjacencyList.get(course);

      if (prerequisites === Seen) {
        return true;
      }

      adjacencyList.set(course, Seen);

      // R: (total) min(numCourses / prerequisites)
      // M: (total) min(numCourses / prerequisites)
      const circular =
        Array.isArray(prerequisites) &&
        prerequisites.some((prerequisite) =>
          isCircular(prerequisite, adjacencyList),
        );

      if (!circular) {
        adjacencyList.set(course, []);
      }

      return circular;
    };

    const canFinish = (
      _numCourses: number,
      prerequisites: [number, number][],
    ): boolean => {
      const adjacencyList = new Map<number, number[]>();

      // R: prerequisites
      // M: min(numCourses / prerequisites)
      prerequisites.forEach(([course, prerequisite]) => {
        const coursePrerequisites = adjacencyList.get(course) || [];
        coursePrerequisites.push(prerequisite);
        adjacencyList.set(course, coursePrerequisites);
      });

      // R: min(numCourses / prerequisites)
      for (const [course] of adjacencyList) {
        if (
          // + R: (total) min(numCourses / prerequisites)
          // + M: (total) min(numCourses / prerequisites)
          isCircular(course, adjacencyList)
        ) {
          return false;
        }
      }

      return true;
    };

    it('no courses => T', () => {
      expect(canFinish(0, [])).toBe(true);
    });

    it('no prerequisites => T', () => {
      expect(canFinish(1, [])).toBe(true);
    });

    // no need to check duplicates prerequisites since "All the pairs prerequisites[i] are unique."

    it('multiple prerequisites => T', () => {
      expect(
        canFinish(7, [
          [1, 4],
          [2, 4],
          [3, 1],
          [3, 2],
        ]),
      ).toBe(true);
    });

    it('multiple prerequisites => F', () => {
      expect(
        canFinish(4, [
          [2, 0],
          [1, 0],
          [3, 1],
          [3, 2],
          [1, 3],
        ]),
      ).toBe(false);
    });

    it('loop of length 1 => F', () => {
      expect(canFinish(1, [[0, 0]])).toBe(false);
    });

    it('big => T', () => {
      expect(canFinish(2000, bigPrerequisites)).toBe(true);
    });

    it('acceptance', () => {
      expect(canFinish(2, [[1, 0]])).toBe(true);

      expect(
        canFinish(2, [
          [1, 0],
          [0, 1],
        ]),
      ).toBe(false);
    });
  });

  describe('BFS with cache', () => {
    // runtime complexity:
    // best (max(numCourses / prerequisites)):
    // worst (max(numCourses / prerequisites)):
    // average (max(numCourses / prerequisites))
    // normal (max(numCourses / prerequisites))

    // space complexity:
    // best (min(numCourses / prerequisites)):
    // worst (min(numCourses / prerequisites)):
    // average (min(numCourses / prerequisites))
    // normal (min(numCourses / prerequisites))

    type AdjacencyList = Map<number, number[]>;

    const isCircular = (
      startCourse: number,
      adjacencyList: AdjacencyList,
    ): boolean => {
      const queue = new Queue<number>();

      queue.add(startCourse);

      const path = new Set<number>();

      while (!queue.isEmpty()) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const course = queue.remove()!;

        const prerequisites = adjacencyList.get(course);

        if (path.has(course)) {
          return true;
        }

        path.add(course);

        if (prerequisites) {
          prerequisites.forEach((prerequisite) => queue.add(prerequisite));
        }
      }

      path.add(startCourse);
      path.forEach((course) => {
        adjacencyList.set(course, []);
      });

      return false;
    };

    const canFinish = (
      _numCourses: number,
      prerequisites: [number, number][],
    ): boolean => {
      const adjacencyList = new Map<number, number[]>();

      // R: prerequisites
      // M: min(numCourses / prerequisites)
      prerequisites.forEach(([course, prerequisite]) => {
        const coursePrerequisites = adjacencyList.get(course) || [];
        coursePrerequisites.push(prerequisite);
        adjacencyList.set(course, coursePrerequisites);
      });

      for (const [course] of adjacencyList) {
        if (isCircular(course, adjacencyList)) {
          return false;
        }
      }

      return true;
    };

    it('no courses => T', () => {
      expect(canFinish(0, [])).toBe(true);
    });

    it('no prerequisites => T', () => {
      expect(canFinish(1, [])).toBe(true);
    });

    // no need to check duplicates prerequisites since "All the pairs prerequisites[i] are unique."

    it('multiple prerequisites => T', () => {
      expect(
        canFinish(7, [
          [1, 4],
          [2, 4],
          [3, 1],
          [3, 2],
        ]),
      ).toBe(true);
    });

    it('multiple prerequisites => F', () => {
      expect(
        canFinish(4, [
          [2, 0],
          [1, 0],
          [3, 1],
          [3, 2],
          [1, 3],
        ]),
      ).toBe(false);
    });

    it('loop of length 1 => F', () => {
      expect(canFinish(1, [[0, 0]])).toBe(false);
    });

    it('big => T', () => {
      expect(canFinish(2000, bigPrerequisites)).toBe(true);
    });

    it('acceptance', () => {
      expect(canFinish(2, [[1, 0]])).toBe(true);

      expect(
        canFinish(2, [
          [1, 0],
          [0, 1],
        ]),
      ).toBe(false);
    });
  });
});

export class Queue<T> {
  #queue: T[] = [];

  add(item: T): void {
    this.#queue.push(item);
  }

  remove(): T | undefined {
    return this.#queue.shift();
  }

  isEmpty(): boolean {
    return this.#queue.length === 0;
  }
}

export class Queue<T> {
  #queue: T[] = [];

  add(item: T) {
    return this.#queue.push(item);
  }

  remove() {
    return this.#queue.shift();
  }

  isEmpty() {
    return this.#queue.length === 0;
  }
}

export class Stack<T> {
  #stack: T[] = [];

  add(item: T) {
    return this.#stack.push(item);
  }

  remove() {
    return this.#stack.pop();
  }

  isEmpty() {
    return this.#stack.length === 0;
  }
}

export class Stack<T> {
  #stack: T[] = [];

  add(item: T): void {
    this.#stack.push(item);
  }

  remove(): T | undefined {
    return this.#stack.pop();
  }

  isEmpty(): boolean {
    return this.#stack.length === 0;
  }

  peek(): T | undefined {
    return this.#stack[this.#stack.length - 1];
  }
}

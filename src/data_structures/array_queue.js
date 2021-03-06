class ArrayQueue {
  constructor() {
    this.storage = [];
    this.head = 0;
    this.tail = 0;

    // Number of cancelled elements between head and tail
    this.cancelCount = 0;
  }

  enqueue(element) {
    const ticket = this.tail;
    this.storage[this.tail] = element;
    this.tail += 1;
    return ticket;
  }

  cancel(ticket) {
    if (this.storage[ticket] !== undefined) {
      this.storage[ticket] = undefined;
      this.cancelCount += 1;
    }
  }

  dequeue() {
    // skip cancelled elements at the front of the queue
    while (this.head < this.tail &&
        this.storage[this.head] === undefined) {
      this.head += 1;
      this.cancelCount -= 1;
    }

    if (this.head === this.tail) {
      return undefined;
    }

    const element = this.storage[this.head];
    this.storage[this.head] = undefined;
    this.head += 1;
    return element;
  }

  count() {
    return this.tail - this.head - this.cancelCount;
  }

  forEach(callback) {
    let skipCount = 0;
    for (let i = this.head; i < this.tail; i += 1) {
      if (this.storage[i] === undefined) {
        skipCount += 1;
        continue;
      }
      const index = i - this.head - skipCount;
      callback(this.storage[i], index, this);
    }
  }
}

export default ArrayQueue;
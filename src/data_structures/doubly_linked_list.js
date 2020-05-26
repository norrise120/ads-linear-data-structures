class DLLNode {
  constructor({ element = undefined, next = this, prev = this, isSentinel = false }) {
    this.element = element;
    this.next = next;
    this.prev = prev;
    this._active = !isSentinel;
  }

  remove() {
    if (this._active) {
      this.prev.next = this.next;
      this.next.prev = this.prev;
      this._active = false;
      return this.element;
    }
  }
}

class DoublyLinkedList {
  constructor(Node = DLLNode) {
    this.Node = Node;
    this._sentinel = new this.Node({ isSentinel: true });
  }

  _head() {
    return this._sentinel.next;
  }

  _tail() {
    return this._sentinel.prev;
  }

  insertHead(element) {
    const newNode = new this.Node({element, next: this._head(), prev: this._sentinel});
    this._head().prev = newNode;
    this._sentinel.next = newNode;
    return newNode
  }

  insertTail(element) {
    const newNode = new this.Node({element, next: this._sentinel, prev: this._tail()});
    this._tail().next = newNode;
    this._sentinel.prev = newNode;
    return newNode;
  }

  removeHead() {
    // this._head() returns the head node, .remove() is the DLLNode method
    return this._head().remove();
  }

  removeTail() {
    return this._tail().remove();
  }

  remove(node) {
    if (node.remove) {
      return node.remove();
    }
  }

  forEach(callback, queue = this) {
    let currentNode = this._head();
    let i = 0;
    while (currentNode !== this._sentinel) {
      callback(currentNode.element, i, queue);
      currentNode = currentNode.next;
      i += 1;
    }
  }

  count() {
    let count = 0;
    this.forEach(() => count += 1);
    return count;
  }
}

export default DoublyLinkedList;
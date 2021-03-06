const Node = require('./Node');

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  getHead() {
    return this.head;
  }
  getTail() {
    return this.tail;
  }
  getSize() {
    return this.size;
  }
  /**
   * @param {*} value
   * @param {number} index
   */
  add(value, index = this.size) {
    if (index > this.size || index < 0) {
      return console.log('Invalid index');
    }
    const node = new Node(value);
    if (index === 0) {
      node.next = this.head;
      this.head = node;
      this.tail = node;
    } else if (index === this.size) {
      if (this.head === null) {
        this.head = node;
      } else {
        let currentNode = this.head;
        while (currentNode.next) {
          currentNode = currentNode.next;
        }

        // set the list's tail and node's prev
        currentNode.next = node;
        node.prev = currentNode;
        this.tail = node;
      }
    }
    // else insert between
    else {
      let currentNode = this.head;
      let previousNode = null;
      let i = 0;
      while (i < index) {
        previousNode = currentNode;
        currentNode = currentNode.next;
        i++;
      }
      // arrived at the index, time to insert
      node.next = currentNode;
      node.prev = previousNode;
      currentNode.prev = node;
      previousNode.next = node;
    }
    this.size++;
  }
  /**
   *
   * @param {number} value
   * @returns {(number|null)} value of the removed node
   */
  removeByValue(value) {
    let currentNode = this.head;
    let previousNode = null;

    while (currentNode) {
      // if matching value has been found
      if (currentNode.value === value) {
        // case where it's a head node
        if (previousNode === null) {
          this.head = currentNode.next;
          currentNode.prev = null;
          // case if it's in the middle of a list
        } else {
          previousNode.next = currentNode.next;
          currentNode.next.prev = previousNode;
        }
        this.size--;
        return currentNode.value;
      }
      // traverse
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    console.log('No node matches the given value');
    return null;
  }
  /**
   * @param {number} value
   * @returns {number} index of a value in the list 
   */
  indexOf(value) {
    let i = 0;
    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.value === value) {
        return i;
      }
      currentNode = currentNode.next;
      i++;
    }
    console.log('No node matches the given value');
    return -1;
  }
  /**
   * @param {function} callback 
   */
  forEach(callback) {
    if (this.isEmpty()) {
      return console.log('The list is empty');
    }
    if (typeof callback !== 'function') {
      return console.log("Passed argument isn't a function");
    }
    let currentNode = this.head;

    // note: callback's to work with nodes, not their values
    while (currentNode) {
      // bind and call the callback function
      const bindFn = callback.bind(currentNode);
      bindFn(currentNode);
      currentNode = currentNode.next;
    }
  }
  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
    return this;
  }
  /**
   * @returns {boolean}
   */
  isEmpty() {
    if (this.size === 0) {
      return true;
    }
    return false;
  }
  /**
   * @returns {DoublyLinkedList} returns a close of the list
   */
  clone() {
    let newList = new DoublyLinkedList();
    this.forEach((element) => {
      newList.add(element.value);
    });
    return newList;
  }
  print() {
    let currentNode = this.head;
    let log = 'head -> ';
    if (this.size === 0) {
      log = log + 'null';
      return console.log(log + ' <- tail');
    }
    while (currentNode) {
      log = `${log} [${currentNode.value}]`;
      currentNode = currentNode.next;
    }
    return console.log(log + ' <- tail');
  }
}

module.exports = DoublyLinkedList;

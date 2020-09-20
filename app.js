class Stack {
  constructor() {
    this.data = [];
    this.top = -1;
  }
  push(element) {
    this.data[++this.top] = element;
  }
  pop() {
    if (this.isEmpty()) {
      return console.log('Nothing to pop');
    }
    --this.top;
    return this.data.pop();
  }
  peek() {
    if (this.isEmpty()) {
      return console.log('Empty stack');
    }
    return this.data[this.top];
  }
  isEmpty() {
    // is it an array and does it have any elements
    if (Array.isArray(this.data) && this.data.length) {
      return false;
    }
    return true;
  }
  length() {
    return this.data.length;
  }
  print() {
    let log = 'top -> ';
    for (let i = this.data.length - 1; i >= 0; i--) {
      log = `${log} [${this.data[i]}]`;
    }

    return console.log(log);
  }
}

class Queue {
  constructor() {
    this.data = [];
  }
  enqueue(element) {
    return this.data.push(element);
  }
  dequeue() {
    if (this.isEmpty()) {
      return console.log('Nothing to dequeue');
    }
    return this.data.shift();
  }
  isEmpty() {
    if (this.data.length !== 0) {
      return false;
    }
    return true;
  }
  print() {
    let log = '';
    this.data.forEach((element) => {
      // process.stdout.write(`${element} `); ~nodejs exclusive
      log = `${log} ${element}`;
    });
    return console.log(log);
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  add(value) {
    const node = new Node(value);
    if (this.head === null) {
      this.head = node;
    } else {
      let tmpNode = this.head;
      // traverse the list
      while (tmpNode.next) {
        tmpNode = tmpNode.next;
      }
      // next points to our new element in the list
      tmpNode.next = node;
    }
    // increment size
    this.size++;
  }
  insertAtIndex(value, index) {
    if (index > this.size || index < 0) {
      return console.log('Invalid index');
    }
    const node = new Node(value);
    if (index === 0) {
      node.next = this.head;
      this.head = node;
    } else {
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
      previousNode.next = node;
    }
    this.size++;
  }
  removeFromIndex(index) {
    if (index > this.size || index < 0) {
      return console.log('Invalid index');
    }
    let i = 0;
    let currentNode = this.head;
    let previousNode = null;

    // detach head if index is 0
    if (index === 0) {
      // isn't really needed, but remove() is expected to return the deleted element -> elementToReturn
      let elementToReturn = this.head.value;
      this.head = this.head.next;
      return elementToReturn;
    }

    // iterate over the list until the index
    while (i < index) {
      if (index === i) {
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      i++;
    }
    // cause of the (i < index), now the current is at the indexed location
    // and previousNode points to it, so now we re-wire to current's next
    previousNode.next = currentNode.next;
    this.size--;
    return currentNode.value;
  }

  // removes first element in the list if their value matches the passed one
  // if the second arg is passed, it will remove that number of matches
  removeByValue(value) {
    let currentNode = this.head;
    let previousNode = null;

    while (currentNode) {
      // if matching value has been found
      if (currentNode.value === value) {
        // case where it's a head node
        if (previousNode === null) {
          this.head = currentNode.next;
          // case if it's in the middle of a list
        } else {
          previousNode.next = currentNode.next;
        }
        this.size--;
        return currentNode.value;
      }
      // traverse
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    return console.log('No node matches the given value');
  }
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
    return console.log('No node matches the given value');
  }
  // size not allowed as a function name D:
  sizeOfList() {
    return this.size;
  }
  isEmpty() {
    if (this.size === 0) {
      return true;
    }
    return false;
  }
  print() {
    let currentNode = this.head;
    let log = 'head -> ';
    if (this.size === 0) {
      log = log + 'null';
      return console.log(log);
    }
    while (currentNode) {
      log = `${log} [${currentNode.value}]`;
      currentNode = currentNode.next;
    }
    return console.log(log);
  }
}

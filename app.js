class Stack {
  constructor() {
    this.data = [];
    this.top = 0;
  }
  push(element) {
    this.data[this.top] = element;
    this.top++;
  }
  pop() {
    if (this.isEmpty()) {
      return console.log('Nothing to pop');
    }
    this.top = this.top - 1;
    return this.data.pop();
  }
  isEmpty() {
    // is it an array and does it have any elements
    if (Array.isArray(this.data) && this.data.length) {
      return false;
    }
    return true;
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

class NodeOneWay {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedListOneWay {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  add(element) {
    const node = new NodeOneWay(element);
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
  removeFromIndex(index) {
    if (index > this.size || index < 0) {
      return console.log('Invalid index');
    }
    let i = 0;
    let currentNode = this.head;
    let previousNode;

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

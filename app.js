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
  // returns index of an element that matches the value
  // not the most elegant solution ._.
  getIndex(value) {
    let i = -1;
    this.data.forEach((element, j) => {
      if (element === value) {
        i = j;
      }
    });
    if (i === -1) {
      return console.log('No elments match the value given');
    }
    return i;
  }
  peek() {
    if (this.isEmpty()) {
      return console.log('Empty stack');
    }
    return this.data[this.top];
  }
  reverse() {
    let reverseArr = [];
    this.data
      .slice()
      .reverse()
      .forEach((element) => {
        reverseArr.push(element);
      });
    this.data = reverseArr;
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
  front() {
    if (this.isEmpty()) {
      return 'Queue has no elements';
    }
    return this.data[0];
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
    this.prev = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  getHead() {
    return this.head;
  }
  getSize() {
    return this.size;
  }
  // adds the node to the end list
  add(value) {
    const node = new Node(value);
    if (this.head === null) {
      this.head = node;
    } else {
      let currentNode = this.head;
      // traverse the list
      while (currentNode.next) {
        currentNode = currentNode.next;
      }
      // next points to our new element in the list
      currentNode.next = node;
    }
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
  // clear the list
  clear() {
    this.head = null;
    this.size = 0;
  }
  // wish it was doubly linked list now T_T
  reverse() {
    let reverseArr = [];
    let currentNode = this.head;

    // fill the reverseArr with values
    while (currentNode) {
      reverseArr.push(currentNode.value);
      currentNode = currentNode.next;
    }

    // handle head
    const node = new Node(reverseArr[reverseArr.length - 1]);
    this.head = node;
    currentNode = node;

    // splice and reverse but exclude last element (used for making the head of a new list)
    reverseArr
      .slice(0, reverseArr.length - 1)
      .reverse()
      .forEach((element, i) => {
        const node = new Node(element);
        currentNode.next = node;
        currentNode = node;
      });
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
  add(value) {
    const node = new Node(value);
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
    this.size++;
  }
  insertAtIndex(value, index) {
    if (index >= this.size || index < 0) {
      return console.log('Invalid index');
    }
    const node = new Node(value);
    if (index === 0) {
      node.next = this.head;
      this.head = node;
      this.tail = node;
    }
    // invoke add if the index is the last item in the list
    else if (index === this.size - 1) {
      this.add(node.value);
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
      return console.log(log + ' <- tail');
    }
    while (currentNode) {
      log = `${log} [${currentNode.value}]`;
      currentNode = currentNode.next;
    }
    return console.log(log + ' <- tail');
  }
}

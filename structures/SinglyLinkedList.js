import { Node } from './Node.js';

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
  // if index not provided insert at the end of the list
  add(value, index = this.size) {
    if (index > this.size || index < 0) {
      return console.log('Invalid index');
    }
    const node = new Node(value);
    // node to be inserted at the beginning
    if (index === 0) {
      node.next = this.head;
      this.head = node;
      // node to be inserted at the end
    } else if (index === this.size) {
      if (this.head === null) {
        this.head = node;
      } else {
        let currentNode = this.head;
        while (currentNode.next) {
          currentNode = currentNode.next;
        }
        currentNode.next = node;
      }
      // somewhere in between
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
  removeByIndex(index) {
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
    // console.log('No node matches the given value')
    return -1;
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
  clone() {
    let newList = new SinglyLinkedList();
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
      return console.log(log);
    }
    while (currentNode) {
      log = `${log} [${currentNode.value}]`;
      currentNode = currentNode.next;
    }
    return console.log(log);
  }
}

export { SinglyLinkedList };

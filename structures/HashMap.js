import { Node } from './Node.js';
import { SinglyLinkedList } from './SinglyLinkedList.js';

const hashFirst = (value, mapSize) => {
  if (typeof value === 'string') {
    let stringValue = 0;
    for (let i = 0; i < value.length; i++) {
      stringValue = stringValue + value.charCodeAt(i);
    }
    let hashKey = stringValue % mapSize;
    return hashKey;
  }
  let hashKey = value % mapSize;
  return hashKey;
};

// todo - since more than one hash structures use it, maybe lift the helper functions into a util file (?)
const isPrime = (n) => {
  if (n <= 1) {
    return false;
  }
  // if it can be divided by k for (k < n) -> it isn't a prime
  for (let i = 2; i < n; i++) {
    if (n % i == 0) {
      return false;
    }
  }
  return true;
};

// get a prime number lesser than set's size for hashing purposes
const findPrimeLesserThan = (n) => {
  for (let i = n - 1; i > 2; i--) {
    if (isPrime(i)) {
      return i;
    }
  }
};

class HashMap {
  constructor(bucketSize = 13, loadFactor = 0.75) {
    if (!(typeof bucketSize === 'number' || typeof loadFactor === 'number')) {
      throw new TypeError('HashMap expects numbers as arguments');
    }
    if (loadFactor >= 1) {
      throw new RangeError('Load factor cannot be >= 1');
    }
    this.bucket = new Array(bucketSize);
    this.numOfElements = 0;
    this.hashCollisionPrime = findPrimeLesserThan(this.bucket.length);
    this.load = loadFactor;
  }
  put(key, value) {
    const id = hashFirst(key, this.bucket.length);
    // if the space if empty, make a list and add the node to it
    if (this.bucket[id] === undefined) {
      let list = new SinglyLinkedList();
      const node = new Node(new Array(key, value));
      list.add(node);
      this.bucket[id] = list;
      this.numOfElements++;
      return true;
    }
    /**
     * if the collision happens -> means the list already exists
     * open addressing
     * add the new value as a node to the list
     * when searching for it simply look up the key + linear search the list O(1 + n)
     */

    // if the key already exists in the list, don't allow a duplicate
    if (this.bucket[id].indexOf(key) !== -1) {
      const node = new Node(new Array(key, value));
      this.bucket[id].add(node);
      this.numOfElements++;
      return true;
    }
    throw new Error('Duplicate keys not allowed');
  }
  get(key) {
    // hash the key, check if the element exists in the map
    const id = hashFirst(key, this.bucket.length);
    if (this.bucket[id] === undefined) {
      throw new Error('No element matches the value provided');
    }
    // note : for some reason return element; didin't work in the loop
    let el;
    // find the element
    this.bucket[id].forEach((element) => {
      // element.value.value[0] -> key, element.value.value[1] -> value
      if (element.value.value[0] === key) {
        console.log('match');
        console.log(element);
        el = element;
      }
    });
    const log = `[key][value] - [${el.value.value[0]}][${el.value.value[1]}]`
    return log;
  }
}

export { HashMap };

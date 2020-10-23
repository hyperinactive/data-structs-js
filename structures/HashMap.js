const Node = require('./Node');
const SinglyLinkedList = require('./SinglyLinkedList');

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
    this.elementCount = 0;
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
      this.elementCount++;
      this.update();
      return true;
    }
    /**
     * if the collision happens -> means the list already exists
     * open addressing
     * add the new value as a node to the list
     * when searching for it simply look up the key + linear search the list O(1 + n)
     */

    // if the key already exists in the list, don't allow a duplicate
    let list = this.bucket[id];
    list.forEach((element) => {
      if (element.value.value[0] === key) {
        throw new Error('Duplicate keys not allowed');
      }
    });

    const node = new Node(new Array(key, value));
    this.bucket[id].add(node);
    this.elementCount++;
    this.update();
    return true;
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
    const log = `[key][value] - [${el.value.value[0]}][${el.value.value[1]}]`;
    return log;
  }
  getCurrentLoad() {
    return this.elementCount / this.getSize();
  }
  getSize() {
    return this.bucket.length;
  }
  update() {
    if (this.elementCount / this.bucket.length >= this.load) {
      let arr = [];
      this.elementCount = 0;

      this.bucket.forEach((element) => {
        arr.push(element);
      });
      // create an array double the size of the prev one
      this.bucket = new Array(this.getSize() * 2);
      this.hashCollisionPrime = findPrimeLesserThan(this.getSize());

      /**
       * rehash all of the elements back into it
       * ugly, but it works ¯\_(ツ)_/¯
       * go through the lists and put their elements back into the map
       */

      arr.forEach((el) => {
        el.forEach((el) => {
          // console.log(el.value.value);
          this.put(el.value.value[0], el.value.value[1]);
        });
      });

      return console.log('Load factor exceeded');
    }
    return;
  }
  union(map) {
    if (!map instanceof HashMap) {
      throw new TypeError("Passed argument isn't a HashMap");
    }
    map.bucket.forEach((element) => {
      element.forEach((el) => {
        this.put(el.value.value[0], el.value.value[1]);
      });
    });
    return this;
  }
  clone() {
    let newHashMap = new HashMap(this.getSize());
    newHashMap.elementCount = this.elementCount;
    newHashMap.bucket = this.bucket.slice();
    return newHashMap;
  }
  // create a fresh map and replace the old one instead of zeroing everythign out
  print() {
    this.bucket.forEach((element) => {
      element.forEach((el) => {
        // console.log(el.value.value);
        console.log(`{${el.value.value[0]} => ${el.value.value[1]}}`);
      });
    });
  }
}

module.exports = HashMap;
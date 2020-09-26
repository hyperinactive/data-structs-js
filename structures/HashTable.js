// hash used for finding a key based on set's size
const hashFirst = (value, setSize) => {
  if (typeof value === 'string') {
    let stringValue = 0;
    for (let i = 0; i < value.length; i++) {
      stringValue = stringValue + value.charCodeAt(i);
    }
    let hashKey = stringValue % setSize;
    return hashKey;
  }
  let hashKey = value % setSize;
  return hashKey;
};

// hash used if the collision happens
const hashSecond = (value, setSize) => {
  const prime = findPrimeLesserThan(setSize);
  if (typeof value === 'string') {
    let stringValue = 0;
    for (let i = 0; i < value.length; i++) {
      stringValue = stringValue + value.charCodeAt(i);
    }
    let hashKey = prime - (stringValue % prime);
    return hashKey;
  }

  let hashKey = prime - (value % prime);
  return hashKey;
};

// double hashing to handle the collisions
const hashCollision = (hash_first, hash_second, setSize, i) => {
  let hashKey = (hash_first + i * hash_second) % setSize;
  // console.log(`Hash key: ${hashKey}`);
  // console.log(`i: ${i}`);
  return hashKey;
};

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

class HashTable {
  constructor(setSize = 13, loadFactor = 0.75) {
    if (!(typeof setSize === 'number' || typeof loadFactor === 'number')) {
      throw new TypeError('HashTable expects numbers as arguments');
    }
    if (loadFactor >= 1) {
      throw new RangeError('Load factor cannot be >= 1');
    }
    this.bucket = new Array(setSize);
    this.numOfElements = 0;
    this.hashCollisionPrime = findPrimeLesserThan(this.bucket.length);
    this.load = loadFactor;
  }
  put(value) {
    let key = hashFirst(value, this.bucket.length);
    let i = 0;
    while (1) {
      // found open space -> add
      // check if resizing and rehashing is needed
      if (this.bucket[key] === undefined) {
        this.bucket[key] = value;
        this.numOfElements++;
        this.update();
        return true;
      }
      key = hashCollision(
        hashFirst(value, this.bucket.length),
        hashSecond(value, this.bucket.length),
        this.bucket.length,
        i++
      );
    }
    this.numOfElements++;
    // check if resizing and rehashing is needed
    this.update();
  }
  get(key) {
    return this.bucket[key];
  }
  remove(key) {
    if (this.bucket[key] === undefined) {
      return false;
    }
    this.bucket[key] === undefined;
    return true;
  }
  update() {
    if (this.numOfElements / this.bucket.length >= this.load) {
      // if the load factor has been exceeded resize the set and rehash the elements
      let arr = [];
      this.numOfElements = 0;
      // store elements of the current set
      // forEach will skip any undefined element when invoked
      this.bucket.forEach((element) => {
        arr.push(element);
      });
      // create an array double the size of the prev one
      this.bucket = new Array(this.bucket.length * 2);
      this.hashCollisionPrime = findPrimeLesserThan(this.bucket.length);
      // rehash all of the elements back into it
      arr.forEach((element) => {
        this.put(element);
        // console.log(`added ${element}`);
      });
      return console.log('Load factor exceeded');
    }
    return;
  }
  union(table) {
    if (!table instanceof HashTable) {
      throw new TypeError("Passed argument isn't a HashTable");
    }
    table.bucket.forEach((element) => {
      this.put(element);
    });
    return this;
  }
  getCurrentLoad() {
    return this.numOfElements / this.getSize();
  }
  getSize() {
    return this.bucket.length;
  }
  forEach(callback) {
    if (this.bucket.numOfElements === 0) {
      return console.log('This table is empty');
    }
    if (typeof callback !== 'function') {
      throw new TypeError("Passed argument isn't a function");
    }
    this.bucket.forEach((element) => {
      const bindFn = callback.bind(element);
      bindFn(element);
    });
    return this;
  }
  clone() {
    // make new table, copy the elements and it's properties, return the new table
    let newHashTable = new HashTable(this.bucket.length);
    newHashTable.numOfElements = this.numOfElements;
    // newHashTable.bucket = [...this.bucket];
    newHashTable.bucket = this.bucket.slice();
    return newHashTable;
  }
  printSet() {
    let log = '[key][value]=> ';
    for (let i = 0; i < this.bucket.length; i++) {
      if (this.bucket[i] === undefined) {
        log = log + `[${i}] [x] - `;
      } else {
        log = log + `[${i}] [${this.bucket[i]}] - `;
      }
    }
    return console.log(log);
  }
  print() {
    let log = '[key][value]=> ';
    for (let i = 0; i < this.bucket.length; i++) {
      if (this.bucket[i] === undefined) {
        continue;
      } else {
        log = log + `[${i}] [${this.bucket[i]}] - `;
      }
    }
    return console.log(log);
  }
}

export { HashTable };

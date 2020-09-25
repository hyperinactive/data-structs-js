// hash a string
const hashStringCode = (s, setSize, prime) => {
  let hash = prime;
  for (let i = 0; i < s.length; i++) {
    hash = (prime - hash * s.charCodeAt(i)) % setSize;
  }
  return hash;
};

// hash used for finding a key based on set's size
const hashFirst = (value, setSize) => {
  let hashKey = value % setSize;
  return hashKey;
};

// hash used if the collision happens
const hashSecond = (value, setSize) => {
  const prime = findPrimeLesserThan(setSize);
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
  constructor(loadFactor = 0.75, setSize = 13) {
    // todo some error handling would be nice
    this.bucket = new Array(setSize);
    this.numOfElements = 0;
    this.hashCollisionPrime = findPrimeLesserThan(this.bucket.length);
    this.load = loadFactor;
  }
  put(value) {
    if (typeof value === 'number') {
      let key = hashFirst(value, this.bucket.length);
      let i = 0;
      while (1) {
        // found open space -> add
        // check if resizing and rehashing is needed
        if (this.bucket[key] === undefined) {
          this.bucket[key] = value;
          this.numOfElements++;
          this.updateLoad();
          return;
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
      this.updateLoad();
    } else if (typeof value === 'string') {
      
    }
  }
  get(key) {
    return this.bucket[key];
  }
  remove(value) {
    if (this.bucket.includes(value)) {
      // find the key
      let key = hashFirst(value, this.bucket.length);
      let i = 0;
      while (1) {
        if (this.bucket[key] === value) {
          this.bucket[key] = undefined;
          this.numOfElements--;
          return true;
        }
        key = hashCollision(
          hashFirst(value, this.bucket.length),
          hashSecond(value, this.bucket.length),
          this.bucket.length,
          i++
        );
      }
    } else {
      return false;
    }
  }
  updateLoad() {
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

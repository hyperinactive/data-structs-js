// hash used for finding a key based on map's size
const hashFirst = (value, mapSize) => {
  let hashKey = value % mapSize;
  return hashKey;
};

// hash used if the collision happens
const hashSecond = (value, mapSize) => {
  const prime = findPrimeLesserThan(mapSize);
  let hashKey = prime - (value % prime);
  return hashKey;
};

// double hashing to handle the collisions
const hashCollision = (hash_first, hash_second, mapSize, i) => {
  let hashKey = (hash_first + (i * hash_second)) % mapSize;
  // console.log(`Hash key: ${hashKey}`);
  // console.log(`i: ${i}`);
  return hashKey;
};

const isPrime = (n) => {
  if (n <= 1) {
    return false;
  }
  for (let i = 2; i < n; i++) {
    if (n % i == 0) {
      return false;
    }
  }
  return true;
};

// get a prime number lesser than map's size for hashing purposes
const findPrimeLesserThan = (n) => {
  for (let i = n - 1; i > 2; i--) {
    if (isPrime(i)) {
      return i;
    }
  }
};

class HashMap {
  constructor() {
    this.map = new Array(13);
    this.numOfElements = 0;
    this.hashCollisionPrime = findPrimeLesserThan(this.map.length);
  }
  add(value) {
    let key = hashFirst(value, this.map.length);
    console.log(`First hash key of ${value}: ${key}`);
    let i = 0;
    // todo: I don't trust my hashes fully, n stops the while loop from destrying eveything
    // 100 shots at placing an element into a map
    // need a resizing function for the map
    let n = 0;
    while (n < 100) {
      // found open space -> add
      if (this.map[key] === undefined) {
        this.map[key] = value;
        this.numOfElements++;
        return;
      }
      key = hashCollision(
        hashFirst(value, this.map.length),
        hashSecond(value, this.map.length),
        this.map.length,
        i++
      );
      console.log(`Key after collision: ${key}, i: ${i}, first hash: ${hashFirst(value, this.map.length)}, second hash: ${hashSecond(value, this.map.length)}`);
      n++;
    }
    this.numOfElements++;
  }
  print() {
    let log = '';
    for (let i = 0; i < this.map.length; i++) {
      if (this.map[i] === undefined) {
        log = log + `[${i}] [x] - `;
      } else {
        log = log + `[${i}] [${this.map[i]}] - `;
      }
    }
    return console.log(log);
  }
}

export { HashMap };

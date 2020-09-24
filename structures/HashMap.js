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
  let hashKey = (hash_first + i * hash_second) % mapSize;
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

// get a prime number lesser than map's size for hashing purposes
const findPrimeLesserThan = (n) => {
  for (let i = n - 1; i > 2; i--) {
    if (isPrime(i)) {
      return i;
    }
  }
};

class HashMap {
  constructor(loadFactor = 0.75, mapSize = 13) {
    // todo some error handling would be nice
    this.map = new Array(mapSize);
    this.numOfElements = 0;
    this.hashCollisionPrime = findPrimeLesserThan(this.map.length);
    this.load = loadFactor;
  }
  add(value) {
    let key = hashFirst(value, this.map.length);
    // console.log(`First hash key of ${value}: ${key}`);

    let i = 0;
    while (1) {
      // found open space -> add
      // check if resizing and rehashing is needed
      if (this.map[key] === undefined) {
        this.map[key] = value;
        this.numOfElements++;
        this.updateLoad();
        return;
      }
      key = hashCollision(
        hashFirst(value, this.map.length),
        hashSecond(value, this.map.length),
        this.map.length,
        i++
      );
      /* console.log(
        `Key after collision: ${key}, i: ${i}, first hash: ${hashFirst(
          value,
          this.map.length
        )}, second hash: ${hashSecond(value, this.map.length)}`
      ); */
    }
    this.numOfElements++;
    // check if resizing and rehashing is needed
    this.updateLoad();
  }
  remove(value) {
    if (this.map.includes(value)) {
      console.log('yup');
      // todo
    } else {
      // todo
    }
  }
  updateLoad() {
    if (this.numOfElements / this.map.length >= this.load) {
      // if the load factor has been exceeded resize the map and rehash the elements
      let arr = [];
      this.numOfElements = 0;
      // store elements of the current map
      // forEach will skip any undefined element when invoked
      this.map.forEach((element) => {
        arr.push(element);
      });
      // create an array double the size of the prev one
      this.map = new Array(this.map.length * 2);
      this.hashCollisionPrime = findPrimeLesserThan(this.map.length);
      // rehash all of the elements back into it
      arr.forEach((element) => {
        this.add(element);
        // console.log(`added ${element}`);
      });
      return console.log('Load factor exceeded');
    }
    return;
  }
  printMap() {
    let log = '[key][value]=> ';
    for (let i = 0; i < this.map.length; i++) {
      if (this.map[i] === undefined) {
        log = log + `[${i}] [x] - `;
      } else {
        log = log + `[${i}] [${this.map[i]}] - `;
      }
    }
    return console.log(log);
  }
  print() {
    let log = '[key][value]=> ';
    for (let i = 0; i < this.map.length; i++) {
      if (this.map[i] === undefined) {
        continue;
      } else {
        log = log + `[${i}] [${this.map[i]}] - `;
      }
    }
    return console.log(log);
  }
}

export { HashMap };

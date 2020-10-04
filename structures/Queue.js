class Queue {
  constructor() {
    this.data = [];
  }
  enqueue(element) {
    return this.data.push(element);
  }
  dequeue() {
    if (this.isEmpty()) {
      console.log('Queue has no elements')
      return null;
    }
    return this.data.shift();
  }
  peek() {
    if (this.isEmpty()) {
      console.log('Queue has no elements');
      return null;
    }
    return this.data[0];
  }
  poll() {
    if (this.isEmpty()) {
      console.log('Queue has no elements');
      return null;
    }
    return this.dequeue();
  }
  isEmpty() {
    if (this.data.length !== 0) {
      return false;
    }
    return true;
  }
  size() {
    return this.data.length;
  }
  clone() {
    let newQueue = new Queue();
    this.data.forEach((element) => {
      newQueue.data.push(element);
    });
    return newQueue;
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

export { Queue };

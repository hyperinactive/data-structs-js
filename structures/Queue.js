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

export default Queue;
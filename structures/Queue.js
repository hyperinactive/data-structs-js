class Queue {
  constructor() {
    this.data = [];
  }
  /**
   * @param {*} element
   * @returns {Queue}
   */
  enqueue(element) {
    return this.data.push(element);
  }
  /**
   * @returns {(?Queue)}
   */
  dequeue() {
    if (this.isEmpty()) {
      console.log('Queue has no elements')
      return null;
    }
    return this.data.shift();
  }
  /**
   * @returns {(?*)}
   */
  peek() {
    if (this.isEmpty()) {
      console.log('Queue has no elements');
      return null;
    }
    return this.data[0];
  }
  /**
   * @returns {(?*)}
   */
  poll() {
    if (this.isEmpty()) {
      console.log('Queue has no elements');
      return null;
    }
    return this.dequeue();
  }
  /**
   * @returns {boolean}
   */
  isEmpty() {
    if (this.data.length !== 0) {
      return false;
    }
    return true;
  }
  /**
   * @returns {number} length of the queue
   */
  size() {
    return this.data.length;
  }
  /**
   * @returns {Queue} returns a clone of the queue
   */
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

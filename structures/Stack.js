class Stack {
  constructor() {
    this.data = [];
    this.top = -1;
  }
  push(element) {
    this.data[++this.top] = element;
  }
  pop() {
    if (this.isEmpty()) {
      return console.log('Nothing to pop');
    }
    --this.top;
    return this.data.pop();
  }
  // returns index of an element that matches the value
  // not the most elegant solution ._.
  getIndex(value) {
    let i = -1;
    this.data.forEach((element, j) => {
      if (element === value) {
        i = j;
      }
    });
    if (i === -1) {
      return console.log('No elments match the value given');
    }
    return i;
  }
  peek() {
    if (this.isEmpty()) {
      return console.log('Empty stack');
    }
    return this.data[this.top];
  }
  reverse() {
    let reverseArr = [];
    this.data
      .slice()
      .reverse()
      .forEach((element) => {
        reverseArr.push(element);
      });
    this.data = reverseArr;
  }
  isEmpty() {
    // is it an array and does it have any elements
    if (Array.isArray(this.data) && this.data.length) {
      return false;
    }
    return true;
  }
  length() {
    return this.data.length;
  }
  print() {
    let log = 'top -> ';
    for (let i = this.data.length - 1; i >= 0; i--) {
      log = `${log} [${this.data[i]}]`;
    }

    return console.log(log);
  }
}

export default Stack;
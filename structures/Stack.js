class Stack {
  constructor() {
    this.data = [];
    this.top = -1;
  }
  /**
   * @param {*} element 
   */
  push(element) {
    this.data[++this.top] = element;
  }
  /**
   * @returns {?*}
   */
  pop() {
    if (this.isEmpty()) {
      console.log('Nothing to pop');
      return null;
    }
    --this.top;
    return this.data.pop();
  }
  /**
   * @param {*} value
   * @returns {?number} returns index of an element that matches the value 
   */
  getIndex(value) {
    let i = -1;
    this.data.forEach((element, j) => {
      if (element === value) {
        i = j;
      }
    });
    if (i === -1) {
      console.log('No elments match the value given');
      return null;
    }
    return i;
  }
  /**
   * @returns {*}
   */
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
  /**
   * @returns {boolean}
   */
  isEmpty() {
    // is it an array and does it have any elements
    if (Array.isArray(this.data) && this.data.length) {
      return false;
    }
    return true;
  }
  /**
   * @returns {number}
   */
  length() {
    return this.data.length;
  }
  /**
   * @returns {Stack}
   */
  clone() {
    let newStack = new Stack();
    this.data.forEach((element) => {
      newStack.push(element);
    });
    return newStack;
  }
  print() {
    let log = 'top -> ';
    for (let i = this.data.length - 1; i >= 0; i--) {
      log = `${log} [${this.data[i]}]`;
    }

    return console.log(log);
  }
}

export { Stack };

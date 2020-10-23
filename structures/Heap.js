class Heap {
  constructor() {
    this.heap = new Array();
    this.nodeCount = 0;
  }
  // utilities
  peek() {
    if (this.nodeCount === 0) {
      return null;
    }
    return this.heap[0];
  }
  getSize() {
    return this.nodeCount;
  }
  /**
   * x/y != integer in js ;_;
   * @param {number} index
   * @returns {number}
   */
  getParent(index) {
    return Math.floor(index / 2);
  }
  /**
   * @param {number} index
   * @returns {number}
   */
  getLeftChild(index) {
    return index * 2 + 1;
  }
  /**
   * @param {number} index
   * @returns {number}
   */
  getRightChild(index) {
    return index * 2 + 2;
  }
  /**
   * @param {number} index
   * @returns {boolean}
   */
  // basically, node is a leaf if it's located in the second half of the array
  isLeaf(index) {
    return index >= this.getSize() / 2 && index <= this.getSize();
  }
  /**
   * @param {number} x
   * @param {number} y
   */
  swap(x, y) {
    const tmp = this.heap[x];
    this.heap[x] = this.heap[y];
    this.heap[y] = tmp;
  }
  clear() {
    this.heap = new Array();
    this.nodeCount = 0;
  }
  print() {
    let log = '';
    for (const node of this.heap) {
      log += `[${node}], `;
    }
    return console.log(log.slice(0, log.length - 2));
  }
}

module.exports = Heap;
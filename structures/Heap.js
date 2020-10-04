class Heap {
  constructor(size) {
    this.heap = new Array();
    this.nodeCount = 0;
    this.maxSize = size;
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
  // x/y != integer in js
  getParent(index) {
    return Math.floor(index / 2);
  }
  getLetChild(index) {
    return index * 2;
  }
  getRightChild(index) {
    return index * 2 + 1;
  }
  // basically, node is a leaf if it's located in the second half of the array
  isLeaf(index) {
    return index >= this.getSize() / 2 && index <= this.getSize();
  }
  swap(x, y) {
    console.log(`X: ${x}`);
    console.log(`Y: ${y}`);
    let tmp = this.heap[x];
    this.heap[x] = this.heap[y];
    this.heap[y] = tmp;
  }
  print() {
    let log = '';
    for (const node of this.heap) {
      log += `[${node}], `
    }
    return console.log(log.slice(0, log.length - 2));;
  }
}

export { Heap };

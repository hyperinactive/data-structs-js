class MinHeap {
  constructor(size) {
    this.heap = new Array();
    this.nodeCount = 0;
    this.maxSize = size;
  }
  insert(node) {
    // if there is no more room in the heap
    if (this.getSize() >= this.maxSize) {
      return;
    }
    // if the heap is empty or the root node is greater than the new one -> insert at the beginning
    if (this.getSize() === 0) {
      this.heap.push(node);
      this.nodeCount++;
      return;
    }
    
    // push the node at the end of the array
    this.heap.push(node);
    // get the index of the last element in the array
    let currentNode = this.getSize();
    
    // move up the list of parents and swap with each that has greater value than the new one
    while (this.heap[currentNode] < this.heap[this.getParent(currentNode)]) {
      this.swap(currentNode, this.getParent(currentNode));
      currentNode = this.getParent(currentNode);
    }
    this.nodeCount++;
  }

  // utilities
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
}

export { MinHeap };

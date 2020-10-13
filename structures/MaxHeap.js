import { Heap } from './Heap.js';

class MaxHeap extends Heap {
  /**
   * @param {number|Array} arg
   */
  constructor(arg) {
    // if a number is passed create a fixed size heap
    if (arg === null) super();
    // if an array is passed, heapify it
    if (arg instanceof Array) {
      this.heap = arg;
      this.nodeCount = arg.length;
      this.heapify();
    }
  }
  /**
   * @param {number} node
   */
  insert(node) {
    // if the heap is empty or the root node is greater than the new one -> insert at the beginning
    if (super.getSize() === 0) {
      this.heap.push(node);
      this.nodeCount++;
      return;
    }

    // push the node at the end of the array
    this.heap.push(node);
    // get the index of the last element in the array
    let currentNode = super.getSize();

    // move up the list of parents and swap with each that has greater value than the new one
    while (this.heap[currentNode] > this.heap[super.getParent(currentNode)]) {
      this.swap(currentNode, super.getParent(currentNode));
      currentNode = super.getParent(currentNode);
    }
    this.nodeCount++;
  }
  /**
   * @param {number} index
   */
  maxHeapify(index) {
    let max = index;
    const left = super.getLeftChild(index);
    const right = super.getRightChild(index);

    // if a left child exists and is greater than parent max -> left
    if (this.heap[left] && this.heap[left] > this.heap[max]) {
      max = super.getLeftChild(index);
    }
    if (this.heap[right] && this.heap[right] > this.heap[max]) {
      max = super.getRightChild(index);
    }
    // if max has changed -> we have a larger child -> swap
    if (max !== index) {
      super.swap(max, index);
      this.maxHeapify(max);
    }
  }
  heapify() {
    // heapify from the last non leaf node
    for (let i = Math.round(this.getSize() / 2 - 1); i >= 0; i--) {
      this.maxHeapify(i);
    }
  }
  /**
   * @param {number} value
   * @returns {?number}
   */
  remove(value) {
    if (this.heap.indexOf(value) === -1) {
      console.log('No such element exists');
      return null;
    }
    const index = this.heap.indexOf(value);
    this.swap(index, this.heap.length - 1);
    const removed = this.heap.pop();
    this.nodeCount--;
    this.heapify();
    return removed;
  }
  print() {
    super.print();
  }
}
export { MaxHeap };

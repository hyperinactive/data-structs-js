import { Heap } from './Heap.js';

class MinHeap extends Heap {
  constructor(size) {
    super(size);
  }
  insert(node) {
    // if there is no more room in the heap
    if (super.getSize() >= super.maxSize) {
      return;
    }
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
    while (this.heap[currentNode] < this.heap[super.getParent(currentNode)]) {
      this.swap(currentNode, super.getParent(currentNode));
      currentNode = super.getParent(currentNode);
    }
    this.nodeCount++;
  }
  minHeap() {
    for (let i = this.heap.length / 2; i >= 1; i--) {
      this.minHeapify(i);
    }
  }
  // heapify the heap
  minHeapify(index) {
    // exit -> node isn't a leaf
    // node greater than its children?
    if (super.isLeaf(index)) {
      if (
        this.heap[index] > this.heap[super.getRightChild(index)] ||
        this.heap[index] > this.heap[super.getLeftChild(index)]
      ) {
        // swap with the left child if greater -> continue to heapify
        this.swap(index, super.getLetChild(index));
        this.minHeapify(super.getLetChild(index));
      } else {
        // else swap with the right child -> continue to heapify
        this.swap(index, super.getRightChild(index));
        this.minHeapify(super.getRightChild(index));
      }
    }
  }
  remove() {
    this.swap(0, this.heap.length - 1);
    let removed = this.heap.pop();
    this.nodeCount--;
    this.minHeapify(0);
    return removed;
  }
  print() {
    super.print();
  }
}
export { MinHeap };

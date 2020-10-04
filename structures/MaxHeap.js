import { Heap } from './Heap.js';

class MaxHeap extends Heap {
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
    while (this.heap[currentNode] > this.heap[super.getParent(currentNode)]) {
      this.swap(currentNode, super.getParent(currentNode));
      currentNode = super.getParent(currentNode);
    }
    this.nodeCount++;
  }
  print() {
    super.print();
  }
}
export { MaxHeap };

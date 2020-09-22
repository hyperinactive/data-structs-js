class BSTNode {
  constructor(value) {
    if (typeof value !== 'number') {
      throw new Error('BST expects numbers as values');
    }
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export { BSTNode };

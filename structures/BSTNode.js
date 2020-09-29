class BSTNode {
  constructor(value) {
    if (typeof value !== 'number') {
      throw new TypeError('BST expects numbers as values');
    }
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

export { BSTNode };

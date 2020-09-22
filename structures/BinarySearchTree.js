import { BSTNode } from './BSTNode.js';

const insertNode = (currentNode, node) => {
  if (currentNode.value > node.value) {
    if (currentNode.left === null) {
      currentNode.left = node;
    } else {
      insertNode(currentNode.left, node);
    }
  } else {
    if (currentNode.right === null) {
      currentNode.right = node;
    } else {
      insertNode(currentNode.right, node);
    }
  }
};

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  insert(value) {
    const node = new BSTNode(value);

    // if the tree is empty
    if (this.root === null) {
      this.root = node;
    }
    // if not, look for node's place in the tree
    else {
      insertNode(this.root, node);
    }
  }
  // print using DFTs
  print(method = 'inorder', currentNode = this.root) {
    switch (method) {
      // left sub -> root -> right sub
      case 'inorder':
        if (currentNode === null) {
          return;
        }
        this.print(method, currentNode.left);
        console.log(currentNode.value);
        this.print(method, currentNode.right);
        break;
      // root -> left sub -> right sub
      case 'preorder':
        if (currentNode === null) {
          return;
        }
        console.log(currentNode.value);
        this.print(method, currentNode.left);
        this.print(method, currentNode.right);
        break;

      // left sub -> right sub -> root
      case 'postorder':
        if (currentNode === null) {
          return;
        }
        this.print(method, currentNode.left);
        this.print(method, currentNode.right);
        console.log(currentNode.value);
        break;
    }
  }
}

export { BinarySearchTree };

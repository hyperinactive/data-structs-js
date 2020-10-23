const BinarySearchTree = require('./BinarySearchTree');

// use the already made functions from the BST
class AVLTree extends BinarySearchTree {
  /**
   * @param {number} value 
   */
  insert(value) {
    // call the supclass insert
    super.insert(value);

    // find a node with the matching value
    let currentNode = super.find(value);

    // balance the tree
    while (currentNode) {
      this.balance(currentNode);
      // super.print();
      currentNode = currentNode.parent;
    }
  }
  /**
   * @param {number} value 
   * @returns {?Node}
   */
  remove(value) {
    super.remove(value);
    this.balance(this.root);
  }
  /**
   * subtraction of left and right subtrees' heights
   * @param {Node} node
   * @returns {number} 
   */
  getBalanceFactor(node) {
    let lHeight = 0;
    if (node.left) {
      lHeight = super.getHeight(node.left.value);
    }
    let rHeight = 0;
    if (node.right) {
      rHeight = super.getHeight(node.right.value);
    }
    return lHeight - rHeight;
  }
  /**
   * @param {Node} node 
   */
  balance(node) {
    // left rotation 1 and 2 - balance greater than 1
    if (this.getBalanceFactor(node) > 1) {
      if (this.getBalanceFactor(node.left) > 0) {
        // left-left rotation
        this.rotateLeftLeft(node);
        // left-right rotation
      } else if (this.getBalanceFactor(node.left) < 0) {
        this.rotateLeftRight(node);
      }
    }
    // right rotation 3 and 4 - balance less than -1
    else if (this.getBalanceFactor(node) < -1) {
      if (this.getBalanceFactor(node.right) < 0) {
        // right right rotation
        this.rotateRightRight(node);
      } else if (this.getBalanceFactor(node.right) > 0) {
        // right left rotation
        this.rotateRightLeft(node);
      }
    }
  }
  /**
   * right rotation
   * switch parent node with its left child
   * if the left child had a right subtree attach the sub to the parent node
   * @param {Node} node 
   */
  rotateRight(node) {
    const tmpLeftNode = node.left;
    node.left = null;

    // check for a parent
    if (node.parent) {
      tmpLeftNode.parent = node.parent;
      node.parent.left = tmpLeftNode;
      // if the root itself is to be rotated
    } else {
      // root rotation
      this.root = tmpLeftNode;
      tmpLeftNode.parent = null;
    }

    // if the sub tree exists attach it to the parent's left
    if (tmpLeftNode.right) {
      tmpLeftNode.right.parent = node;
      node.left = tmpLeftNode.right;
    }
    // switch the rotating nodes
    node.parent = tmpLeftNode;
    tmpLeftNode.right = node;
  }
  /**
   * inverse of rotateRight
   * @param {Node} node 
   */
  rotateLeft(node) {
    const tmpRightNode = node.right;
    node.right = null;

    if (node.parent) {
      tmpRightNode.parent = node.parent;
      node.parent.right = tmpRightNode;
    } else {
      // root rotation
      this.root = tmpRightNode;
      tmpRightNode.parent = null;
    }

    if (tmpRightNode.left) {
      tmpRightNode.left.parent = node;
      node.right = tmpRightNode.left;
    }
    node.parent = tmpRightNode;
    tmpRightNode.left = node;
  }
  // left left -> right rotation of the unbalanced node
  rotateLeftLeft(node) {
    this.rotateRight(node);
  }
  // left right -> left rotate the left child of the node
  // then right rotate the node itself
  rotateLeftRight(node) {
    this.rotateLeft(node.left);
    this.rotateRight(node);
  }
  // right right -> left rotation of the unbalanced node
  rotateRightRight(node) {
    this.rotateLeftLeft(node);
  }
  // right left -> right rotate the right child of the node
  // then left rotate the node itself
  rotateRightLeft(node) {
    this.rotateRight(node.right);
    this.rotateLeft(node);
  }
}

module.exports = AVLTree;
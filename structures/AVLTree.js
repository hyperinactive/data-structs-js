import { BinarySearchTree } from './BinarySearchTree.js';

// use the already made functions from the BST
class AVLTree extends BinarySearchTree {
  insert(value) {
    // call the supclass insert
    super.insert(value);

    // find a node with the matching value
    let currentNode = super.find(value);

    // balance the tree
    let i = 0;
    while (currentNode) {
      console.log('Current node in the tree reverse search for balance');
      console.log(currentNode);
      console.log('And his parent');
      console.log(currentNode.parent);
      this.balance(currentNode);
      currentNode = currentNode.parent;
      if (i === 100) {
        console.log('broke');
        break;
      }
      i++;
    }
  }
  // subtraction of left and right subtrees' heights
  getBalanceFactor(node) {
    // console.log(`called for node:  + ${node.value}`);
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
  balance(node) {
    // left rotation 1 and 2 - balance greater than 1
    if (this.getBalanceFactor(node) > 1) {
      // console.log('Do left rotation');
      if (this.getBalanceFactor(node.left) > 0) {
        // left-left rotation
        // console.log('Left left scenario');
        this.rotateLeftLeft(node);
        // left-right rotation
      } else if (this.getBalanceFactor(node.left) < 0) {
        // console.log('Left right scenario');
        this.rotateLeftRight(node);
      }
    }
    // right rotation 3 and 4 - balance less than -1
    else if (this.getBalanceFactor(node) < -1) {
     //  console.log('Do right rotation');
      if (this.getBalanceFactor(node.right) < 0) {
        // right right rotation
        // console.log('Right right rotation');
        this.rotateRightRight(node);
      } else if (this.getBalanceFactor(node.right) > 0) {
        // right left rotation
        // console.log('Right left rotattion');
        this.rotateRightLeft(node);
      }
    }
  }
  /**
   * right rotation
   * switch parent node with its left child
   * if the left child had a right subtree attach the sub to the parent node
   */
  rotateRight(node) {
    console.log('rotating right for the node ' + node.value);
    const tmpLeftNode = node.left;
    node.left = null;

    // check for a parent
    if (node.parent) {
      tmpLeftNode.parent = node.parent;
      node.parent.left = tmpLeftNode;
      // if the root itself is to be rotated
    } else {
      this.root = tmpLeftNode;
      tmpLeftNode.parent = this.root;
    }

    // if the sub tree exists attach it to the parent's left
    if (tmpLeftNode.right) {
      tmpLeftNode.right.parent = node;
      node.left = tmpLeftNode.right;
    }
    // switch the rotating nodes
    node.parent = tmpLeftNode;
    tmpLeftNode.right = node;
    // console.log('called from rotate right -----------------------------------------------------');
    super.print();
  }
  // inverse of rotateRight
  rotateLeft(node) {
    console.log('rotating left for the node ' + node.value);
    const tmpRightNode = node.right;
    node.right = null;

    if (node.parent) {
      tmpRightNode.parent = node.parent;
      node.parent.right = tmpRightNode;
    } else {
      this.root = tmpRightNode;
      tmpRightNode.parent = this.root;
    }

    if (tmpRightNode.left) {
      tmpRightNode.left.parent = node;
      node.right = tmpRightNode.left;
    }
    node.parent = tmpRightNode;
    tmpRightNode.left = node;
  }
  rotateLeftLeft(node) {
    this.rotateRight(node);
  }
  rotateLeftRight(node) {
    this.rotateLeft(node.left);
    this.rotateRight(node);
  }
  rotateRightRight(node) {
    this.rotateLeftLeft(node);
  }
  rotateRightLeft(node) {
    this.rotateRight(node.right);
    this.rotateLeft(node);
  }
}

export { AVLTree };

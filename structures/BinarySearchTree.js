import { BSTNode } from './BSTNode.js';
import { Queue } from './Queue.js';

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

const findNode = (node, value) => {
  // console.log(node);
  // empty tree
  if (node === null) {
    return null;
  }
  if (node.value > value) {
    return findNode(node.left, value);
  }
  if (node.value < value) {
    return findNode(node.right, value);
  }
  // console.log(`Found ${node.value}`);
  return node;
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
  remove(value) {
    const removeNode = (node, value) => {
      if (node === null) {
        return null;
      }
      // look for the node in the left sub
      if (node.value > value) {
        node.left = removeNode(node.left, value);
        return node;
      }
      // look for the node in the right sub
      if (node.value < value) {
        node.right = removeNode(node.right, value);
        return node;
      }
      // found the node

      // node to be removed has no children
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      // has right child
      if (node.left === null) {
        node = node.right;
        return node;
      }
      // has left child
      if (node.right === null) {
        node = node.left;
        return node;
      }
      /**
       * node has both children
       * has to be replaced with a node which is greater than left child and less than right one's
       * cause the max of the left subtree is never greater than min of the right subtree
       * find min of right sub -> replace the node with it
       */
      let minRightNode = this.getMinNode(node.right);
      node.value = minRightNode.value;
      node.right = removeNode(node.right, minRightNode.value);
      return node;
    };

    // invoke the remove fn
    this.root = removeNode(this.root, value);
  }
  getDepth(node = this.root) {
    if (node === null) {
      return 0;
    }
    let leftSubDepth = this.getDepth(node.left);
    let rightSubDepth = this.getDepth(node.right);

    if (leftSubDepth > rightSubDepth) {
      return leftSubDepth + 1;
    }
    return rightSubDepth + 1;
  }
  getHeight(node = this.root) {
    // tree is empty
    if (node === null) {
      return 0;
    }
    let height = 0;
    let queue = new Queue();
    queue.enqueue(node);

    /**
    * idea - get all nodes of each level
    * enqueue nodes and check for their children
    * repeat till no nodes are left
    */
    while (1) {
      let nodeCount = queue.size();
      if (nodeCount === 0) {
        return height;
      }
      height++;
      
      while (nodeCount > 0) {
        let newNode = queue.peek();
        queue.dequeue();
        if (newNode.left !== null) {
          queue.enqueue(newNode.left)
        }
        if (newNode.right !== null) {
          queue.enqueue(newNode.right)
        }
        nodeCount--;
      }
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
  find(value) {
    return findNode(this.root, value);
  }
  getMinNode(node = this.root) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }
  getMaxNode(node = this.root) {
    while (node.right) {
      node = node.right;
    }
    return node;
  }
}

export { BinarySearchTree };

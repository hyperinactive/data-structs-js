const BSTNode = require('./BSTNode');
const Queue = require('./Queue');

/**
 * @typedef {string} TRAVERSAL
 * @enum {TRAVERSAL}
 */
const TRAVERSAL = {
  DFS: {
    INORDER: 'inorder',
    PREORDER: 'preorder',
    POSTORDER: 'postorder',
  },
  BFS: 'bfs',
};
/**
 * @param {Node} currentNode 
 * @param {Node} node 
 */
const insertNode = (currentNode, node) => {
  if (currentNode.value > node.value) {
    if (currentNode.left === null) {
      currentNode.left = node;
      node.parent = currentNode;
    } else {
      insertNode(currentNode.left, node);
    }
  } else {
    if (currentNode.right === null) {
      currentNode.right = node;
      node.parent = currentNode;
    } else {
      insertNode(currentNode.right, node);
    }
  }
};

/**
 * @param {Node} node 
 * @param {number} value 
 */
const findNode = (node, value) => {
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
  return node;
};

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  /**
   * @param {number} value 
   */
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
  /**
   * @param {number} value
   * @returns {?Node}
   */
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
  /**
   * @param {number=} value 
   * @returns {number}
   */
  getDepth(value = this.root.value) {
    const getDepthBST = (node = this.root) => {
      if (node === null) {
        return 0;
      }
      let leftSubDepth = getDepthBST(node.left);
      let rightSubDepth = getDepthBST(node.right);

      if (leftSubDepth > rightSubDepth) {
        return leftSubDepth + 1;
      }
      return rightSubDepth + 1;
    };
    /**
     * if a value is given, find the node that matches it
     * calculate the depth of the subtree based on the found node
     * else calculate for the root
     */
    if (value !== this.root.value) {
      const node = this.find(value);
      return getDepthBST(node);
    }
    return getDepthBST();
  }
  /**
   * @param {Number=} value 
   */
  getHeight(value = this.root.value) {
    let node = this.find(value);
    const getHeightRec = (node) => {
      let height = 0;
      if (!node) {
        height = 0;
      } else {
        height = Math.max(getHeightRec(node.left), getHeightRec(node.right)) + 1;
      }
      return height;
    };
    return getHeightRec(node);
  }
  /**
   * default print BFS -> optional DFS
   * @param {TRAVERSAL=} method
   * @param {Node=} currentNode
   */
  print(method = 'bfs', currentNode = this.root) {
    switch (method) {
      // left sub -> root -> right sub
      case TRAVERSAL.DFS.INORDER:
        if (currentNode === null) {
          return;
        }
        this.print(method, currentNode.left);
        console.log(currentNode.value);
        this.print(method, currentNode.right);
        break;
      // root -> left sub -> right sub
      case TRAVERSAL.DFS.PREORDER:
        if (currentNode === null) {
          return;
        }
        console.log(currentNode.value);
        this.print(method, currentNode.left);
        this.print(method, currentNode.right);
        break;

      // left sub -> right sub -> root
      case TRAVERSAL.DFS.POSTORDER:
        if (currentNode === null) {
          return;
        }
        this.print(method, currentNode.left);
        this.print(method, currentNode.right);
        console.log(currentNode.value);
        break;
      // BFS
      case TRAVERSAL.BFS:
        if (currentNode === null) {
          return;
        }
        // init queue, enqueue the root node
        let queue = new Queue();
        queue.enqueue(currentNode);

        /**
         * for every node in the queue print its value
         * look for node's children in the left sub
         * enqueue them
         * look for node's children in the right sub
         * enqueue them
         */
        while (!queue.isEmpty()) {
          let node = queue.peek();
          console.log(node.value);
          queue.dequeue();

          if (node.left !== null) {
            queue.enqueue(node.left);
          }
          if (node.right !== null) {
            queue.enqueue(node.right);
          }
        }
        break;
    }
  }
  /**
   * @param {number} value
   * @returns {BinarySearchTree} returns copy of a tree of a subtree if given a value
   */
  clone(value = this.root.value) {
    let currentNode;
    // if an optional value has been passed, find the matching node
    if (value !== this.root.value) {
      currentNode = this.find(value);
    } else {
      currentNode = this.root;
    }
    if (currentNode === null) {
      return;
    }
    let newTree = new BinarySearchTree();

    let queue = new Queue();
    queue.enqueue(currentNode);

    while (!queue.isEmpty()) {
      let node = queue.peek();
      newTree.insert(node.value);
      queue.dequeue();

      if (node.left !== null) {
        queue.enqueue(node.left);
      }
      if (node.right !== null) {
        queue.enqueue(node.right);
      }
    }
    return newTree;
  }
  /**
   * @param {number} value
   * @returns {Node} 
   */
  find(value) {
    return findNode(this.root, value);
  }
  /**
   * @param {Node=} node
   * @returns {Node} 
   */
  getMinNode(node = this.root) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }
  /**
   * @param {Node=} node
   * @returns {Node} 
   */
  getMaxNode(node = this.root) {
    while (node.right) {
      node = node.right;
    }
    return node;
  }
}

module.exports = BinarySearchTree;
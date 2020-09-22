import {
  Stack,
  Queue,
  Node,
  SinglyLinkedList,
  DoublyLinkedList,
  BSTNode,
  BinarySearchTree,
} from './dataStructures.js';

// import * as datastructs from './dataStructures.js';

/* work with the imported strctures */

let tree = new BinarySearchTree();
tree.insert(5);
tree.insert(4);
tree.insert(6);
tree.insert(1);
tree.insert(2);
tree.insert(10);
tree.insert(110);
tree.insert(7);
console.log('Inorder');
tree.print('inorder');
console.log('Preorder');
tree.print('preorder');
console.log('Postorder');
tree.print('postorder');
console.log(tree);

console.log(tree.find(110));
console.log(tree.getMinNode());
console.log(tree.getMaxNode());

tree.remove(5);
tree.print();
tree.insert(100);
tree.insert(98);
tree.insert(15);
console.log(`Max tree depth: ${tree.getDepth()}`);
console.log(`Max height: ${tree.getHeight()}`);

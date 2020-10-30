# data-structs-js

Implementation of common data structures into Javascript.

## Structures included in the package:
```bash
- Stack
- Queue
- Singly linked list
- Doubly linked list
- Binary search tree
- AVL tree
- Hash table
- Hash map
- Min heap
- Max heap
- Graph
```

## Instalation

```bash
npm install @hyperinactive/data-structs-js
```

## Usage

```bash
Simply import a data structure from the module

e.g. const { Stack } = require('@hyperinactive/data-structs-js');
```

## List of functions per structure

## Stack

- push
- pop
- getIndex
- peek
- reverse
- isEmpty
- length
- clone
- print

## Queue

- enqueue
- dequeue
- peek
- poll
- isEmpty
- size
- clone
- print

## Singly and Doubly linked list

- getHead
- getTail (Doubly)
- getSize
- add
- removeByIndex
- removeByValue
- indexOf
- forEach
- clear
- reverse
- isEmpty
- clone
- print

## Binary search and AVL tree 

- insert
- remove
- getDepth
- getHeight
- find
- getMinNode
- getMaxNode
- clone
- print

## Hash table and map

- put
- get
- remove
- update
- union
- getCurrentLoad
- getSize
- forEach
- clone
- print

## Min and max heap

- insert
- remove
- heapify
- peek
- getSize
- getParent
- getLeftChild
- getRightChild
- isLeaf
- swap
- clear
- print

## Graph

- addVertex
- addEdge
- removeVertex
- removeEdge
- removeAllEdges
- bfs
- dfs
- print
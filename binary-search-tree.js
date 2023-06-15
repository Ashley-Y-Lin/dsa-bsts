"use strict";

class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }

  /** findRecursively(val): Search from the invoking node for a node with value val.
  * Returns the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    if (this.val === val) {
      return this;
    }

    if ((val < this.val) && this.left)
      return this.left.findRecursively(val);

    if ((val > this.val) && this.right)
      return this.right.findRecursively(val);
  }

  /** insertRecursively(val): Starting at the invoking node, insert a new node
   * into the BST with value val. Returns the inserted node. Uses recursion. */

  insertRecursively(val) {
    const newNode = new Node(val);

    if (val < this.val)
      if (this.left === null) {
        this.left = newNode;
        return newNode;
      } else {
        return this.left.insertRecursively(val);
      }

    if (val > this.val)
      if (this.right === null) {
        this.right = newNode;
        return newNode;
      } else {
        return this.right.insertRecursively(val);
      }
  }


  /** dfsPreOrder(): Traverse from the invoking node using pre-order DFS.
  * Returns an array of visited nodes. */

  dfsPreOrder(out = []) {
    if (this === null) return out;

    out.push(this.val);

    if (this.left) {
      out.concat(this.left.dfsPreOrder(out));
    }

    if (this.right) {
      out.concat(this.right.dfsPreOrder(out));
    }

    return out;
  }

  /** dfsInOrder(): Traverse from the invoking node using in-order DFS.
  * Returns an array of visited nodes. */

  dfsInOrder(out = []) {
    if (this === null) return out;

    if (this.left) {
      out.concat(this.left.dfsInOrder(out));
    }

    out.push(this.val);

    if (this.right) {
      out.concat(this.right.dfsInOrder(out));
    }

    return out;

  }

  /** dfsPostOrder(): Traverse from the invoking node using post-order DFS.
  * Returns an array of visited nodes. */

  dfsPostOrder(out = []) {
    if (this === null) return out;

    if (this.left) {
      out.concat(this.left.dfsPostOrder(out));
    }

    if (this.right) {
      out.concat(this.right.dfsPostOrder(out));
    }

    out.push(this.val);

    return out;
  }

}


class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): Insert a new node into the BST with value val.
   * Returns the tree instance. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);

    let current = this.root;

    if (!current) {
      this.root = newNode;
      return newNode;
    }

    while (current) {
      if (current.left === null && val < current.val)
        current.left = newNode;

      if (current.right === null && val > current.val)
        current.right = newNode;

      current = (val < current.val)
        ? current.left
        : current.right;
    }

    return newNode;
  }

  /** insertRecursively(val): Insert a new node into the BST with value val.
   * Returns the tree instance. Uses recursion. */

  insertRecursively(val) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }
    this.root.insertRecursively(val);
    return this;
  }

  /** find(val): Search the BST for a node with value val.
   * Returns the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;

    if (!current) {
      return;
    }

    while (current) {
      if (current.val === val)
        return current;

      current = (val < current.val)
        ? current.left
        : current.right;
    }
  }

  /** findRecursively(val): Search the BST for a node with value val.
   * Returns the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    if (!this.root) {
      return;
    }
    return this.root.findRecursively(val);
  }

  /** dfsPreOrder(): Traverse the BST using pre-order DFS.
   * Returns an array of visited nodes. */

  dfsPreOrder() {
    if (!this.root) {
      return [];
    }
    return this.root.dfsPreOrder();
  }

  /** dfsInOrder(): Traverse the BST using in-order DFS.
   * Returns an array of visited nodes. */

  dfsInOrder() {
    if (!this.root) {
      return [];
    }
    return this.root.dfsInOrder();
  }

  /** dfsPostOrder(): Traverse the BST using post-order DFS.
   * Returns an array of visited nodes. */

  dfsPostOrder() {
    if (!this.root) {
      return [];
    }
    return this.root.dfsPostOrder();
  }

  /** bfs(): Traverse the BST using BFS.
   * Returns an array of visited nodes. */

  bfs() {
    if (!this.root) {
      return [];
    }
    let out = [];
    let toVisitQueue = [this.root];

    while (toVisitQueue.length) {
      let current = toVisitQueue.shift();

      out.push(current.val);

      if (current.left)
        toVisitQueue.push(current.left);

      if (current.right)
        toVisitQueue.push(current.right);
    }

    return out;

  }

  /** findSuccessorNode(node): Find and return node with next largest value.
   * Returns undefined if no successor. */

  findSuccessorNode(node) {
    if (!node.right) {
      return undefined;
    }
    let current = node.right;

    while (current.left) {
      current = current.left;
    }

    return current;

  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    let nodeToRemove;
    let parentOfRemoved;
    let current = this.root;

    if (!current) {
      return;
    }

    while (current) {
      if (current.left?.val === val)
        nodeToRemove = current.left;
        parentOfRemoved = current;

      if (current.right?.val === val)
        nodeToRemove = current.right;
        parentOfRemoved = current;

      current = (val < current.val)
        ? current.left
        : current.right;
    }

    let succesorNode = this.findSuccessorNode(nodeToRemove)
    //no children
    if(!(nodeToRemove.left || nodeToRemove.right)){
      nodeToRemove.val > parentOfRemoved.val ?
      parentOfRemoved.right = null : parentOfRemoved.left = null
    }
    //single child
    else if(nodeToRemove.left ^ nodeToRemove.right){

    }
    //two children
    else if(nodeToRemove.left && nodeToRemove.right){
      
    }


  }
}

module.exports = {
  BinarySearchTree,
  Node,
};

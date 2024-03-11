
import Node from './node.js';
import Tree from './binaryST.js'; // Assuming Tree class is defined in tree.js

function generateRandomArray(size, max) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

function printTreeOrders(tree) {
    console.log("Level-order: ", tree.levelOrder());
    console.log("Pre-order: ", tree.preOrder());
    console.log("Post-order: ", tree.postOrder());
    console.log("In-order: ", tree.inOrder());
}

// 1. Create a binary search tree from an array of random numbers < 100
const randomNumbers = generateRandomArray(10, 100);
const tree = new Tree(randomNumbers);

// 2. Confirm that the tree is balanced by calling isBalanced
console.log("Is tree balanced initially? ", tree.isBalanced());

// 3. Print out all elements in level, pre, post, and in order
printTreeOrders(tree);

// 4. Unbalance the tree by adding several numbers > 100
tree.insert(101);
tree.insert(102);
tree.insert(103);
tree.insert(104);

// 5. Confirm that the tree is unbalanced by calling isBalanced
console.log("Is tree balanced after adding elements? ", tree.isBalanced());

// 6. Balance the tree by calling rebalance
tree.rebalance();

// 7. Confirm that the tree is balanced by calling isBalanced
console.log("Is tree balanced after rebalancing? ", tree.isBalanced());

// 8. Print out all elements in level, pre, post, and in order again
printTreeOrders(tree);


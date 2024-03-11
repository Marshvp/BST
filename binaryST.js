import Node from './node.js';
class Tree {
    constructor(array) {
        this.root = this.buildTree(this.sortedArray(array));
    }

    sortedArray(array) {
        
        const sorted = [...new Set(array)].sort((a, b) => a - b);
        console.log(sorted);
        return sorted;

    }

    buildTree(sortedArray, start = 0, end = sortedArray.length - 1) {
        if (start > end) {
            return null
        }
        
        const mid = Math.floor((start + end) / 2);
        const node = new Node(sortedArray[mid]);

        node.left = this.buildTree(sortedArray, start, mid - 1);
        node.right = this.buildTree(sortedArray, mid + 1, end);
        console.log(`node: ${node.value} left: ${node.left} right: ${node.right}`);
        return node;
    } 

   prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
 ;


    insert(value) {

        //create new node
        const newNode = new Node(value)

        //check if tree is empty
        if (this.root === null) {
            this.root = newNode
            return
        }

        //while tree is not empty
        let currentNode = this.root
        while(true) {
            //check if value is less than current node
            if (value < currentNode.value) {
                //check if left is null. if so, insert new node
                if (!currentNode.left) {
                    currentNode.left = newNode
                    return
                }
                //if not, move to left
                currentNode = currentNode.left
                //check if value is greater than current node
            } else if (value > currentNode.value) {
                //check if right is null. if so, insert new node
                if (!currentNode.right) {
                   currentNode.right = newNode
                    return
                }
                //if not, move to right
                currentNode = currentNode.right
            } else {
                // if they are the same value, replace with new node
                currentNode.value = newNode.value
                return
                
            }
        }
    }

    delete(value) {
        //
        this.root = this.deleteNode(this.root, value);
    }

    deleteNode(node, value) {
        
        if (node === null) {
            return node
        }

        if (value < node.value) {
            node.left = this.deleteNode(node.left, value)
        } else if (value > node.value){
            node.right = this.deleteNode(node.right, value)
        } else {
            if (!node.left && !node.right) {
                return null
            }
            if (!node.left) {
                return node.right
            } else if (!node.right) {
                return node.left
            }
            node.value = this.minValue(node.right)
            node.right = this.deleteNode(node.right, node.value)
        }
        return node

    }

    minValue(root) {
        if (!root.left) {
            return root.value
        } else {
            return this.minValue(root.left)
        }
    }

    maxValue(root) {
        if (!root.right) {
            return root.value
        } else {
            return this.maxValue(root.right)
        }
    }

    find(value) {
        // returns the node with the given value
        let currentNode = this.root
        while (currentNode) {
            if (value < currentNode.value) {
                currentNode = currentNode.left
            } else if (value > currentNode.value) {
                currentNode = currentNode.right
            } else if (value === currentNode.value) {
                return currentNode
            }
        }
        return null; 
    }

    
    levelOrder(callback) {
        if (!this.root) return [];

        const result = [];
        const queue = [this.root];

        while (queue.length) {
            const node = queue.shift();
            if (callback) {
                result.push(callback(node));
            } else {
                result.push(node.value);
            }

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        return result;
    }
    
    levelOrderRec(callback) {

        const result = [];
        
        const traverse = (node, depth) => {
            if(!node) return;

            if(!result[depth]) result[depth] = [];

            if(callback) {
                result[depth].push(callback(node));
            } else {
                result[depth].push(node.value)
            }

            traverse(node.left, depth +1);
            traverse(node.right, depth + 1);
            
            
        }

        traverse(this.root, 0);

        return result.flat();
    }

    inOrder(callback) {

        const result = [];

        const traverse = (node) => {
            if(node !== null) {
                traverse(node.left);
                if(callback) {
                    result.push(callback(node.value));
                } else {
                    result.push(node.value);
                }
                traverse(node.right);
            }
            
        }
        traverse(this.root);
        return result;
    }
    
    preOrder(callback) {

        const result = [];

        const traverse = (node) => {
            if(node !== null) {
                if(callback) {
                    result.push(callback(node.value));
                } else {
                    result.push(node.value);
                }
                traverse(node.left);
                traverse(node.right);
            }
        }
        traverse(this.root);
        return result;
    }

    postOrder(callback) {

        const result = [];

        const traverse = (node) => {
            if(node !== null) {
                traverse(node.left);
                traverse(node.right);
                if(callback) {
                    result.push(callback(node.value));
                } else {
                    result.push(node.value);
                }
        }
        }
        traverse(this.root);
        return result;
    }
    
    height(node) {
        if (node === null) return -1;

            const leftHeight = this.height(node.left);
            const rightHeight = this.height(node.right);
            
            return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node) {
        //Depth is defined as the number of edges in the path from a given node to the tree’s root node
        if (node === this.root) return 0;
        return 1 + Math.min(this.depth(node.left), this.depth(node.right));
    }

    isBalanced(node = this.root) {
        return this.checkBalance(node) !== -1;
    }

    checkBalance(node) {
        if (node === null) {
            return 0; // Height of a null tree is 0
        }

        const leftHeight = this.checkBalance(node.left);
        if (leftHeight === -1) return -1; // Left subtree is unbalanced

        const rightHeight = this.checkBalance(node.right);
        if (rightHeight === -1) return -1; // Right subtree is unbalanced

        if (Math.abs(leftHeight - rightHeight) > 1) {
            return -1; // Current node is unbalanced
        }

        return Math.max(leftHeight, rightHeight) + 1; // Return height if balanced
    }

    getSortedElements(node = this.root) {
        if (!node) return [];
        return [...this.getSortedElements(node.left), node.value, ...this.getSortedElements(node.right)];
    }

    // Method to rebalance the tree
    rebalance() {
        const elements = this.getSortedElements(); 
        this.root = this.buildTree(elements); 
    }
}

export default Tree
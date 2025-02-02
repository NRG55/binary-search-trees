import Node from "./node.js";

export default class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    };

    buildTree(array) {
        const uniqueArray = [...new Set(array)];
        const sortedArray = uniqueArray.sort((a, b) => a - b);
       
        const start = 0;
        const end = sortedArray.length - 1;

        if (start > end) {        
            return null;
        };

        const mid = Math.floor((start + end) / 2);
        const node = new Node(sortedArray[mid]);           

        node.left = this.buildTree(sortedArray.slice(0, mid));
        node.right = this.buildTree(sortedArray.slice(mid + 1));       

        return node;
    };

    insert(value) {      
        let node = new Node(value);      

        if (this.root === null) {
            this.root = node;
                  
            return;
        };

        let previuos = null;
        let current = this.root;

        while (current !== null) {
            if (value < current.data) {
                previuos = current;
                current = current.left;                
            } else if (value > current.data) {
                previuos = current;
                current = current.right;
            };
        };        

        if (value < previuos.data) {
            previuos.left = node;
        };

        if (value > previuos.data) {
            previuos.right = node;
        };
    };

    deleteItem(value, root = this.root) {
        //Base case
        if (root === null) {
            return root;
        };

        if (value < root.data) {
            root.left = this.deleteItem(value, root.left);
        } else if (value > root.data) {
            root.right = this.deleteItem(value, root.right);
        //if value is the same as root.data - the node to be deleted is found  
        } else {
            //if there is no left child, replaces the node with a right child
            if (root.left === null) {
                return root.right;
            //if there is no right child, replaces the node with a left child    
            } else if (root.right === null) {
                return root.left;
            };

            //if the node has two children: looks for a smallest value node in the right subtree and 
            //replaces the node to be deleted with a smallest in the right subtree value node
            root.data = this.getMinValue(root.right);

            //removes the smallest value node in the right subtree
            root.right = this.deleteItem(root.data, root.right);
        };

        return root;
    };

    getMinValue(node) {
        let current = node;               
       
        while (current.left) {                 
            current = current.left;
        };

        let minValue = current.data;

        return minValue;
    };

    //returns the node with the given value or null if not found
    find(value) {
        let current = this.root;

        while (current !== null) {         
            if (current.data === value) {              
                return current;
            };

            if (value < current.data) {
                current = current.left
            } else {
                current = current.right;
            };
        };

        return null;
    };

    //----------BREADTH-FIRST-ORDER-----------

    //call the callback function to each node as it traverses the tree in breadth-first order (levels), 
    //passing the whole node as an argument

    //---iteration---
    levelOrder(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required!");
        };

        let queue = [];

        queue.push(this.root);

        while (queue.length > 0) {
            //dequeue the first node
            let current = queue.shift();

            callback(current);
            //pushes children to the queue to keep traversing in breadth-first order
            if (current.left) {
                queue.push(current.left);
            };
            if (current.right) {
                queue.push(current.right);
            };
        };
    };

    //----recursion---
    levelOrderRecursive(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required!");
        };

        const queue = [];
        queue.push(this.root);

        //recursive 
        function dequeue() {
            
            if (queue.length === 0) {            
                return;
            };

            const current = queue.shift();
            callback(current);
                        
            if (current.left) {
                queue.push(current.left);
            };
            if (current.right) {
                queue.push(current.right);
            }; 
            
            dequeue();
        }; 

        dequeue();        
    };

    //----------DEPTH-FIRST-ORDER-----------

    //call the callback function to each node in in-order (left subtree -> root node -> right subtree)
    inOrder(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required!");
        };
        //recursive traverse
        function traverse(node) {
            if (node === null) return;
            
            traverse(node.left); 
            callback(node);
            traverse(node.right);
        };      

        traverse(this.root);
    };
    
    //call the callback function to each node in pre-order (root node -> left subtree -> right subtree)
    preOrder(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required!");
        };
        //recursive traverse
        function traverse(node) {
            if (node === null) return;

            callback(node);
            traverse(node.left);           
            traverse(node.right);
        };      

        traverse(this.root);
    };

    //call the callback function to each node in post-order (left subtree -> right subtree -> root node)
    postOrder(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required!");
        };
        //recursive traverse
        function traverse(node) {
            if (node === null) return;
            
            traverse(node.left);           
            traverse(node.right);
            callback(node);
        };      

        traverse(this.root);
    };
    
    //returns a number of edges in the longest path from a given node to a leaf node
    //------iterative-----
    height(node = this.root) {        
        if (node === null) {
            return 0;
        };
        
        let height = -1; // -1 is to avoid a given root node itself (counts only a number of edges from a given node to a leaf node)
        let queue = [node];

        while (queue.length !== 0) {
            let levelSize = queue.length;

            while (levelSize !== 0) {
                let current = queue.shift();
               
                if (current.left) {
                    queue.push(current.left);
                };
                if (current.right) {
                    queue.push(current.right);
                };

                levelSize--
            };

            height++
        };

        return height;
    };

    //-------recursive-------
    heightRecursive(node = this.root) {        
        if (node === null) {
            return -1;
        };
        
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
      
        return Math.max(leftHeight, rightHeight) + 1;       
    };

    //returns the given node’s depth (a number of edges in the path from a given node to the tree’s root node
    depth(node) {
        let level = 0;
        let current = this.root;

        while (current !== null) {
            if (node.data === current.data) {
                return level;
            };
         
            if (node.data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            };           

            level++;           
        };    
    };
}
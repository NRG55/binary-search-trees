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
        //if value is the same as root.data - found a node to be deleted   
        } else {
            //if there is no left child, replace the node with a right child
            if (root.left === null) {
                return root.right;
            //if there is no right child, replace the node with a left child    
            } else if (root.right === null) {
                return root.left;
            };

            //if the node has two children: looking for a smallest in the right subtree for replacement
            const getMinValue = (node) => {
                let current = node;               
               
                while (current.left) {                 
                    current = current.left;
                };

                let minValue = current.data;

                return minValue;
            };
            
            //replaces the value with a smallest in the right subtree
            root.data = getMinValue(root.right);
            
            //removes the smallest value in the right subtree
            root.right = this.deleteItem(root.data, root.right);
        };

        return root;
    };


}
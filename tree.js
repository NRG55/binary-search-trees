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
}
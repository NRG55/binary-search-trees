import Tree from "./tree.js";


const tree = new Tree([56,2,8,41,79,1,-2,10,4,65,7,0]);

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  tree.insert('13')
  tree.insert('5')
  tree.deleteItem('7')

   prettyPrint(tree.root)

   console.log(tree.find(65))

   const callbackTest = (node) => {
    console.log(node.data);
   }
   
   console.log("----level-order---")
   tree.levelOrder(callbackTest);
   console.log("----level-order-recursive--")
   tree.levelOrderRecursive(callbackTest);
   console.log("-----in-order-----")
   tree.inOrder(callbackTest)
   console.log("-----pre-order-----")
   tree.preOrder(callbackTest)
   console.log("-----post-order-----")
   tree.postOrder(callbackTest)
   console.log(tree.heightRecursive(tree.root))
  

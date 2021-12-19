console.log("--------------二叉树-----------------") 
//1:前序遍历：根左右。
//2:中序遍历：左根右。
//3:后序遍历：左右根。
//4:层序遍历：逐层遍。
function TreeCode() {
    let BiTree = function (ele) {
        this.data = ele;
        this.lChild = null;
        this.rChild = null;
    }

    this.createTree = function () {
        let biTree = new BiTree('A');
        biTree.lChild = new BiTree('B');
        biTree.rChild = new BiTree('C');
        biTree.lChild.lChild = new BiTree('D');
        biTree.lChild.lChild.lChild = new BiTree('G');
        biTree.lChild.lChild.rChild = new BiTree('H');
        biTree.rChild.lChild = new BiTree('E');
        biTree.rChild.rChild = new BiTree('F');
        biTree.rChild.lChild.rChild = new BiTree('I');
        return biTree;
    }
}

//前序遍历
function ProOrderTraverse(biTree) {
    if (biTree == null) return;
    console.log(biTree.data);
    ProOrderTraverse(biTree.lChild);
    ProOrderTraverse(biTree.rChild);
}

//中序遍历
function InOrderTraverse(biTree) {
    if (biTree == null) return;
    InOrderTraverse(biTree.lChild);
    console.log(biTree.data);
    InOrderTraverse(biTree.rChild);
}

//后续遍历
function PostOrderTraverse(biTree) {
    if (biTree == null) return;
    PostOrderTraverse(biTree.lChild);
    PostOrderTraverse(biTree.rChild);
    console.log(biTree.data);
}

//层序遍历
function LayerOrderTraverse(biTree,level) {
    if (biTree == null) return;
    
}




//深度优先非递归
function DepthFirstSearch(biTree) {
    let stack = [];
    stack.push(biTree);

    while (stack.length != 0) {
        let node = stack.pop();
        console.log(node.data);
        if (node.rChild) {
            stack.push(node.rChild);
        }
        if (node.lChild) {
            stack.push(node.lChild);
        }

    }

}


//广度优先非递归
function BreadthFirstSearch(biTree) {
    let queue = [];
    queue.push(biTree);
    while (queue.length != 0) {
        let node = queue.shift();
        console.log(node.data);
        if (node.lChild) {
            queue.push(node.lChild);
        }
        if (node.rChild) {
            queue.push(node.rChild);
        }

    }
}



// var myTree = new TreeCode();
// console.log("创建二叉树")
// console.log(myTree.createTree());
// console.log('前序遍历')
// ProOrderTraverse(myTree.createTree());
// console.log('中序遍历')
// InOrderTraverse(myTree.createTree());
// console.log('后续遍历')
// PostOrderTraverse(myTree.createTree());
// console.log('层序遍历')
// LayerOrderTraverse(myTree.createTree());
// console.log("深度优先非递归遍历")
// DepthFirstSearch(myTree.createTree());
// console.log("广度优先遍历")
// BreadthFirstSearch(myTree.createTree());



console.log("--------------平衡二叉树（AVL树）-----------------") 
//当节点数目一定，保持树的左右两端保持平衡，树的查找效率最高。这种左右子树的高度相差不超过1的树为平衡二叉树


function AVLNode(value) {
    this.value = value;
    this.left = this.right = null;
    this.height = 0;
}

function height(node) {
    return node ? node.height : 0;
}


//左旋 
/*
（1）节点的右孩子替代此节点位置
（2）右孩子的左子树变为该节点的右子树
（3）节点本身变为右孩子的左子树
*/
function rotateLeft(node) {
    const right = node.right;
    node.right = right.left;
    right.left = node;
    node.height = Math.max(height(node.left, node.right)) + 1;
    right.height = Math.max(height(right.left, right.right)) + 1;
    return right;
}

//右旋
/*
（1）节点的左孩子代表此节点
（2）节点的左孩子的右子树变为节点的左子树
（3）将此节点作为左孩子节点的右子树。
*/
function rotateRight(node) {
    const left = node.left;
    node.left = left.right;
    left.right = node;
    node.height = Math.max(height(node.left, node.right)) + 1;
    left.height = Math.max(height(left.left, left.right)) + 1;
    return left;
}
//先左旋再右旋
function rotateLeftRight(node) {
    node.left = rotateLeft(node.left);
    return rotateRight(node);
}
//先右旋再左旋
function rotateRightLeft(node) {
    node.right = rotateRight(node.right);
    return rotateLeft(node);
}

//插入节点
function avlTreeInsert(node, value) {
    if (!node) {
        node = new AVLNode(value);
    } else if (value > node.value) {
        node.right = avlTreeInsert(node.right, value);
        if (height(node.right) - height(node.left) == 2) {
            if (value > node.right.value) {
                node = rotateLeft(node);
            } else {
                node = rotateRightLeft(node);
            }
        }   
    } else if (value < node.value){
        node.left = avlTreeInsert(node.left, value);
        if (height(node.right) - height(node.left) == 2) {
            if (value > node.left.value) {
                node = rotateRight(node);
            } else {
                node = rotateLeftRight(node);
            }
        }
    } 
    node.height = Math.max(height(node.right), height(node.left)) + 1;
    return node;

}

function creatAVL() {
    let i = 0;
    let data = [];
    while(i < 10) {
        data.push(i++);
    }
    console.log("当前数据",data)
    i = 0;
    let root;
    
    while(i < data.length) {
        root = avlTreeInsert(root, data[i++]);
    }
    const queue = [root];
    let current;
    while(current = queue.shift()) {
        console.log(current.value, height(current.right) - height(current.left));
        queue.push(current.right);
        queue.push(current.left);
    }
    console.log(root);
    console.log(find(root ,8))
};

function find(node, value) {
    if (!node) {
        return null;
    }
    if (node.value === value) {
        return node;
    }
    return find(node.value > value ? node.left : node.right, value);
}


// console.log("平衡二叉树",creatAVL())


console.log("--------------红黑树（RB树）-----------------") 
//红黑树，又称RB-tree，是一种平衡二叉搜索树。不过它这个平衡没有AVL-tree要求那么严格罢了。（最长路径不超过最短路径的两倍）

/*
红黑树的规矩：
1:每个节点，非黑即红。
2:根节点为黑。
3:不能存在连续的两个红节点。
4:任何节点，至其下属的、不同的叶节点的每条路径上，黑节点数必须相等。
*/

//变色 - 旋转

 
const RED = true;
const BLACK = false;
class RBNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
        this.color = RED;
    }
}


class RBT {
    constructor() {
        this.root = null;
        this.size = 0;
    }
    isRed(node) {
        if (!node) return BLACK;
        return node.color;
    }
    // 左旋 右红左黑
    leftRotate(node) {
        let tmp = node.right;
        node.right = tmp.left;
        tmp.left = node;
        tmp.color = node.color;
        node.color = RED;
        return tmp;
    }
    // 右旋转 左红左子红
    rightRoate(node) {
        let tmp = node.left;
        node.left = tmp.right;
        tmp.right = node;
        tmp.color = node.color;
        node.color = RED;
        return tmp;
    }
    // 颜色翻转
    flipColors(node) {
        node.color = RED;
        node.left.color = BLACK;
        node.right.color = BLACK;
    }
    add(key, value) {
        this.root = this.addRoot(this.root, key, value);
        this.root.color = BLACK; // 根节点始终是黑色
    }
    addRoot(node, key, value) {
        if (!node) {
            this.size++;
            return new RBNode(key, value);
        }
        if (key < node.key) {
            node.left = this.addRoot(node.left, key, value);
        } else if (key > node.key) {
            node.right = this.addRoot(node.right, key, value);
        } else {
            node.value = value;
        }
        if (this.isRed(node.right) && !this.isRed((node.left))) {
            node = this.leftRotate(node);
        }
        if (this.isRed(node.left) && this.isRed((node.left.left))) {
            node = this.rightRoate(node);
        }
        if (this.isRed(node.left) && this.isRed(node.right)) {
            this.flipColors(node);
        }
        return node;
    }
    isEmpty() {
        return this.size == 0 ? true : false;
    }
    getSize() {
        return this.size;
    }
    contains(key) {
        let ans = '';
        !(function getNode(node, key) {
            if (!node || key == node.key) {
                ans = node;
                return node;
            } else if (key > node.key) {
                return getNode(node.right, key);
            } else {
                return getNode(node.right, key);
            }
        })(this.root, key);
        return !!ans;
    }
    // bst前序遍历(递归版本)
    preOrder(node = this.root) {
        if (node == null) return;
        console.log(node.key);
        this.preOrder(node.left);
        this.preOrder(node.right);
    }
    preOrderNR() {
        if (this.root == null) return;
        let stack = [];
        stack.push(this.root);
        while (stack.length > 0) {
            let curNode = stack.pop();
            console.log(curNode.key);
            if (curNode.right != null) stack.push(curNode.right);
            if (curNode.left != null) curNode.push(curNode.left);
        }
    }
    // bst中序遍历
    inOrder(node = this.root) {
        if (node == null) return;
        this.inOrder(node.left);
        console.log(node.key);
        this.inOrder(node.right);
    }
    // bst后续遍历
    postOrder(node = this.root) {
        if (node == null) return;
        this.postOrder(node.left);
        this.postOrder(node.right);
        console.log(node.key);
    }
    // bsf + 队列的方式实现层次遍历
    generateDepthString1() {
        let queue = [];
        queue.unshift(this.root);
        while (queue.length > 0) {
            let tmpqueue = []; let ans = [];
            queue.forEach(item => {
                ans.push(item.key);
                item.left ? tmpqueue.push(item.left) : '';
                item.right ? tmpqueue.push(item.right) : '';
            });
            console.log(...ans);
            queue = tmpqueue;
        }
    }
    minmun(node = this.root) {
        if (node.left == null) return node;
        return this.minmun(node.left);
    }
    maximum(node = this.root) {
        if (node.right == null) return node;
        return this.maximum(node.right);
    }
}


 
let btins = new RBT();
let ary = [5, 3, 6, 8, 4, 2];
 
ary.forEach(value => btins.add(value));
btins.generateDepthString1();
// console.log(btins.minmun());  // 2
// console.log(btins.maximum()); // 8
console.log("--------------哈夫曼树（Huffman树）-----------------") 
//带权路径长度最短的树

class HuffmanNode {  
    constructor(value, char, left, right) {  
        this.val = value; // 字符出现次数  
        this.char = char; // 待编码字符  
        this.left = left;  
        this.right = right;  
    }  
}

// 哈弗曼编码是将一个 字符串序列 用 二进制表示 的压缩算法  
class HuffmanTree{  
    constructor(str){  
        // 第一步，统计字符出现频率  
        let hash = {};  
        for(let i = 0; i < str.length; i++){  
            hash[str[i]] = ~~hash[str[i]] + 1;  
        }  
        this.hash = hash;  
  
        // 构造哈夫曼树  
        this.huffmanTree = this.getHuffmanTree();  
  
        let map = this.getHuffmanCode(this.huffmanTree);  
        // 查看对照表，即每个字符的二进制编码是什么  
        console.log("每个字符的二进制编码",map);  
  
        // 最终的二进制编码  
        this.binaryStr = this.getBinaryStr(map, str);  
    }  
  
    // 构造哈夫曼树  
    getHuffmanTree(){  
        // 以各个字符出现次数为node.val, 构造森林  
        let forest = []  
        for(let char in this.hash){  
            let node = new HuffmanNode(this.hash[char], char); 
            forest.push(node);  
        }  

        // 等到森林只剩一个节点时，表示合并过程结束，树就生成了  
        let allNodes = []; // 存放被合并的节点，因为不能真的删除森林中任何一个节点，否则.left .right就找不到节点了  
        while(forest.length !== 1){  
            // 从森林中找到两个最小的树，合并之  
            forest.sort((a, b) => {  
                return a.val - b.val;  
            });  
  
            let node = new HuffmanNode(forest[0].val + forest[1].val, '');  
            allNodes.push(forest[0]);  
            allNodes.push(forest[1]);  
            node.left = allNodes[allNodes.length - 2]; // 左子树放置词频低的  
            node.right = allNodes[allNodes.length - 1]; // 右子树放置词频高的  
  
            // 删除最小的两棵树  
            forest = forest.slice(2);  
            // 新增的树加入  
            forest.push(node);  
        }  
  

        // 生成的哈夫曼树  
        return forest[0];  
    }  
  
    // 遍历哈夫曼树，返回一个 原始字符 和 二进制编码 的对照表  
    getHuffmanCode(tree){  
        let hash = {};  // 对照表
        let traversal = (node, curPath) => {  
            if (!node.length && !node.right) return;  
            if (node.left && !node.left.left && !node.left.right){  
                hash[node.left.char] = curPath + '0';  
            }  
            if (node.right && !node.right.left && !node.right.right){  
                hash[node.right.char] = curPath + '1';  
            }  
            // 往左遍历，路径加0  
            if(node.left){  
                traversal(node.left, curPath + '0');  
            }  
            // 往右遍历，路径加1  
            if(node.right){  
                traversal(node.right, curPath + '1');  
            }  
        };  
        traversal(tree, '');  
        return hash;  
    }  
  
    // 返回最终的压缩后的二进制串  
    getBinaryStr(map, originStr){  
        let result = '';  
        for(let i = 0; i < originStr.length; i++){  
            result += map[originStr[i]];  
        }  
        return result;  
    }  

   
}

let tree = new HuffmanTree('AAAAABBBBBBBBBBBBBBBBBBBBBBBBCCCCCCCDDDDDDDDDDDDDDDDDEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEFFFFFGGGGGGGGGGGGG')  
console.log(tree)






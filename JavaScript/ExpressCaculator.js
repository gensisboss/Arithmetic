class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

}

const precedence = {
        '|': 0,
        '||': 0,
        '&': 1,
        '&&': 1,
        '+': 2,
        '-': 2,
        '*': 3,
        '/': 3,
    
        '>=': 4,
        '<=': 4,
        '==': 4,
        '!=': 4,
        '>': 4,
        '<': 4,

        '!': 5,
    
};




function tokenize(expression) {
    let exp = new RegExp("/\\*([\\s\\S]*?)\\*/|//.*|'(.*?)'|\"(.*?)\"|\\`([\\s\\S]*?)\\`|\\.{3}|[$\\w.]+|(\\+\\+|--|\\|\\||&&|>>>|>>|<<|==|!=)(=){0,1}|=>|\\*\\*(=){0,1}|[+*-/%=><!\\|&~^](=){0,1}|[?;:()\\[\\]\{\\}]", "g");
    let tokens =  expression.match(exp)

    //处理函数
    let result1 = [];
    let flag = 0;

    let isSingle = function(str){
       return  !isNaN(str) || Object.keys(precedence).includes(str) || str == ")" || str == "(";
    }
   
    for(let i=0; i<tokens.length; i++){
        let str1 = tokens[i];
         let str2 = tokens[i+1];
        if(flag){
            result1[result1.length-1] += str1;
            if(str2){
                if(str2 == ")"){
                    flag --;
                    if(!flag){
                        result1[result1.length-1] += str2;
                        i++;
                    }
                   
                }
                else if(str2 == "("){
                    flag ++;
                }
               
            }
        }else{
            result1.push(str1)
            flag = (!isSingle(str1) && str2 == "(") ? 1 : 0
        }
    }

     //再次处理属性
    let result2 = [];


   
    for(let i=0; i<result1.length; i++){
        let str1 = result1[i];
        let str2 = result1[i+1];
         result2.push(str1) 
        if(str2 && !isSingle(str1) && !isSingle(str2)){
            i++;
            result2[result2.length-1] += str2;
        }
        
    }

    console.log("最后的表达式",result2);
    return result2;
}




function parse(expression) {
    
    const tokens = tokenize(expression); // 将表达式分割成tokens
   
    
    const operationsStack = []; // 存储操作符的栈
    const valuesStack = []; // 存储值或子表达式的栈

    const applyOperator = () => {
        // 取出操作符和对应的两个值，形成新的节点
        const operator = operationsStack.pop();
        const right = valuesStack.pop();
        const left = valuesStack.pop();
        const node = new TreeNode(operator);
        node.left = left;
        node.right = right;
        valuesStack.push(node); // 将新节点压入栈中
    };

  

    tokens.forEach(token => {
        if (token == '(') {
            // 如果是左括号，压入操作栈
            operationsStack.push(token);
        } else if (token == ')') {
            // 如果是右括号，执行操作直到遇到左括号
            while (operationsStack[operationsStack.length - 1] !== '(') {
                applyOperator();
            }
            operationsStack.pop(); // 弹出左括号
        }else if (!Object.keys(precedence).includes(token)) {
            // 如果是数字，则创建节点并压入值栈
            valuesStack.push(new TreeNode(token));
        }
        else {
            // 如果是操作符，根据优先级决定是否先执行栈顶的操作
            while (operationsStack.length &&
                precedence[token] <= precedence[operationsStack[operationsStack.length - 1]]) {
                applyOperator();
            }
            operationsStack.push(token); // 压入当前操作符
        }
    });

    // 遍历完所有tokens后，执行栈中剩余的所有操作
    while (operationsStack.length) {
        applyOperator();
    }

    return valuesStack.pop(); // 栈顶元素就是表达式的根节点
}

const context = {
     a : {
        owner:{
            text:{
              d: 5,
              f:function(){
                return {sf:5}
              } 
            },
            fun:function(a){
                return a
            } 
        },
        sd:18,
        fun:function(a,b){
            console.log("当前最终参数",a,b)
            return parseInt(a)+parseInt(b)
        } 
    }
    
}
   
function containsOperators(str) {
    // 创建一个正则表达式来匹配逻辑运算符和数学运算符，包括除号(/)
    const regex = /[&|.!+\-*/]/;
    console.log("是否是表达式",regex.test(str))
    // 使用正则表达式的test()方法检查字符串是否包含这些运算符
    return regex.test(str);
}


function splitExpress(express){
  const parts = [];
  let currentPart = '';
  let parenthesesDepth = 0;

  for (const char of express) {
    if (char === '(') {
      parenthesesDepth++;
      currentPart += char;
    } else if (char === ')') {
      parenthesesDepth--;
      currentPart += char;
    } else if (char === '.' && parenthesesDepth === 0) {
      parts.push(currentPart);
      currentPart = '';
    } else {
      currentPart += char;
    }
  }

  if (currentPart) {
    // Push the remaining part
    parts.push(currentPart);
  }

  return parts;

}


function getValue(obj,path){
  // 将路径按点号分割成组成部分
  const parts =  this.splitExpress(path);
  console.log("当前路径解析值",parts)
  // 递归地访问每一个属性
  let current = obj;
  for (const part of parts) {
    if (part.includes('(')) {
       // 函数调用
       let ind = part.indexOf('(')
       let funName = part.slice(0,ind)
       let funPara = part.slice(ind+1,part.length-1);
       let params = funPara.split(",")
       console.log("当前分割后的参数",params)
       for(let i=0; i< params.length; i++){
            let param = params[i];
            if (isNaN(param)) {
                console.log("这个参数不是一个单纯的数字",param)
                if(containsOperators(param)){
                    let tree = parse(param);
                    console.log("当前表达式的结构",tree)
                     params[i] = run(tree)
                    console.log("当前表达式计算的结果",param)
                }else{
                    params[i] = getValue(context,param)
                }
            }
       }
       console.log("经过一遍检测后的参数",params)
       current = current[funName].apply(current,params);
    } else {
      // 正常属性访问
      current = current[part];
    }

  }

 console.log("最后计算的值",current)
  // 返回最终找到的值
  return current;
    
}


function run(root) {
    if (!root) {
        return 0;
    }
   
  
    if(Object.keys(precedence).includes(root.value)){
         // 根据操作符计算
        switch (root.value) {
            case '&': return run(root.left) & run(root.right);
            case '&&': return run(root.left) && run(root.right);
            case '|': return run(root.left) | run(root.right);
            case '||': return run(root.left) || run(root.right);
                
            case '+': return run(root.left) + run(root.right);
            case '-': return run(root.left) - run(root.right);
            case '*': return run(root.left) * run(root.right);
            case '/': return run(root.left) / run(root.right);
                
            case '>=': return run(root.left) >= run(root.right);
            case '<=': return run(root.left) <= run(root.right);
            case '==': return run(root.left) == run(root.right);
            case '!=': return run(root.left) != run(root.right);
            case '>': return run(root.left) > run(root.right);
            case '<': return run(root.left) < run(root.right);
                
            case '!': return !run(root.right);
                
            default: throw new Error('Invalid operator');
        }
    }else{
        if (!isNaN(root.value)) {
        // 如果节点是数字，返回其值
            return Number(root.value);
        }else{
            console.log("当前参数",root.value)
            return Number(getValue(context,root.value))
        }
    }
   
   
}



const expression = "a.sd * ((a.fun(1,1) + 5) - a.owner.text.f().sf * 10) + 100 * (a.owner.fun(10)-5) + a.fun(4+5,1) ";
const expressionTest1 =  "a.fun(4+5,a.sd)"
const expressionTest2 =  "a.fun(4,5) > a.sd || a.sd >= 0"
const expressionTest3 =  "!a.fun(0,0) + 1"
const expressionTest4 =  "!(a.fun(0,0) + 1 - a.sd)"
let tree = parse(expressionTest2);
console.log("结构体",tree)
console.log("结果是",run(tree))


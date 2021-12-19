console.log('LeetCode算法测试')

//一 ：删除排序数组中的重复项
//逐个遍历方法
function removeDuplicates1(nums){
	let prev = nums[0]
	for (var i = 1; i < nums.length; i++) {
		if (prev == nums[i]) {
			nums.splice(i,1)
			i-=1
		}else{
			prev = nums[i];
		}
	}
}
//双指针方法
function removeDuplicates2(nums){
	let length = nums.length;
	let j = 0;
	for (var i = 0; i < length; i++) {
		if (nums[i] !== nums[j]) {
			nums[++j] = nums[i]
		}
	}
	nums.splice(j+1)
	return nums;
}

// console.log("输出数组中的重复数组",removeDuplicates2([0,0,1,1,1,2,2,3,3,4]))


//剪切数组测试
function sliceArray(nums){
	let start = 2;
	let end = 5;
	nums.splice(start);
	return nums;
}
// console.log("剪切的数组为",sliceArray(testRankArray))


//二 ： 股票买卖问题
var testStockArray = [2,4,5,1,7,19,5,28,17,10,5,8]
//获得股票差值
function getSubtractArray(nums){
	let sub = [];
	for (var i = 0; i < nums.length-1; i++) {
		sub.push(nums[i+1]-nums[i])
	}
	return sub;
}
var testSubArray = getSubtractArray(testStockArray)


//计算最大子序列和
//方法1 : 逐个比较-3重循环
function MaxSubsequenceSum1(nums){
	var ThisSum,MaxSum,i,j,k;
	MaxSum = 0;
	for(i=0;i<nums.length;i++){
		for(j=0;j<nums.length;j++){
			ThisSum = 0;
			for(k=i;k<=j;k++){
				ThisSum += nums[k]
				if (ThisSum > MaxSum) {
					MaxSum = ThisSum;
				}
			}
	    }
	}
	return MaxSum;
}
//方法2 ： 顺序比较-2重循环
function MaxSubsequenceSum2(nums){
	var ThisSum,MaxSum,i,j;
	MaxSum = 0;
	for (var i = 0; i < nums.length; i++) {
	    ThisSum = 0;
		for (var j = i; j < nums.length; j++) {
			ThisSum += nums[j]
			if (ThisSum > MaxSum) {
				MaxSum = ThisSum;
			}
		}
	}
	return MaxSum;
}

//方法3 ： 跳跃比较-1重循环
function MaxSubsequenceSum3(nums){
	 var ThisSum, MaxSum;
	 ThisSum = MaxSum  = 0;
	 for (var i = 0; i < nums.length; i++) {
	 	 ThisSum += nums[i];
	 	 if (ThisSum > MaxSum) {
	 	 	MaxSum = ThisSum;
	 	 }else if (ThisSum < 0) {
	 	 	ThisSum = 0;
	 	 }
	 }
	 return MaxSum;
}

//方法4 ： 二分法比较
function MaxSubSum(Left,Right){
	var MaxLeftSum, MaxRightSum;
	var MaxLeftBorderSum , MaxRightBorderSum;
	var LeftBorderSum,RightBorderSum;
	var Center = 0,i;

    console.log("左右两边的值为",Left,Right)
	if (Left == Right) {
		console.log("递归调用结束---------------------------------递归调用结束")
		if (testSubArray[Left] >0) {
			return testSubArray[Left];
		}else{
			return 0;
		}
	}

	Center = Math.floor((Left + Right)/2);
	console.log("中心值为",Center)
	MaxLeftSum = MaxSubSum(Left,Center)
	console.log("左边的最大值为",MaxLeftSum)
	MaxRightSum = MaxSubSum(Center+1,Right);
	console.log("右边的最大值为",MaxRightSum)

	MaxLeftBorderSum = 0;
	LeftBorderSum = 0;
	for (let i = Center; i >= Left; i--) {
		LeftBorderSum += testSubArray[i]
		if (LeftBorderSum > MaxLeftBorderSum) {
			MaxLeftBorderSum = LeftBorderSum;
			console.log("计算求的左半部分最大值",MaxLeftBorderSum)
		}
	}

	MaxRightBorderSum = 0;
	RightBorderSum = 0;
	for (let i = Center + 1; i <= Right; i++) {
		RightBorderSum += testSubArray[i]
		if (RightBorderSum > MaxRightBorderSum) {
			MaxRightBorderSum = RightBorderSum;
				console.log("计算求的右半部分最大值",MaxLeftBorderSum)
		}
	}


   console.log("最后一步进行比较",MaxLeftSum,MaxRightSum,MaxLeftBorderSum+MaxRightBorderSum)
   let ComSumAry = [MaxLeftSum,MaxRightSum,MaxLeftBorderSum+MaxRightBorderSum]
   let MaxSumNum = 0
   for (var i = 0; i < ComSumAry.length; i++) {
   	    if (ComSumAry[i] > MaxSumNum) {
   	    	MaxSumNum = ComSumAry[i];
   	    }
   }
   return MaxSumNum;

}

function MaxSubsequenceSum4(nums){
	return MaxSubSum(0,nums.length-1)
}

// console.log("股票差值数组为",testSubArray) 
// console.log("这支股票的最大获利为",MaxSubsequenceSum4(testSubArray))


//四 ： 比较两个数组中的元素是否完全相等
var standardArray = [0,4,9,10,35];
var testArray = [4,8,0,10,9,35];


function rankArray(array){
	var i,j,temp;
    var n = array.length;
    for (i=0;i<=n-1;i++)
    {
        for (j=i+1;j<=n;j++)
        {
            if(array[j]<array[i])
            {
                temp=array[j];
                array[j]=array[i];
                array[i]=temp;
            }
        }        
    }
    return array;
}

function compareArray(array1,array2){
	if (array1.toString() == array2.toString()) {
		return true;
	}else{
		return false;
	}
}
// console.log("数组转字符串后",standardArray.toString())
// console.log("没有排序之前数组比较",compareArray(standardArray,testArray))
// rankArray(testArray)
// console.log("排序之后数组比较",compareArray(standardArray,testArray))

//五 ： 旋转数组
var testRotArray = [2,9,-10,8,19,-28,19,9,8,7,2,12,4,5,80]

function rotateArray1(nums,key){
	let leftNums = nums.splice(0,key)
	let rightNums = nums
	return rightNums.concat(leftNums)
}

function rotateArray2(nums,key){
	let n = nums.length;
	let newArr = new Array(n)
	for (var i = 0; i < n; i++) {
		newArr[(i+key)%n] = nums[i]
	}
	return newArr;
}

// console.log("初始数组为",testRotArray)
// console.log("从"+8+"处旋转数组",rotateArray1(testRotArray,8))

//六 ： 合并二维数组中的重复元素
var mergePara = 1
var testMergeArray = 
        [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 1, 1],
            [0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 1, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 0, 1]
        ]
//依次遍历所有节点
function searchData(datas) {
    var col = datas[0].length
    var row = datas.length
    var result = []
    console.log("这个数组有"+col+"列"+row+"行")
    for (var r = 0; r < row; r++) {
        for (var c = 0; c < col; c++) {
            var rowDatas = rowSearch(r, c, result, datas)
            let w = rowDatas.length
            if (rowDatas.length > 0) {
                var colDatas = colSearch(rowDatas, datas)
                colDatas.width = w;
                result.push(colDatas);
            }
        }
    }
     for (let i = 0; i < result.length; i++) {
     	console.log("合并结果"+"位置:"+"("+result[i].datas[0].row+","+result[i].datas[0].col+")"+"高度:"+result[i].height+"宽度:"+result[i].width)
     }
 }

 //横向搜索
function rowSearch(row, col, result, datas) {
    if (!isSearchDone(row, col, result)) {
        var data = datas[row][col]
        //只计算不可行走区域
        if (data == mergePara) {
            var arr = []
            var rowDatas = datas[row]
            for (var i = col; i < rowDatas.length; i++) {
                if (datas[row][i] == mergePara) {
                    arr.push({ row: row, col: i })
                } else {
                    return arr
                }
            }
            return arr
        }
    }
    return [];
}

 //竖向搜索
function colSearch(rowDatas, datas) {
    var count = loopSearchCol(rowDatas, rowDatas[0].row + 1, rowDatas[0].col, 0, datas)
    let all = rowDatas[0].col + rowDatas.length
    for (var i = 0; i < count; i++) {
        for (let j = rowDatas[0].col; j < all; j++) {
            rowDatas.push({ row: rowDatas[0].row + i + 1, col: j })
        }
    }
    return { height: count + 1, datas: rowDatas, width: 0 }
}

//循环遍历搜索
function loopSearchCol(rowDatas, row, col, count, datas) {
    for (var i = 0; i < rowDatas.length; i++) {
        if (typeof datas[row] != 'undefined') {
            var data = datas[row][rowDatas[i].col]
            if (typeof data == 'undefined' || data != 0) {
                return count
            }
        } 
        else {
            return count
        }
    }
    count++
    return loopSearchCol(rowDatas, row + 1, col, count, datas)
}

//是否已经搜索过
function isSearchDone(row, col, result) {
    for (var i = 0; i < result.length; i++) {
        var group = result[i].datas
        for (var j = 0; j < group.length; j++){
            if (group[j].row == row && group[j].col == col) {
                return true
            }
        }
    }
    return false
}

// console.log("合并数组的信息为",searchData(testMergeArray))

//七 ： 找到数组中只出现一次的元素
var testOnluArray = [1,1,2,2,5,3,3];

//法1 排序后排除第一个和最后一个数组，然后判断如果数组中的一个元素既不等于上一个也不等于下一个，那么这个元素就是唯一的元素
function findOnlyPara1(nums){
	let rankedArray = nums.sort();
	console.log("经过排序后的数组为",rankedArray)
	if (rankedArray[0] != rankedArray[1]) {
		return rankedArray[0]
	}
	if (rankedArray[rankedArray.length-1] != rankedArray[rankedArray.length-2]) {
		return rankedArray[rankedArray.length-1]
	}
	for (var i = 1; i < rankedArray.length-1; i++) {
         if (rankedArray[i] != rankedArray[i+1] && rankedArray[i] != rankedArray[i-1]) {
         	return rankedArray[i]
         }
		
	}

}
// 法2 异或运算 : 同假异真
function findOnlyPara2(nums){
	let ans = 0;
	for(const num of nums){
		console.log("初始数为",num)
		ans = ans ^ num;
		console.log("异或运算的结果",ans)
	}
	return ans;
}

// 法3
function findOnlyPara3(nums){
	return nums.reduce((a,b)=>(a^b))
}

// console.log("数组中唯一的元素为",findOnlyPara3(testOnluArray))

//八 ： reduce()函数的使用
//1 计算数组中所有元素的和 + 初始值
var testReduceArray = [8,3,1,9,10,3,1,1]
function reduceAnalyse1(nums){
	return  nums.reduce(function(prev, cur, index, arr) {
    console.log(prev, cur, index);
    return prev + cur;
    },3)
}
// console.log("当前数组中所有元素的和",reduceAnalyse1(testReduceArray))

//2 计算数组中每个元素出现的次数
function reduceAnalyse2(nums){
	return nums.reduce((pre,cur)=>{
      console.log(pre, cur);
	  if(cur in pre){
	    pre[cur]++
	  }else{
	    pre[cur] = 1 
	  }
	  return pre
	  },{})
}
// console.log("当前数组中各个元素出现的次数",reduceAnalyse2(testReduceArray))

//3 数组去重
function reduceAnalyse3(nums){
	return nums.reduce((pre,cur)=>{
		    if(!pre.includes(cur)){
		      return pre.concat(cur)
		    }else{
		      return pre
		    }
		},[])
}
// console.log("当前数组去除重复的元素后",reduceAnalyse3(testReduceArray))

//4 将多维数组转化成一维
var testMulDimensionArray = [[0, 1], [2, 3], [4,[5,6,7]]];
function reduceAnalyse4(nums){
	const newArr = function(arr){
    return arr.reduce((pre,cur)=>pre.concat(Array.isArray(cur)?newArr(cur):cur),[])
	}
	return newArr(nums);
}
// console.log("将多维数组转换成一维后",reduceAnalyse4(testMulDimensionArray))

//5 对象里的属性求和
var result = [
    {
        subject: 'math',
        score: 10
    },
    {
        subject: 'chinese',
        score: 20
    },
    {
        subject: 'english',
        score: 30
    }
];

var sum = result.reduce(function(prev, cur) {
    return cur.score + prev;
}, 0);
// console.log("对象中分数和为",sum) //60

//九 ： 计算两个数组的交集
var testInterArray1 = [1,4,6,3,7];
var testInterArray2 = [1,5,7,4,3];

//1 双重遍历法，时间复杂度O（n^2）
function intersectionArray1(nums1,nums2){
	let arr = [];
	let longArray = nums1.length >= nums2.length ? nums1 : nums2;
	let shortArray = nums1.length >= nums2.length ? nums2 : nums1;
	console.log("长数组为",longArray)
	console.log("短数组为",shortArray)
	for (var i = 0; i < shortArray.length; i++) {
		if (longArray.indexOf(shortArray[i]) >= 0) {
			let index = longArray.indexOf(shortArray[i]);
			longArray.splice(index,1);
			arr.push(shortArray[i]);
		}
	}
	return arr;
}

//2 双指针法
function intersectionArray2(nums1,nums2){
	nums1.sort((a, b) => a - b);
    nums2.sort((a, b) => a - b);
    let l = 0, r = 0, ans = [];
    while (l < nums1.length && r < nums2.length) {
        if (nums1[l] === nums2[r]) {
            ans.push(nums1[l]);
            l++;
            r++;
        } else nums1[l] < nums2[r] ? l++ : r++;
    }
    return ans;

}

// console.log("两个数组中有交集的元素为",intersectionArray1(testInterArray1,testInterArray2))

//十 ： 移动数组中的0到数组的最后
var testMoveArray = [0,1,0,9,5,0,3,12];

//1 分离法
function moveZeroes1(nums){
	let arr1 = [];
	let arr2 = [];
	for (var i = 0; i < nums.length; i++) {
	   if (nums[i] == 0) {
	   	  arr2.push(0)
	   }else{
	   	arr1.push(nums[i])
	   }
	}
	return arr1.concat(arr2);
}

//2 数组交换法
function moveZeroes2(nums){
	let j = 0;
	for (var i = 0; i < nums.length; i++) {
		if (nums[i] !== 0) {
			if (i !== j) {
				[nums[i],nums[j]] =  [nums[j],nums[i]]
			}
			j ++;
		}
	}
	return nums
}

//3 遍历补0
function moveZeroes3(nums){
	let index = 0;
	nums.map(i=>{
		if (i!=0) {
			nums[index] = i;
			index ++;
		}
	})
	nums.fill(0,index)
	return nums
}

/*
map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。

map() 方法按照原始数组元素顺序依次处理元素。

注意： map() 不会对空数组进行检测。

注意： map() 不会改变原始数组。
*/
/*
fill()方法，使用自己想要的参数替换原数组内容，但是会改变原来的数组。

该方法有三个参数：
fill(value, start, end)
value：想要替换的内容。
start：开始位置（数组的下标），可以省略。
end：替换结束位置（数组的下标），如果省略不写就默认为数组结束
*/

// console.log("移动后的数组为",moveZeroes3(testMoveArray))

// 十一.1 ： 数组中两数之和
var testAddArray = [1,0,-1,0,-2,2]
// 1 : 暴力求解
function indexOfAddArray1(nums,target){
	let arr = [];
	for (var i = 0; i < nums.length; i++) {
		for (var j = i+1; j < nums.length; j++) {
			if (nums[i]+nums[j] == target && arr.length < 2) {
				arr.push(i)
				arr.push(j)
			}
		}
	}
	return arr;
}
// 2 ： 哈希表求解
function indexOfAddArray2(nums,target){
	let map = new Map();
	for (var i = 0; i < nums.length; i++) {
		if (map.has(target-nums[i])) {
			return [map.get(target-nums[i]),i]
		}else{
			map.set(nums[i],i)
		}
	}
	return [];
}
/* map的四种方法
设值 ： map.set("key","value");
取值 ：map.get("key");
判断key是否存在 ： map.has("key");
删除key ： map.delete("key");
*/

//3 ： 差值求解
function indexOfAddArray3(nums,target){
	for (var i = 0; i < nums.length; i++) {
	  let index = nums.indexOf(target-nums[i])
	  if (index > -1 && index != i) {
         return [index,i]
	  }
	}
}
// console.log("两数之和的索引为",indexOfAddArray3(testAddArray,12))

//十一.2 : 数组中四数之和
function fourSum1(nums,target){
	let all = [];
	let arr = 0;
	for (var i = 0; i < nums.length; i++) {
		for (var j = i+1; j < nums.length; j++) {
			for (var k = j+1; k < nums.length; k++) {
				for (var y = k+1; y < nums.length; y++) {
			        if (nums[i] + nums[j] + nums [k] + nums[y]  == target) {
			        	if (arr != nums[i]*1000+nums[j]*100+nums[k]*10+nums[y]){
			        	   arr = nums[i]*1000+nums[j]*100+nums[k]*10+nums[y];
				           all.push([nums[i],nums[j],nums[k],nums[y]])
			        	}
			        }
		        }
		    }
		}
	}
	return all;
}

// console.log("四数之和的情况有",fourSum1(testAddArray,0))

//十二.1 ： 数独矩阵判定
testBoderArray = [[7,0,0,0,0,4,0,2,0],
                  [0,9,0,0,0,0,3,0,0],
                  [0,0,0,0,0,6,0,0,8],
                  [0,8,0,9,0,0,0,0,0],
                  [0,3,5,0,0,0,0,0,9],
                  [0,0,0,0,7,2,0,4,0],
                  [0,0,9,5,2,0,0,0,0],
                  [0,0,0,0,0,0,8,6,7],
                  [1,0,0,3,0,0,0,0,0]]

function isValidShudo(board){
	for (var i = 0; i < 9; i++) {
		let col = board[i];
		let row = [];
		for (var j = 0; j < 9; j++) {
			row.push(board[j][i])
			
		}
		// console.log("所有行为",col)
		// console.log("所有列为",row)
		if (isRepeatBesideZero(col) || isRepeatBesideZero(row)) {
			console.log("行列使得这个数独不成立")
			return false;
		}

	}
	for (var k = 0; k < 9; k++) {
		let rect = [];
		for (var i = 0; i < 9; i++) {
			for (var j = 0; j < 9; j++) {
				if (Math.floor(k/3)*3 <= i && Math.floor(k/3)*3 + 2 >= i) {
					if ((k%3)*3 <= j && (k%3)*3+2 >=j) {
						rect.push(board[i][j])
					}
				}
			}
	    }
		// console.log("所有矩阵为",rect)
		if (isRepeatBesideZero(rect)) {
			console.log("矩阵使得这个数独不成立")
			return false;
		}
	}
	return true;
}

function isRepeatBesideZero(nums){
	let arr = [];
	for (var i = 0; i < nums.length; i++) {
		if (nums[i] > 0) {
		   if (arr.indexOf(nums[i]) > -1) {
		   	 return true;
		   }else{
		   	arr.push(nums[i])
		   }
		}
	}
	return false;
}
// isValidShudo(testBoderArray)

//十二.2 : 解数独
function solveShuDu(board){
  if (!isValidShudo(board)) {
      console.log("数独无效")
      return;
  }
  const rows = new Array(9);    // 存放每一行对应的可选数集
  const cols = new Array(9);    // 存放每一列对应的可选数集
  const blocks = new Array(9);  // 存放每一框对应的可选数集
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9]; 
  for (let i = 0; i < 9; i++) { // 集合的初始化
    rows[i] = new Set(options);
    cols[i] = new Set(options);
    blocks[i] = new Set(options);
  }

  const getBlockIndex = (i, j) => { // 根据坐标，获取所在的小框的索引
    return (i / 3 | 0) * 3 + j / 3 | 0;  // |0 是向下取整
  };

  for (let i = 0; i < 9; i++) {    // 根据现有的已填的数字，更新set们
    for (let j = 0; j < 9; j++) {
      if (board[i][j] != 0) {
        rows[i].delete(board[i][j]); // 当前行出现过这个数字，这个数字就不能在这一行出现，删除该选项
        cols[j].delete(board[i][j]);
        blocks[getBlockIndex(i, j)].delete(board[i][j]);
      }
    }
  }

  const fill = (i, j) => {
    if (j == 9) {     // 列越界，就填下一行
      i++;
      j = 0;
      if (i == 9) return true;  // 都填完了 返回true
    }
    if (board[i][j] != 0) return fill(i, j + 1); // 如果不是空白格，递归填下一格

    const blockIndex = getBlockIndex(i, j); // 获取所在小框的索引

    for (let num = 1; num <= 9; num++) {    // 枚举出所有选择：1-9
      // 当前选择必须在三个set中都存在，如果有一个不存在，就说明发生了冲突，跳过该选择
      if (!rows[i].has(num) || !cols[j].has(num) || !blocks[blockIndex].has(num)) continue;

      board[i][j] = num;    // 作出选择
      rows[i].delete(num);  // 更新set们，删掉这个可填选项
      cols[j].delete(num);
      blocks[blockIndex].delete(num);

      if (fill(i, j + 1)) return true; // 如果基于当前选择，填下一个，最后可解出数独，直接返回真
      // 基于当前选择，填下一个，怎么填都不行，回溯，恢复为空白格
      board[i][j] = 0;
      rows[i].add(num);     // set们，将之前删掉的当前数字，加回来
      cols[j].add(num);
      blocks[blockIndex].add(num);
    }
    return false;  // 尝试了1-9，每个都往下递归，都不能做完，返回false
  };

  fill(0, 0);  // 填格子的起点
  return board;
}

// console.log("数独的求解",solveShuDu(testBoderArray))


//十三 ： 二维数组的旋转
var testRotMatrix  = [ [1,2,3,4],
                       [5,6,7,8],
                       [9,10,11,12],
                       [13,14,15,16],]
function rotateMatrix(matrix){
	let dimen = matrix.length-1;
	console.log("原本数组的尺寸为",matrix.length,matrix[0].length)
	console.log("原本的数组为",matrix)
	let arr = JSON.parse(JSON.stringify(matrix)) ;
	for (var i = 0; i < matrix.length; i++) {
		for (var j = 0; j < matrix[i].length; j++) {
			matrix[i][j] = arr[dimen-j][i]
		}
	}
	return matrix;
}
// console.log("二维数组的旋转",rotateMatrix(testRotMatrix))

//十四 ： 反转字符串
var testReverString = ["h","e","l","l","o"]

function reverseString1(s){
	return s.reverse();
}

function reverseString2(s){
	let n = s.length;
	for (let left = 0 , right = n - 1; left < right; ++left,--right) {
		[s[left],s[right]] = [s[right],s[left]]
	}
	return s;
}

// console.log("反转字符串后",reverseString2(testReverString))

// 十五 ： 反转数据
//1 :整除求余
function reverseNumber1(x){
	let res = 0;
	while(x){
		res = res * 10 + x%10;
		x = ~~(x/10);
		// x = Math.floor(x/10)
		// console.log("当前值为",x)
	}
	return res;
}
//~是按位取反运算，~~是取反两次。~~的作用是去掉小数部分，因为位运算的操作值要求是整数，其结果也是整数，所以经过位运算的都会自动变成整数。

//2 ：转化字符串
function reverseNumber2(x){
	return parseInt(x.toString().split("").reverse().join(""));
}
// console.log("反转数据1234后",reverseNumber2(1563842))

//十六 ：  字符串中第一个不重复的字符
function repeatIndexString1(s){
	let arr = s.split("");
	let map = new Map();
	for (var i = 0; i < arr.length; i++) {
		if (map.has(arr[i])) {
			let times = map.get(arr[i]) + 1; 
			map.set(arr[i],times)
		}else{
			map.set(arr[i],1)
		}
	}
	for (var i = 0; i < arr.length; i++) {
		if (map.has(arr[i]) && map.get(arr[i]) == 1 ) {
			return arr.indexOf(arr[i])
		}
	}
	return -1;

}

function repeatIndexString2(s){
	let arr = s.split("");
	let c;
    let i,j,k;
    let flag=-1;
    for(i=0;i<arr.length;i++){
        c=arr[i];
        for(j=0;j<arr.length;j++){
        if(arr[j]==c)
        break;
        }
        for( k=arr.length-1;k>-1;k--){
        if(arr[k]==c)
          break;
        }
        if(k==j){
        flag=i;
        break;
        }
    }
    return flag;
}



// console.log("字符串中第一个不重复的字符的索引为",repeatIndexString2("helloeh"))

//十七 ： 字符串包含问题
var testString1 = "disillusion";
var testString2 = "illusion";
function isAnagram1(s,t){
	let ls = s.length > t.length ? s : t;
	let ss = s.length > t.length ? t : s;
	let ms = ls.match(ss)
	if (ms && ms == ss) {
		return true;
	}else{
		return false;
	}
}

// console.log("判断两个字符串是否包含",isAnagram1(testString1,testString2))

//十八 ： 回文串
var testPalindromeString = "A man,a plan ,a canal: Panama";

function isPalindrome1(s){
	let cs = s.replace(/\s/g,"").replace(/[^a-zA-Z0-9]/g,"").toLowerCase();
	let rs = cs.split("").reverse().join("");;
	return cs == rs;
}

function isPalindrome2(s){
	let flag = true;
	let l = 0,r = s.length-1;
	while(l < r){
		while(/[^a-zA-Z0-9]/.test(s[l])){
			l++;
		}
		while(/[^a-zA-Z0-9]/.test(s[r])){
			r--;
		}
		if (l < r && s[l].toLowerCase() !== s[r].toLowerCase()) {
			flag = false;
			break;
		}
		l ++;
		r --;
	}
	return flag;
}

// console.log("判定一个字符串是否是回文串",isPalindrome2(testPalindromeString))

// 十九 ： 最长公共前缀
var testPublicString = ["floor","flower","flag"]

//1：遍历法
function longestCommonPrefix1(strs){
	if (strs.length == 0) {
		return "";
	}
	let ans = strs[0];
	for (var i = 0; i < strs.length; i++) {
		for (var j = 0; j < ans.length && j < strs[i].length; j++) {
			if (ans[j] != strs[i][j]) {
				break;
			}
		}
		ans = ans.substr(0,j)
        if (ans === "") {
        	return ans;
        }
	}
	return ans;
}

//2:递归法
/*
解题思路 ：
       1，字符串1与字符串2比较，得到公共前缀
       2，1和2的公共前缀，再与字符串3比较，得到新的公共前缀，以此类推
       3，递归的终止条件
            （1）本轮无公共前缀
            （2）无下一个字符串
*/
function longestCommonPrefix2(strs){
	var dfs = (a,j)=>{
		console.log("当前参数为",a,j)
		for (var i = 0, res = []; i < a.length; i++) {
			if (a[i] == strs[j][i]) {
				res.push(a[i])
			}else{
				break;
			}
		}
		console.log("当前匹配数组为",res)
		return res.length && strs[++j] !== undefined ? dfs(res,j):res.join("");
	}
	return strs.length == 1 ? strs[0] : dfs(strs[0] && strs[0].split("") || [],1);
}

// console.log("数组字符串中的最长公共前缀为",longestCommonPrefix2(testPublicString))

//二十 ： 爬楼梯问题
//1:错误方法
function climbStairs1(n){
	let step1 = 1;
	let step2 = 2;
	let project = 0;
	for (var i = 0; i <= n; i++) {
		let j = (n-step1*i)/step2
		if (j>=0 && j%1 == 0) {
			console.log("当前方案 "+i+" 步一阶 "+j+" 步二阶")
            project ++;
		}
		let k = (n-step2*i)/step1
		if (k >= 0 && k%1 == 0) {
			console.log("当前方案 "+i+" 步二阶 "+k+" 步一阶")
            project ++;
		}
	}
	return project;
}

//2: 递归求解 F(n) = F(n-1)+F(n-2)
function climbStairs2(n){
	if (n <= 2) {
		return n;
	}
	return climbStaris2(n-1) + climbStaris2(n-2);
}
//3 : 递归求解的优化（递归求解计算了很多重复的方法）- 记忆化递归法
function climbStairs3(n){
	let memo = new Array(n+1);
	return climbStairsMemo(n,memo)
}
function climbStairsMemo(n,memo){
	if (memo[n] > 0) {
		return memo[n]
	}
	if (n==1) {
		memo[n]=1
	}else if (n==2) {
		memo[n]=2
	}else{
		memo[n]=climbStairsMemo(n-1,memo)+climbStairsMemo(n-2,memo)
	}
	return memo[n];
}
//4 : 动态规划
function climbStairs4(n){
	if (n==1) {
		return 1;
	}
	var dp = new Array(n+1);
	console.log("声明的数组",dp)
	dp[1] = 1;
	dp[2] = 2;
	for (var i = 3; i <= n; i++) {
		dp[i] = dp[i-1]+dp[i-2];
		// console.log("数组元素为",i , dp[i])
	}
	return dp[n]
}
//4 : 斐波那契数列 : 滚动数组
function climbStairs5(n){
	if (n==1) {
		return 1;
	}
	let first = 1;
	let second = 2;
	for (var i = 3; i <= n; i++) {
		let third = first+second;
		first = second;
		second = third;
	}
	return second;
}
// console.log("爬楼梯问题",climbStairs5(50))

//二十一 ： 打家劫舍
var testMoneyHomes = [2,7,9,3,1]
//1:动态规划法-总结规律方程
function stealMoney1(nums){
	let len = nums.length;
	if (len == 0) {
		return 0;
	}
	let dp = new Array(len+1);
	dp[0] = 0;
	dp[1] = nums[0];
	for (var i = 2; i <= len; i++) {
	    dp[i] = dp[i-1] > (dp[i-2]+nums[i-1]) ? dp[i-1] : (dp[i-2]+nums[i-1]);
	}
	return dp[len]
}

function stealMoney2(nums){
	return nums.reduce((p,n)=>[p[1],(p[0]+n > p[1] ? p[0]+n:p[1])],[0,0])[1];
}

// console.log("本次偷窃的最大金额为",stealMoney2(testMoneyHomes))

//二十二 ： 汉明距离
function hanimingDistance1(x,y){
	let dis = 0;
	let z = (x ^ y).toString(2).split("");
	z.map(i=>{
		i == 1 &&(dis++);
	})
	return dis;
}

function hanimingDistance2(x,y){
	let z = (x ^ y).toString(2).split("");
	console.log("当前异或解为",z)
    return z.reduce((dis,b)=> b === "1"?dis+1:dis,0)

}


function hanimingDistance3(x,y){
	let dis = 0;
	let z = (x ^ y).toString(2).split("");
	console.log("当前异或解为",z)
	dis =  z.filter(b=>b === "1").length;
	return dis;
}

// console.log("汉明距离",hanimingDistance3(2,4))

//二十三 ： 汉字数字转化
var lowUnit = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"]
var highUnit = ["", "十", "百", "千", "万", "十", "百", "千", "亿"]

function numberToUp1(num) {
    let strN = num.toString();
    let str = "";
    let repeat = false;
    for (let i = 0; i < strN.length; i++) {
        if (	(strN[i]) == 0) {
            //如果中间有零
            if (!repeat) {
               str += lowUnit[parseInt(strN[i])]
               repeat = true;
            }
        } else {
        	repeat = false;
            str += lowUnit[parseInt(strN[i])] + highUnit[strN.length - i - 1]
        }
    }
        //如果最后几位是零
    while (str.charAt(str.length - 1) == "零") {
        str = str.substring(0, str.length - 1)
    }
    return str;
}

function SectionToChinese(section){
          var chnNumChar         = ["零","一","二","三","四","五","六","七","八","九"];
          var chnUnitSection     = ["","万","亿","万亿","亿亿"];
          var chnUnitChar     = ["","十","百","千"];
          var strIns = '', chnStr = '';
          var unitPos = 0;
          var zero = true;
          while(section > 0){
            var v = section % 10;
            if(v === 0){
              if(!zero){
                zero = true;
                chnStr = chnNumChar[v] + chnStr;
              }
            } else{
              zero = false;
              strIns = chnNumChar[v];
              strIns += chnUnitChar[unitPos];
              chnStr = strIns + chnStr;
            }
            unitPos++;
            section = Math.floor(section / 10);
        }
          return chnStr;
}

function numberToUp2(num){
        var chnNumChar      = ["零","一","二","三","四","五","六","七","八","九"];
        var chnUnitSection  = ["","万","亿","万亿","亿亿"];
        var chnUnitChar     = ["","十","百","千"];
        var unitPos = 0;
        var strIns = '', chnStr = '';
        var needZero = false;
          
        if(num === 0){
           return chnNumChar[0];
        }
 
        while(num > 0){
            var section = num % 10000;
            if(needZero){
                  chnStr = chnNumChar[0] + chnStr;
            }
            strIns = SectionToChinese(section);
            strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
            chnStr = strIns + chnStr;
            needZero = (section < 1000) && (section > 0);
            num = Math.floor(num / 10000);
            unitPos++;
          }
 
          return chnStr;
}


// console.log("数字转化",numberToUp2(18))

//二十四 有效的括号
var testPunctuation = ["{","(",")","}"];

//1:栈方式解决问题
function isValidPunctuation1(str){
	let arr = new Array();
    for(var i=0;i<str.length;i++){
            let c = str[i];
            if(c == '{' || c== '(' || c== '['){
                arr.push(c);
                // console.log("当前存储的信息为",arr)
                //括号优先级判定
                let bigIndex = arr.indexOf("{");
                let midIndex = arr.indexOf("[");
                let smlIndex =  arr.indexOf("(");
                // console.log("各个括号的索引为",bigIndex,midIndex,smlIndex)
                if (((bigIndex > -1 && midIndex >-1) && bigIndex > midIndex) 
                ||  ((bigIndex > -1 && smlIndex >-1) && bigIndex > smlIndex)
                ||  ((midIndex > -1 && smlIndex >-1) && midIndex > smlIndex)) {
                	console.log("括号位置优先级出问题了")
                	return false;
                }
            }
            else{
                if(arr.length == 0){
                    return false;
                }
                else{
                    if(c=='}' && arr.pop()!='{'){
                    	console.log("大括号缺失")
                        return false;
                    }
                    if(c==']' && arr.pop()!='['){
                    	console.log("中括号缺失")
                        return false;
                    }
                    if(c==')' && arr.pop()!='('){
                    	console.log("小括号缺失")
                        return false;
                    }
                }
            }
        }
        return  arr.length == 0;
}

//2:正则匹配
function isValidPunctuation2(str){
    const reg = /(\(\)|\{\}|\[\])/;
    let temp = str;
    while(reg.test(temp)) {
        temp = temp.replace(reg, "");
    } 
    return !temp;
}

//3:map求解
function isValidPunctuation3(str) {
    const cache = []
    const map = new Map()
    map.set("(", ")")
    map.set("[", "]")
    map.set("{", "}")
    console.log("当前map信息为",map)
    for (let i = 0; i < str.length; i++) {
        if (map.has(str[i])) cache.push(str[i])
        else {
            if (cache.length === 0) return false
            if (map.get(cache[cache.length - 1]) === str[i]) cache.pop()
            else return false
        }
    }
    return cache.length == 0
};


// console.log("括号的有效性判定",isValidPunctuation3(testPunctuation))

//二十五 ： 八皇后问题
/*在一个8*8格的国际象棋上摆放着八个皇后，
使其不能相互攻击，即任意两个皇后都不能处于同一行，同一列或者统一斜线上，
有多少种摆法？*/
//1:递归法
var surCount = 0;

function eightQueenStudio(){
	var chess = new Array();
	for (var i = 0; i < 8; i++) {
	    chess[i] = new Array();
	    for (var j = 0; j < 8; j++) {
	    	chess[i][j] = 0;
	    }
	}
	// console.log("棋盘",chess)
	eightQueen(0,8,chess)
	console.log("总共有"+surCount+"方法")

}

function notDanger(row,col,chess){
	// console.log("判定危险时的信息",row,col,chess)
   //判断列方向是否危险
	var flag1 = false;
	for (let i = 0; i < 8; i++) {
		if (chess[i][col] != 0) {
           flag1 = true;
           break;
		}
	}
	//判断左上方
	var flag2 = false;
	for (let i = row , j = col; i >= 0 && j >= 0; i--,j--) {
		if (chess[i][j] != 0) {
            flag2 = true;
            break;
		}
	}
	//判断右下方
	var flag3 = false;
	for (let i = row ,j = col; i < 8 && j < 8; i++,j++) {
		if (chess[i][j] != 0) {
            flag3 = true;
            break;
		}
	}
	//判断右上方
	var flag4 = false;
	for (let i = row , j = col; i >= 0 && j < 8; i--,j++) {
		if (chess[i][j] != 0) {
            flag4 = true;
            break;
		}
	}
	//判断左下方
	var flag5 = false;
	for (let i = row , j = col; i < 8 && j >= 0; i++,j--) {
		if (chess[i][j] != 0) {
            flag5 = true;
            break;
		}
	}

	return  flag1 || flag2 || flag3 || flag4 || flag5;
}

function eightQueen(row,col,chess){
	let surChess = new Array();
	for (let i = 0; i < 8; i++) {
	    surChess[i] = new Array();
	    for (let j = 0; j < 8; j++) {
	    	surChess[i][j] = chess[i][j];
	    }
	}

	if (row == 8) {
		surCount ++;
		console.log("这是第"+ surCount +"种成功情况")
	    console.log("成功的位置信息为",surChess)
	}else{
		//判断这个位置是否有危险
		//如果没有危险，继续向下
		for (let i = 0; i < col; i++) {
			if (!notDanger(row,i,chess)) {
				for (let j = 0; j < 8; j++) {
					surChess[row][j] = 0;
				}
				surChess[row][i] = 1;
				eightQueen(row+1,col,surChess)
			}
		}
	}

}

// console.log("八皇后问题",eightQueenStudio()) ;

// 二十六 ： 接雨水问题
var testRainArr = [1,8,6,2,5,4,8,3,7]
//1:动态规划法
function getRainVlume1(arr){
	let valume = 0;
	let leftRain = [];
	let rightRain = [];
	for (let i = 0; i < arr.length; i++) {
		let leftMax = 0;
		for (let left = i; left < arr.length; left++) {
			if (leftMax <= arr[left]) {
				leftMax = arr[left]
			}
		}
		// console.log("当前左边的最大值为",leftMax)
		leftRain.push(leftMax)
	}
	console.log("左边序列的信息",leftRain)
	for (let j = arr.length-1; j > -1; j--) {
		let rightMax = 0;
		for (let right = j; right > -1; right--) {
			if (rightMax <= arr[right]) {
				rightMax = arr[right]
			}
		}
		// console.log("当前右边的最大值为",rightMax)
		rightRain.unshift(rightMax)
	}
	console.log("右边序列的信息",rightRain)
	for (let k = 0; k < arr.length; k++) {
		let water = rightRain[k] > leftRain[k] ? leftRain[k] : rightRain[k];
		valume += (water-arr[k])
	}

	return valume;
}
//2:栈求解法
function getRainVlume2(height){
	let ans = 0;
    const stack = [];
    const len = height.length;
    for (let i = 0; i < len; i++) {
        while (stack.length && height[i] > height[stack[stack.length - 1]]) {
            const top = stack.pop();
            if (!stack.length) {
                break;
            }
            const left = stack[stack.length - 1];
            const currWidth = i - left - 1;
            const currHeight = Math.min(height[left], height[i]) - height[top];
            ans += currWidth * currHeight;
        }
        stack.push(i);
    }
    return ans;
}
//3 :双指针解法
function getRainVlume3(height){
	let ans = 0;
	let left = 0;
	let right = height.length-1;
	while(left <= right){
		let myAns = Math.min(height[left],height[right])*(right-left)
		ans = Math.max(ans,myAns)
		if (height[left] < height[right]) {
			left ++;
		}else {
            right --;
		}
	}

	return ans;

}
// console.log("接雨水问题",getRainVlume3(testRainArr))

//二十七 ： 杨辉三角问题
function generateTrangle1(n){
	let arr = new Array();
	for (let i = 0; i < n; i++) {
		arr[i] = new Array();
		for (let j = 0; j <= i; j++) {
			if(arr[i-1] && arr[i-1][j-1] && arr[i-1][j]){
				arr[i][j] = arr[i-1][j-1]+arr[i-1][j];
			}else{
				arr[i][j] = 1;
			}
		}
	}

	return arr;
}

function generateTrangle2(n){
    return Array(n).fill().map((_, i, r) => r[i] = Array(i + 1).fill(1).map((v, j) => j > 0 && j < i ? r[i - 1][j - 1] + r[i - 1][j] : v))
}
// console.log("生成的杨辉三角",generateTrangle2(5))

//二十八 ： 汉诺塔问题
var steps = 0;
function hannuoTower1(n){
   console.log(n+"块铁片的移动的步骤如下");
   move(n,"x","y","z");
}

//将n个盘子从x借助y全部移动到z上
function move1(n,x,y,z){
	steps ++;
    if (n == 1) {
    	console.log(x+"->"+z)
    }else{
    	move(n-1,x,z,y)
    	console.log(x+"->"+z)
    	move(n-1,y,x,z);
    }
}


var towerA = [2,1,0];
var towerB = [];
var towerC = [];
function hannuoTower2(A,B,C){
	let n = A.length
    move2(n, A, B, C)
    console.log("最后输出为",C)
}

function move2(m,a,b,c){
	if (m === 1) {          // 当只有一个时直接加到c中
      c.push(a.pop())
    } else {
      move2(m - 1, a, c, b)  // 将 a 上的 n - 1 个 通过 c 移到 b
      c.push(a.pop())       // 把 a 中剩下的一个直接放到 c
      move2(m - 1, b, a, c)  // 在把 b 上的 n - 1 个 通过 a 放到 c
    }

}

// console.log("汉诺塔的输出为",hannuoTower2(towerA,towerB,towerC))

//二十九 ： 跳跃游戏
//1:贪心算法

function jump1(nums){
	let reach = 0;
   for (var i = 0; i < nums.length; i++) {
        if (i > reach ) {
        	return false;
        }
        reach = Math.max(reach,i+nums[i])
   }
   return true;
	
}
//2:动态规划

function jump2(nums){
	let last = nums.length-1;
   for (var i = nums.length-1; i >= 0; i--) {
        if (i+nums[i] >= last ) {
        	last = i;
        }
   }
   return last == 0;
	
}

//3:跳跃游戏II
function jump3(nums){
    let position = nums.length - 1;
    let steps = 0;
    while (position > 0) {
        for (let i = 0; i < position; i++) {
            if (i + nums[i] >= position) {
                position = i;
                steps++;
                break;
            }
        }
    }
    return steps;

}



// console.log("跳跃游戏",jump2([3,2,1,0,4]))

// 三十 ： 直线上最多的点
var testLinePoints = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]];

function maxPointsOnline(points){
	if (points.length <= 2) {
		return points.length;
	}
	var map = new Map();
	for (let i = 0; i < points.length; i++) {
		for (let j = 0; j < points.length; j++) {
			if ((points[j][0] != points[i][0]) || (points[j][1] != points[i][1])) {
		       let rate = (points[j][1]-points[i][1])/(points[j][0]-points[i][0]);
				if (Math.abs(rate) == 0 ) {
					rate = 0
				}
				if (Math.abs(rate) == infinity) {
					rate = infinity
				}
				if (map.has(rate)) {
					let arr = map.get(rate);
				    if (arr.indexOf(points[i]) < 0) {
						arr.push(points[i])
						map.set(rate,arr);
				    }
		        }else{
			        map.set(rate,[points[i]])
			    }
			}
		    
		}
	}
	console.log("存储的信息为",map)
	var max = 0
	for(let item of map.values()){
		if (max <= item.length) {
			max = item.length
		}

	}

	return max;

}

// console.log("直线上最多的点",maxPointsOnline(testLinePoints))

//三十一 ： 二叉树的遍历
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


var myTree = new TreeCode();
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

// 三十二 ： 逆波兰表达式
var testTokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"];
function poLand(tokens) {
    const stack = [];
    const n = tokens.length;
    for (let i = 0; i < n; i++) {
        const token = tokens[i];
        if (isNumber(token)) {
            stack.push(parseInt(token));
        } else {
            const num2 = stack.pop();
            const num1 = stack.pop();
            if (token === '+') {
                stack.push(num1 + num2);
            } else if (token === '-') {
                stack.push(num1 - num2);
            } else if (token === '*') {
                stack.push(num1 * num2);
            } else if (token === '/') {
                stack.push(num1 / num2 > 0 ? Math.floor(num1 / num2) : Math.ceil(num1 / num2));
            }
        }
    }
    return stack.pop();
};

const isNumber = (token) => {
    return !('+' === token || '-' === token || '*' === token || '/' === token );
}

// console.log("逆波兰算法",poLand(testTokens))

// 三十三 ： 矩形面积
function computeArea (A, B, C, D, E, F, G, H) {
	let width  = Math.min(C,G) - Math.max(A,E),
        height = Math.min(D,H) - Math.max(B,F),
        commonArea = Math.max(width,0) * Math.max(height,0)
    return (C-A)*(D-B) + (G-E)*(H-F) - commonArea
};

// console.log("两个矩形的面积",computeArea(-3,0,3,4,0,-1,9,2))

// 三十四 ： 岛屿数量
var testIsLandArr = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]

//1:DFS深度优先搜索
function numofIslandDFS(grid){
  let res = 0;
  const rows = grid.length;
  if (rows === 0) return 0;
  const cols = grid[0].length;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === "1") {
        helper(grid, i, j, rows, cols);
        console.log("经过一次深度优先搜索后",grid)
        res++;
      }
    }
  }

  return res;

}

function helper(grid, i, j, rows, cols) {
  if (i < 0 || j < 0 || i > rows - 1 || j > cols - 1 || grid[i][j] === "0")
    return;

  grid[i][j] = "0";

  helper(grid, i + 1, j, rows, cols);
  helper(grid, i, j + 1, rows, cols);
  helper(grid, i - 1, j, rows, cols);
  helper(grid, i, j - 1, rows, cols);
}

//2:BFS广度优先搜索
function numofIslandBFS(grid){
  if(grid.length < 1) return 0
  let m = grid.length
  let n = grid[0].length
  let islands = 0
  for(let i = 0; i < m; i++){
    for(let j = 0; j < n; j++){
      if(grid[i][j] == 1){
        islands++
        grid[i][j] = 0            // 把查找过的项变成0 防止重新查找
        let queue = []
        queue.push([i, j])        // 把当前点加入队列
        while(queue.length > 0){  // 当队列不为空时, 继续循环
          let cur = queue.shift()  // 拿出队列第一项
          let x = cur[0], y = cur[1]
          // 上下左右检查
          if(x - 1 >= 0 && grid[x-1][y] == 1){  // 上
            queue.push([x - 1, y])
            grid[x - 1][y] = 0
          }
          if(x + 1 < m && grid[x + 1][y] == 1){  // 下
            queue.push([x + 1, y])
            grid[x + 1][y] = 0
          }
          if(y - 1 >= 0 && grid[x][y - 1] == 1){  // 左
            queue.push([x, y - 1])
            grid[x][y - 1] = 0
          }
          if(y + 1 < n && grid[x][y + 1] == 1){  // 右
            queue.push([x, y + 1])
            grid[x][y + 1] = 0
          }
        }
      }
    }
  }
  return islands
}

// console.log("有多少个岛屿",numofIslandBFS(testIsLandArr)) 

//三十五 ： 最大正方形
var testMaxMatrix1 = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]];
var testMaxMatrix2 = [["1"]];

//1:暴力求解
function maximalSquare1(matrix){
	let rows = matrix.length,
        cols = rows > 0 ? matrix[0].length : 0;
    let maxSideLength = 0; // 表示最大的边长
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (matrix[i][j] === "1") {
                let flag = true,
                sideLength = 1;
                while (i + sideLength < rows && j + sideLength < cols && flag) {
                    for (let k = i; k <= i + sideLength; k++) {
                        // 注意此处是j+sideLength
                        if (matrix[k][j+sideLength] === "0") {
                            flag = false;
                            break;
                        }
                    }
                    
                    for (let k = j; k <= j + sideLength; k++) {
                        // 注意此处是i+sideLength
                        if (matrix[i+sideLength][k] === "0") {
                            flag = false;
                            break;
                        }
                    }
                    
                    if (flag) {
                        sideLength++;
                    }
                }
                maxSideLength = Math.max(maxSideLength, sideLength);
            }
        }
    }
    return maxSideLength * maxSideLength;
}

//2:动态规划
function maximalSquare2(matrix){
	let rows = matrix.length,
        cols = rows > 0 ? matrix[0].length : 0;
    let maxSideLength = 0;
    // 初始化二维数组
    // dp[i][j]表示matrix[i-1][j-1]所能构成的正方形的最大边长
    let dp = new Array(rows+1);
    for (let i = 0; i <= rows; i++) {
        dp[i] = new Array(cols+1).fill(0);
    }
    console.log("初始化数组为",dp)
    
    for (let i = 1; i <= rows; i++) {
        for (let j = 1; j <= cols; j++) {
            if (matrix[i-1][j-1] === "1") {
                // 状态转移方程
                dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1;
                maxSideLength = Math.max(maxSideLength, dp[i][j]);
            }
        }
    }
    console.log("最终数组为",dp)
    return maxSideLength * maxSideLength;
}


// console.log("当前可以组成的最大正方形面积为",maximalSquare2(testMaxMatrix1))

//三十六 ：回溯算法求解全排列
//1: 全排列I
function permute1(nums){
  const res = [];
  const used = {};

  function backtracing(path) {
    if (path.length == nums.length) { // 个数选够了
      res.push(path.slice()); // 拷贝一份path，加入解集res
      return;                 // 结束当前递归分支
    }
    for (const num of nums) { // for枚举出每个可选的选项
      if (used[num]) continue; // 使用过的，跳过
      path.push(num);         // 选择当前的数，加入path
      used[num] = true;       // 记录一下 使用了
      backtracing(path);              // 基于选了当前的数，递归
      path.pop();             // 上一句的递归结束，回溯，将最后选的数pop出来
      used[num] = false;      // 撤销这个记录

    }
  }

  backtracing([]); // 递归的入口，空path传进去
  console.log("一共有",res.length,"种情况")
  return res;

}

//2:全排列II

function permute2(nums){
  nums.sort((a, b) => {
        return a - b
    })
    let res = []
    let path = []

    function backtracing(used) {
        if (path.length === nums.length) {
            res.push(path.slice())
            return
        }
        for (let i = 0; i < nums.length; i++) {
            if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
                continue
            }
            if (!used[i]) {
                used[i] = true
                path.push(nums[i])
                backtracing(used)
                path.pop()
                used[i] = false
            }
        }
    }
    backtracing([])
    console.log("一共有",res.length,"种情况")
  	return res;

}





// console.log("测试有多少种排列情况",permute2([1,1,2]))

//三十七 ： 分发糖果
var testStudentScore  = [1,0,2]
//1:双重遍历
function sortCandy1(ratings){
	const n = ratings.length;
    const left = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        if (i > 0 && ratings[i] > ratings[i - 1]) {
            left[i] = left[i - 1] + 1;
        } else {
            left[i] = 1;
        }
    }

    let right = 0, ret = 0;
    for (let i = n - 1; i > -1; i--) {
        if (i < n - 1 && ratings[i] > ratings[i + 1]) {
            right++;
        } else {
            right = 1;
        }
        ret += Math.max(left[i], right);
    }
    return ret;

}

//2 动态规划：双指针
function sortCandy2(ratings){
	let i = 0, r = new Array(ratings.length).fill(1), j = ratings.length - 1
    while (i < ratings.length - 1) {
        if (ratings[++i] > ratings[i - 1]) r[i] = Math.max(r[i], r[i - 1] + 1)
        if (ratings[--j] > ratings[j + 1]) r[j] = Math.max(r[j], r[j + 1] + 1)
    }
    return r.reduce((p, v) => p + v)
}

//3:线性扫描
function sortCandy3(ratings){
	 let i = 0, r = new Uint16Array(ratings.length)
    r[0] = 1
    while (++i < ratings.length) // 初始每人1个时，上解法保留if，删Math.max即可
        r[i] = ratings[i] > ratings[i - 1] ? r[i - 1] + 1 : 1
    i--
    while (i--) // r[i] = Math.max(r[i], r[i + 1] + 1) 写成判断后，并入条件
        if (ratings[i] > ratings[i + 1] && r[i + 1] + 1 > r[i]) r[i] = r[i + 1] + 1
    return r.reduce((p, v) => p + v)

}
// console.log("一共需要多少糖果",sortCandy3(testStudentScore))


//三十八 ： 加油站
var testGas = [2,3,4];
var testCost =[3,4,3];

//贪心算法
function canCompleteCircuit(gas,cost){
	let ben = -1; 
	let oil = 0;
	for (var i = 0; i < gas.length; i++) {
		if (gas[i] >= cost[i]) {
			ben = i;
			oil = gas[i]-cost[i];
			console.log("测试开始点",i)
			for (var j = i+1; j <= gas.length+i; j++) {
				let k = j % gas.length;
				oil += (gas[k]-cost[k])
				console.log("当前剩余油量",k,oil)
				if (oil < 0) {
					break;
				}
				if (k == ben && oil >= 0) {
					return ben;
				}
				
			}
		}
	}
	return ben;
}

// console.log("加油站问题",canCompleteCircuit(testGas,testCost))

//三十九 ： 地下城游戏
var testDungeonArr = [[-2,-3,3],[-5,-10,1],[10,30,-5]];

//1:DFS
function calculateMinimumHP1(dungeon){
  const m = dungeon.length;
  const n = dungeon[0].length;
  // memo初始化，每一项都为0，代表还没记录
  const memo = new Array(m);
  for (let i = 0; i < m; i++) {
    memo[i] = new Array(n).fill(0);
  }
  const minSaveHP = (dungeon, i, j) => {
    if (i == m - 1 && j == n - 1) { // 递归的出口
      return dungeon[i][j] > 0 ? 1 : 1 - dungeon[i][j];
    }
    if (memo[i][j] > 0) return memo[i][j]; // 如果备忘录中有，就直接返回它
    let goDown = Infinity, goRight = Infinity;
    if (i < m - 1)                         // 走下方的点，需要带着的最小安全血量
      goDown = minSaveHP(dungeon, i + 1, j);
    if (j < n - 1)                         // 走右方的点，需要带着的最小安全血量
      goRight = minSaveHP(dungeon, i, j + 1);
    if (goDown < goRight) {
      if (goDown - dungeon[i][j] <= 0) {
        memo[i][j] = 1;
      } else {
        memo[i][j] = goDown - dungeon[i][j];
      }
    } else {
      if (goRight - dungeon[i][j] <= 0) {
        memo[i][j] = 1;
      } else {
        memo[i][j] = goRight - dungeon[i][j];
      }
    }
    console.log("记忆路线为",memo)
    return memo[i][j];
  };
  return minSaveHP(dungeon, 0, 0, memo);

}

//2:动态规划
function calculateMinimumHP2(dungeon){
	 let m = dungeon.length;
    let n = dungeon[m-1].length;
    let dp = [];
    for(let i=0;i<=m;i++){
         dp[i] = new Array(n+1).fill(Infinity);//这里之所以m和n都要+1，是为了m-1>=0,n-1>=0; 动态规划系列解法都如此;
    }
    dp[m][n-1] = dp[m-1][n] = 1;//当到达p后，假设刚好剩下1滴血;
    // console.log("初始数组为",dp)
    for(let i = m-1;i >= 0; i--){
        for(let j = n-1; j >= 0; j--){
            let minHp = Math.min(dp[i+1][j]-dungeon[i][j],dp[i][j+1]-dungeon[i][j]);//因为只能向右或向下，所以求出向右或者向下时，消耗最低的那一步;
            dp[i][j] = Math.max(minHp,1);//dp[i][j]是我们到达此坐标，还剩多少血;
        }
    }
    // console.log("最终数组为",dp)
    return dp[0][0];//出发时的最低血量
}
// console.log("最少需要携带的血量",calculateMinimumHP2(testDungeonArr))


//四十 ： 路经总和

class Node { // 定义节点
    constructor(data){
        this.data = data
        this.leftChild = null
        this.rightChild = null
    }
}

const createTree = (arr) => { // 创建二叉树
    let tree = new Node(arr[0])
    let Nodes = [tree]
    let i = 1
    for (let node of Nodes){
        Nodes.push(node.leftChild = new Node (arr[i]))
        i += 1
        if (i == arr.length) return tree
        Nodes.push(node.rightChild = new Node(arr[i]))
        i += 1
        if (i == arr.length) return tree
    }
}




var testRoot = [5,4,8,11,null,13,4,7,2,null,null,null,1];
//1：深度优先遍历
function hasPathSum1(root,targetSum) {
  if (!root) {
    return false;
  }

  if (!root.leftChild && !root.rightChild) {
    return root.data === targetSum;
  }

  return hasPathSum(root.leftChild, targetSum - root.data) || hasPathSum(root.rightChild, targetSum - root.data);
};

//2:广度优先遍历
var hasPathSum2 = function(root, targetSum) {
    // 利用双色标记法来实现层次遍历
    let queue = [['white',root,0]];
    console.log("初始队列为",queue)
    while(queue.length){
        let [color,node,sum] = queue.shift();
        if(node===null) continue;
        // 当节点颜色是白时 表示未遍历的节点
        if(color === 'white'){
            // 把当前节点的值累加
            let target = sum+node.data;
            queue.push(['gray',node,target])
            queue.push(['white',node.leftChild,target])
            queue.push(['white',node.rightChild,target])
            // 当改节点是叶子节点并且当前累加的值等于目标时返回true
            if(node.rightChild===null&&node.leftChild===null&&target===targetSum){
                return true
            }
        }
    }
    return false
};


// let tree = createTree(testRoot)
// console.log("生成的二叉树",tree)
// console.log("是否含有和",hasPathSum2(tree,22))	

// 四十一 ： 三数之和为零
var testZeroNums = [-1,0,1,2,-1,-4]

function threeSumZero1(nums){
	let res = new Map()
      for (let i = 0; i < nums.length - 2; i++) { // 每个人
        for (let j = i + 1; j < nums.length - 1; j++) { // 依次拉上其他每个人
          for (let k = j + 1; k < nums.length; k++) { // 去问剩下的每个人
            if (nums[i] + nums[j] + nums[k] === 0) { // 我们是不是可以一起组队
              let part = [nums[i], nums[j], nums[k]]
              part.sort((a,b)=>a-b)
              if (!res.has(part)) {
              	res.set(part,part)
              }
            }
          }
        }
      }
      console.log("哈希表",res)
      let arr = []
       res.forEach(function(key,value){
          arr.push(value)
       })
      return arr
}

function threeSumZero2 (nums) {
    const result = [];
    //为方便去重，首先将数组排序
    nums.sort((a,b) => a - b);
    for(let i=0;i<nums.length;i++){
        //跳过重复数字
        if(i && nums[i] === nums[i - 1]){
            continue;
        }
        let left = i + 1;
        let right = nums.length - 1;
        while(left < right){
            const sum = nums[i] + nums[left] + nums[right];
            if(sum > 0){
                //将right向左移动一位
                right--;
            }else if(sum < 0){
                left++;
            }else{
                //当三数之和为0时，将数组添加到result中，同时将left和right分别沿各自方向移动到下一位
                result.push([nums[i], nums[left++], nums[right--]]);
                //跳过重复数字
                while(nums[left] === nums[left - 1]){
                    left++;
                }
                while(nums[right] === nums[right + 1]){
                    right--;
                }
            }
        }
    }
    return result;
};



// console.log("三数之和求解",threeSumZero2(testZeroNums))


// 四十二 ： 数字按位与
//1:位移算法（不正确）
function rangeBitwiseAnd1(left , right)
{
	let shift = 0;
	while(left < right){
		left >>=1
		console.log("当前左边的数位",left)
		right >>= 1
		console.log("当前右边的数位",right)
		shift ++
	}

	return left << shift
}

function rangeBitwiseAnd2(left , right){
	return left & right

}

// console.log("两个数字按位与",rangeBitwiseAnd2(5,6))

//四十三 ： 两个链表相加
var testLinkList1 = [2,4,3]
var testLinkList2 = [5,6,7]

//1:数组解
function addTwoNumbers1(l1,l2){
	let len = l1[l1.length-1]+l2[l2.length-1] >= 10 ? l1.length+1 : l1.length 
	let l3 = new Array(len)
	for (var i = 0; i < l3.length; i++) {
		l3[i] = 0
	}
	console.log("新的数组队列为",l3)
	for (var i = 0; i < l1.length; i++) {
		l3[i] += (l1[i]+l2[i])%10
		if (l1[i]+l2[i] >= 10) {
			l3[i+1] += 1
		}
	}

	return l3
}
//2:链表解
function addTwoNumbers2(l1,l2){
	let head = null, tail = null;
    let carry = 0;
    while (l1 || l2) {
        const n1 = l1 ? l1.val : 0;
        const n2 = l2 ? l2.val : 0;
        const sum = n1 + n2 + carry;
        if (!head) {
            head = tail = new ListNode(sum % 10);
        } else {
            tail.next = new ListNode(sum % 10);
            tail = tail.next;
        }
        carry = Math.floor(sum / 10);
        if (l1) {
            l1 = l1.next;
        }
        if (l2) {
            l2 = l2.next;
        }
    }
    if (carry > 0) {
        tail.next = new ListNode(carry);
    }
    return head;

}
// console.log("两个链表相加测试",addTwoNumbers2(testLinkList1,testLinkList2))


// 四十四 ： 最长不重复字符串
var testLongestArr = "aabcabg"
//1:暴力求解
function lengthOfLongestSubstring1(str){
	let s = str.split("")
	let l = 0
	for (var i = 0; i < s.length; i++) {
		let tem = [];
		for (var j = i; j < s.length; j++) {
			if (tem.indexOf(s[j]) < 0) {
				tem.push(s[j])
			}else{
				l = l > tem.length ? l : tem.length
				break
			}
		}
		
	}
	return l;

}
//2:滑动窗口
function lengthOfLongestSubstring2(s){
    const occ = new Set();
    const n = s.length;
    // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
    let rk = -1, ans = 0;
    for (let i = 0; i < n; ++i) {
        if (i != 0) {
            // 左指针向右移动一格，移除一个字符
            occ.delete(s.charAt(i - 1));
        }
        while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
            // 不断地移动右指针
            occ.add(s.charAt(rk + 1));
            ++rk;
        }
        // 第 i 到 rk 个字符是一个极长的无重复字符子串
        ans = Math.max(ans, rk - i + 1);
    }
    return ans;
}

// console.log("最长字符串个数",lengthOfLongestSubstring2(testLongestArr))

//四十五 ： 寻找两个数组的中位数
var testSubArr1 = [1,6]
var testSubArr2 = [3,4,5]
function findMedianSortedArrays(nums1, nums2){
	let num = nums1.concat(nums2)
	num.sort((a,b) => a-b)
	console.log("重新组合后的数组为",num)
	if (num.length % 2 == 0) {
		let ind = num.length/2; 
		return ( num[ind] + num[ind-1] )/2
	}else{
		let ind = Math.floor(num.length/2)
		return num[ind]
	}
}

// console.log("两个数组的中位数",findMedianSortedArrays(testSubArr1,testSubArr2))

//四十六 ： 最长回文串
var testLongestPalindrome = "aabcbabg"

function longestPalindrome1(s){
	let arr = s.split("")
	let all = [];
	for (var i = 0; i < arr.length; i++) {
		for (var j = arr.length-1; j > i; j--) {
			if (arr[i] == arr[j]) {
				all.push(s.substr(i,j-i+1))
				break;
			}
		}
	}

	console.log("所有的串",all)

	for (var i = 0; i < all.length; i++) {
		let str = all[i]
		let atr = str.split("")
		for (var j = 0; j < Math.floor(atr.length/2) ; j++) {
			if (atr[j] != atr[atr.length-j]) {
				all.splice(i,1)
			}
			
		}
	}

	console.log("所有的回文串",all)



	all.sort((a,b)=>b.split("").length - a.split("").length)

	console.log("排序后的回文串",all)


	return all[0]


}

function longestPalindrome2(s){
	if(s.length < 2) return s
    var len = s.length
    var result = ''

    for	(let i = 0; i < len; i++){
        // 分别处理奇数偶数情况
        getResult(i,i)
        getResult(i,i+1)
    }

    function getResult(m,n){
        while(m >= 0 && n < len && s[m] == s[n]){
            m--
            n++
        }
        // 此刻循环结束，也是刚刚不满足条件的时候，mn需要分别向前取一位
        if(n - m - 1 > result.length) {
            result = s.slice(m + 1, n)
        }
    }
    return result

}

// console.log("最长回文串",longestPalindrome1(testLongestPalindrome))


//四十七 ： 字符串转数字
//1:自动机
/**
 * @param {string} str
 * @return {number}
 */
function myAtoi1(str) {
  // 自动机类
  class Automaton{
    constructor() {
      // 执行阶段，默认处于开始执行阶段
      this.state = 'start';
      // 正负符号，默认是正数
      this.sign = 1;
      // 数值，默认是0
      this.answer = 0;
      /*
      关键点：
      状态和执行阶段的对应表
      含义如下：
      [执行阶段, [空格, 正负, 数值, 其他]]
      */
      this.map = new Map([
        ['start', ['start', 'signed', 'in_number', 'end']],
        ['signed', ['end', 'end', 'in_number', 'end']],
        ['in_number', ['end', 'end', 'in_number', 'end']],
        ['end', ['end', 'end', 'end', 'end']]
      ])
    }

    // 获取状态的索引
    getIndex(char) {
      if (char === ' ') {
        // 空格判断
        return 0;
      } else if (char === '-' || char === '+') {
        // 正负判断
        return 1;
      } else if (typeof Number(char) === 'number' && !isNaN(char)) {
        // 数值判断
        return 2;
      } else {
        // 其他情况
        return 3;
      }
    }

    /*
    关键点：
    字符转换执行函数
    */
    get(char) {
      /*
      易错点：
      每次传入字符时，都要变更自动机的执行阶段
      */
      this.state = this.map.get(this.state)[this.getIndex(char)];

      if(this.state === 'in_number') {
        /*
        小技巧：
        在JS中，对字符串类型进行减法操作，可以将得到一个数值型（Number）的值

        易错点：
        本处需要利用括号来提高四则运算的优先级
        */
        this.answer = this.answer * 10 + (char - 0);

        /*
        易错点：
        在进行负数比较时，需要将INT_MIN变为正数
        */
        this.answer = this.sign === 1 ? Math.min(this.answer, Math.pow(2, 31) - 1) : Math.min(this.answer, -Math.pow(-2, 31));
      } else if (this.state === 'signed') {
        /*
        优化点：
        对于一个整数来说，非正即负，
        所以正负号的判断，只需要一次。
        故，可以降低其判断的优先级
        */
        this.sign = char === '+' ? 1 : -1;
      }
    }
  }

  // 生成自动机实例
  let automaton = new Automaton();

  // 遍历每个字符
  for(let char of str) {
    // 依次进行转换
    automaton.get(char);
  }

  // 返回值，整数 = 正负 * 数值
  return automaton.sign * automaton.answer;
};


//2:parseInt
function myAtoi2(str){
	const number = parseInt(str, 10);
    if(isNaN(number)) {
        return 0;
    } else if (number < Math.pow(-2, 31) || number > Math.pow(2, 31) - 1) {
        return number < Math.pow(-2, 31) ? Math.pow(-2, 31) : Math.pow(2, 31) - 1;
    } else {
        return number;
    }

}


// console.log("字符串转数字",myAtoi2("-78myAtoi89"))

//四十八 ： 回文数
//1:逐个比较
function isPalindrome1(x){
	let s = x.toString().split("")
	for (var i = 0; i < Math.floor(s.length/2); i++) {
		if(s[i] != s[s.length-1-i]){
			return false
		}
	}
	return true
}

//2:反转
function isPalindrome2(x) {
    if(x < 0 || (!(x % 10) && x)) return false;
    let x2 = x, res = 0;
    while(x2){
        res = res * 10 + x2 % 10;
        x2 = ~~(x2 / 10);
        console.log("运算后x2的值",x2)
    }
    return res === x;
};


// console.log("判定一个数是不是回文数",isPalindrome2(515))

//四十九 ：正则表达式匹配
function regularIsMatch(s,p){
  if (s == null || p == null) return false;

  const sLen = s.length, pLen = p.length;

  const dp = new Array(sLen + 1);
  for (let i = 0; i < dp.length; i++) {
    dp[i] = new Array(pLen + 1).fill(false); // 将项默认为false
  }
  // base case
  dp[0][0] = true;
  for (let j = 1; j < pLen + 1; j++) {
    if (p[j - 1] == "*") dp[0][j] = dp[0][j - 2];
  }
  // 迭代
  for (let i = 1; i < sLen + 1; i++) {
    for (let j = 1; j < pLen + 1; j++) {

      if (s[i - 1] == p[j - 1] || p[j - 1] == ".") {
        dp[i][j] = dp[i - 1][j - 1];
      } else if (p[j - 1] == "*") {
        if (s[i - 1] == p[j - 2] || p[j - 2] == ".") {
          dp[i][j] = dp[i][j - 2] || dp[i - 1][j - 2] || dp[i - 1][j];
        } else {
          dp[i][j] = dp[i][j - 2];
        }
      }
    }
  }
  return dp[sLen][pLen]; // 长sLen的s串 是否匹配 长pLen的p串

}
// 五十 ： 排序算法
var testSortArr = [5,2,6,0,3,9,1,7,4,8]


/*
两两比较
*/
//1.1 : 冒泡排序
function normalSort1(arr){
	let  n = arr.length;
	let temp = 0;
	let count1 = 0;
	let count2 = 0;
	for (var i = 0; i < n-1; i++) {
		for (var j = i+1; j < n; j++) {
			count1 ++
			if (arr[i] > arr[j]) {
				count2 ++
				temp = arr[j]
				arr[j] = arr[i]
				arr[i] = temp
			}
		}
	}
	console.log("总共进行了"+count1+"次比较","总共进行了"+count2+"次移动")
	return arr;

}

//1.2 : 冒泡排序优化
function bubbleSort2(arr){
	let  n = arr.length;
	let temp = 0;
	let count1 = 0;
	let count2 = 0;
	let flag = true;
	for (var i = 0; i < n-1 && flag; i++) {
		for (var j = n-1; j > i; j--) {
			count1 ++
			flag = false
			if (arr[j-1] > arr[j]) {
				count2 ++
				temp = arr[j-1]
				arr[j-1] = arr[j]
				arr[j] = temp
				flag = true;
			}
		}
	}
	console.log("总共进行了"+count1+"次比较","总共进行了"+count2+"次移动")
	return arr;
}

//2 ：直接选择排序
function selectSort(arr){
	let temp = 0 
	let n = arr.length;
	let count1 = 0;
	let count2 = 0;
	for (var i = 0; i < n-1; i++) {
		let min = i;
		for (var j = i+1; j < n; j++) {
			count1 ++;
			if (arr[j] < arr[min]) {
				min = j
			}
		}

		if (min != i) {
			count2 ++
			temp = arr[min]
			arr[min] = arr[i]
			arr[i] = temp
		}
		
	}
	console.log("总共进行了"+count1+"次比较","总共进行了"+count2+"次移动")
	return arr
}

/*
将待排序的数插入到已经排好的序列中
*/
//3 : 直接插入排序
function insertSort(arr){
	let temp = 0;
	for (var i = 1; i < arr.length; i++) {
		if (arr[i] < arr[i-1]) {
			temp = arr[i]
			for (var j = i-1; arr[j] > temp; j--) {
				arr[j+1] = arr[j]
			}
			arr[j+1] = temp;
		}
	}
	return arr;

}

//4 : 希尔排序
function shellSort(arr){
	let temp = 0
	let gap = arr.length;
	while(gap > 1){
		gap = Math.floor(gap/3)+1
		for (var i = gap; i < arr.length; i++) {
			if (arr[i] < arr[i-gap]) {
				temp = arr[i]
				for (var j = i-gap; arr[j] > temp; j-=gap) {
					arr[j+gap]=arr[j];
				}
				arr[j+gap]=temp
			}
		}
	}

	return arr
}


function swap(k,i,j){
		let temp = 0;

		temp = k[i]
		k[i] = k[j]
		k[j] = temp;

}


/*完全二叉树 大顶堆/小顶堆*/
//5 ： 堆排序
function heapSort(arr){
	let n = arr.length
	let swap = function(k,i,j){
		let temp = 0;

		temp = k[i]
		k[i] = k[j]
		k[j] = temp;

	}

	let heapAdjust = function(k,s,n){
		let temp;

		temp = k[s]

		for (var i = 2*s; i < n; i*=2) {
			if (i<n && k[i]<k[i+1]) {
				i++
			}

			if (temp>=k[i]) {
				break;
			}

			k[s] = k[i]
			s = i
		}

		k[s] = temp

	}


	for (var i = Math.floor(n/2); i > 0; i--) {
		heapAdjust(arr,i,n)
	}
	for (var i = n; i > 1; i--) {
		swap(arr,1,i);
		heapAdjust(arr,1,i-1)
	}

	return arr;
}

//6:归并排序
function mergeSort(arr){
	let len = arr.length
    if (len < 2) {
        return arr
    }
	let middle = Math.floor(len/2) 
	let leftArr = arr.slice(0,middle);
	let rightArr = arr.slice(middle,len);
	let mergeSortLeft = mergeSort(leftArr)
    let mergeSortRight = mergeSort(rightArr)
    //合并
    return merging(mergeSortLeft,mergeSortRight)
	
}

function merging(leftArr,rightArr){
	const result = [];

    while (leftArr.length && rightArr.length) {
        if (leftArr[0] <= rightArr[0]) {
            result.push(leftArr.shift()); 
        } else {
            result.push(rightArr.shift());
        }
    }
    while (leftArr.length) result.push(leftArr.shift());

    while (rightArr.length) result.push(rightArr.shift());

    return result;


}
//7:快速排序
function quickSort(arr){
	quick(arr,0,arr.length-1)
	return arr;
}

function quick(arr,low,high){
	let point

	if (low < high) {
		point = partition(arr,low,high);

		quick(arr,low,point-1);

		quick(arr,point+1,high);
	}
}

function partition(arr,low,high){
	let point = arr[low];
	
	while(low < high){
		while(low < high && arr[high] >= point){
			high --;
		}
		swap(arr,low,high);
		while(low < high && arr[low] <= point){
			low ++;
		}
		swap(arr,low,high);

	}

	return low;
}

// console.log("快速排序算法",quickSort(testSortArr))


//五十一 ： 跳跃游戏

var testJumpArr = [3,5,1,0,0,0,0,0,0,0,0,0,4]

function jumpDetection(nums){
	if(nums.length === 1) return true
    let cover = 0
    for(let i = 0; i <= cover; i++) {
        cover = Math.max(cover, i + nums[i])
        if(cover >= nums.length - 1) {
            return true
        }
    }
    return false
}

// console.log("跳跃游戏测试",jumpDetection(testJumpArr))


//五十二： 实现 strStr()
function strSTR(haystack,needle)
{
	if(needle == null || haystack == null || needle.length == 0 || haystack.length == 0){
		return 0
	}else{
		for(var j = 0; j < haystack.length; j++){
			if (haystack.charAt[j] == needle.charAt[0]) {
				let same = 0;
				for (var i = 0; i < needle.length; i++) {
					if(haystack.charAt(j+i) == needle.charAt(i)){
						same ++
					}
				}
				if (same == needle.length) {
					return same;
				}

			}

		}
		
	}
	return -1;

}

// console.log("字符串出现的第一个位置为：",strSTR("","a"))

//五十三 ： 除法运算
function divide(dividend, divisor){
	if (divisor == 0) {
		return
	}
	let answer = 0
	let dividended = Math.abs(dividend)
	let divisored = Math.abs(divisor)
	while(dividended >= divisored){
        dividended -= divisored
		answer ++
	}
    if ((divisor < 0 && dividend > 0) || (dividend < 0 && divisor > 0) ) {
    	answer = -answer

    }
    if (!Number.isFinite(answer)) {
    	return Number.MAX_SAFE_INTEGER;
    }
    return answer;

}

// console.log("除法测试",divide(1,1))


//五十四 ：下一个排列
function nextPermutation(nums) {
    let i = nums.length - 2;                   // 向左遍历，i从倒数第二开始是为了nums[i+1]要存在
    while (i >= 0 && nums[i] >= nums[i + 1]) { // 寻找第一个小于右邻居的数
        i--;
    }
    if (i >= 0) {                             // 这个数在数组中存在，从它身后挑一个数，和它换
        let j = nums.length - 1;                // 从最后一项，向左遍历
        while (j >= 0 && nums[j] <= nums[i]) {  // 寻找第一个大于 nums[i] 的数
            j--;
        }
        [nums[i], nums[j]] = [nums[j], nums[i]]; // 两数交换，实现变大
    }
    // 如果 i = -1，说明是递减排列，如 3 2 1，没有下一排列，直接翻转为最小排列：1 2 3
    let l = i + 1;           
    let r = nums.length - 1;
    while (l < r) {                            // i 右边的数进行翻转，使得变大的幅度小一些
        [nums[l], nums[r]] = [nums[r], nums[l]];
        l++;
        r--;
    }

    return nums;
}


// console.log("下一个数列算法测试",nextPermutation([5,2,1,3,2]))


//五十五 ： 幂
function myPow(x,n){
	return x ** n;
}

// console.log("幂的计算",myPow(2.1,3))

//五十六 ： 搜索插入位置
//1:遍历法查找
function searchInsert1(nums,target){
	if (nums.indexOf(target) >= 0 ) {
		return nums.indexOf(target)
	}else{
		if (target >= nums[nums.length-1]) {
			return nums.length;
		}
		for (var i = 0; i < nums.length; i++) {
			if (nums[i] >= target) {
				return i
			}
			
		}
	}

}


//二分法查找
function searchInsert2(nums, target) {
    const n = nums.length;
    let left = 0, right = n - 1, ans = n;
    while (left <= right) {
        let mid = ((right - left) >> 1) + left;
        if (target <= nums[mid]) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return ans;
};

// console.log("搜索插入位置",searchInsert2([1,3,5,6],5))

//五十七 ： 字符异位词分组
function groupAnagrams(strs){
	let map = new Map();
	for (let i = 0; i < strs.length; i++) {
		let str = strs[i].split("").sort().toString();
		if (map.has(str)) {
            map.set(str,[...map.get(str),strs[i]])
		}else{
			map.set(str,[strs[i]])
		}
	}
	let arr = []
    map.forEach(function(key,value){
        arr.push(key)
    })
    return arr

}

// console.log("字符异位词分组",groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))


//五十八 ： 组合总和

//回溯算法
function combinationSum(candidates, target){
	const res = []; path = [], len = candidates.length;
    candidates.sort();
    backtracking(0, 0);
    return res;
    function backtracking(sum, i) {
        if (sum > target) return;
        if (sum === target) {
            res.push(Array.from(path));
            return;
        }
        let f = -1;
        for(let j = i; j < len; j++) {
            const n = candidates[j];
            if(n > target - sum || n === f) continue;
            path.push(n);
            sum += n;
            f = n;
            backtracking(sum, j + 1);
            path.pop();
            sum -= n;
        }
    }
}


// console.log("组合总和",combinationSum([10,1,2,7,6,1,5],8))

//五十九 ： 递归函数顺序的理解
function foo(i){
    if(i==4){
    	console.log("满足递归终止条件")
        return;
    }
    console.log("fb:" + i);
    foo(i + 1);
    console.log("fe:" + i);
}  


// 伪代码：
        // foo(1);//一开始传了一个1进来
        // function foo(i){
        //     if(i==4){
        //         return;
        //     }
        //     console.log("fb:" + i);//第一行输出---fb:1
        //     //此时执行:foo(i + 1);
        //     function foo(i){//i = i + 1 = 2  
        //         if(i==4){
        //             return;
        //         }
        //    		console.log("fb:" + i);//第二行输出---fb:2
        //         function foo(i){//i = i + 1 = 3  
        //             if(i==4){
        //                 return;
        //             }
        //     		console.log("fb:" + i);//第三行输出---fb:3
        //     		console.log("fe:" + i);//第四行输出---fe:3
        //         }
        //     	console.log("fe:" + i);//第五行输出---fe:2
        //     }
        //     console.log("fe:" + i);//第六行输出---fe:1
        // }


// console.log("递归函数顺序的测试",foo(1)) ;

//六十 ： 救生艇
function numRescueBoats(people,limit){
	people.sort((a,b) => a - b)
	let ans = 0;
	let left = 0;
	let right = people.length - 1;

	while(left <= right){
		if (people[left] + people[right] <= limit) {
			left ++;
		}
		right --;
		ans ++;
	}

	return ans;
}


// console.log("救生艇问题",numRescueBoats([3,2,2,1],3))

//六十一 ： 环形链表
function hasCycle(head){
 	let fast = head;
  	let slow = head;
  	while (fast) {                        
    	if (fast.next == null) return false; 
    	slow = slow.next;                 
    	fast = fast.next.next;             
    	if (slow == fast) return true;   
  	}
  	return false;   
}

// console.log("环形链表测试",hasCycle([3,2,0,-4]));


//六十二 ： 颜色分类
function sortColors1(nums){
	return nums.sort((a,b)=>a-b)
}




function sortColors2(nums){
	let p0 = 0, p2 = nums.length - 1;
    for (let i = 0; i <= p2; i++) {
        while (i <= p2 && nums[i] === 2) swap(nums, i, p2--);
        if (nums[i] === 0) swap(nums, i, p0++);
    }

    return nums;
}



// console.log("颜色分类算法",sortColors2([2,0,2,1,1,0]))

//六十三 ： 二分查找
//1:左闭右闭
function search1(nums, target){
	let low = 0, high = nums.length - 1;
    while (low <= high) {
        const mid = Math.floor((high - low) / 2) + low;
        const num = nums[mid];
        if (num === target) {
            return mid;
        } else if (num > target) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return -1;
}
//2:左闭右开
function search2(nums, target){
	let low = 0, high = nums.length;
    while (low < high) {
        const mid = Math.floor((high - low) / 2) + low;
        const num = nums[mid];
        if (num === target) {
            return mid;
        } else if (num > target) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }
    return -1;
}


// console.log("二分查找算法",search2([-1,0,3,5,9,12],12))

//六十四 ：  在排序数组中查找元素的第一个和最后一个位置

const binarySearch = (nums, target, lower) => {
    let left = 0, right = nums.length - 1, ans = nums.length;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] > target || (lower && nums[mid] >= target)) {
            right = mid - 1;
            ans = mid;
        } else {
            left = mid + 1;
        }
    }
    return ans;
}

function searchRange(nums, target) {
    let ans = [-1, -1];
    const leftIdx = binarySearch(nums, target, true);
    const rightIdx = binarySearch(nums, target, false) - 1;
    if (leftIdx <= rightIdx && rightIdx < nums.length && nums[leftIdx] === target && nums[rightIdx] === target) {
        ans = [leftIdx, rightIdx];
    } 
    return ans;
};


//六十五 ： X的平方根
function mySqrt(x){
	 if (x < 2) return x
     let left = 1, mid, right = Math.floor(x / 2);
     while (left <= right) {
        mid = Math.floor(left + (right - left) / 2)
        if (mid * mid === x) return mid
        if (mid * mid < x) {
            left = mid + 1
        }else {
            right = mid - 1
        }
     }
     return right

}


//六十六 ： 搜索二维矩阵

function search(nums, target){
	let low = 0, high = nums.length - 1;
    while (low <= high) {
        const mid = Math.floor((high - low) / 2) + low;
        const num = nums[mid];
        if (num === target) {
            return true;
        } else if (num > target) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return false;
}

function searchMatrix(matrix,target){
	let lowArr = 0, highArr = matrix.length - 1; 
    while (lowArr <= highArr) {
        const midArr = Math.floor((highArr - lowArr) / 2) + lowArr;
        const len = matrix[midArr].length-1;
        if (matrix[midArr][0] <= target && matrix[midArr][len] >= target) {
           return search(matrix[midArr],target)
        }else if (matrix[midArr][0] > target) {
             highArr = midArr -1;
        }else{
            lowArr = midArr + 1;
        }
    }
    return false
}

// console.log("搜索二维矩阵",searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]],4))


//六十七 ： 括号的生成
function generateParenthesis (n) {
    // n === 1 时，只有一个结果 '()'
    const dp = [['()']]

    for(let i = 1; i < n; i++) {
        dp[i] = []
        const prev = dp[i - 1]
        // 当前能生成的括号组合都是基于 i - 1 生成的结果
        for(let j = 0; j < prev.length; j++) {
            const v = prev[j]
            // 每个 i - 1 的结果都有三种组合方式（需去重处理）
            dp[i].push(...new Set([`(${v})`,`()${v}`,`${v}()`]))
        }
    }

    return dp[n - 1]
};


// console.log("括号的生成",generateParenthesis(3))

//六十八： 斐波那契数列
//1:递归实现
function solutionFibonacci1(n){
	if (n == 0) {
		return 0;
	}else if (n == 1) {
		return 1;
	}else{
		return solutionFibonacci1(n-1) + solutionFibonacci1(n-2);
	}
}

//2:动态规划实现
function solutionFibonacci2(n){
	if (n == 0) {
		return 0;
	}else if (n == 1) {
		return 1;
	}else{
		var result = new Array(n+1);
		result[0] = 0;
		result[1] = 1;
		for (let i = 2; i <= n; i++) {
			result[i] = result[i-1] + result[i-2]
		}
		return result[n];
	}
}

// console.log("斐波那契数列",solutionFibonacci2(3));

//六十九 ： 爬楼梯
function climbStairs1(n){
	if (n == 1) {
		return 1;
	}else if (n == 2) {
		return 2;
	}else{
		return climbStairs(n-1) + climbStairs(n-2);
	}

}

function climbStairs2(n){
	if (n == 1) {
		return 1;
	}else if (n == 2) {
		return 2;
	}else{
		var result = new Array(n+1);
		result[0] = 0;
		result[1] = 1;
		result[2] = 2;
		for (let i = 3; i <= n; i++) {
			result[i] = result[i-1] + result[i-2]
		}
		return result[n];
	}

}


//七十 ： 最长递增子序列
//1:暴力枚举
function lengthOfLIS1(nums){

    let maxLength = 1;
	let dp = function(nums,i){
		let maxLen = 1;
		for (let j = i+1; j < nums.length; j++) {
			if (nums[j] > nums[i]) {
				maxLen = Math.max(maxLen,dp(nums,j)+1);
			}
		}
		return maxLen;
	}
	
	for (let i = 0; i < nums.length; i++) {
	   maxLength = 	Math.max(dp(nums,i),maxLength);
	}
	
	return maxLength;
}

//2:动态规划(利用空间换时间)
function lengthOfLIS2(nums){
	let memo = {};
	let maxLength = 1;
	let dp = function(nums,i){
		if (memo[i]) {
			return memo[i]
		}
		let maxLen = 1;
		for (let j = i+1; j < nums.length; j++) {
			if (nums[j] > nums[i]) {
				maxLen = Math.max(maxLen,dp(nums,j)+1);
			}
		}
		memo[i] = maxLen;
		return maxLen;
	}
	
	for (let i = 0; i < nums.length; i++) {
	   maxLength = 	Math.max(dp(nums,i),maxLength);
	}
	
	return maxLength;

}

// console.log("最长递增子序列",lengthOfLIS2([7,8,9,10,4,13,2]))

//七十一 ：买卖股票的最佳时机
//1，暴力求解
function maxProfit1(prices){
	let max = 0;
	for (var i = 0; i < prices.length; i++) {
		for (var j = i+1; j < prices.length; j++) {
			if (prices[j] > prices[i]) {
				max = Math.max((prices[j]-prices[i]),max);
			}
		}
	}
	return max;
}

//2，动态规划求解
function maxProfit2(prices){
	 const len = prices.length;
    // 创建dp数组
    const dp = new Array(len).fill([0, 0]);
    // dp数组初始化
    dp[0] = [-prices[0], 0];
    for (let i = 1; i < len; i++) {
        // 更新dp[i]
        dp[i] = [
            Math.max(dp[i - 1][0], -prices[i]),
            Math.max(dp[i - 1][1], prices[i] + dp[i - 1][0]),
        ];
    }
    return dp[len - 1][1];
}

//3,贪心算法求解
function maxProfit3(prices) {
    let minprice = 100;
    let maxprofit = 0;
    for (let i = 0; i < prices.length; i++) {
        if (prices[i] < minprice) {
            minprice = prices[i];
        } else if (prices[i] - minprice > maxprofit) {
            maxprofit = prices[i] - minprice;
        }
    }
    return maxprofit;
}



// console.log("买卖股票的最佳时机",maxProfit3([7,1,5,3,6,4]))

//七十二 ： 动态规划之妹妹的礼物
function  selectPresent(presentVolumn){
	let m = presentVolumn.length;
	let n = presentVolumn[0].length;


	let dp = new Array(m);
	for (let i = 0; i < m; i++) {
		dp[i] = new Array();
		for (let j = 0; j < n; j++) {
			dp[i][j] = 0;
		}
	}


	dp[0][0] =  presentVolumn[0][0];

	for (let i = 1; i < n; i++) {
		dp[0][i] = dp[0][i-1] + presentVolumn[0][i];
	}

	for (let i = 1; i < m; i++) {
		dp[i][0] = dp[i-1][0] + presentVolumn[i][0];
	}

	for(let i = 1; i < m; i++){
        for(let j = 1; j < n; j++){
            dp[i][j] = Math.min(dp[i-1][j-1], Math.min(dp[i][j-1], dp[i-1][j])) + presentVolumn[i][j];
        }
    }


	return dp[m-1][n-1];



}


// console.log("妹妹的礼物",selectPresent([[1,2,3],[2,3,4]]))


//七十三 ： 删除链表的第n个节点

 function ListNode(val, next) {
      this.val = (val===undefined ? 0 : val)
      this.next = (next===undefined ? null : next)
 }

function removeNthFromEnd(head,n){
	let ret = new ListNode(0, head),
        slow = fast = ret;
    while(n--) fast = fast.next;
    if(!fast) return ret.next;
    while (fast.next) {
        fast = fast.next; 
        slow = slow.next
    };
    slow.next = slow.next.next;
    return ret.next;

}

// console.log("删除链表的第n个节点",removeNthFromEnd([1,2,3,4,5],2))	

//七十四：合并两个链表
function mergeTwoLists(l1,l2){
	if (l1 === null) {
        return l2;
    } else if (l2 === null) {
        return l1;
    } else if (l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next, l2);
        return l1;
    } else {
        l2.next = mergeTwoLists(l1, l2.next);
        return l2;
    }

}

// console.log("合并两个链表",mergeTwoLists([1,2,4],[1,3,4]))

//七十五 ： 课程选择
function scheduleCourse(courses){
	let chooseCourses = 1;


	courses.sort((a,b)=>a[1]-b[1])

	for (var i = 1; i < courses.length; i++) {
		if (courses[i][0] >= courses[i-1][1]) {
			chooseCourses++;
		}
	}

	return chooseCourses;

}

// console.log("课程选择",scheduleCourse([[3, 2], [4, 3]]))

//七十六 ： 股票的最大获利

//1:贪心算法
function maxProfits1(prices){
	 let ans = 0;
    let n = prices.length;
    for (let i = 1; i < n; ++i) {
        ans += Math.max(0, prices[i] - prices[i - 1]);
    }
    return ans;

}

//2:动态规划
function maxProfits2(prices){
	const n = prices.length;
    const dp = new Array(n).fill(0).map(v => new Array(2).fill(0));
    dp[0][0] = 0, dp[0][1] = -prices[0];
    for (let i = 1; i < n; ++i) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
    }
    return dp[n - 1][0];
}


// console.log("股票的最大获利",maxProfits1())

//七十七 ： 二进制求和

//1:进制转换计算
function addBinary1(a,b){
	a = '0b' + a ;
    b = '0b' + b ;
    let sum = BigInt(a) + BigInt(b);
    return sum.toString(2);
}

//2:直接计算
function addBinary2(a,b){
	let ans = "";
    let ca = 0;
    for(let i = a.length - 1, j = b.length - 1;i >= 0 || j >= 0; i--, j--) {
        let sum = ca;
        sum += i >= 0 ? parseInt(a[i]) : 0;
        sum += j >= 0 ? parseInt(b[j]) : 0;
        ans += sum % 2;
        ca = Math.floor(sum / 2);
    }
    ans += ca == 1 ? ca : "";
    return ans.split('').reverse().join('');
}


// console.log("二进制求和",addBinary(1010,1011));

//七十八 ： 子集
//1:迭代法
function subsets1(nums){
	const ans = [];
    const n = nums.length;
    for (let mask = 0; mask < (1 << n); mask++) {
        const t = [];
        for (let i = 0; i < n; ++i) {
            if (mask & (1 << i)) {
                t.push(nums[i]);
            }
        }
        ans.push(t);
    }
    return ans;

}

//递归法
function subsets2(nums){
	const t = [];
    const ans = [];
    const n = nums.length;
    const dfs = (cur) => {
        if (cur === nums.length) {
            ans.push(t.slice());
            return;
        }
        t.push(nums[cur]);
        dfs(cur + 1, nums);
        t.pop(t.length - 1);
        dfs(cur + 1, nums);
    }
    dfs(0, nums);
    return ans;
}

// console.log("子集的计算",subsets2([1,2,3]))


//七十九 ： 柱状图中最大的矩形

//1:暴力解法
function largestRectangleArea1(heights){
	let area = 0;
	for (var i = 0; i < heights.length; i++) {
		let height = heights[i];
		let left = i;
		let right = i;
		while (left - 1 >= 0 && heights[left - 1] >= height) {
            --left;
        }
        while (right + 1 < heights.length && heights[right + 1] >= height) { 
            ++right;
        }
            // 计算面积
        area = Math.max(area, (right - left + 1) * height);
	}
	return area;

}

//2:单调栈解法
function largestRectangleArea2(heights) {
    let stack = []; // 定义一个单调递增栈
    heights.push(-1) // 
    let maxans = 0;
    for (let i=0;i<heights.length;i++) {
        let cur = heights[i]
        // 栈不为空 并且当前柱子小于栈顶的柱子高度 进入循环
        while(stack.length>0&&cur<heights[stack[stack.length-1]]) {
            // 弹出栈顶的索引值
            let index = stack.pop()
            // 计算弹出的柱子 和他左边第一个比他小的柱子之间的距离  如果栈为空说明当前弹出的柱子左边的柱子都比他要高，如果不为空，那就找到与新栈顶的距离
            let left = stack.length==0?index:index-stack[stack.length-1]-1
            // 当前弹出的柱子 与右边比他小的柱子的距离
            let right = i-index-1
            maxans = Math.max(maxans,(left+right+1)*heights[index])
        }
        // 将当前柱子的索引压入栈
        stack.push(i)
    }
    return maxans

};

//3:双指针解法
function largestRectangleArea3(heights){
	let area = 0
	for (var i = 0; i < heights.length; i++) {
		let curHeight = heights[i];
		let leftIndex = i;
		while(leftIndex-1>=0 && heights[leftIndex-1]>=curHeight){
			leftIndex --;
		}
		let rightIndex = i;
		while(rightIndex+1<heights.length && heights[rightIndex+1]>=curHeight){
			rightIndex ++;
		}

		area = Math.max(area,curHeight*(rightIndex-leftIndex+1))

	}

	return area

}



// console.log("柱状图中最大的矩形",largestRectangleArea3([2,1,5,6,2,3]))


//八十 ： 格雷编码

function grayCode(n){
	 if (n === 0) return [0];
    const codes = grayCode(--n);
    return [...codes, ...codes.map(x => (1 << n) | x).reverse()];
}


// console.log("格雷编码",grayCode(3));



//八十一 ： 最多元素

function majorityElement(nums){
	nums.sort((a,b) => a-b)
	let num = 0;
    let value = nums[0]-1;
	for (var i = 0; i < nums.length; i++) {
		if (nums[i] == value) {
			num ++	
		}else{
			value = nums[i]
			num = 0;
		}

		if (num >= Math.floor(nums.length/2)) {
			return nums[i];
		}
	}


}

// console.log("最多元素",majorityElement([1]))

//八十二 ： 计数质数
const isPrime1 = (x) => {
    for (let i = 2; i * i <= x; ++i) {
        if (x % i == 0) {
            return false;
        }
    }
    return true;
}

const isPrime2 = (x) => {
    for(var i = 2, max = Math.sqrt(x); i <= max; i++)
        if (x % i === 0) return false
    return true
}



function countPrimes(n){
	let ans = 0;
    for (let i = 2; i < n; ++i) {
        ans += isPrime1(i);
    }
    return ans;
}

// console.log("计数质数",countPrimes(8))

//八十三 ： 有效的正方形
function validSquare(p1,p2,p3,p4){

	let arr = [p1,p2,p3,p4]

	arr.sort((a,b) => a[0] == b[0] ? a[1]-b[1] : a[0]-b[0])


	console.log("排序后的数组",arr)

	let s1 = Math.sqrt(Math.pow((arr[1][0] - arr[0][0]),2) + Math.pow((arr[1][1] - arr[0][1]),2))
	let s2 = Math.sqrt(Math.pow((arr[2][0] - arr[0][0]),2) + Math.pow((arr[2][1] - arr[0][1]),2))
	let s3 = Math.sqrt(Math.pow((arr[3][0] - arr[1][0]),2) + Math.pow((arr[3][1] - arr[1][1]),2))
	let s4 = Math.sqrt(Math.pow((arr[3][0] - arr[2][0]),2) + Math.pow((arr[3][1] - arr[2][1]),2))

	let d1 = Math.sqrt(Math.pow((arr[3][0] - arr[0][0]),2) + Math.pow((arr[3][1] - arr[0][1]),2))
	let d2 = Math.sqrt(Math.pow((arr[2][0] - arr[1][0]),2) + Math.pow((arr[2][1] - arr[1][1]),2))



	return s1 == s2 && s2 == s3 && s3 == s4 && d1 == d2 


}

// console.log("是否是有效的正方形",validSquare([1,0],[-1,0],[0,-1],[0,1]))

//八十四 ： 不同路径
function uniquePaths(m,n) {
	 if (m <= 0 || n <= 0) {
          return 0;
        }
        let row = new Array(n).fill([]);
        let dp = new Array(m).fill(row);
        for (let i = 0; i < m; i++) {
          dp[i][0] = 1;
        }
        for (let i = 0; i < n; i++) {
          dp[0][i] = 1;
        }
        for (let i = 1; i < m; i++) {
          for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
          }
        }
        return dp[m - 1][n - 1];

}

// console.log("不同路径的计算",uniquePaths(3,7))

//八十五 ： 不同路径二
function uniquePathsWithObstacles(obstacleGrid){
	const m = obstacleGrid.length
    const n = obstacleGrid[0].length
    const dp = Array(m).fill().map(item => Array(n).fill(0))
    
    for (let i = 0; i < m && obstacleGrid[i][0] === 0; ++i) {
        dp[i][0] = 1
    }
    
    for (let i = 0; i < n && obstacleGrid[0][i] === 0; ++i) {
        dp[0][i] = 1
    }
    console.log("数组的初始化",dp)
    for (let i = 1; i < m; ++i) {
        for (let j = 1; j < n; ++j) {
            dp[i][j] = obstacleGrid[i][j] === 1 ? 0 : dp[i - 1][j] + dp[i][j - 1]
        }
    }
        
    return dp[m - 1][n - 1]

}

// console.log("有障碍物的不同路径",uniquePathsWithObstacles([[0,1],[0,0]]))

//八十六 ： 最大矩形
function maximalRectangle(matrix) {
    if (matrix.length === 0) return 0
    let i = matrix.length, ns = Array.from({length: i}, _ => new Uint8Array(matrix[0].length)), r = 0, j, n
    while (i--) 
        for (j = 0, n = 0; j < matrix[0].length; j++) 
            ns[i][j] = matrix[i][j] === '1' ? ++n : n = 0
    	while (j--) 
        	for (i = matrix.length; i--;) 
            	for (let k = i + 1, w = 200, h = 0, t; k-- && ns[k][j];) {
                	if (ns[k][j] < w) w = ns[k][j]
                	if ((t = w * ++h) > r) r = t
            	}
    return r
};

// console.log("最大矩形",maximalRectangle([["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]))

//八十七 ： 合并区间
function merge(intervals){
	intervals.sort((a,b) => a[0] - b[0])


    let dp = function(intervals){
    	for (let i = 1; i < intervals.length; i++) {
			if (intervals[i][0] <= intervals[i-1][1]) {
				if (intervals[i][1] < intervals[i-1][1]) {
					intervals[i] = [intervals[i-1][0],intervals[i-1][1]]
				}else{
					intervals[i] = [intervals[i-1][0],intervals[i][1]]

				}
				intervals.splice(i-1,1)
				dp(intervals)
                break;
			}
		}
    }

	dp(intervals)

	return intervals;



}

// console.log("合并区间",merge([[2,6],[1,19],[8,10],[15,18]]))

//八十八 ： 矩阵置零
function setZeroes(matrix){
	const m = matrix.length, n = matrix[0].length;
    const row = new Array(m).fill(false);
    const col = new Array(n).fill(false);
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 0) {
                row[i] = col[j] = true;
            }
        }
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (row[i] || col[j]) {
                matrix[i][j] = 0;
            }
        }
    }

    return matrix;

}

// console.log("矩阵置零",setZeroes([[1,1,1],[1,0,1],[1,1,1]]))


//八十九 ：三数之和为零
function threeSum(nums){
	let result = new Array();
	nums.sort((a,b) => a-b);
	for (var i = 0; i < nums.length; i++) {
		if (i && nums[i] == nums[i-1]) {
			continue;
		}
		let left = i + 1;
		let right = nums.length - 1;
		while(left < right){
			let sum = nums[i] + nums[left] + nums[right]
			if (sum > 0) {
				right --
			}else if (sum < 0) {
				left ++
			}else{
				result.push([nums[i],nums[left],nums[right]])
				left ++;
				right --;
				//跳过重复数字
                while(nums[left] === nums[left - 1]){
                    left++;
                }
                while(nums[right] === nums[right + 1]){
                    right--;
                }
			}
		}
	}

	return result

}


// console.log("三数之和为零",threeSum([-1,0,1,2,-1,-4]))

//九十 ： 单词搜索

function exitWord(board,word){
    const h = board.length, w = board[0].length;
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    const visited = new Array(h);
    for (let i = 0; i < visited.length; ++i) {
        visited[i] = new Array(w).fill(false);
    }
    const check = (i, j, s, k) => {
        if (board[i][j] != s.charAt(k)) {
            return false;
        } else if (k == s.length - 1) {
            return true;
        }
        visited[i][j] = true;
        let result = false;
        for (const [dx, dy] of directions) {
            let newi = i + dx, newj = j + dy;
            if (newi >= 0 && newi < h && newj >= 0 && newj < w) {
                if (!visited[newi][newj]) {
                    const flag = check(newi, newj, s, k + 1);
                    if (flag) {
                        result = true;
                        break;
                    }
                }
            }
        }
        visited[i][j] = false;
        return result;
    }

    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            const flag = check(i, j, word, 0);
            if (flag) {
                return true;
            }
        }
    }

    return false;

}


// console.log("单词搜索",exitWord([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],"ABCCED"))


//九十一：组合
function combine(n,k){
    const ans = [];
    const dfs = (cur, n, k, temp) => {
        // 剪枝：temp 长度加上区间 [cur, n] 的长度小于 k，不可能构造出长度为 k 的 temp
        if (temp.length + (n - cur + 1) < k) {
            return;
        }
        // 记录合法的答案
        if (temp.length == k) {
            ans.push(temp);
            return;
        }
        // 考虑选择当前位置
        dfs(cur + 1, n, k, [...temp, cur]);
        // 考虑不选择当前位置
        dfs(cur + 1, n, k, temp);
    }
    dfs(1, n, k, []);
    return ans;
}

// console.log("组合问题",combine(8,3))

//九十二 ： 组合总和
function combinationSum(candidates, target){
    const ans = [];
    const dfs = (target, combine, idx) => {
        if (idx === candidates.length) {
            return;
        }
        if (target === 0) {
            ans.push(combine);
            return;
        }
        // 直接跳过
        dfs(target, combine, idx + 1);
        // 选择当前数
        if (target - candidates[idx] >= 0) {
            dfs(target - candidates[idx], [...combine, candidates[idx]], idx);
        }
    }

    dfs(target, [], 0);
    return ans;
}

// console.log("组合总和",combinationSum([2,3,5],8))

//九十三 ： Nim游戏
function canWinNim(n){
	return n % 4 != 0
}

//九十四 ： 只出现一次的数字II
//给你一个整数数组 nums ，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次 。请你找出并返回那个只出现了一次的元素。

function singleNumber2(nums) {
	nums.sort((a,b) => a-b)
    for (var i = 0; i < nums.length; i+=3) {
    	let arr = nums.slice(i,i+3);
    	if (arr.length == 1) {
    		return arr[0]
    	}
    	let sum = 0;
    	for (var j = 0; j < arr.length; j++) {
    		sum += arr[j]
    	}
    	if (sum != arr[1]*3) {
    		return (arr[1]- (arr[1]*3 - sum))
    	}
    }

};

// console.log("只出现一次的数字II",singleNumber2([-2,-2,1,1,4,1,4,4,-4,-2]))


//九十五 ： 最长连续有效括号
function longestValidParentheses(s){
	let str = s.split("");
	let num = 0;
	let stack = [];
	stack.push(-1);
	for (var i = 0; i < str.length; i++) {
		if (str[i] == '(') {
			stack.push(i);
		}else{
			 stack.pop();
             if (stack.length == 0) {
                stack.push(i);
             } else {
                num = Math.max(num, i - stack[stack.length-1]);
             }
		}
	}
	return num;

}

// console.log("最长连续有效括号",longestValidParentheses("()(()"))


//九十六 ： 单词接龙
function ladderLength(beginWord, endWord, wordList){
	if(wordList.indexOf(endWord) < 0){
		return 0;
	}
	if(beginWord.length == 1 && endWord.length == 1){
		return 2;
	}
	let compare = (stra,strb)=>{
		let a = stra.split("");
		let b = strb.split("");
		if(a.length != b.length){
			return false;
		}
		let num = 0;
		for (var i = 0; i < a.length; i++) {
			if(a[i] != b[i]){
				num ++;
			}
		}
		return num == 1;
	} 

	let nums = 1;
	let curStr = beginWord;
	for (var i = 0; i < wordList.length; i++) {
		if(compare(curStr,wordList[i])){
			curStr = wordList[i];
			nums ++;
			if(compare(curStr,endWord)){
				nums ++
				break;
			}
		}else{
			nums --
			if(nums < 0){
				nums = 0;
			}
		}
	}
	return nums;


}


// console.log("单词接龙",ladderLength("hit","cog",["hot","dot","dog","lot","cog"]))

// console.log("4的开平方",Math.sqrt(4))

// console.log("反正弦函数",Math.asin(30/180*Math.PI))

//九十七 ： 数组加一
function plusOne(digits){
	digits[digits.length - 1] += 1;
	for (var i = digits.length - 1; i >= 1; i--) {
		if (digits[i] >= 10) {
			digits[i] -= 10;
			digits[i-1]+=1;
			continue;
		}
	}
	if(digits[0] >= 10){
		digits[0] -= 10;
		digits.unshift(1);
	}

	return digits;
}

// console.log("数组加一",plusOne([4,9,8,9]))

//九十八：螺旋矩阵
function spiralOrder(matrix){
	if(matrix.length == 0 || matrix[0].length == 0){
		return [];
	}

	const rows = matrix.length;
	const cols = matrix[0].length;
	const visit = new Array(rows).fill(0).map(()=>new Array(cols).fill(false));
	const dir = [[0,1],[1,0],[0,-1],[-1,0]];
	const total = rows*cols;
	let arr = new Array(total).fill(0);

	let dirInd = 0 ,row = 0,col = 0;
	for (var i = 0; i < total; i++) {
		arr[i] = matrix[row][col];
		visit[row][col] = true;
		 const nextRow = row + dir[dirInd][0], nextColumn = col + dir[dirInd][1];
        if (!(0 <= nextRow && nextRow < rows && 0 <= nextColumn && nextColumn < cols && !(visit[nextRow][nextColumn]))) {
            dirInd = (dirInd + 1) % 4;
        }
        row += dir[dirInd][0];
        col += dir[dirInd][1];
		
	}

	return arr;
	

}


// console.log("螺旋矩阵",spiralOrder([[1,2,3],[4,5,6],[7,8,9]]))


//九十九 ：插入区间
function insert(intervals, newInterval) {
  const res = [];
  let i = 0;
  const len = intervals.length;

  while (i < len && intervals[i][1] < newInterval[0]) { // 当前遍历的是蓝左边的，不重叠的区间
    res.push(intervals[i]);
    i++;
  }

  while (i < len && intervals[i][0] <= newInterval[1]) { // 当前遍历是有重叠的区间
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]); //左端取较小者，更新给兰区间的左端
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]); //右端取较大者，更新给兰区间的右端
    i++;
  }
  res.push(newInterval); // 循环结束后，兰区间为合并后的区间，推入res

  while (i < len) {                 // 在蓝右边，没重叠的区间
    res.push(intervals[i]);
    i++;
  }
  
  return res;
}



// console.log("插入区间",insert([[1,5]],[1,7]))

//一百 ： 最后一个单词的长度
function lengthOfLastWord(s){
	let num = 0;
	let sli = s.length;
	for (var j = s.length - 1; j >= 0; j--) {
		if(s.charAt(j) == " "){
			sli = j
		}else{
			break;
		}
	}
	s = s.slice(0,sli)
	console.log("去掉最后的空格后",s.length)
	for (let i = 0; i < s.length; i++) {
		if(s.charAt(i) == " "){
			num = 0
		}else{
			num ++
		}
	}

	return num;

}

// console.log("最后一个单词的长度",lengthOfLastWord("Hello World"))


//一百零一 ： 排列序列
function getPermutation(n,k){
	const ans = [];
	const used = {};
	const backtracking = (temp)=>{
		if (temp.length == n) {
			ans.push(temp.slice())
			return
		}
       	for (let num = 1; num <= n ; num ++ ) { // for枚举出每个可选的选项
      		if (used[num]) continue; // 使用过的，跳过
      		temp.push(num);         // 选择当前的数，加入path
      		used[num] = true;       // 记录一下 使用了
      		backtracking(temp);     // 基于选了当前的数，递归
      		temp.pop();             // 上一句的递归结束，回溯，将最后选的数pop出来
      		used[num] = false;      // 撤销这个记录
    	}
	}
    backtracking([]);
    return ans[k-1].join("");
}

// console.log("排列序列",getPermutation(4,9))

//一百零二 ： 螺旋矩阵II
function generateMatrix(n){
	const rows = n;
	const cols = n;
	const visit = new Array(rows).fill(0).map(()=>new Array(cols).fill(false));
	const dir = [[0,1],[1,0],[0,-1],[-1,0]];
	const total = rows*cols;
	let arr =  new Array(rows).fill(0).map(()=>new Array(cols).fill(0));

	let dirInd = 0 ,row = 0,col = 0;
	for (var i = 1; i <= total; i++) {
		arr[row][col] = i;
		visit[row][col] = true;
		 const nextRow = row + dir[dirInd][0], nextColumn = col + dir[dirInd][1];
        if (!(0 <= nextRow && nextRow < rows && 0 <= nextColumn && nextColumn < cols && !(visit[nextRow][nextColumn]))) {
            dirInd = (dirInd + 1) % 4;
        }
        row += dir[dirInd][0];
        col += dir[dirInd][1];
		
	}

	return arr;

}

// console.log("螺旋矩阵II",generateMatrix(3))

//一百零三：最小路径和
function minPathSum(grid){
	for (var i = 0; i < grid.length; i++) {
		for (var j = 0; j < grid[i].length; j++) {
			if( i == 0 && j == 0){
				grid[i][j] = grid[i][j]
			}else if(i == 0 && j > 0){
				grid[i][j] += grid[i][j-1]
			}else if(i > 0 && j == 0){
				grid[i][j] += grid[i-1][j]
			}else{
				grid[i][j] += Math.min(grid[i][j-1],grid[i-1][j]) 
			}
		}
	}

	return grid[grid.length-1][grid[0].length-1]

}

// console.log("最小路径和",minPathSum([[1,2,3],[4,5,6]]))

//一百零四 ： 最大矩形
function maximalRectangle(matrix){
	 const m = matrix.length;
    if (m === 0) {
        return 0;
    }
    const n = matrix[0].length;
    const left = new Array(m).fill(0).map(() => new Array(n).fill(0));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === '1') {
                left[i][j] = (j === 0 ? 0 : left[i][j - 1]) + 1;
            }
        }
    }

    let ret = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === '0') {
                continue;
            }
            let width = left[i][j];
            let area = width;
            for (let k = i - 1; k >= 0; k--) {
                width = Math.min(width, left[k][j]);
                area = Math.max(area, (i - k + 1) * width);
            }
            ret = Math.max(ret, area);
        }
    }
    return ret;

	
}


// console.log("最大矩形",maximalRectangle([["1","1","1","1","1","1","1","1"],["1","1","1","1","1","1","1","0"],["1","1","1","1","1","1","1","0"],["1","1","1","1","1","0","0","0"],["0","1","1","1","1","0","0","0"]]))
let x = Math.sqrt(3,1/2)
console.log("开平方测试",x)
console.log("正交测试",Math.atan(1/Math.sqrt(3,1/2))*180/Math.PI)
 













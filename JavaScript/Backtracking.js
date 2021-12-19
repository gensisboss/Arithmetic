console.log("------------回溯算法---------------")
console.log("------------组合问题---------------")
//一 ： 组合
//给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。你可以按 任何顺序 返回答案。

function combine1(n,k) {
	const ans = [];
	const backtracking = (cur,temp)=>{
		if (temp.length == k) {
			ans.push([...temp])
			// 这种方法不对
			//ans.push(temp)
			return
		}

		for (let i = cur; i <= n; i++) {
			temp.push(i)
			backtracking(i+1,temp)
			temp.pop();
		}

	}
	backtracking(1,[])
	return ans
}

//对方法1进行剪枝操作
function combine2(n,k){
	const ans = [];
    const backtracking = (cur,temp) => {
        if (temp.length == k) {
            ans.push([...temp]);
            return;
        }
        for (let i = cur; i <= n - (k - temp.length) + 1; ++i) {
    		temp.push(i)
    		backtracking(i + 1,temp)
    		temp.pop()
  		}

    }
    backtracking(1, []);
    return ans;
}


// console.log("组合问题",combine1(5,2))


//二 ： 组合总和
//给定一个无重复元素的正整数数组candidates和一个正整数target，找出candidates中所有可以使数字和为目标数target的唯一组合。
//candidates中的数字可以无限制重复被选取。如果至少一个所选数字数量不同，则两种组合是唯一的。
//对于给定的输入，保证和为target 的唯一组合数少于 150 个。

function combinationSum(candidates, target) {
	const ans = []
	const backtracking = (sum,index,temp) => {
        if (sum > target) {
            return;
        }else if (sum == target) {
        	ans.push([...temp])
        	return;
        }
        for (let i = index; i < candidates.length; i++) {
        	if(candidates[i] > target - sum) continue;
        	sum += candidates[i]
    		temp.push(candidates[i])
    		backtracking(sum,i,temp)
    		sum -= candidates[i]
    		temp.pop()
  		}

    }
    backtracking(0,0,[]);
    return ans;

	
}

// console.log("组合总和",combinationSum([2,3,6,7],7))

//三 ：组合总和 III
//找出所有相加之和为 n 的 k 个数的组合。组合中只允许含有 1 - 9 的正整数，并且每种组合中不存在重复的数字。
function combinationSum3(k,n){
	const ans = []
	const backtracking = (sum,index,temp) => {
        if (sum > n || temp.length > k) {
            return;
        }else if (sum == n && temp.length == k) {
        	ans.push([...temp])
        	return;
        }
        for (let i = index; i < 10; i++) {
        	if(i > n - sum || temp.includes(i)) continue;
        	sum += i
    		temp.push(i)
    		backtracking(sum,i,temp)
    		sum -= i
    		temp.pop()
  		}

    }
    backtracking(0,1,[]);
    return ans;

}

// console.log("组合问题三",combinationSum3(9,45))
console.log("-------------子集问题---------------------")
//一 ： 子集
function subsets(nums) {
	const ans = [];
	const temp = [];
	const backtracking = (index)=>{
		ans.push(temp.slice())
        for(let i = index; i < nums.length; i++) {
            temp.push(nums[i])
            backtracking(i + 1)
            temp.pop()
        }

	}
    backtracking(0);
	return ans;
}

console.log("子集问题",subsets([1,2,3]))

//二 ： 子集II
function subsetsWithDup(nums){
	nums.sort((a,b)=>a-b)
	const ans = [];
	const temp = [];
	const backtracking = (index)=>{
		ans.push(temp.slice())
        for(let i = index; i < nums.length; i++) {
        	 if(i > index && nums[i] === nums[i - 1]) {
                continue
            }
            temp.push(nums[i])
            backtracking(i + 1)
            temp.pop()
        }

	}
    backtracking(0);
 //    //二维数组去重
 //    const duplicate =function(arr){
 //    	let res={}
 //    		arr.forEach(item=>{
 //        	item.sort((a,b)=>a-b);
 //        	res[item]=item;
 //    	});
 //    	return Object.values(res)
	// }
	// return duplicate(ans)

	return ans;
}

// console.log("子集问题二",subsetsWithDup([1,2,2]))

console.log("-------------排列问题---------------------")
//一：全排列
//给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
function permute(nums){
	const ans = [];
	const used = {};
	const backtracking = (temp)=>{
		if (temp.length == nums.length) {
			ans.push(temp.slice())
			return
		}
       	for (const num of nums) { // for枚举出每个可选的选项
     		 // if (path.includes(num)) continue; // 别这么写！查找的时间是O(n)，增加时间复杂度
      		if (used[num]) continue; // 使用过的，跳过
      		temp.push(num);         // 选择当前的数，加入path
      		used[num] = true;       // 记录一下 使用了
      		backtracking(temp);     // 基于选了当前的数，递归
      		temp.pop();             // 上一句的递归结束，回溯，将最后选的数pop出来
      		used[num] = false;      // 撤销这个记录
    	}
	}
    backtracking([]);
    return ans;
}

console.log("全排列问题",permute([1,2,3]))

//二：全排列II
function permuteUnique(nums){
	nums.sort((a,b)=>a-b)
	const ans = [];
	const used = {};
	const backtracking = (temp)=>{
		if (temp.length == nums.length) {
			ans.push(temp.slice())
			return
		}
        for (var i = 0; i < nums.length; i++) {
     		 // if (path.includes(num)) continue; // 别这么写！查找的时间是O(n)，增加时间复杂度
      		if (i > 0 && !used[i-1] && nums[i] === nums[i - 1] ) continue; // 使用过的，跳过
      		if (!used[i]) {
      			temp.push(nums[i]);         // 选择当前的数，加入path
      			used[i] = true;       // 记录一下 使用了
      			backtracking(temp);     // 基于选了当前的数，递归
      			temp.pop();             // 上一句的递归结束，回溯，将最后选的数pop出来
      			used[i] = false;      // 撤销这个记录
      		}
    	}
	}
    backtracking([]);
    return ans;

}
// console.log("全排列问题二",permuteUnique([1,2,1]))
console.log("-------------棋盘问题---------------------")
//一 ： N皇后
//n皇后问题 研究的是如何将 n个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
//给你一个整数 n ，返回所有不同的n皇后问题 的解决方案。
//每一种解法包含一个不同的n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。
function solveNQueens(n){
    function isValid(row, col, chessBoard, n) {
        for(let i = 0; i < row; i++) {
            if(chessBoard[i][col] === 'Q') {
                return false
            }
        }

        for(let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if(chessBoard[i][j] === 'Q') {
                return false
            }
        }

        for(let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if(chessBoard[i][j] === 'Q') {
                return false
            }
        }
        return true
    }

    function transformChessBoard(chessBoard) {
        let chessBoardBack = []
        chessBoard.forEach(row => {
            let rowStr = ''
            row.forEach(value => {
                rowStr += value
            })
            chessBoardBack.push(rowStr)
        })
        return chessBoardBack
    }

    let result = []
    function backtracing(row,chessBoard) {
        if(row === n) {
            result.push(transformChessBoard(chessBoard))
            return
        }
        for(let col = 0; col < n; col++) {
            if(isValid(row, col, chessBoard, n)) {
                chessBoard[row][col] = 'Q'
                backtracing(row + 1,chessBoard)
                chessBoard[row][col] = '.'
            }
        }
    }
    let chessBoard = new Array(n).fill([]).map(() => new Array(n).fill('.'))
    backtracing(0,chessBoard)
    return result
    
}

console.log("n皇后问题",solveNQueens(4))






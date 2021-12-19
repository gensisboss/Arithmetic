console.log("--------动态规划-------------")
/*
对于动态规划问题，我将拆解为如下五步曲，这五步都搞清楚了，才能说把动态规划真的掌握了！
1. 确定dp数组（dp table）以及下标的含义
2. 确定递推公式
3. dp数组如何初始化
4. 确定遍历顺序
5. 举例推导dp数组
*/
console.log("--------基础问题-------------")
//一：斐波那契数列
function solutionFibonacci(n)
{
	if (n <= 1) {
		return n
	}else{
		let result = new Array(n+1)
		result[0] = 0;
		result[1] = 1;
		for (var i = 2; i <= n; i++) {
			result[i] = result[i-1] + result[i-2];
		}
    	return result[n]
	}
}

// console.log("斐波那契数列",solutionFibonacci(2))

//二：不同路径
function allPath(m,n){
	let arr = new Array(m).fill(new Array(n).fill(1))
	for (let i = 1; i < arr.length; i++) {
		for (let j = 1; j < arr[i].length; j++) {
			arr[i][j] = arr[i-1][j] + arr[i][j-1]
		}	
	}
	return arr[m-1][n-1];
}

// console.log("不同路径算法",allPath(3,7))

console.log("--------背包问题-------------")
//一：01背包
//有N件物品和⼀个最多能被重量为W 的背包。第i件物品的重量是weight[i]，得到的价值是value[i] 。每件物品只能⽤⼀次，求解将哪些物品装⼊背包⾥物品价值总和最⼤。
function maxBagProfit(){
	const weight = [1,2,3]
	const value = [15,20,30]
	const bagWeight = 4

	let dp = new Array(weight.length).fill(new Array(bagWeight+1).fill(0))

	for (let j = bagWeight; j >= weight[0]; j--) {
		dp[0][j] = dp[0][j - weight[0]] + value[0];
 	}
	console.log("初始化背包数组",dp)


	for (var i = 1; i < weight.length; i++) {
		for (var j = 0; j <= bagWeight; j++) {
			if (j < weight[i]) {
				dp[i][j] = dp[i - 1][j];
			}
			else {
				dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i]);
			}
		}
	}
	console.log("背包数组",dp)

	return dp[weight.length - 1][bagWeight]
}
// console.log("背包问题求解",maxBagProfit());
console.log("--------打家劫舍-------------")
//一：打家劫舍I
//你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
function rob(nums){
	if (nums.length == 0) {
		return 0;
	}
	if (nums.length == 1) {
		return nums[0]
	}
	let dp = new Array(nums.length)
	dp[0] = nums[0];
	dp[1] = Math.max(nums[0],nums[1])
	for (let i = 2; i < nums.length; i++) {
		dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
 	}
	return dp[nums.length - 1];
}
// console.log("打家劫舍问题一",rob([2,7,9,3,1]))
//二：打家劫舍II
//你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 围成一圈 ，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警 。
function robCycle(nums){
	if (nums.length == 0) {
		return 0;
	}
	if (nums.length == 1) {
		return nums[0]
	}
	if (nums.length == 2) {
		return Math.max(nums[0],nums[1])
	}
	let dp1 = new Array(nums.length-1)
	let dp2 = new Array(nums.length-1)
	dp1[0] = nums[0];
	dp1[1] = Math.max(nums[0],nums[1])

	dp2[0] = nums[1];
	dp2[1] = Math.max(nums[1],nums[2])

	for (let i = 2; i < nums.length-1; i++) {
		dp1[i] = Math.max(dp1[i - 2] + nums[i], dp1[i - 1]);
 	}
 	for (let i = 2; i < nums.length; i++) {
		dp2[i] = Math.max(dp2[i - 2] + nums[i+1], dp2[i - 1]);
 	}
	return Math.max(dp1[nums.length-2],dp2[nums.length-2]);

}
// console.log("打家劫舍问题二",robCycle([1,2,3,2]))
console.log("--------股票问题-------------")

//一：最大利润
function maxProfit(prices){
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
    // console.log("最终数组为",dp)
    return dp[len - 1][1];
}

// console.log("买卖股票的最佳时机",maxProfit([7,1,5,3,6,4]))
console.log("--------子序列问题-------------")
//一 ： 最长递增子序列
function lengthOfLIS(nums) {
	if (nums.length <= 1) {
		return nums.length;
	}
	let dp = new Array(nums.length).fill(1);
	let result = 0;
	for (let i = 1; i < nums.length; i++) {
		for (let j = 0; j < i; j++) {
			if (nums[i] > nums[j]) dp[i] = Math.max(dp[i], dp[j] + 1);
 		}
		if (dp[i] > result) result = dp[i]; // 取⻓的⼦序列
 	}
 	console.log("当前动态规划数组",dp)
	return result;
}

// console.log("最长递增子序列",lengthOfLIS([10,9,2,5,3,7,101,18,302]))

//一 ： 最长连续递增子序列
function lengthOfLCIS(nums) {
	if (nums.length <= 1) {
		return nums.length;
	}
	let dp = new Array(nums.length).fill(1);
	let result = 0;
	for (let i = 1; i < nums.length; i++) {
		if (nums[i] > nums[i-1]){
			dp[i] = dp[i-1]+1;
		} 
		if (dp[i] > result) result = dp[i]; // 取⻓的⼦序列
 	}
	return result;
}

console.log("最长连续递增子序列",lengthOfLCIS([10,9,2,3,7,101,18]))







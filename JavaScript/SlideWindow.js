console.log("-----------滑动窗口算法------------")

//一 ： 字符串的无重复最长连续子串的长度
function lengthOfLongestSubstring(s) {
    let arr = [];
    let max = 0;
    for (let i = 0; i < s.length; i ++) {
        //如果之前存在，就删除，知道没有为止
        if(arr.indexOf(s[i]) !== -1) {
            arr.splice(0, arr.indexOf(s[i]) + 1);
        }
        //加入当前元素
        arr.push(s[i]);
        //取最大
        max = Math.max(max, arr.length);
    }
    return max;
};

// console.log("字符串的无重复最长连续子串的长度",lengthOfLongestSubstring("abcabcabc"))

//二 ： 和为S的连续正数数列
function findContinuousSequence(sum){
	let ans = []
	let first = 1,last = 2,total = 0;
    while(first < last)
    {
       //等差数列求和公式  total = (a0 + an) *n/2
       total = (first + last) * (last - first + 1)/2;
       if(total == sum)
       {
            for(let i = first; i <= last; ++i){
            	ans.push(i);
                ++first;
            }     
        }
        else if(total > sum){
        	 // total > sum,让first走;
            ++first;

        }
        else{
        	 //total < sum,让last走;
        	  ++last;
        }               
               
    }
    return ans;

} 
// console.log("和为S的连续正数数列",findContinuousSequence(10))

//三 ： 长度最小的字数组
function minSubArrayLen(target, nums){
	if (nums.length == 0) {
		return 0
	}
	let right = 0, min = nums.length+1, sum = nums[0]
	for (var left = 0; left < nums.length; left++) {
		while(sum < target){
			if(right + 1 < nums.length)
                ++right;
            else
                break;
            sum += nums[right];
		}
		if (sum >= target) {
			min = Math.min(min,(right-left+1))
		}
		sum -= nums[left];
	}

	return min > nums.length ? 0 : min;

}

console.log("长度最小的字数组",minSubArrayLen(11,[1,2,3,4,5]))


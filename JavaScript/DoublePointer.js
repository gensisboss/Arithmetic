console.log("-----------双指针---------------")
//一：三数之和
function threeSum(nums) {
    let result = new Array();
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
// console.log("三数之和为0",threeSum([-1,0,1,2,-1,-4]))

function isSubsequence(s, t) {
    let pointer = 0;

    for (var i = 0; i < t.length; i++) {
        if (s.charAt(pointer) == t.charAt(i)) {
            pointer ++
        }
    }

    return pointer == s.length


};
// console.log("子序列问题",isSubsequence("abc","ahhbssckk"))
console.log("-----------快慢指针---------------")
//一 ：环形链表
function hasCycle(head){
 if(head === null || head.next === null) {
    return false;
   }
    let fast = head;
    let slow = head;
    while (fast) {                        
        if (fast.next == null) return false; 
        slow = slow.next;                 
        fast = fast.next.next;             
        if (slow == fast) return true;   
    }
}
//二 ： 删除数组中的重复的超过两个的元素
function removeDuplicates(nums){
   const n = nums.length;
    if (n <= 2) {
        return n;
    }
    let slow = 2, fast = 2;
    while (fast < n) {
        if (nums[slow - 2] != nums[fast]) {
            nums[slow] = nums[fast];
            ++slow;
        }
        ++fast;
    }
    return slow;

}
console.log("删除数组中的重复的超过两个的多余的元素",removeDuplicates([1,1,1,2,2,3]))
console.log("-----------对撞指针---------------")
//一：盛水的容器
function maxArea(height) {
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
};
// console.log("盛水的容器",maxArea([1,8,6,2,5,4,8,3,7]))

//二：救生艇问题
function numRescueBoats(people, limit) {
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

};
// console.log("救生艇",numRescueBoats([3,2,2,1],3))
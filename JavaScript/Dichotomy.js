console.log("------------二分法查找--------------")
//一 ： 升序数组查找
function search(nums, target){
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

// console.log("二分查找数组",search([0,1,2,3,4,5,6,7,8,9],7))


//二 ： X的平方根
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

// console.log("当前X的平方根",mySqrt(9))

//三 ：搜索旋转排序数组
function searchRotate(nums,target){
	if (nums.length == 0)
    {
        return -1;
    }
    let n = nums.length - 1;
    if (n == 0)
    {
        return nums[0] == target ? 0 : -1;
    }
    let l = 0, r = n;
    while (l <= r)
    {
   		let mid = l + Math.floor((r - l) / 2);
     	if (nums[mid] == target)
     	{
            return mid;
        }
        if (nums[0] <= nums[mid])
        {
            // 左半边有序
            if (nums[0] <= target && target <= nums[mid])
            {
                // target的值在左半边
                r = mid - 1;
            }
            else
            {
                l = mid + 1;
            }
        }
        else
        {
            // 右半边有序
            if (nums[mid] <= target && target <= nums[n])
            {
                // target的值在右半边
                l = mid + 1;
            }
            else
            {
                r = mid - 1;
            }
        }
    }
    return -1;
}

// console.log("二分查找旋转数组",searchRotate([4,5,6,7,0,1,2],0))

//四：寻找峰值
function findPeakElement(nums){
    let l = 0, r = nums.length - 1;
    while(l < r)
    {
        let mid = Math.floor(l + (r - l)/2);
        let t = mid + 1 < nums.length ? nums[mid + 1] : INT_MIN; //超出边界直接赋负无穷
        if(nums[mid] > t) r = mid; //nums[mid]在递减区间里
        else l = mid + 1;  //nums[mid]在递增区间里
    }
    return l;

}

// console.log("寻找峰值索引",findPeakElement([1,2,3,1]))



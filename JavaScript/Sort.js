console.log("----------排序算法------------")
//一：冒泡排序 : 逐个比较
function bubbleSort(arr){
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr.length; j++) {
			if (arr[i] < arr[j]) {
				let temp = arr[i];
				arr[i] = arr[j];
				arr[j] = temp;
			}
		}
	}
	return arr;
}

// console.log("冒泡排序算法",bubbleSort([7,3,9,2,4,3,1,5]))

//二：选择排序 ：顺序选择
function selectSort(arr){
	for (var i = 0; i < arr.length-1; i++) {
		let min = i;
		for (var j = i+1; j < arr.length; j++) {
			if (arr[min] > arr[j]) {
				min = j;
			}
		}

		if (min != i) {
			let temp = arr[min];
			arr[min] = arr[i];
			arr[i] = temp;
		}
	}

	return arr;
}
// console.log("选择排序算法",bubbleSort([7,3,9,2,4,3,1,5]))


//三 ： 插入排序 ： 插入后移
function insertSort(arr){
	let temp = 0;
	for (var i = 1; i < arr.length; i++) {
		if(arr[i] < arr[i-1]]){
			temp = arr[i];
			for (var j = i-1; arr[j] > temp; j--) {
				arr[j+1] = arr[j]
			}
			arr[j+1] = temp;
		}
	}
	return arr;
}

//四 ：希尔排序 ： 分组比较
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

//五 ：归并排序 ： 分组合并
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




//六：快速排序 ： 建立锚点
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

function swap(arr,low,high){
	let temp = arr[low]
	arr[low] = arr[high]
	arr[high] = temp; 
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

// console.log("快速排序算法",quickSort([7,3,9,2,4,3,1,5]))


//七：堆排序 ： 二叉树
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

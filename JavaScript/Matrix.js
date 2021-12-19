console.log("---------矩阵----------")
//一 ：旋转矩阵
function rotateMatrix(matrix){
	const n = matrix.length;
    const matrix_new = new Array(n).fill(0).map(() => new Array(n).fill(0));
    // const matrix_new = new Array(n).fill(new Array(n).fill(0))
    console.log("初始化的数组",matrix_new)
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
             matrix_new[j][n - i - 1] = matrix[i][j];
        }
    }
    return matrix_new;

}

// console.log("旋转矩阵",rotateMatrix([
//   [1,2,3],
//   [4,5,6],
//   [7,8,9]
// ]))

//二 ： 零矩阵
function setZeroes(matrix){
	let n = matrix.length
	let m = matrix[0].length

	let row = [];
	let clumn = [];
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < m; j++) {
			if (matrix[i][j] == 0) {
				if (row.indexOf(i) < 0) {
					row.push(i)
				}
				if (clumn.indexOf(j) < 0) {
					clumn.push(j)
				}
			}
		}
	}


	for (let i = 0; i < n; i++) {
		for (let j = 0; j < m; j++) {
			if (row.indexOf(i) >= 0 || clumn.indexOf(j) >= 0) {
				matrix[i][j] = 0;
			}
		}
	}


	return matrix;
}

console.log("零矩阵",setZeroes([
  [0,1,2,0],
  [3,4,5,2],
  [1,3,1,5]
]))
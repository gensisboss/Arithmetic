console.log("-------------字符串--------------")

console.log("-------------字符串方法--------------")
let str1 = "wangxueming"
let str2 = "gongganghao"
console.log("anchor方法",str1.anchor())
console.log("big方法",str1.big())
console.log("blink方法",str1.blink())
console.log("charAt方法",str1.charAt(6))
console.log("charCodeAt方法",str1.charCodeAt(0))
console.log("concat方法",str1.concat(str2))
console.log("indexOf方法",str1.indexOf("g"))
console.log("lastIndexOf方法",str2.lastIndexOf("g"))
console.log("link方法",str1.link())
console.log("match方法",str1.match(/ming/))
console.log("search方法",str1.search(/ming/))
console.log("replace方法",str1.replace(/ming/,str2))
console.log("slice方法",str1.slice(4,7))
console.log("split方法",str1.split(""))
console.log("split方法",str1.substr(0,4))
console.log("split方法",str1.substring(5,8))




console.log("-------------字符串算法--------------")

//一 ： 判断字符串中是否有重复的元素
//1:暴力求解
function isUnique1(astr){
	let chars = astr.split("");
    let newChar = []
	for (var i = 0; i < chars.length; i++) {
        if(newChar.indexOf(chars[i]) < 0 ){
            newChar.push(chars[i])
        }
	}
    return newChar.length == chars.length;

}

//2:Set数组计算
function isUnique2(astr){
	return astr.length == new Set(astr).size;
}

//3:Map方法求解
function isUnique3(astr){
	let arr = [...astr],
    num = 0
    arr.map((item)=>{
        if(arr.indexOf(item) === arr.lastIndexOf(item)){
            num ++
        }
    })
    return num === astr.length
}


// console.log("当前字符串中是否没有重复元素",isUnique2("abc"))

//二 ： 判定是否互为字符重排
function CheckPermutation1(s1,s2){
	a1 = s1.split("")
	a2 = s2.split("")
	a1.sort();
	a2.sort();
	return a1.toString() == a2.toString()

}

// console.log("判断一个字符串是否包含另外一个字符串",CheckPermutation1("abc","acb"))


//三 ： URL化
function replaceSpaces(S,length){
	let strs = S.split("");
	for (var i = 0; i < length; i++) {
		if (strs[i] == " ") {
			strs[i] = "%20"

		}
	}
	return strs.splice(0,length).join("");
}

// console.log("字符串URL化",replaceSpaces("Mr John Smith    ",13))

//四 ： 回文排列
//1:暴力求解，超出时间限制
function canPermutePalindrome1(s){
	let arr = s.split("").sort();
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] == arr[i+1]) {
			arr.splice(i,2)
			i -= 2
		}	
	}
	return arr.length == 1
}
//2:set方法
function canPermutePalindrome2(s) {
    if (!s.length) return false
    let set = new Set()
    for (let i of s) {
        if (set.has(i)) {
            set.delete(i)
        } else {
            set.add(i)
        }
    }
    return set.size <= 1
}
//3:map方法
function canPermutePalindrome(s) {
    if (!s.length) return flse
    let map = new Map()
    for (let i of s) {
        if (map.has(i)) {
            map.delete(i)
        } else {
            map.set(i, true)
        }
    }
    return map.size <= 1
}



// console.log("回文排列",canPermutePalindrome2("tactcoa"))

//五：字符串压缩
function compressString(S){
	let result = ''
    let index = 0
    //记录字符出现次数，默认为1
    let count = 1
    while(index < S.length){
           //如果当前字符不等于下一个字符，则停止当前字符的计数，统计到result中，否则计数+1
        if(S[index] !== S[index + 1]){
            result += S[index] + count
            //当前字符计数完成后 重置计数为默认值
            count = 1
        }else{
            count++
        }
        index++
    }
    return result.length >= S.length ? S : result
}

// console.log("字符串压缩",compressString("aabcccccaaa"))

//六 ：字符串轮转
function isFlipedString(s1,s2){
	if(s1.length != s2.length){
		return false
	}
	let s = s1.concat(s1)
	return s.indexOf(s2) >= 0
}

// console.log("字符串轮转",isFlipedString("waterbottle", "erbottlewat"))
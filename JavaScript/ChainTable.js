console.log("------------链表------------")
/*
 链表是一种物理存储单元上非线性、非连续性的数据结构（它在数据逻辑上是线性的），
 它的每个节点由两个域组成：数据域和指针域。数据域中存储实际数据，指针域则存储着指针信息，指向链表中的下一个元素或者上一个元素。
 正是由于指针的存在，链表的存储在物理单元是非连续性的。 

链表的优点和缺点同样明显。和线性表相比，链表在添加和删除节点上的效率更高，
因为其只需要修改指针信息即可完成操作，而不像线性表（数组）那样需要移动元素。
同样的，链表的长度在理论上也是无限的（在存储器容量范围内），并可以动态变化长度，相比线性表优势很大。 
相应的，由于线性表无法随机访问节点，只能通过指针顺着链表进行遍历查询来访问，故其访问数据元素的效率比较低。  
*/

/*
   方法	                        描述
append(element) 	         向链表尾部添加结点element
insert(position,element)	 向位置position处插入结点element
removeAt(position)	         按照索引值position删除结点
remove(element)	             搜索并删除给定结点element
remove() 	                 删除链表中最后一个结点
indexOf(element)	         查找并返回给定结点element的索引值
isEmpty() 	                 判断链表是否为空
size()	                     获取链表长度
toString()	                 转换为字符串输出
getHead()	                 获取头结点
getTail() 	                 获取尾结点
*/
console.log("------------单链表------------")
function LinkedList(){
	/*节点定义*/
	var Node = function(element){
		this.element = element; //存放节点内容
		this.next = null; //指针
	}
 
	var length = 0, //存放链表长度
	    head = null; //头指针
 
	this.append = function(element){
	 	var node = new Node(element), 
	 	    current; //操作所用指针
 
	 	if (!head){
	 		head = node;
	 	}else {
	 		current = head;
 
	 		while(current.next){
	 			current = current.next;
	 		}
 
	 		current.next = node;
	 	}
 
	 	length++;
	 	return true;
	};
 
	this.insert = function(position, element){
	 	if (position >= 0 && position <= length) {
	 		var node = new Node(element),
		 		current = head,
		 		previous,
		 		index = 0;
 
	 		if(position === 0){
	 			node.next = current;
	 			head = node;
	 		}else{
	 			while(index++ < position){
	 				previous = current;
	 				current = current.next;
	 			}
	 			node.next = current;
	 			previous.next = node;
	 		}
 
	 		length++;
	 		return true;
	 	}else{
	 		return false;
	 	}
	 };
 
	this.removeAt = function(position){
	 	if(position > -1 && position < length){
	 		var current = head,
	 		    previous,
	 		    index = 0;
 
	 		if (position === 0) {
 
	 			head = current.next;
 
	 		}else{
 
	 			while (index++ < position){
	 				previous = current;
	 				current = current.next;
	 			}
 
	 			previous.next = current.next;
	 		};
 
	 		length--;
	 		return current.element;
	 	}else{
	 		return null;
	 	}
	};
 
	this.remove = function(element){
	 	var current = head,
	 	    previous;
 
	 	if(element === current.element){
	 		head = current.next;
	 		length--;
	 		return true;
	 	}
	 	previous = current;
	 	current = current.next;
 
	 	while(current){
	 		if(element === current.element){
	 			previous.next = current.next;
	 			length--;
	 			return true;
	 		}else{
	 			previous = current;
	 			current = current.next;
	 		}
	 	}
	 	return false;
	};
 
	this.remove = function(){
	 	if(length < 1){
	 		return false;
	 	}
 
	 	var current = head,
 		previous;
 
	 	if(length == 1){
	 		head = null;
	 		length--;
	 		return current.element;
	 	}
 
 	
	 	while(current.next !== null){
	 		previous = current;
	 		current = current.next;
	 	}
 
	 	previous.next = null;
	 	length--;
	 	return current.element;
	};
 
	this.indexOf = function(element){
	 	var current = head,
	 	    index = 0;
 
	 	while(current){
	 		if(element === current.element){
	 			return index;
	 		}
	 		index++;
	 		current = current.next;
	 	}
 
	 	return false;
	};
 
	this.isEmpty = function(){
	 	return length === 0;
	};
 
	this.size = function(){
	 	return length;
	};
 
	this.toString = function(){
	 	var current = head,
	 	    string = '';
 
	 	while(current){
	 		string += current.element;
	 		current = current.next;
	 	}
	 	return string;
	};	 
 
	this.getHead = function(){
	 	return head;
	}
	
}

var linkedList = new LinkedList();

for (var i = 0; i < 10; i++) {
	linkedList.append(i);
}


console.log("单链表",linkedList.insert(10,100))
console.log("单链表",linkedList.toString())
console.log("单链表",linkedList.size())
console.log("单链表",linkedList.removeAt(3))
console.log("单链表",linkedList.indexOf(8))
console.log("单链表",linkedList.getHead())






console.log("------------循环链表------------")
//在单链表的基础上，将尾节点的指针指向头结点，就构成了一个循环链表。环形链表从任意一个节点开始，都可以遍历整个链表。

function CircularLinkedList(){
	var Node = function(element){
		this.element = element;
		this.next = null;
	}
 
	var length = 0,
	    head   = null;
 
	this.append = function(element){
		var node = new Node(element),
		    current;
 
		if (!head) {
			head = node;
			node.next = head;
		}else{
			current = head;
 
			while(current.next !== head){
				current = current.next;
			}
 
			current.next = node;
			node.next = head;
		};
 
		length++;
		return true;
	};
 
	this.insert = function(position, element){
		if(position > -1 && position < length){
			var node = new Node(element),
			    index = 0,
			    current = head,
			    previous;
 
 
			if (position === 0) {
 
				node.next = head;
				head = node;
 
			}else{
 
				while(index++ < position){
					previous = current;
					current = current.next;
				}
 
				previous.next = node;
				node.next = current;
 
			};
 
			length++;
			return true;
		}else{
			return false;
		}
	};
 
	this.removeAt = function(position){
		if(position > -1 && position < length){
	 		var current = head,
	 		    previous,
	 		    index = 0;
 
	 		if (position === 0) {
 
	 			head = current.next;
 
	 		}else{
 
	 			while (index++ < position){
	 				previous = current;
	 				current = current.next;
	 			}
 
	 			previous.next = current.next;
	 		};
 
	 		length--;
	 		return current.element;
	 	}else{
	 		return null;
	 	}
	};
 
	this.remove = function (element){
		var current = head,
		    previous,
		    indexCheck = 0;
 
		while(current && indexCheck < length){
			if(current.element === element){
				if(indexCheck == 0){
					head = current.next;
					length--;
					return true;
				}else{
					previous.next = current.next;
					length--;
					return true;
				}
			}else{
				previous = current;
				current = current.next;
				indexCheck++;
			}
		}
		return false;
	};
 
	this.remove = function(){
		if(length === 0){
			return false;
		}
 
		var current = head,
		    previous,
		    indexCheck = 0;
 
		if(length === 1){
			head = null;
			length--;
			return current.element;
		}
 
		while(indexCheck++ < length){
			previous = current;
			current = current.next;
		}
		previous.next = head;
		length--;
		return current.element;
	};
 
	this.indexOf = function(element){
		var current = head,
		    index = 0;
 
		while(current && index < length){
			if(current.element === element){
				return index;
			}else{
				index++;
				current = current.next;
			}
		}
		return false;
	};
 
 
	this.isEmpty = function(){
	 	return length === 0;
	};
 
	this.size = function(){
	 	return length;
	};
 
	this.toString = function(){
	 	var current = head,
	 	    string = '',
	 	    indexCheck = 0;
 
	 	while(current && indexCheck < length){
	 		string += current.element;
	 		current = current.next;
	 		indexCheck++;
	 	}
 
	 	return string;
	};	 
 
}


var circleLinkedList = new CircularLinkedList();

for (var i = 0; i < 10; i++) {
	circleLinkedList.append(i);
}


console.log("循环链表",circleLinkedList.insert(3,100))
console.log("循环链表",circleLinkedList.toString())
console.log("循环链表",circleLinkedList.size())
console.log("循环链表",circleLinkedList.indexOf(8))
console.log("循环链表",circleLinkedList.removeAt(3))





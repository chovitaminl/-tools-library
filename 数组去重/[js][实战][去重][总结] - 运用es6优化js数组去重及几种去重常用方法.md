﻿原文出自本人博客：

[js去重的几种常用方法](http://www.twicetech.top/js-any-way-for-array-unique/ )

![博主博客--兼乎](https://raw.githubusercontent.com/liejiayong/json-library/master/it-image/TIM%E5%9B%BE%E7%89%8720180131160610.jpg "兼乎")

	#总结在前
		对于性能：
		速度最快的是：对象键值对法去重（空间换时间<^^>）
		最常规的是：使用indexof去重，注意ie8以下的兼容写法
		最土的是：使用双重循环逐个遍历
		推荐的是：es6优化去重
		至于其他优质算法去重这里不谈，我们可以相互讨论，你邮件我你的思路，谢谢。
	
在项目中进行array去重常用有一下几种方法。

##1.使用for循环法

思路：

1.构建一个新的数组存放结果

2.for循环中每次从原数组中取出一个元素，用这个元素循环与结果数组对比

3.若结果数组中没有该元素，则存到结果数组中


	/*
	 * An Array of relevant
	 * use for loop
	 * */
	Array.prototype.arrUnique_for = function () {
	    let res = [this[0]];
	    let flag = false;
	    for (let i = 1; i < this.length; i++) {
	        for (let j = 0; j < res.length; j++) {
	            if (this[i] === res[j]) {
	                flag = true;
	                break;
	            }
	        }
	        if (!flag) {
	            res.push(this[i]);
	        }
	        flag = false;
	    }
	    return res;
	}


##2.使用数组排列后对比法

思路：

1.先将原数组进行排序

2.检查原数组中的第i个元素 与 结果数组中的最后一个元素是否相同，因为已经排序，所以重复元素会在相邻位置

3.如果不相同，则将该元素存入结果数组中

局限性：通过sort排序后，去重返回的结果也是排序后的


	/*
	 *  An array of relevant
	 *  use array sort and judge
	 *
	 * */
	Array.prototype.arrUnique_sort = function () {
	    this.sort();
	    let res = [this[0]];
	    for (let i = 1; i < this.length; i++) {
	        if (this[i] !== res[res.length - 1]) {
	            res.push(this[i]);
	        }
	    }
	    return res;
	}



##3.对象键值对法

思路：

1.创建一个新的数组存放结果

2.创建一个空对象

3.for循环时，每次取出一个元素值作为对象的一个属性与对象进行对比并赋值为1再存入到第2步建立的对象中，如果这个元素不重复，则把它存放到结果数组中。

说明：至于如何对比，就是每次从原数组中取出一个元素，然后到对象中去访问这个属性，如果能访问到值，则说明重复。

局限性：空间换时间

优点：速度快


	/*
	 *  An array of relevant
	 *  create a new array and create a new object ,compare then
	 *
	 * */
	
	Array.prototype.arrUnique_aco = function () {
	    let res = [];
	    let json = {};
	    for (let i = 0; i < this.length; i++) {
	        if (!json[this[i]]) {
	            res.push(this[i]);
	            json[this[i]] = 1;
	        }
	    }
	    return res;
	}


##4.使用indeof

局限性：判断值是否在数组的方法“indexOf”是ECMAScript5 方法，IE8以下不支持，需多写一些兼容低版本浏览器代码

4.1历遍数组法

思路：

1.新建一新数组

2.遍历传入数组，值不在新数组就加入该新数组中


	/*
	 *  An array of relevant
	 *  use indexOf iterate
	 *
	 * */
	
	Array.prototype.arrUnique_indexof = function () {
	    let res = [];
	    for (let i = 0; i < this.length; i++) {
	        if (res.indexOf(this[i]) === -1) res.push(this[i]);
	    }
	    return res;
	
	}


4.2.数组下标判断法

思路：

1.如果当前数组的第i项在当前数组中第一次出现的位置不是i，那么表示第i项是重复的，忽略掉。否则存入结果数组。


	/*
	 *  An array of relevant
	 *  use indexOf iterate,if res index == i
	 *
	 * */
	
	Array.prototype.arrUnique_indexof_index = function () {
	    let res = [this[0]];
	    for (let i = 1; i < this.length; i++) {
	        if (this.indexOf(this[i]) === i) {
	            res.push(this[i]);
	        }
	    }
	    return res;
	}


4.3兼容性：兼容ie8一下浏览器写法。只需要在最开始加入兼容函数就ok，如下：


	/*
	* indexOf兼容
	* */
	if (!Array.prototype.indexOf) {
	    Array.prototype.indexOf = function (val) {
	        let res = -1, len = this.length;
	        if (len === 0) {
	            return res;
	        }
	        for (let i = 0; i < len; i++) {
	            if (this[i] === val) {
	                res = i;
	                break;
	            }
	        }
	        return res;
	    }
	}
	Array.prototype.arrUnique_indexof = function () {
	    let res = [];
	    for (let i = 0; i < this.length; i++) {
	        if (res.indexOf(this[i]) === -1) res.push(this[i]);
	    }
	    return res;
	
	}


##5.优化历遍数组法

思路：

1.获取没重复的最右一值放入新数组。

2.检测到有重复值时终止当前循环同时进入顶层循环的下一轮判断


	/*
	 *  An array of relevant
	 *  优化遍历数组法
	 *
	 * */
	
	Array.prototype.arrUnique_optimize = function () {
	    let res = [], len = this.length;
	    for (let i = 0; i < len; i++) {
	        for (let j = i + 1; j < len; j++) {
	            if (this[i] === this[j]) j = ++i;
	        }
	        res.push(this[i])
	    }
	    return res;
	}


##6.使用es6特性来数组去重

 思路：

1.使用set的数据结构构造数组。

建议：推荐


	
	let arr = [1,2,3,4,5,5,5,5]
	// arr.length => 8
	let single = new Set( arr );
	// single = [1,2,3,4,5]
	// single.length => 5
	//这是使用Set()的唯一特性去重



代码以上传到github：https://github.com/liejiayong/somethingElse/blob/master/Tools-template/array-unique-.js
欢迎来怼，喜欢的给个star，谢谢！

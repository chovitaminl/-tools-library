/**
 *  获取指定范围内的随机数
 * @param min 最小值
 * @param max 最大值
 * @returns {number} 返回随机数
 */
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 *  洗牌函数
 * @param arr 输入数组列表
 * @returns {Blob|ArrayBuffer|Array.<T>|string|*}
 */
export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandom(0, i)
    let n = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = n
  }
  return _arr
}

/**
 *  防抖函数。使用柯里化返回新函数
 *  使用说明：限制函数在指定时间后触发
 *  应用场景：适用于输入搜索（input、keyup）、提交按钮、弹窗
 * @param fn
 * @param delay
 * @returns {Function}
 */
export function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

function debounce_es5(fn, delay) {
  var timer = null;
  return function () {
    var context = this, arg = arguments;
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, arg);
    }, delay);
  }
}

/**
 * 节流函数。使用柯里化返回新函数
 *  使用说明：强制函数以固定的速率执行
 *  应用场景：适合应用于动画相关的场景（resize、touchmove、mousemove、scroll）
 * @param fun
 * @param delay
 * @returns {Function}
 */
export function throttle(fn, threshhold = 160) {
  var timer = null
  var start = Date.now()
  return function (...args) {
    var curr = Data.now()
    if (timer) clearTimeout(timer)
    if (curr - start >= threshhold) {
      fn.apply(this, args)
      start = curr
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, threshhold)
    }
  }
}

function throttle_es5(fn, threshhold = 160) {
  var timer = null;
  var start = Data.now();
  return function () {
    var context = this, arg = arguments, curr = Data.now();
    if (timer) clearTimeout(timer);
    if (curr - start >= threshhold) {
      fn.apply(context, arg);
      start = curr;
    } else {
      timer = setTimeout(function () {
        fn.apply(context, arg);
      }, threshhold);
    }
  }
}

/**
 * 获取字符串长度
 * 采用扩展运算符可以识别四个字符的Unicode字符，
 * 因此使用扩展运算符结构字符串为数组，能返回实际的字符长度
 * 注：凡是涉及到操作四个字节的 Unicode 字符的函数，最好都用扩展运算符改写。
 * 
 * @param {*} str 
 * @returns {Number} 
 */
export function length(str) {
  return [...str].length
}

/**
 * 函数节流方法
 * @param {Function} fn 延时调用的函数
 * @param {Number} delay 延迟多长时间
 * @param {Number} atleast 至少多长时间触发一次
 * @return {Function} 延迟执行的方法
 */
export const throttle = function (fn, delay, atleast) {
    let timer = null
    let previouts = null

    return function () {
        const now = +new Date()

        if (!previouts) {
            previouts = now
        }

        if (atleast && now - previouts > atleast) {
            fn()
            // 重置上一次开始时间为本次结束时间
            previouts = now
        }
        else {
            clearTimeout(timer)
            timer = setTimeout(function () {
                fn()
                previouts = null
            }, delay)
        }
    }
}

// 实现过程解析

/**
 * 1.
 * 【问题】：setTimeout 函数返回值应该保存在一个相对全局变量里面，否则每次 resize 的时候都会产生一个新的计时器，
 */
var COUNT = 0;
function testFn() {
    console.log( COUNT++ );
}
// 浏览器 resize 的时候：1、清除之前的计时器，2、添加一个计时器让真正的函数 testFn 延后 100 ms触发
window.onresize = function() {
    var timer = null;
    clearTimeout( timer );
    timer = setTimeout( function() {
        testFn();
    }, 100 );
};

/**
 * 2.
 * 【问题】：产生了一个全局变量 timer，闭包解决
 */
var timer = null;
window.onresize = function() {
    clearTimeout( timer );
    timer = setTimeout( function() {
        testFn();
    }, 100 );
};

/**
 * 3.
 * 【问题】：timer 对外不可见，但内部延时函数触发时还可以访问到 timer 变量 
 */
var throttle3 = function ( fn, delay ) {
    var timer = null;
    return function () {
        clearTimeout( timer );
        timer = setTimeout( function() {
            fn();
        }, delay );
    };
};
window.onsize = throttle3( testFn, 200, 1000 );

/**
 * 4. 
 *【问题】：如果用户 不断的 resize 浏览器窗口大小，这时延迟处理函数一次都不会执行
 */
var throttle4 = function ( fn, delay ) {
    var timer = null;
    return function() {
        clearTimeout( timer );
        timer = setTimeout( function() {
            fn();
        }, delay );
    };
};
var f = throttle4( testFn, 200 );	// throttle 调用后返回的 function 才是真正的 onresize 触发时需要调用的函数
window.onsize = function () {
    f();
};

/**
 * 5.
 * 解决思路：新增功能：当用户触发 resize 的时候应该 在某段时间 内至少触发一次，既然是在某段时间内，那么这个判断条件就可以取当前的时间毫秒数，每次函数调用把当前的时间和上一次调用时间相减，然后判断差值如果大于 某段时间 就直接触发，否则还是走 timeout 的延迟逻辑。
 * 1. previous 变量的作用和 timer 类似，都是记录上一次的标识，必须是相对的全局变量
 * 2. 如果逻辑流程走的是“至少触发一次”的逻辑，那么函数调用完成需要把 previous 重置成当前时间，简单来说就是：相对于下一次的上一次其实就是当前		
 */
// 代码实现看顶部的 export const throttle
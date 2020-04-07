/**
 * JavaScript 数据结构与算法之美 - 队列
 */

// Queue类
function Queue() {
    this.items = [];

    // 向队列尾部添加元素
    this.enqueue = function(element) {
        this.items.push(element);
    };

    // 移除队列的第一个元素，并返回被移除的元素
    this.dequeue = function() {
        return this.items.shift();
    };

    // 返回队列的第一个元素
    this.front = function() {
        return this.items[0];
    };

    // 判断是否为空队列
    this.isEmpty = function() {
        return this.items.length === 0;
    };

    // 获取队列的长度
    this.size = function() {
        return this.items.length;
    };

    // 清空队列
    this.clear = function() {
        this.items = [];
    };

    // 打印队列里的元素
    this.print = function() {
        console.log(this.items.toString());
    };
}

// 创建Queue实例
var queue = new Queue();
console.log(queue.isEmpty()); // true
queue.enqueue('John'); // undefined
queue.enqueue('Jack'); // undefined
queue.enqueue('Camila'); // undefined
queue.print(); // "John,Jack,Camila"
console.log(queue.size()); // 3
console.log(queue.isEmpty()); // false
queue.dequeue(); // "John"
queue.dequeue(); // "Jack"
queue.print(); // "Camila"
queue.clear(); // undefined
console.log(queue.size()); // 0
/**
 * JavaScript 数据结构与算法之美 - 数组
 */

let str = 'string';
str = 123;
console.log(str);   // 123

let a = 123;
let b = '456';
let c = a + b;
console.log(c);     // '123456'，数值加字符串，结果是字符串

const arr = [12, 34, 'abc'];
arr[2] = { key: 'value' };
console.log(arr);   // [12, 34, {key: 'value'}]

arr.push({ key: '2'});
console.log(arr);
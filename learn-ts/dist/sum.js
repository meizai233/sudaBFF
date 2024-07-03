"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 定义一个函数，接受两个参数，都是数字类型，并返回它们的和
function addNumbers(a, b) {
    return a + b;
}
exports.default = addNumbers;
// 调用函数并打印结果
const result = addNumbers(5, 10);
console.log(result); // 输出应该是 15

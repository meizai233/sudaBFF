"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 实现 Person 接口的类
class Student {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    // 实现 greet 方法
    greet(message) {
        return `${this.name} says: ${message}`;
    }
}
// 创建一个 Student 实例
const student = new Student("张三", 20);
// 调用 greet 方法并打印结果
console.log(student.greet("Hello, world!"));
const sum_1 = require("./sum");
(0, sum_1.default)(1, 2);

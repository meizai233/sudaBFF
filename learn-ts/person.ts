// 定义一个接口描述一个人的基本信息
interface Person {
  name: string;
  age: number;
  greet(message: string): string;
}

// 实现 Person 接口的类
class Student implements Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // 实现 greet 方法
  greet(message: string): string {
    return `${this.name} says: ${message}`;
  }
}

// 创建一个 Student 实例
const student = new Student("张三", 20);

// 调用 greet 方法并打印结果
console.log(student.greet("Hello, world!"));

import sum from "./sum";
sum(1, 2);

import { TJavaScriptSFOne, TJavaScriptSFTwo, TJavaScriptSFThree } from './types'

export const SF: {
  JavaScriptSFOne: TJavaScriptSFOne
  JavaScriptSFTwo: TJavaScriptSFTwo
  JavaScriptSFThree: TJavaScriptSFThree
} = {
  JavaScriptSFOne: {
    1: `setTimeout(() => { let text1 = "Quick brown fox" let text2 = "jumps `,
    2: `over " text2 += "lazy dog" for (let i = 0; i < 5; i++) { let `,
    3: `before = text1 before += " and " + text2 + "." console.log(before)`,
    4: ` } }, 1000) function multiply(a, b) { return a * b } `,
    5: `console.log(multiply(6, 7)) let obj = { msg: "Hello world", `,
    6: `count: 5 } while (obj.count > 0) { console.log(obj.msg)`,
    7: ` } const greet = (name) => { return "Greetings, " + name + "!" } `,
    8: `console.log(greet("Bob")) let arr = [10, 20, 30, 40] let doubled = `,
    9: `arr.map(x => x * 2) console.log(doubled) const isEven = num => num `,
    10: `% 2 === 0 console.log(isEven(4)) console.log(isEven(7)) let sum = `,
    11: `0 for (let i = 0; i < 5; i++) { sum += i } console.log("Sum is: " `,
    12: `+ sum) let str = "Coding " str += "is fun!" console.log(str) let `,
    13: `fruits = ["apple", "banana", "cherry"] for (let i = 0; i < `,
    14: `fruits.length; i++) { console.log(fruits[i].toUpperCase()) } `,
    15: `function square(num) { return num * num } console.log(square(5)) `,
    16: `let car = { brand: "Toyota", model: "Corolla", year: 2020 } `,
    17: `console.log(car.brand + " " + car.model) let count = 0 while `,
    18: `(count < 3) { console.log("Count: " + count) count++ } let `,
    19: `numbers = [2, 4, 6, 8] let total = numbers.reduce((sum, current) => `,
    20: `sum + current, 0) console.log("Total: " + total) const sayHello = `,
    21: `name => { return "Hello, " + name + "!" } console.log(sayHello("`,
    22: `Charlie")) let isOdd = n => n % 2 !== 0 console.log(isOdd(3)) `,
    23: `console.log(isOdd(10)) function factorial(n) { if (n === 0) return `,
    24: `1 return n * factorial(n - 1) } console.log(factorial(5)) `,
    25: `const array = [1, 2, 3, 4, 5] const squares = array.map(x => x * x)`,
  },
  JavaScriptSFTwo: {
    1: `let person = { name: "Alice", age: 30 } person.city = "NY" `,
    2: `console.log(person.name + " lives in " + person.city) let `,
    3: `numbers = [5, 10, 15, 20] let total = 0 for (let num of `,
    4: `numbers) { total += num } console.log("Total: " + total) `,
    5: `const greetUser = user => { return "Hello, user!" } `,
    6: `console.log(greetUser("Alice")) let colors = ["red", "blue", `,
    7: `"green"] colors.forEach(color => { console.log(color) }) `,
    8: `function add(a, b) { return a + b } console.log(add(5, 7)) `,
    9: `let squares = [] for (let i = 1; i <= 5; i++) { squares.push(`,
    10: `i * i) } console.log(squares) const isPositive = num => num `,
    11: `> 0 console.log(isPositive(-5)) console.log(isPositive(10)) `,
    12: `let str = "Hello" str += " World!" console.log(str) let `,
    13: `arr = [1, 2, 3] let doubledArr = arr.map(x => x * 2) `,
    14: `console.log(doubledArr) function multiplyAll(arr) { return arr.`,
    15: `reduce((product, num) => product * num, 1) } `,
    16: `const filterEvens = arr => arr.filter(num => num % 2 === 0) `,
    17: `console.log(filterEvens([1, 2, 3, 4, 5])) let text = "Coding " `,
    18: `text += "is awesome!" console.log(text) let items = ["apple", `,
    19: `"banana", "kiwi"] items.forEach(item => { console.log(item) }) `,
    20: `const findMax = (a, b) => a > b && a console.log(findMax(10, 20))`,
    21: `let grades = [85, 92, 76] let average = grades / 2 `,
    22: `console.log("Average grade: " + average) `,
    23: `console.log(reverseString("JavaScript")) console.log(fruitsMap) `,
    24: `let fruitsMap = new Map() fruitsMap.set("apple", 1) `,
    25: `let factorial = n => (n === 0 ? 1 : n * factorial(n - 1)) `,
  },
  JavaScriptSFThree: {
    1: `const items = [1, 2, 3, 4] let sum = items.reduce((acc, val) => `,
    2: `acc + val, 0) console.log("Sum: " + sum) function subtract(a, b) {`,
    3: `return a - b } console.log(subtract(10, 5)) let numbers = [0, 1, 2]`,
    4: `let squares = numbers.map(n => n * n) console.log(squares) `,
    5: `const addToList = (list, item) => { list.push(item) return list }`,
    6: `let myList = [] console.log(addToList(myList, "item1")) `,
    7: `const findMin = arr => Math.min(...arr) `,
    8: `let user = { name: "John", age: 25 } user.age += 1 `,
    9: `let count = 0 while (count < 5) { console.log(count) count++ } `,
    10: `const multiply = (x, y) => x * y console.log(multiply(4, 5)) `,
    11: `let fruits = ["apple", "banana", "cherry"] fruits.forEach(fruit => {`,
    12: `console.log(fruit + " is delicious!") }) `,
    13: `console.log(isEven(8)) console.log(isEven(7)) `,
    14: `console.log(greet("Alice")) let arr = [10, 20, 30] `,
    15: `console.log(multiplied) `,
    16: `countDown(3) const uniqueNumbers = arr => [...new Set(arr)] `,
    17: `let text = "JavaScript" console.log(text.length) `,
    18: `mixedArr.forEach(item => { console.log(item) }) `,
    19: `console.log(capitalize("hello")) let nums = [10, 20, 30] `,
    20: `console.log("Total sum: " + totalSum) `,
    21: `const isOdd = num => num % 2 !== 0 console.log(isOdd(3)) `,
    22: `let characters = ["a", "b", "c"] `,
    23: `const mergeArrays = (arr1, arr2) => [...arr1, ...arr2] `,
    24: `let str = "Coding" str += " is great!" console.log(str) `,
    25: `console.log(reverseArr([1, 2, 3])) `,
  },
}

import { TTypeScriptOne, TTypeScriptTwo, TTypeScriptThree } from './types'

export const SQSFTypeScript: {
  TypeScriptOne: TTypeScriptOne
  TypeScriptTwo: TTypeScriptTwo
  TypeScriptThree: TTypeScriptThree
} = {
  TypeScriptOne: {
    1: `class Dog { private value: number constructor() { this.value * 100 }`,
    2: `public fetchBall(): string { return 'Fetching ball' }`,
    3: `for (let i = 0 i < 10 i++) { console.log(i) }`,
    4: `public barkLoudly(): void { console.log('Woof!') }`,
    5: `private randomizeValue(): number { return Math.random() * 10 }`,
    6: `public sitDown(): void { console.log('Sitting down...') }`,
    7: `while (this.value < 500) { this.value += 50 }`,
    8: `private numbers: number[] = [1, 2, 3, 4, 5]`,
    9: `const names: string[] = ['Fido', 'Buddy', 'Rex']`,
    10: `let index = 0 while (index < names.length) { console.log(ns[ix]) }`,
    11: `public fetchAllBalls(): void { for (let i = 0 i < 3 i++)`,
    12: `private randomLoop(): void { for (let i = 0 i < this.n.length i++) }`,
    13: `static fetchBone(): string { return 'Fetching bone...' }`,
    14: `public performTrick(): void { let trick = Math.random()`,
    15: `private rollOver(): void { console.log('Rolling over') }`,
    16: `let i = 0 while (i < 5) { console.log(i) i++ }`,
    17: `public playFetch(): void { this.fetchBall() this.runInCircle() }`,
    18: `const mixArray: any[] = [1, 'bone', true, 3.14]`,
    19: `for (const item of mixArray) { console.log(item) }`,
    20: `let sum = 0 for (let i = 1 i <= 10 i++) { sum += i }`,
    21: `public chaseTail(): void { console.log('Chasing tail') }`,
    22: `private sleepSoundly(): void { console.log('Sleeping soundly...') }`,
    23: `let counter = 0 while (counter < 3) { this.barkLoudly() counter++ }`,
    24: `static barkTwice(): void { console.log('Woof Woof') }`,
    25: `public jumpHigh(): void { console.log('Jumping high!') }`,
  },
  TypeScriptTwo: {
    1: `const numbers = [10, 20, 30, 40, 50]`,
    2: `for (let i = 0 i < numbers.length i++) { console.log(numbers[i]) }`,
    3: `let x = 0 while (x < 5) { console.log('Loop iteration:', x) x++ }`,
    4: `function add(a: number, b: number): number { return a + b }`,
    5: `const person = { name: 'John', age: 30 }`,
    6: `if (person.age >= 18) { console.log('Adult') }`,
    7: `const arrayOfStrings = ['apple', 'banana', 'cherry']`,
    8: `arrayOfStrings.forEach(fruit => { console.log(fruit) })`,
    9: `let counter = 10 do { console.log('Counter:', counter) counter-- }`,
    10: `function multiply(x: number, y: number): number { return x * y }`,
    11: `const isEven = (num: number): boolean => num % 2 === 0`,
    12: `for (let i = 0 i < 5 i++) { if (i % 2 === 0) { return } }`,
    13: `let randomValue = Math.floor(Math.random() * 100)`,
    14: `switch (randomValue % 2) { case 0: console.log('Even') }`,
    15: `const user = { username: 'alice', email: 'alice@example.com' }`,
    16: `const values = [100, 200, 300] values.push(400) console.log(values)`,
    17: `let result = 0 for (let i = 1 i <= 10 i++) { result += i }`,
    18: `console.log('Sum of numbers from 1 to 10:', result)`,
    19: `const isPositive = (num: number) => num > 0 ? 'Positive' : 'Negative'`,
    20: `const arr = [1, 2, 3] let s = arr.reduce((acc, val) => acc + val, 0)`,
    21: `console.log('Sum of array:', sum)`,
    22: `const createMessage = (name: string) => 'Hello, ' + name + '!'`,
    23: `let greeting = createMessage('Bob')`,
    24: `console.log(greeting)`,
    25: `const rvrsString = (str: string) => str.split('').reverse().join('')`,
  },
  TypeScriptThree: {
    1: `let x = 5 const y = 10 let z = x + y`,
    2: `function greet(name: string): string { return 'Hello, ' + name }`,
    3: `const colors = ['red', 'green', 'blue']`,
    4: `colors.forEach(color => { console.log('Color:', color) })`,
    5: `let sum = 0 for (let i = 1 i <= 10 i++) { sum += i }`,
    6: `console.log('Total sum:', sum)`,
    7: `const isPalindrome = (str: string): boolean => str === str.split('')`,
    8: `console.log(isPalindrome('racecar'))`,
    9: `let c = 0 while (c < 5) { console.log('Counting:', c) c++ }`,
    10: `const users = [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }]`,
    11: `us.forEach(u => { console.log(u.name + ' is ' + u.age + ' y old.') })`,
    12: `const numbers = [1, 2, 3] const db = numbers.map(num => num * 2)`,
    13: `console.log(doubled)`,
    14: `const randomNum = Math.floor(Math.random() * 100)`,
    15: `if (randomNum > 50) { console.log('Number is greater than 50') }`,
    16: `const filterNum = (arr: number[]) => arr.filter(num => num % 2 === 0)`,
    17: `console.log(filterEvenNumbers([1, 2, 3, 4, 5]))`,
    18: `const sumNumbers = (a: number, b: number) => a + b`,
    19: `let result = sumNumbers(10, 20)`,
    20: `console.log('Result:', result)`,
    21: `const get = (userId: number) => ({ id: userId, name: 'John Doe' })`,
    22: `console.log(getUserInfo(1))`,
    23: `const max = Math.max(...numbers)`,
    24: `console.log('Max number:', max)`,
    25: `let person = { name: 'Sarah', age: 28 } person.age++`,
  },
}

# 基础特性

## let和const

推荐使用`let`和`const`声明变量

### 特性

`let`的特点

-   不能重复声明相同名字的变量（SyntaxError）
-   作用域为**块作用域**
-   暂时性死区：不能在声明之前引用该变量（ReferenceError）
    -   `let`也会在编译时提升，但不允许在声明的位置之前对变量进行引用
    -   `var`声明的变量在声明或者赋值之前引用，会得到`undefined`
-   全局作用域声明的变量不会成为window的全局属性
-

`const`的特点

-   `const`声明的变量无法使用`=`为其二次赋值
-   `const`声明的对象或者数组能够修改其中的内容，只要其变量引用不发生变化

### 解决的问题

-   `let`无法重复声明的特性有助于代码中声明的变量不覆盖之前的变量
-   `let`暂时性死区特性有助于解决变量在不符合逻辑的地方被引用
-   `const`保证一个不会被想修改的值不被意外修改

## 解构赋值 {#destructing}

解构得到的变量为浅拷贝变量，如果解构出来的变量是一个对象，那么他和原来对象中的对象是同一个引用。

### 对象解构

```js
const obj = {
    person: { name: "zhangsan" },
    age: 18,
}

let { person, age } = obj

person.name = "lisi"
age = 15

console.log(age) //15
console.log(person) //{name: 'lisi'}
console.log(obj) //{person:{name: 'lisi'}, age: 18}
```

### 数组解构

```js
const arr = [10, 20, 30]
const [a, b, c] = arr
console.log(a, b, c) // 10 20 30
```

### 变量重命名

重命名该变量以后，只能使用重命名的变量，使用原属性名会报错

```js
const obj = { myName: "zhangsan" }
const { myName: yourName } = obj
console.log(yourName) // zhangsan
console.log(myName) // ReferenceError: myName is not defined
```

### 解构默认值

解构的变量如果不存在的话，可以使用`=`为其添加一个需求中想要的默认值，而不是`undefined`。
如果变量存在，那么默认值则不生效。

```js
const obj = { myName: "zhangsan" }
const { age, addr = "beijing", myName = "lisi" } = obj
console.log(age) //undefined
console.log(addr) // beijing
console.log(myName) //zhangsan
```

默认值可以和变量重命名一起使用。

```js
const obj = { name: "zhangsan" }
const { age: myAge = 10, name: myName = "lisi" } = obj
console.log(myAge) //10
console.log(myName) // zhangsan
```

### 深度解构

```js
let obj = {
    a: {
        b: {
            c: 1,
        },
    },
}

const { a: { b: { c = "" } = "" } = "" } = obj
```

## 模板字符串

使用模板字符串代替使用`+`进行字符串的拼接，模板字符串使用``包裹

```js
const name = "Lily"
const age = 18

console.log("My name is" + name + ", I am " + age) // My name is Lily, I am 18
console.log(`My name is ${name}, I am ${age}`) //My name is Lily, I am 18
```

## 函数

### 默认参数

当提供的值为`undefined`时，函数会使用默认参数作为实参的值在函数内使用。这意味着默认参数在参数烈庙中可以放在
非默认参数的前面，当想要使用默认参数时，输入`undefined`作为参数即可

```js
const hello = (name = "Guest", message) => {
    console.log(`${message}, ${name}!`)
}

hello("Lily", "Hi") // Hi, Lily!
hello(undefined, "Hello") //Hello, Guest!
```

### 剩余参数 rest parameter

剩余参数实际上使用的[扩展运算符](#SpreadOperator)`...`表示剩余所有参数的数组

```js
function test(a, b, c, ...args) {
    console.log(a, b, c, args)
}

test(1, 2, 3, 4, 5, 6) // 1 2 3 [ 4, 5, 6 ]
```

剩余参数`args`与`arguments`的区别

-   `args`只包含没有对应实参的参数，`arguments`对象包含了所有实参
-   `args`是一个真数组，`arguments`是一个伪数组对象
-   剩余参数必须放最后面（编译报错：A rest parameter must be last in parameter list）

## 扩展运算符 `...` {#SpreadOperator}

扩展运算符`...`用于展开**可迭代对象**为多个元素，如数组，字符串或者对象等。

### 数组展开

```js
const numbers = [1, 2, 3]
const result = [...number, 4, 5]
console.log(result) // [1, 2, 3, 4, 5]
```

### 字符串展开

```js
const str = "abc"
console.log([...str]) // ['a', 'b', 'c']
console.log([...[...str]]) // ['a', 'b', 'c']
```

### 对象展开

对象展开是一种浅拷贝

```js
const obj = { person: { name: "Lily", age: 18 }, addr: "Beijing" }
const another = { ...obj }
another.person.name = "John"
another.addr = "Hangzhou"

console.log(obj) // { person: { name: 'John', age: 18 }, addr: 'Beijing' }
console.log(another) // { person: { name: 'John', age: 18 }, addr: 'Hangzhou' }
```

### 在解构中使用

在解构中使用用于构建数组或者对象，将未显式解构的值作为数组或者对象创建

```js
const [a, b, ...arr] = [1, 2, 3, 4, 5]
const { c, d, ...obj } = { c: 1, d: 2, e: 3, f: 4, g: 5 }
console.log(a, b, arr) // 1 2 [ 3, 4, 5 ]
console.log(c, d, obj) // 1 2 { e: 3, f: 4, g: 5 }
```

可以条件性构建对象

```js
const pick = (id, name, age) => {
    return {
        id,
        ...(name && { name }),
        ...(age && { age }),
    }
}
console.log(pick(1))
console.log(pick(2, "Jack"))
console.log(pick(3, "John", 12))
```

## 箭头函数

### 基本形式

```js
const foo = (name, age) => {
    console.log(`Hello, ${name}, you are ${age}`)
}
```

### 简写形式

箭头函数有简写形式，不使用`{}`且只有一句表达式时，该表达式的运算结果为该函数的返回值

```js
const foo = (a, b) => `hello, ${a + b}`
console.log(foo(2, 5)) // hello, 7
```

但是不适用于显式返回一个对象的情况, 因为`{}`会被当成函数体；应当使用`return`显式

```js
const foo = (a, b) => {
    a, b
}
console.log(foo(1, 2)) //undefined

const bar = (a, b) => {
    return { a, b }
}
console.log(bar(1, 2)) // { a: 1, b: 2 }
```

### 参数只有一个的情况

只有一个参数时，可以省略参数列表的括号

```js
const foo = (name) => `Hello, ${name}`
console.log(foo("Jack")) // Hello, Jack
```

### 箭头函数的特点

-   不能作为构造函数
-   没有原型
-   没有`arugments`参数
-   不能使用`yield`关键字
-   `this`在定义时决定，为外层函数作用域的`this`

## Optional-Chaining

使用`?`运算符减少`if`的条件判断，如果没有该属性直接返回`undefined`，后续的链式调用不进行调用。

```js
const obj = {
    foo: {
        bar: {
            x: 42,
        },
    },
}

console.log(obj?.foo?.bar?.x) // 42
console.log(obj?.bar) //undefined
console.log(obj?.bar?.foo) // undefined
```

函数也适用

```js
const obj = {
    foo: () => {
        console.log("I am a function")
    },
}

obj.foo?.() // I am a function
obj.bar?.() //
```

## 字符串方法

ES6中新引入两个字符串方法`startsWith`和`endsWith`，两个方法均不支持正则表达式

### startsWith

判断字符串是否以指定字符串开头

```js
const str = "hello"
console.log(str.startsWith("hel"), str.startsWith("e")) // true false
```

### endsWith

判断字符串是否以指定字符串结尾

```js
const str = "hello"
console.log(str.endsWith("llo"), str.startsWith("ell")) // true false
```

## 数组方法

## 迭代方法

## Set 和 Map

## 装饰器

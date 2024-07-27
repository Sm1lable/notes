# 数组

## 数组常用方法

### 判断数组

一个全局执行上下文

```javascript
if (value instanceof Array) {
    //...
}
```

多个全局执行上下文

```javascript
if (Array.isArray(value)) {
    //...
}
```

### 迭代器方法

-   `keys()`,`values()`,`entries()`

```javascript
const a = ["a", "b", "c"]
console.log(a.keys()) // [0, 1, 2]
console.log(a.values()) // ['a', 'b', 'c']
console.log(a.entries()) //[ [0, 'a'], [1, 'b'], [2, 'c'] ]

for (const [key, value] of a.entries()) {
    //...
}
```

### 复制和填充

-   `copyWithin(target_index, source_index=0, length)`
    在起始或者目标索引到达边界时停止
-   `fill(value, start_index=0, end_index=this.length-1)`
    只在索引生效的部分有用

### 转换方法

-   `toString()`, `valueOf()`, `toLocaleString()`
    分别调用数组中对象的方法，并使用逗号拼接为字符串，等同如下操作

```javascript
const method = someMethod
const arr = new Array(10).fill(0).map((value) => Math.floor(Math.random() * 10))

// 等价操作
const convert = (arr) => {
    arr.map((value) => value.method())
    return arr.join(",")
}
```

-   `join(str)`
    使用给定的分隔字符串拼接数组元素

**值为`null`或者`undefined`的元素以空字符串表示**

```javascript
const a = ["aa", undefined, null, "bb"]
console.log(a.toString()) // aa,,,bb
```

### 栈方法和队列方法

    栈方法和队列方法的返回值为数组执行操作后的长度

-   栈方法组：`push(value)`, `pop()`
-   队列方法组：`push(value)`, `shift()`
-   双端队列：`push(value)`, `unshift(value)`, `pop()`, `shift()`

### 排序方法

`reverse()`和`sort()`都是原地方法，`sort()`方法默认升序，接收一个回调指定顺序。

```javascript
const arr = [5, 7, 3, 2]
arr.sort((a, b) => a - b) // 升序
console.log(arr) // [2, 3, 5, 7]

arr.sort((a, b) => b - a) // 降序
console.log(arr) // [7, 5, 3, 2]

arr.sort((a, b) => Math.random() - 0.5) //乱序
```

**两个方法是原地方法，也会返回原调用数组的引用**

### 操作方法

-   `concat(arr: T | Array<T>): Array<T>`
    数组拼接，**非原地方法，调用数组不会被修改**，默认展平一层的数组；传入的数组中还有数组元素则无法展平。

```javascript
const arr = [1, 2, 3]
const arr2 = [4, 5, 6]
console.log(arr.concat(arr2)) // [1, 2, 3, 4, 5, 6]
console.log(arr) //[1, 2, 3]
```

-   `slice(start_index, end_index): Array<T>`
    切片创建新数组，**非原地方法**，会返回切片后的新数组
-   `splice(start_index, delete_count [, ...items]): Array<T>`
    元素的删除、插入、替换都可以完成。**该方法为原地方法，返回值为被删除的元素组成的数组。**

```javascript
const arr = [1, 2, 3, 4, 5]
// 删除元素，设置前两个参数，分别为起始下标和删除个数
let removed = arr.splice(2, 2)
console.log(arr) // [1, 2, 5]
console.log(removed) // [3, 4]

// 插入元素
removed = arr.splice(1, 0, 3, 4)
console.log(arr) // [1, 3, 4, 2, 5]
console.log(removed) // []

// 替换元素
removed = arr.splice(2, 2, 6, 7)
console.log(arr) // [1, 3, 6, 7, 5]
console.log(removed) // [4, 2]
```

### 搜索和位置方法

-   `indexOf(val): number`, `lastIndexOf(val): number`, `includes(val): boolean`
    前两者分别从前往后和从后往前遍历，返回第一个匹配的元素下标；`includes()`方法从前往后遍历，如果存在返回`true`，不存在返回`false`
-   `find(callback): T, findIndex(callback): T`
    根据回调函数的返回值寻找第一个符合条件的元素，前者返回数组元素，后者返回数组下标

```javascript
const arr = [
    {
        name: "a",
        age: 17,
    },
    {
        name: "b",
        age: 19,
    },
    {
        name: "c",
        age: 20,
    },
]

console.log(
    arr.find((elem, index, arr) => {
        return elem.age >= 19
    })
) // {name: 'b', age: 19}
console.log(
    arr.findIndex((elem, index, arr) => {
        return elem.age >= 19
    })
) // 1
```

### 迭代方法

所有的迭代方法都不会改变调用数组，即**非原地的**。在这些方法中，**对数组的每一项作为参数传入回调函数**

-   `every(callback: (item, index, array): boolean => {}): boolean`
    对每一项函数都返回`true`时表达式返回`true`

```js
const arr = [1, 2, 3, 4, 5]
console.log(arr.every((item, index) => value > 0)) // true
console.log(arra.every((item, index) => value > 1)) // false
```

-   `some(callback: (item, index, array): boolean => {}): boolean`
    存在一项函使回调函数返回`true`时表达式返回`true`

```js
const arr = [1, 2, 3, 4, 5]
console.log(arr.some((item, index) => value > 4)) // true
console.log(arra.some((item, index) => value > 5)) // false
```

-   `filter(callback: (item, index, array): boolean => {}): Array<T>`
    使得函数返回值为`true`的项组成新数组返回

```js
const arr = [1, 2, 3, 4, 5]
console.log(arr.filter((item, index) => value > 2)) // [3, 4, 5]
console.log(arra.filter((item, index) => value > 1)) // [2, 3, 4, 5]
```

-   `forEach(callback: (item, index, array): boolean => {}): undefined`
    遍历数组，没有返回值
-   `map(callback: (item, index, array): boolean => {}: Array<T>`
    返回每次函数调用的返回值组成的新数组

```js
const arr = [1, 2, 3, 4, 5]
console.log(arr.map((value) => value * 2)) // [2, 4, 6, 8, 10]
```

### 归并方法

-   `reduce((acc, cur, index, arr) => {}, initial=this[0])`
    -   `initial`不进行显式设置时，`acc`的初始值为`arr[0]`，`cur`的初始值为`arr[1]`（如果存在）, `index`初始值为 1
    -   `initial`显式设置后，`acc`的初始值为`initial`，`cur`的值为`arr[0]`。`index`初始值为 0
    -   显式设置`initial`时从 0 开始遍历，因此较不显式设置`initial`要多进行一次函数调用才能遍历数组
    -   每一轮遍历数组中的一个元素，每一轮计算的返回值将作为下一轮计算的`acc`，直到所有元素都作为`cur`参数传递进函数。
    -   最后一轮得到的返回值为最终结果

```js
const arr = [1, 2, 3, 4]
console.log(arr.reduce((acc, cur) => acc + cur)) // 10
console.log(
    arr.reduce((acc, cur) => acc + cur),
    10
) // 20
console.log(arr.reduce((acc, cur) => acc + cur * cur)) // 30
```

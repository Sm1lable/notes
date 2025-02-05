# 函数式编程

## 函数式编程

## 纯函数

纯函数类似于数学上定义的函数，对于给定的输入，会有相同的输出。概括起来，纯函数有如下特点：

-   **不依赖外部状态（无状态）**： 函数的运行结果不依赖全局变量，`this`指针和I/O等
-   **没有副作用**：不修改全局变量，不修改入参

纯函数有如下几个优点：

-   **便于调试**：对于一个给定的输入，我们可以轻松断定其执行结果。纯函数的修改和优化也不会影响到其它函数的执行，健壮性更好。
-   **可缓存性**：由于相同的结果会返回相同的输出，可以利用记忆容器将产生过的结果，节省下一次相同输入的执行时间。

下面是一个可缓存性的例子

```js
function memorize(func) {
    const cache = {} // 缓存x, y的映射关系
    return function (...args) {
        const key = JSON.stringify(args)
        console.log(cache)
        return Object.keys(cache).includes(key)
            ? cache[key]
            : (cache[key] = func(...args))
    }
}

const fibo = memorize((n) => (n < 2 ? n : fibo(n - 1) + fibo(n - 2)))
```

`fibo`函数可以递归地记录每次计算的结果并存在闭包变量中，当遇到了计算过的值后，可以直接返回。

## 组合

函数组合意味着一系列函数的复合

$$
    f·g·h = f(g(h(x)))
$$

我们希望函数也能进行如上复合，不同函数的复合能够起到不同的效果。

```js
const f = (n) => n ** 2
const g = (n) => n + 2
const h = (n) => n - 3

const compoesdFunc = compose(f, g, h)

const res = composedFunc(5) // 执行 f(g(h(5)))

console.log(res) // ((5-3)+2)^2 = 16
```

函数组合满足**结合律**，只要整体调用顺序不变，结果就不会变。
下面是一个函数组合的简单实现

```js
const compose = (...functions) => {
    return function (...args) {
        functions.reduceRight(
            (value, func) => func.apply(null, [].concat(value)),
            args
        )
    }
}
```

通过组合我们可以使用一系列简单操复合成复杂操作

```js
const reverse = (item) => item.reverse()
const upper = (item) => item.toUpperCase()
const head = (item) => item[0]

// 取得数组最后一个元素
const lastItem = compose(head, reverse)
// 将第一个元素大写
const upperFirst = compose(upper, head)
// 将最后一个元素大写
const upperLast = compose(upper, lastItem)
```

我们只需要保证

-   函数输入的变量单一
-   前函数的输出类型能作为后函数的参数

就能完成函数的组合，只要完成好简单函数的定义和规定就能组合出不同的复杂函数使用。

## 柯里化

函数的柯里化是指将多参数的函数逐渐减少，转换为单参数函数的一个过程。柯里化函数在接收到足够多的函数时会立即返回结果，否则会返回一个新的函数，等待剩余需要的函数

```js
const currilize = (func, arity = func.length, ...args) => {
    return args.length >= arity
        ? func.call(null, ...args.slice(0, arity))
        : currilize.bind(null, func, arity, ...args)
}

const curry = currilize((a, b, c) => a + b + c)

const add1 = curry(1, 2)
const add2 = add1(3)
const add3 = curry(2, 3, 4)

console.log(add1) // [Function bound curry]
console.log(add2) // 6
console.log(add3) // 9
```

当我们不希望按照顺序确定函数时，可以实现一个带有占位符的柯里化

```js
const __PLACEHOLDER__ = Symbol("placeholder")

function curry(fn, ...args) {
    return function (...funcArgs) {
        // 将funcArgs以占位符为界限分开，前面的填充，后面的直接push进列
        const firstPlaceholder = funcArgs.includes(__PLACEHOLDER__)
            ? funcArgs.indexOf(__PLACEHOLDER__)
            : funcArgs.length
        const before = funcArgs.slice(0, firstPlaceholder)
        const after = funcArgs.slice(firstPlaceholder)
        const nextArgs = [...args]
        for (let arg of before) {
            if (nextArgs.includes(__PLACEHOLDER__)) {
                nextArgs.splice(nextArgs.indexOf(__PLACEHOLDER__), 1, arg)
            } else {
                nextArgs.push(arg)
            }
        }
        nextArgs.push(...after)

        return !nextArgs.includes(__PLACEHOLDER__) &&
            fn.length <= nextArgs.length
            ? fn(...nextArgs)
            : curry(fn, ...nextArgs)
    }
}

const add = curry((a, b, c) => a + b + c)

const add1 = add(__PLACEHOLDER__)
const add2 = add1(__PLACEHOLDER__, 7)
const add3 = add2(6, 9)

console.log(add1)
console.log(add2)
console.log(add3) // 22
```

由于组合函数的限制，对于多参数的函数，**可以使用柯里化减少参数个数以作为组合函数的参数**

## 函数式编程实践

`ramda`库函数很好支持函数式编程，并且`compose`函数对typescript的类型推导有较好的支持。

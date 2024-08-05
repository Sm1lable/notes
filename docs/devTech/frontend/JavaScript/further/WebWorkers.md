# Web Workers

Web Worker 为 Web 内容在后台线程中运行脚本提供了一种简单的方法。线程可以执行任务而不干扰用户界面。此外，它们可以使用 XMLHttpRequest（尽管 responseXML 和 channel 属性总是为空）或 fetch（没有这些限制）执行 I/O。一旦创建，一个 worker 可以将消息发送到创建它的 JavaScript 代码，通过将消息发布到该代码指定的事件处理器（反之亦然）。

## Web Workers API

在HTML5中，一个worker是使用构造函数创建的一个对象（如`Worker()`）运行的JavaScript文件——这个文件将包含在worker中运行的代码。

worker运行在另一个全局上下文中，在worker的代码中引用`window`将返回错误。如果要获取worker中的上下文，应该使用`self`。

worker主要分为如下两种

-   专用worker：使用`Worker()`构造函数创建
-   共享worker：使用`SharedWorker()`构造函数创建

其中专用worker的上下文类型是`DetectedWorkerGlobalScope`，共享worker的上下文类型是`SharedWorkerGlobalScope`。**专用worker只能被第一次生成它的脚本使用，共享worker能被多个脚本使用。**即如果两个不同的脚本中的专用worker实例指向的是同一个专用worker脚本的uri，那么他们会创建两个独立的worker线程；而多个不同脚本中的共享worker实例指向的是同一个共享worker的uri，那么这些共享worker将访问到相同的线程实例。

worker中可以编写自己想要运行的代码，但是由于上下文的不同，worker有着如下的限制

-   不能访问DOM节点
-   不能使用`window`下的默认属性和方法

但是依然可以使用本来在`window`对象下的功能，包括WebSockets等

workers和主线程之间通过`onmessage`和`postMessage()`通信。`onmessage`监听了`message`事件，用来响应数据，`postMessage`用来传递数据。**数据在传递的过程中会被复制而不是共享**。

## 专用Worker

专用worker只能被生成它的脚本使用

### 基本使用

```js
// main.js 主线程
const worker = new Worker("worker.js")

setTimeout(() => {
    worker.postMessage([11, 22])
})

worker.onmessage = (e) => {
    console.log("result:", e.data) // 将打印142
}

// worker.js
// 也可以用addEventListener来监听
// 全局上下文的变量为self 而不是 window
self.addEventListener("message", (e) => {
    console.log(e.data)
    const [first, second] = e.data

    postMessage(first * second - 100)
})
```

调用worker的方法`terminate()`可以终止该worker线程

```js
worker.terminate()
```

## 共享worker

## 错误处理

在使用worker的过程中可能会遇到两类异常

-   在worker线程中的异常，可以触发`error`事件
-   使用`postMessage`方法的异常，会触发`messageerror`事件

### worker中的异常

通常worker中的异常有两种处理方式

-   在主线程中监听`error`事件进行处理
-   在worker中使用`try...catch`处理

#### 在主线程中监听worker的error事件

主线程中监听worker实例上的`error`事件，可以捕获到worker线程中抛出的异常。
该异常的类型为`ErrorEvent`，其接口格式大致如下

```ts
interface ErrorEvent {
    isTrusted: boolean // 是否可信
    message: string // 错误信息
    filename: string // 来源的worker文件
    lineno: number // 抛出错误的行号
    colno: number // 抛出错误的列号
    bubble: boolean // 是否冒泡
}
```

下面是一个处理异常的例子

```js
// 主线程
const worker = new Worker("worker.js")
// 在主线程中依然可以使用addEventListener来监听error事件
worker.addEventListener("error", (event) => {
    console.log(event.message, event.filename, event.lineno)
})

// worker
// worker中可以主动抛出异常，也可以是运行时异常
// 没有被try...catch包裹住的异常会触发主线程中worker实例的error事件
self.addEventlistener("message", (e) => {
    if (!Array.isArray(e.data)) {
        throw new Error("Not an array!")
    }
})
```

#### 在worker中使用try...catch处理错误

也可以在worker中使用`try...catch`处理错误，然后使用`postMessage`将错误信息传递给主线程

```js
// worker
worker.addEventListener("message", (e) => {
    try {
        // some code
        if (!Array.isArray(e.data)) {
            throw new Error("不是数组")
        }
    } catch (e) {
        postMessage(e)
    }
})

// 主线程
const worker = new Worker("worker.js")

worker.addEventListener("message", (e) => {
    if (e.data instanceof Error) {
        // do exception handling
        console.log(e.data.message)
    } else {
        // do somethings
    }
})

worker.postMesage("asdb")
```

### `postMessage`异常

这种异常通常在参数无法序列化时抛出，监听`messageerror`事件可以处理异常。
这个事件不会被冒泡，也不会被取消。

## Worker的数据传递

`postMessage`方法有两个重载分别如下

-   `postMessage(message: any, options?: StructuredSerializeOptions): void`
-   `postMessage(message: any, options: Transferable[])`

这这两个重载分别对应了两种数据传递的方式：

1. **结构化克隆**（Structured Clone）
2. **可转移对象**（Transferable Object）

### 结构化克隆

结构化克隆用于复制复杂的JavaScript对象，通脱递归来构建复制对象，并保留之前访问过的引用映射避免无限遍历循环。

结构化克隆比`JSON`序列化更为可靠，他可以序列化的内容是`JSON`可以序列化内容的超集。
能够支持多种JavaScript原生类型。**宿主环境的类型不能复制，如DOM节点**

在复制的过程中，调用`postMessage`的线程需要**同步**执行序列化，而接收消息的worker线程也需**同步**执行反序列化，如果对象的结构过大，会占用大量线程时间，造成阻塞。

### 可转移对象

JavaScript规定了一组可转移对象的类型，包括`ArrayBuffer`，`MessagePort`等。可转移对象拥有的资源只能同时被一个上下文访问，但其访问权限可以在不同的上下文之间转移；其资源一次只能暴露在一个JavaScript线程中。

在进行转移操作时，可转移对象对应的缓冲区资源会从原始的缓冲区中分离，并被添加到新线程创建的缓冲区中。原线程不再能够访问到这块缓冲区上原有的资源。

由于不需要序列化和反序列化，这种方式能够节约很多线程资源。

### 共享缓冲区

`SharedArrayBuffer`是共享内存，不同线程可以同时访问和操作同一块内存空间。这种方式最贴近传统的多线程方案。

## 线程通信的实现形式

使用`MessageChannel`创建一个管道，这个管道拥有互相绑定的两个`MessagePort`对象,。两个端口对象和worker实例拥有相同的方法：可以调用`postMessage`发送信息给对方，也可以为其绑定`message`回调用于接收对方发送的信息。

```js
const channel = new MessageChannel()

const port1 = channel.port1
const port2 = channel.port2

port1.onmessage = (e) => console.log(e.data)
port2.postMessage(100)
```

`MessagePort`对象支持使用`postMessage`传送，它也是**可转移对象**，这样可以实现两个worker线程之间进行直接通信，而不需要经过主线程。

```js
const workerA = new Worker("workerA.js")
const workerB = new Worker("workerB.js")

const { port1: portForWorkerA, port2: portForWorkerB } = new MessageChannel()

workerA.postMessage(portForWorkerA, [portForWorkerA])
workerB.postMessage(portForWorkerB, [portForWorkerB])
```

# 观察者模式

## 观察者模式

观察者模式可以维护

```ts
type Arrayable = Function | Function[]

class Subject {
    constructor() {
        this.observers: Array<Observer> = []
    }

    subscribe(observer: Observer) {
        if (this.observers.includes(observer)) return
        this.observers.push(observer)
    }

    unsubscribe(observer: Observer) {
        this.observers = this.observers.filter(ob => ob != observer)
    }

    notify(data: any) {
        this.observers.forEach(observer => observer.update(data))
    }
}

class Observer {
    update(data: any){
        // do something
    }
}

```

## 发布订阅模式

发布订阅模式可以维护多个字段与其对应的回调函数集合的关系

```js
class Event {
    constructor() {
        this.subscribers = new Map()
    }

    subscribe(key, callback) {
        const cbs = Array.isArray(callback) ? callback : [callback]
        if (!this.subscribers.has(key)) {
            this.subscribers.set(key, [])
        }
        this.subscribers.get(key).push(...cbs)
    }

    unsubscribe(key, callback) {
        if (!this.subscribers.has(key)) {
            return
        }
        const cbs = new Set(Array.isArray(callback) ? callback : [callback])

        this.subscribers = this.subscribers.filter((cb) => !cbs.has(cb))
    }

    publish(key, ...args) {
        if (!this.subscribers.has(key)) {
            return
        }
        this.subscribers.get(key).forEach((callback) => callback(...args))
    }
}
```

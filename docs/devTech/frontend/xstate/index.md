# xstate


基本要素

- state: 当前页面（模块、组件）处于的状态
- on: state可以响应的事件
- action: 
- target: 事件会如何改变状态

```ts


type Action = keyof Context | {(data: {[property: string]: any}): void}


class State {
    name: string
    on: { [eventName: string]: Event } // 可以触发的Event
    context: Context
}

class Context {

}


class Event {
    target: State
    actions: Action

}

```
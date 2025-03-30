# 实现Promise

根据promise A+规范实现一个promise

```js
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function isThenable(val){
    return val && typeof val.then === 'function' 
}

class _Promise {
    #result = null
    #taskQueue = []
    constructor(executor){
        this.state = PENDING
        this.#result = null
        this.#taskQueue = []
    
        const resolve = (data) => this.#setState(RESOLVED, data)
        const reject = (reason) => this.#setState(REJECTED, reason)

        try {
            executor(resolve, reject)
        }catch(err) {
            reject(err)
        }
    }

    #setState(state, result){
        if (this.state !== PENDING) return 
        this.state = state
        this.#result = result
        this.#run() // 
    }

    #runOneTask(handler, resolve, reject){
        // 加入微队列
        queueMicrotask(() => {
            // 回调不是函数，穿透
            if (typeof handler !== 'function'){
                const settle = this.state === RESOLVED ? resolve : reject
                settle(this.#result)
                return
            }

            try {
                const data = handler(this.#result)
                if (isThenable(data)){
                    data.then(resolve, reject) 
                }else {
                    resolve(data)
                }
            } catch(err) {
                reject(err)
            }
        })
    }   

    #run(){
        if (this.state === PENDING) return 
        while (this.#taskQueue.length) {
            const {onResolved, onRejected, resolve, reject} = this.#taskQueue.shift()
            switch(this.state){
                case RESOLVED:
                    this.#runOneTask(onResolved, resolve, reject)
                    break
                case REJECTED:
                    this.#runOneTask(onRejected, resolve, reject)
                    break
            }
        }
    }

    then(onResolved, onRejected){
        return new Promise((resolve, reject) => {
            const task = {onResolved, onRejected, resolve, reject}
            this.#taskQueue.push(task)
            this.#run()
        })
    }

    catch(onRejected){
        return this.then(null, onRejected)
    }

    finally(onFinally){

    }

    static resolve(data){
        if (data instanceof _Promise) // 是本身，返回本身
            return data
        else if (isThenable(data))   // 是thenable对象，包裹后返回新的实例
            return new _Promise((resolve, reject) => data.then(resolve, reject))
        else 
            return new _Promise((resolve, reject) => resolve(data))
    }

    static reject(reason){
        return new _Promise((resolve, reject) => reject(reason))
    }

    static all(arr){
        return new _Promise((resolve, reject) => {
            const res = []
            let i = 0
            let total = 0
            for (const item of arr){
                total++
                _Promise.resolve(item)
                .then((data) => {
                    res[i++] = data
                    if (i === total) resolve(res)
                })
                .catch(reject)
            }
        })
    }

    static race(arr){
        return new _Promise((resolve, reject) => {
            for (const item of arr){
                _Promise.resolve(item)
                .then(resolve)
                .catch(reject)
            }
        })
    }

    static allSettled(arr) {
        return new _Promise((resolve, reject) => {
            const res = []
            let i = 0
            let total = 0
            for (const item of arr){
                total++
                _Promise.resolve(item)
                .then((data) => {
                    res[i++] = data
                    if (i === total) resolve(res)
                })
                .catch((reason) => {
                    res[i++] = data
                    if (i === total) reject(res)
                })
            }
        })
    }

}


module.exports = {
    _Promise
}
```
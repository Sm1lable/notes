# Node.js

## Node的事件循环

-   timers: 处理已经准备好的`setTimeout`和`setInterval`的回调
-   pending callbacks: 执行系统操作，延迟到下一个时间循环的I/O操作的回调，如TCP错误
-   idle,prepare: 内部步骤
-   poll: 检索轮询新的I/O事件，执行I/O并执行与I/O相关的回调（）。如没有I/O时，node会在合适的时机阻塞。
-   check: 紧接着poll阶段，执行`setImmediate`回调，处理紧急任务
-   close callbacks: 执行关闭的回调，如`socket.on('close', ...)`


## NPM RUN原理

`npm run [command]`

- 在当前项目的node_modules/.bin中寻找command文件执行
- 在全局的node_modules/.bin中寻找command文件执行
- 在环境变量中寻找command执行
- 报错


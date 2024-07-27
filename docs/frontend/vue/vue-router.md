# Vue-router

## hash路由

-   url中包含hash（#）符号，用于标记区分域名和资源路径
-   hash模式不会向前端服务器发送页面请求
-   实现是基于`onhashchange`事件
-   浏览器兼容性好
-   不利于SEO
-   首屏加载慢

## history路由

-   url中没有额外符号，使用真实url路径
-   使用HTML5 history API，在浏览器历史记录中添加url记录，实现前端路由跳转（pushState，replaceState）
-   需要服务端进行反向代理的配置
-   首屏加载快

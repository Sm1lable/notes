## 浏览器缓存

### 强缓存

使用请求头中`cache-control`字段和`expires`字段控制，目前`expires`字段已经被替代

### 协商缓存

触发条件为：

-   `cache-control`值为`no-cache`
-   `cache-control`值为`max-age=0`

#### 使用`last-modified`和`if-modified-since`字段控制

工作流程

-   第一次请求，响应中有`last-modified`字段，存储
-   第二次请求，请求中有`if-modified-since`字段，值为第一次响应中的`last-modified`
-   比较请求中的`if-modified-since`和服务器中的`last-modified`，如果没有变更，返回状态码304，响应中的`last-modified`字段与之前相同
-   如果有变更，返回状态码200，响应中`last-modified`字段更新，浏览器存储新的值

#### 使用`etag`和`if-none-match`字段控制

#### `etag`的优势

-   周期性更新的文件，会导致`last-modified`更新，但是内容不一定更新
-   服务器优先使用`etag`
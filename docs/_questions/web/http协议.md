# http协议

## http介绍

## http报文格式

### 请求报文

请求报文包含三个部分的内容

-   请求行
-   请求头
-   请求体

其格式大致如下，其中请求行和请求头之间没有空行，请求头和请求体之间存在一个空行区分

```http
POST /path/to/resource HTTP/1.1
Host: example.com
User-Agent: ...
Accept: ...
Content-Type: application/json

{ "name": 'Lily' }
```

#### 请求行

请求行指定了http请求的方法、请求目标（包含URL路径和查询参数）、http协议版本

```apache
<method>  <request-target> <HTTP-version>
```

#### 请求头

请求头中包含了许多控制和描述数据的传输和处理方式的重要信息

-   描述传输数据：可以描述传输数据的格式等信息，便于后端处理请求
-   传递附加信息：携带额外信息如Cookie，用户代理，身份验证信息，请求来源等
-   控制缓存行为

#### 请求体

请求体是http请求中的可选部分，通常用于客户端向服务端传输数据。
传输的数据格式和长度等信息在请求头中指定。

以下是一个JSON格式的请求体

```json
[
    { "name": "Lily", "age": 15 },
    { "name": "John", "age": 18 }
]
```

服务器会根据Content-Type字段来解析和处理请求出局

### 响应报文

响应报文包含三个部分的内容

-   响应行
-   响应头
-   响应体

其格式如下，类似于请求报文

```http
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1234

<html>
    <head>
        <title>I am a response</title>
    </head>
    <body>
        <h1>Hello, World!</h1>
        <p>This is a response</p>
    </body>
</html>
```

#### 响应行

#### 响应头

#### 响应体

## http状态码

-   200 OK：表示请求成功，服务器成功处理了请求并返回了响应数据。
-   201 Created：表示请求成功，并且服务器已经创建了新的资源。
-   204 No Content：表示请求成功，但服务器没有返回任何响应内容。
-   400 Bad Request：表示客户端发送的请求有错误，服务器无法理解或处理请求。
-   401 Unauthorized：表示请求需要进行身份验证，但客户端未提供有效的身份验证信息。
-   403 Forbidden：表示服务器拒绝了请求，客户端没有访问权限。
-   404 Not Found：表示请求的资源未找到，通常是由于URL路径错误或资源不存在。
-   500 Internal Server Error：表示服务器在处理请求时遇到了错误，可能是由于服务器故障或应用程序错误。
-   502 Bad Gateway：表示作为代理或网关的服务器从上游服务器接收到无效的响应。
-   503 Service Unavailable：表示服务器当前无法处理请求，通常是由于维护、过载或临时故障。

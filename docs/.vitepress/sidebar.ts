const frontend_prefix = "/frontend"

export const frontend = {
    "/devTech/frontend/": [
        {
            text: "JavaScript",
            collapsed: true,
            items: [
                { text: "简介", link: "/devTech/frontend/JavaScript/index"},
                {
                    text: "基础",
                    collapsed: true,
                    items: [
                        {
                            text: "数组",
                            link: "/devTech/frontend/JavaScript/basic/Array",
                        },
                        {
                            text: "对象",
                            link: "/devTech/frontend/JavaScript/basic/Object",
                        },
                        {
                            text: "函数",
                            link: "/devTech/frontend/JavaScript/basic/Function",
                        },
                        {
                            text: "字符串",
                            link: "/devTech/frontend/JavaScript/basic/String",
                        },
                        {
                            text: "变量和作用域",
                            link: "/devTech/frontend/JavaScript/basic/Variables",
                        },
                    ]
                },
                {
                    text: "Promise",
                    collapsed: true,
                    items: [
                        { text: "基本概念", link: '/devTech/frontend/JavaScript/promise/index'},
                        { text: "手动实现", link: '/devTech/frontend/JavaScript/promise/implementation'},
                    ]
                }
            ],
        },
        {
            text: "React",
            collapsed: true,
            items: [
                { text: "基础", link: "/devTech/frontend/React/index" },
                { text: "redux", link: "/devTech/frontend/React/redux" },
            ],
        },
        {
            text: "Vue",
            collapsed: true,
            items: [
                { text: "基础", link: "/devTech/frontend/Vue/index" },
                { text: "设计思路", link: "/devTech/frontend/Vue/3_设计思路" },
                { text: "响应式系统", link: "/devTech/frontend/Vue/4_响应式系统实现" },
                { text: "vue-router", link: "/devTech/frontend/Vue/redux/vue-router" },
                { text: "vue状态管理", link: "" },
            ],
        },
        {
            text: "React-Native",
            collapsed: true,
            items: [
                { text: "基础", link: "/devTech/frontend/React-Native/index" },
            ],
        },
    ],
    "/devTech/backend/": [
        {
            text: "node",
            link: "/devTech/backend/node/index",
        },
        {
            text: "Next",
            link: "/devTech/backend/next/index",
        },
    ],
    "/devTech/netTech/": [
        {
            text: "Nginx",
            link: "/devTech/netTech/Nginx/index",
        },
    ],
    "/devTech/engineer/": [
        {
            text: "构建工具",
            link: "/devTech/engineer/buildTools/index",
        },
        {
            text: "代码质量",
            link: "/devTech/engineer/codeQuality/index",
        },
    ],
}

export const principle = {
    "/principle": [
        {
            text: "计算机网络",
            collapsed: true,
            items: [
                { text: "绪论", link: "/principle/network/index" },
            ],
        },
        {
            text: "操作系统",
            collapsed: true,
            items: [
                { text: "绪论", link: "/principle/os/index" },
            ],
        },
        {
            text: "浏览器",
            collapsed: true,
            items: [
                { text: "绪论", link: "/principle/browser/index" },
                { text: "浏览器缓存", link: "/principle/browser/cache" },
                { text: "浏览器存储", link: "/principle/browser/store" },
                { text: "web workers", link: "/principle/browser/WebWorkers" },
                { text: "observer API", link: "/principle/browser/ObserverAPI" },
            ],
        },
        {
            text: "JS引擎",
            collapsed: true,
            items: [
                { text: "绪论", link: "/principle/JSEngin/index" },
            ],
        },
        {
            text: "框架构建",
            collapsed: true,
            items: [
                { text: "绪论", link: "/principle/frameBuild/index" },
            ],
        },
    ]
}

export const practice = {
    "/practice/JavaScriptPractice": [
        {
            text: "设计模式",
            collapsed: true,
            items: [{ text: "绪论", link: "/practice/JavaScriptPractice/patterns/index" }],
        },
        {
            text: "函数式编程",
            collapsed: true,
            items: [
                { text: "入门", link: "/practice/JavaScriptPractice/FunctionalProgramming/index" }
            ],
        },
    ]
}

export const questions = {
    "/_questions": [
        {
            text: "HTML",
            collapsed: true,
            items: [],
        },
        {
            text: "CSS",
            collapsed: true,
            items: [
                { text: "布局", link: "/_questions/css/布局" },
                { text: "居中", link: "/_questions/css/居中" },
                { text: "选择器", link: "/_questions/css/选择器" },
            ],
        },
        {
            text: "JavaScript",
            collapsed: true,
            items: [
                { text: "数组", link: "/_questions/js/数组" },
                { text: "对象", link: "/_questions/js/对象" },
                { text: "函数", link: "/_questions/js/函数" },
                { text: "闭包", link: "/_questions/js/闭包" },
                { text: "防抖和节流", link: "/_questions/js/防抖和节流" },
            ],
        },
        {
            text: "Web",
            collapsed: true,
            items: [
                { text: "浏览器", link: "/_questions/web/浏览器" },
                { text: "计算机网络", link: "/_questions/web/计算机网络" },
                { text: "http协议", link: "_questions/web/http协议" },
                { text: "tcp-ip协议", link: "_questions/web/tcp-ip协议" },
            ],
        },
    ],
}

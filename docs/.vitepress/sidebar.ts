const frontend_prefix = "/frontend"

export const frontend = {
    "/frontend/js/": [
        {
            text: "基础",
            collapsed: true,
            items: [
                {
                    text: "数组",
                    link: "/frontend/js/basic/Array",
                },
                {
                    text: "对象",
                    link: "/frontend/js/basic/Object",
                },
                {
                    text: "函数",
                    link: "/frontend/js/basic/Function",
                },
                {
                    text: "字符串",
                    link: "/frontend/js/basic/String",
                },
                {
                    text: "变量和作用域",
                    link: "/frontend/js/basic/Variables",
                },
            ],
        },
        {
            text: "ES6特性",
            collapsed: true,
            items: [
                { text: "基础特性", link: "/frontend/js/es6/基础特性" },
                { text: "Promise", link: "/frontend/js/es6/Promise" },
            ],
        },
        {
            text: "进阶",
            collapsed: true,
            items: [
                {
                    text: "Web Workers",
                    link: "/frontend/js/further/WebWorkers",
                },
                {
                    text: "函数式编程",
                    link: "/frontend/js/further/FunctionalProgramming",
                },
            ],
        },
    ],
    "/frontend/vue/": [
        {
            text: "简介",
            link: "/frontend/vue/index",
        },
        {
            text: "设计思路",
            link: "/frontend/vue/3_设计思路",
        },
        {
            text: "响应系统",
            collapsed: true,
            items: [
                {
                    text: "响应系统的作用与实现",
                    link: "/frontend/vue/4_响应系统实现",
                },
            ],
        },
    ],
    "/frontend/network/": [],
    "/frontend/react/": [
        {
            text: "绪论",
            link: "/frontend/react/index",
        },
    ],
    "/frontend/threejs": [
        {
            text: "快速开始",
            link: "/frontend/threejs/index",
        },
    ],
    "/frontend/tinyColor": [
        {
            text: "tinycolor颜色库简单接口文档",
            link: "/frontend/tinyColor/index",
        },
    ],
    "/frontend/d3": [
        {
            text: "快速开始",
            link: "/frontend/d3/index",
        },
        {
            text: "可视化",
            collapsed: true,
            items: [
                {
                    text: "力导向图",
                    collapsed: true,
                    items: [
                        {
                            text: "力导向图模拟",
                            links: "/frontend/d3/visualization/force/force",
                        },
                    ],
                },
            ],
        },
        {
            text: "元素选择与渲染",
            collaped: true,
            items: [
                {
                    text: "选择元素",
                    links: "/frontend/d3/visualization/selection/selecting",
                },
            ],
        },
        {
            text: "交互",
            // collapsed: true,
            items: [
                {
                    text: "拖拽",
                    link: "/frontend/d3/interaction/drag",
                },
            ],
        },
    ],
}

export const theories = {
    "/theory/computer_network": [
        {
            text: "概述",
            collapsed: true,
            items: [
                { text: "绪论", link: "theory/computer_network/index" },
                {
                    text: "交换方式",
                    link: "theory/computer_network/introduction/switch",
                },
            ],
        },
    ],
    "/theory/compilation": [
        { text: "绪论", link: "/theory/compilation/index" },
        { text: "文法和语言", link: "/theory/compilation/grammer" },
        { text: "上下文无关文法", link: "/theory/compilation/grammer_2" },
    ],
}

export const dev = {
    "dev/git": [
        {
            text: "git",
            collapsed: true,
            items: [{ text: "入门", link: "/dev/git/index" }],
        },
    ],
    "dev/question": [
        {
            text: "开发解决方案",
            collapsed: true,
            items: [
                { text: "1", link: "dev/question/index" },
                { text: "懒加载", link: "dev/question/懒加载" },
            ],
        },
    ],
    "dev/exp": [
        {
            text: "代码经验",
            link: "dev/exp/index",
        },
        {
            text: "随记",
            link: "dev/exp/casual",
        },
    ],
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

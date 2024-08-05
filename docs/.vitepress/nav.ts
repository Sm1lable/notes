const resource = {
    text: "资源站",
    link: "/resource",
}


const dev = {
    text: "开发技术",
    items: [
        {
            text: "前端技术",
            items: [
                { text: "JavaScript", link: "/devTech/frontend/JavaScript/index"},
                { text: "React", link: "/devTech/frontend/React/index"},
                { text: "Vue", link: "/devTech/frontend/Vue/index"},
                { text: "React-Native", link: "/devTech/frontend/React-Native/index"}
            ],
        },
        {
            text: "后端技术",
            items: [
                { text: "node", link: "/devTech/backend/node/index" },
                { text: "VUE", link: "/devTech/backend/next/index" },
            ],
        },
        {
            text: "网络技术",
            items: [{ text: "Nginx", link: "/devTech/netTech/Nginx/index" }],
        },
        {
            text: "工程化",
            items: [
                { text: "构建工具", link: "/devTech/engineer/buildTools/index"},
                { text: "代码质量", link: "/devTech/engineer/codeQuality/index"},
                
            ]
        }
    ],
}



const principle = {
    text: '知识储备',
    items: [
        {
            text: "计算机网络",
            link: "/principle/network/index"
        },
        {
            text: "操作系统",
            link: "/principle/os/index"
        },
        {
            text: "浏览器",
            link: "/principle/browser/index"
        },
        {
            text: "JS引擎",
            link: "/principle/JSEgin/index"
        },
        {
            text: "框架构建",
            link: "/principle/frameBuild/index"
        },
    ]
}

const devPractice = {
    text: "开发实践",
    items: [
        {
            text: "JavaScript开发实践",
            items: [
                {
                    text: "设计模式",
                    link: "/practice/JavaScriptPractice/patterns/index"
                },
                {
                    text: "函数式编程",
                    link: "/practice/JavaScriptPractice/FunctionalProgramming/index"
                },
            ]
        }
    ]
}


export default [
    resource,
    dev,
    principle,
    devPractice
]




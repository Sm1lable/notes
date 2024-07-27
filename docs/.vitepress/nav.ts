const resource = {
    text: "资源站",
    link: "/resource",
}


const dev = {
    text: "开发技术",
    items: [
        {
            text: "前端基础",
            items: [
                { text: "HTML", link: "/frontend/html/index" },
                { text: "CSS", link: "/frontend/css/index" },
                { text: "JavaScript", link: "/frontend/js/index" },
            ],
        },
        {
            text: "前端框架",
            items: [
                { text: "React", link: "/frontend/react/index" },
                { text: "VUE", link: "/frontend/vue/index" },
            ],
        },
        {
            text: "后端技术",
            items: [{ text: "Node", link: "/frontend/node/index" }],
        },
        {
            text: "网络基础",
            items: [{ text: "Web网络", link: "/frontend/web/index" }],
        },
    ],
}

const engineer = {
    text: "工程化",
    items: [

    ]
}

const devPractice = {
    text: '开发实践'

}

export default [
    resource,
    dev,
]




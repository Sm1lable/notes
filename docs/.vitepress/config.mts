import { defineConfig } from "vitepress"
import nav from "./nav"
import * as sidebar from "./sidebar"
// import { frontend, theories, dev, questions } from "./sidebar";
// import sidebar from "./sidebar.mts";


const createSidebar = () => {
    const res = {}
    for (const value of Object.values(sidebar)) {
        for (const [k, v] of Object.entries(value)) {
            res[k] = v
        }
    }
    return res
}

export default defineConfig({
    title: "Vite",

    themeConfig: {
        siteTitle: '我的文档',
        logo: '../../../static/favicon.ico',
        search: {
            provider: "local",
        },
        nav,
        sidebar: createSidebar(),
        socialLinks: [
            { icon: "github", link: "https://github.com/vuejs/vitepress" },
        ],
    },
    markdown: {
        math: true,
    },
})

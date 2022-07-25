const MenuRouter = [
    {
        id: "1",
        name: "选项一",
        icon: "el-icon-message",
        children: [{
            id: "1-1",
            path: "/a",
            name: "选项1",
        }]
    },
    {
        id: "2",
        name: "选项二",
        icon: "el-icon-menu",
        children: [{
            id: "2-1",
            path: "/b",
            name: "选项1",
        }]
    },
    {
        id: "3",
        name: "选项三",
        icon: "el-icon-setting",
        children: [{
            id: "3-1",
            path: "/c",
            name: "选项1",
        }]
    }
]

export default MenuRouter
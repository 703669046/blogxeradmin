export default {
    namespaced: true,
    state: {
        // 左侧菜单栏数据
        // menuItems: [
        //     {
        //         icon: 'iconfont icon-anbaowenti',
        //         title: '模版',
        //         url:'/stencil',
        //         children:[
        //             {
        //                 title: '模版',
        //                 url:'/stencil',
        //             }
        //         ]
        //     },
        //     {
        //         icon: 'iconxingzhuang1042',
        //         title: '设备管理',
        //         url: '/device',
        //         children: [
        //             {
        //                 title: '设备维护',
        //                 url: '/device/maintain'
        //             }
        //         ]
        //     },
        //     // {
        //     //     icon: 'iconxingzhuang1044',
        //     //     title: '故障管理',
        //     //     url: '/fault'
        //     // },
        //     // {
        //     //     icon: 'iconxingzhuang1045',
        //     //     title: '维检管理',
        //     //     url: '/maintain'
        //     // },
        //     {
        //         icon: 'iconfont iconxingzhuang1040',
        //         title: '厂家管理',
        //         url: '/factory',
        //         children: [
        //             {
        //                 icon: '',
        //                 title: '厂家管理',
        //                 url: '/factory/company'
        //             },
        //             // {
        //             //     title: '设备管理',
        //             //     url: '/factory/device'
        //             // },
        //         ]
        //     },
        //     {
        //         icon: 'iconxingzhuang1041',
        //         title: '设备类别',
        //         url: '/sort',
        //         children: [
        //             {
        //                 icon: '',
        //                 title: '类别维护',
        //                 url: '/sort/maintain'
        //             }
        //         ]
        //     },
        // ],
        message: 0, //全局消息数量
        menuItems:[
            {
                title: "执法库管理",
                url: "/lawmanagement",
                icon: "iconzhifaduiwuguanli",
                children: [
                    {
                        title: "法律法规",
                        url: "/lawmanagement/lawsRegulations",
                        icon: "icon",
                        children: []
                    },
                    {
                        title: "执法事项",
                        url: "/lawmanagement/lawMatters",
                        icon: "icon",
                        children: []
                    },
                    {
                        title: "流程表单",
                        url: "/lawmanagement/lawdocuments",
                        icon: "icon",
                        children: []
                    },
                    {
                        title: "音像记录",
                        url: "/lawmanagement/audiovisualRecord",
                        icon: "icon",
                        children: []
                    },
                    {
                        title: "执法人员",
                        url: "/lawmanagement/lawPersonnel",
                        icon: "sdf",
                        children: []
                    },
                    {
                        title: "执法流程",
                        url: "/lawmanagement/lawPeocess",
                        icon: "icon",
                        children: []
                    }
                ]
            }
        ],
        loginSwitch: 1, //1 单体项目开发 2 多项目开发
        //选择本地
        localSwitch: 1 //1 本地跳转 2线上
    },
    mutations: {
        setMenus(state, data) {
            state.menuItems = data;
        },
        setMessage(state, data) {
            state.message = data
        },
        setLocalSwitch(state, data) {
            state.localSwitch = data
        }
    },
}
export default [
    //执法库管理
    {
        path: '/menut/index',
        component: () => import('@/views/syspage/index.vue'),
        meta: { title: '菜单列表' ,is_login:true}
    },
    {
        path: '/user/userlist',
        component: () => import('@/views/userPage/index.vue'),
        meta: { title: '用户列表' ,is_login:true}
    },
    {
        path: '/user/administratorsList',
        component: () => import('@/views/administratorsPage/index.vue'),
        meta: { title: '管理员列表' ,is_login:true}
    },
    {
        path: '/postList/approval',
        component: () => import('@/views/postPage/index.vue'),
        meta: { title: '帖子审批' ,is_login:true}
    },
]
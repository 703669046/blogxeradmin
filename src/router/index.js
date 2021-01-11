import Vue from 'vue';
import Router from 'vue-router';
import RouterConfig from './modules' // 引入业务逻辑模块
Vue.use(Router);
// const routerPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error=> error)
// }


export default new Router({
    routes: [
        {
            path: '/',
            component: () => import('../components/common/Home.vue'),
            meta: { title: '首页' ,isLogin:true},
            // redirect: '/login',
            children: [
                {
                    path: '/demo',
                    component: () => import('@/components/demo.vue'),
                    meta: { title: '测试' }
                },
                {
                    path: '/404',
                    component: () => import('@/components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import('@/components/page/403.vue'),
                    meta: { title: '403' }
                },
                ...RouterConfig,
            ]
        },
        {
            path: '/login',
            component: () => import('@/components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
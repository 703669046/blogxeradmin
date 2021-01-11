import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './components';
import './style/css/theme-green/index.css'; // 浅绿色主题
import './style/css/icon.css';
import 'babel-polyfill';    //不支持es6新语法
import './utils/rem';
Vue.config.productionTip = false;
Vue.prototype.$EventBus = new Vue();
import filters from './utils/index';
Vue.use(filters)

router.beforeEach((to,from,next)=>{
    if(to.matched.some(res=>res.meta.isLogin)){//判断是否需要登录
        let token = localStorage.getItem('token');
        if (token!=null) {
            console.log(to,from,999)
            if(to.path == '/login'){
                next(from.path) 
            }else{
                next() 
            }
        }else{
            next({
                path:"/login"
            });
        }

    }else{
        next()
    }
});



new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
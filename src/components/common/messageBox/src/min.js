import Vue from 'vue';
import message from './min.vue';  // 引入组件

let newInstance;
const messageInstance = Vue.extend(message);  //创建构造函数

const initInstance = () => {
    newInstance = new messageInstance();  // 实例化
    document.body.appendChild(newInstance.$mount().$el); //插入
}

export default options => {    //导出方法，
    if (!newInstance) {
        initInstance(); // 挂载
    }
    Object.assign(newInstance, options); //合并数据
    // return newInstance.show( vm => {  // 显示弹窗
    //     console.log('vs')
    //     newInstance = null;  // 将实例对象清空
    // })
    return newInstance.show();
}

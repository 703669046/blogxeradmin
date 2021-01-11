import Vue from 'vue';

//导航条
import Titlehint from './common/Titlehint/index.vue'
Vue.component('Titlehint', Titlehint)

//暂无数据
import empty from './page/empty.vue'
Vue.component('empty', empty)

//弹窗事件
/** 
 *  弹窗参数描述
 *  @param {*} type     //0删除 1启用  2停用 
 **/
import message from './common/messageBox/src/min.js';
Vue.prototype.$Confirm = message;

//图片查看器
/** 
 *  图片查看器描述
 *  @param {imgData} //传入的key、value是一个对象
 *  @param {*} name //图片名称
 *  @param {*} imgUrl //当前显示的图片 string
 *  @param {*} width //图片width
 *  @param {*} height //图片height
 *  @param {*} multiple //是否有多张 Boolean
 *  @param {*} imgList //多张图片地址 Array
 **/
import ImageViewer from './common/imageViewer/src/index.vue';
Vue.component('ImageViewer', ImageViewer)

//导出
import {downloadFile} from '@/utils/validate.js'
Vue.prototype.$downloadFile = downloadFile;

import { paramsCheck } from '@/utils/publicMethod.js';
Vue.prototype.$paramsCheck = paramsCheck;
import { pageShow } from '@/utils/publicMethod.js';
Vue.prototype.$pageShow = pageShow;
import {
    Button,
    Input,
    Select,
    Table,
    TableColumn,
    Tag,
    Dropdown,
    Pagination,
    Upload,
    TimePicker,
    Divider,
    Checkbox,
    Tooltip,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    Backtop,
    DatePicker,
    Option,
    Dialog,
    Radio,
    RadioGroup,
    Progress,
    Switch,
    Icon,
    Col,
    Row,
    Card,
    Image,
    Message,
    Loading,
    Tree,
    Cascader,
    InputNumber,
    CheckboxGroup,
} from 'element-ui';

Vue.prototype.$message = Message;

Vue.prototype.$ELEMENT = { size: 'small' };
const eleList =
    [
        Button,        //按钮
        Input,          //输入框
        Select,         //选择器
        Option,         //选择器配置
        Table,          //表格
        TableColumn,    //表格-列
        Tag,            //标签
        Dropdown,       //下拉菜单
        DropdownMenu,   //下拉菜单-菜单
        DropdownItem,   //下拉菜单-子项
        Pagination,     //分页
        Upload,         //上传
        TimePicker,     //时间选择器
        Divider,        //分割线
        Checkbox,       //多选框
        Tooltip,        //文字提示
        Menu,           //菜单
        Submenu,        //子菜单
        MenuItem,       //菜单项
        Backtop,        //回到顶部
        DatePicker,     //日期选择器
        Dialog,         //对话框
        Radio,          //单选框
        RadioGroup,     //单选绑定值
        Progress,       //原型进度条
        Switch,         //开关
        Icon,           //图标
        Col,            //列
        Row,            //行
        Card,           //卡片
        Image,          //图片
        Tree,           //树形控件
        Cascader,       //级联选择框
        InputNumber,     //计数器
        CheckboxGroup,     // 多选框
    ]        

eleList.forEach(item => {
    Vue.use(item)
})

Vue.use(Loading.directive)
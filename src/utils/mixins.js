import { deleteImgAPI } from '@/components/page/api';
//日期和时间
export const dateTime = {
    mounted(){
        // 页面加载完后显示当前时间
        this.time = this.dealWithTime(new Date())
        // 定时刷新时间
        let _this = this
        // 定时器
        this.setIntervalObj = setInterval(function () {
            _this.dateTimes = _this.dealWithTime(new Date())     // 修改数据date
        }, 1000)
    },
    methods:{
        dealWithTime(data) {  //获取当前时间方法
            let times;
            let dates;
            // let Y = data.getFullYear();
            // let M = data.getMonth() + 1
            // let D = data.getDate()
            let H = data.getHours()
            let Min = data.getMinutes()
            let S = data.getSeconds()
            let W = data.getDay()
            H = H < 10 ? ('0' + H) : H
            Min = Min < 10 ? ('0' + Min) : Min
            S = S < 10 ? ('0' + S) : S
            switch (W) {
                case 0:
                    W = '天'
                    break
                case 1:
                    W = '一'
                    break
                case 2:
                    W = '二'
                    break
                case 3:
                    W = '三'
                    break
                case 4:
                    W = '四'
                    break
                case 5:
                    W = '五'
                    break
                case 6:
                    W = '六'
                    break
                default:
                break
            }
            // times = Y + '年' + M + '月' + D + '日 ' + H + ':' + Min + ':' + S ;
            times = H + ':' + Min ;
            dates =  ' 星期' + W;
            // formatDateTime = H + ':' + Min + ':' + S + ' 星期' + W
            return {times:times ,dates:dates}
        },
    },
}

export const switchPage = {
    created(){
        this.switchPage()
    },
    activated(){  //keep-alive组件加载
        this.switchPage()
    },
    methods:{
        switchPage(){
            this.$EventBus.$on('switchPage', (data) => {
                this.activeName = data.activeName;
                this.TitlehintData = data.isData || {};
            });
        }
    },
    deactivated(){  //keep-alive组件切换
        this.$EventBus.$off('switchPage')
    },
    destroyed(){
        this.$EventBus.$off('switchPage')
    }
}
export const deleteImg = {
    methods:{
        deleteImgInit(uploadImgList){
            this.uploadImgList = JSON.parse(JSON.stringify(uploadImgList));
            this.originallyImgList = JSON.parse(JSON.stringify(uploadImgList));
        },
        getStorageImgList(operateType,arr){
            this.deleteImgOperateType = operateType;
            this.storageImgList = arr;
        },
        deleteImgItem(url){
            const i = url.lastIndexOf('/');
            let obj = {
                 huaWeiCloudPath: url,
                 objectName: url.substring(i + 1)
            }
            deleteImgAPI(obj);
        },
        pageDestroyed(){
            let arr = [];
            if(this.deleteImgOperateType == 0){
                arr = this.uploadImgList.filter(item => {
                    let flag = true;
                    this.originallyImgList.forEach(item1 => {
                        if(item == item1 || item == undefined){ flag = false; }
                    })
                    return flag;
                })
            }else if(this.deleteImgOperateType == 1){
                arr = this.uploadImgList.filter(item => {
                    let flag = true;
                    this.storageImgList.forEach(item1 => {
                        if(item == item1 || item == undefined){ flag = false; }
                    })
                    return flag;
                })
            }else{ return; }
            arr.forEach(item => {
                this.deleteImgItem(item);
            })
        }
    },
    data(){
        return {
            uploadImgList: [],
            storageImgList: [],
            originallyImgList: [],
            deleteImgOperateType: 0
        }
    },
    destroyed(){
        this.pageDestroyed();
    },
}
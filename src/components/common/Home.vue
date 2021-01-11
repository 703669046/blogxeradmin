<template>
    <div class="wrapper">
        <div >
            <v-head></v-head>
            <v-sidebar></v-sidebar>
            <div class="content-box" :class="{'content-collapse':collapse}">
                <v-tags ref="tags"></v-tags>
                <div class="content">
                    <transition :name="transitionName" mode="out-in">
                        <keep-alive :include="tagsList">
                            <router-view class="child-view"></router-view>
                        </keep-alive>
                    </transition>
                    <el-backtop target=".content"></el-backtop>
                </div>
            </div>
        </div>
        <!-- <div class="box" v-else>
            <div class="haouo">
                <p>{{uName}}</p>
                <div>
                    <div>
                        <el-input prefix-icon="el-icon-unlock" v-model="paswards" show-password placeholder="请输入密码"></el-input>
                    </div>
                    <div class="icon">
                        <el-tooltip
                            effect="dark"
                            content="解锁"
                            placement="bottom">
                            <i class="iconfont icon-xingzhuang969" @click="confirmFun"></i>
                        </el-tooltip>
                        <el-tooltip
                            effect="dark"
                            content="退出"
                            placement="bottom">
                            <i class="iconfont icon-xingzhuang1028" @click="exitFun"></i>
                        </el-tooltip>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import vTags from './Tags.vue';
import bus from './bus';
export default {
    data() {
        return {
            tagsList: [],
            collapse: false,
            transitionName: 'slide-left',
            paswards:'',
            isReturn:true,
            uName:'',
        };
    },
    components: {
        vHead,
        vSidebar,
        vTags
    },
    created() {
        bus.$on('collapse-content', msg => {
            this.collapse = msg;
        });

        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        bus.$on('tags', msg => {
            let arr = [];
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name);
            }
            this.tagsList = arr;
        });
    },
    mounted(){
        //用户登陆进行ws连接
        // if(this.$store.getters.userInfo){
        //     this.webScoket();
        // }
    },
    methods:{
        // webScoket(){
        //     let url = this.$store.getters.localSwitch === 1?`ws://192.168.0.99:5000/netty/ws?uId=${this.$store.getters.userInfo.uId}`:`ws://121.37.7.216:5000/netty/ws?uId=${this.$store.getters.userInfo.uId}`
        //     this.ws = new Socket({
        //         //网址
        //         url
        //         //心跳时间（单位:ms）
        //         // 'heartBeat':5000,
        //         //发送心跳信息（支持json传入）
        //         // 'heartMsg':'用户Id11232312',
        //         //开起重连
        //         //'reconnect':true,
        //         //重连间隔时间（单位:ms）
        //         //'reconnectTime':5000,
        //         //重连次数
        //         //'reconnectTimes':10
        //     })
        //     this.ws.onopen(this.success);
        //     this.ws.onmessage(this.receiveSoket);
        // },
        // success(data){
        //     console.log('连接成功！！！',data)
        // },
        // //消息接收
        // receiveSoket(data){
        //     data = JSON.parse(data)
        //     let mesNumber = this.$store.getters.message;
        //     this.$store.commit('menuItems/setMessage',Number(mesNumber + 1));
        //     this.$notify({
        //         title: `你有一条新的消息`,
        //         message: data.title,
        //         type: 'success',
        //         offset: 100,
        //         onClick:this.messageClick
        //     });
        // },
        // messageClick(){
        //     if(this.$store.getters.like.isLock){
        //         this.$message.error('请先解锁!')
        //     }else{
        //         this.$router.push({
        //             path:'/message'
        //         })
        //     }
        //     //关闭el消息弹窗
        //     this.$notify.closeAll()
        // },
        // //关闭
        // close(){
        //     // console.log(this.ws)
        //     this.ws.close()
        // },
        // // 解锁
        // confirmFun(){
        //     if(this.paswards == ''){
        //         return this.$message.error('锁屏密码不能为空！')
        //     }
        //     let parms = {
        //         password:this.paswards
        //     }
        //     passwordAPI(parms).then(res =>{
        //         if(res.success){
        //             this.$store.commit('user/setLock',false)
        //             this.paswards = ''
        //             this.$message.success('解锁成功！');
        //         }else{
        //             this.$message.error(res.message);
        //         }
        //     })
        // },
        // exitFun(){
        //     this.$Confirm({ type: 4 }).then(async o => {
        //         this.isReturn = true
        //         let result = await logout();
        //         if(result.success){
        //             localStorage.removeItem('subway_token');
        //             this.$store.commit('user/setUserInfo',null);
        //             this.$store.commit('user/setModuleList',null);
        //             this.close();
        //             if(process.env.NODE_ENV === 'development'){
        //                 this.$router.push('/login');
        //             }else{
        //                  window.location.href = 'http://121.37.7.216/login/index.html#/?sys=1324013574088749057';
        //             }
        //             // if(this.$store.getters.loginSwitch === 1){
        //             //     this.$router.push('/login');
        //             // }else{ 
        //             //     if(this.$store.getters.localSwitch === 1){
        //             //         window.location.href = 'http://localhost:8081/#/?sys=1324013574088749057';
        //             //     }else{
        //             //         window.location.href = 'http://121.37.7.216/login/index.html#/?sys=1324013574088749057';
        //             //     }
        //             // }
        //         }else{
        //             this.$message.error(result.message);
        //         }
        //         this.$store.commit('user/setLock', false)
        //     })
        // },
    },
    destroyed(){
        // console.log('退出ws')
        // this.close()
    }
};
</script>
<style lang="less" scoped>
.child-view {
    transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translateX(30px, 0);
    transform: translate(30px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
    opacity: 0;
    -webkit-transform: translateX(-30px, 0);
    transform: translateX(-30px, 0);
}
.box{
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background:#fff;
    opacity:0.7;
    display: flex;
    justify-content: center;
    align-items: center;
    >.iconfont{
        font-size: 50px;
        color: #ccc;
    }
    .haouo{
        width: 450px;
        height: 120px;
        // background: #fff;
        border-radius: 5px;
        >p {
            margin: 15px 15px 16px;
            font-size: 16px;
            text-align: center;
            // margin-right: 60px;
            // display: flex;
            // align-items: center;
        }
        >div{
            width: 350px;
            display: flex;
            height: 30px;
            height: 30px;
            margin:30px auto;
            >div:nth-child(1){
                width: 250px;
                 margin-left: 20px;
            }
            .icon{
                display: flex;
                width: 100px;
                height: 100%;
                background: #F5F7FA;
                border:1px solid #DBDEE5;
                border-left: none;
                justify-content: space-between;
                >.iconfont{
                    width: 50%;
                    text-align: center;
                    height: 30px;
                    line-height: 30px;
                    color: #909CAB;
                    font-size: 18px;
                }
            }
        }   
    }
}
</style>

<template>
    <div class="header">
        <div class="header-content">
            <!-- 折叠按钮 -->
            <div class="header-left">
                <!-- <div class="logo" @click="collapseChage">
                    <img src="@/assets/logo.png" alt="logo">
                    <div class="logoText">
                        <div class="logotitle">
                            <p>深</p>
                            <p>圳</p>
                            <p>地</p>
                            <p>铁</p>
                        </div>
                        <div class="logomark">
                            <p>SHENZHEN&nbsp;METRO</p>
                        </div>
                    </div>
                </div> -->
                <div class="logoText1" @click="collapseChage">
                    <div class="logotitle">
                        <p>999999</p>
                    </div>
                    <div class="logomark">
                        <p>OPERATION&nbsp;MANAGEMENT&nbsp;OPPCE</p>
                    </div>
                </div>
            </div>
            <!-- 日期和时间 -->
            <div class="header-right">
                <div class="dateTimes">
                    <span class="times">{{dateTimes.times}}</span>
                    <span class="dates">{{dateTimes.dates}}</span>
                </div>
                <div class="header-user-con">
                    <!-- 消息中心 -->
                    <div class="btn-bell">
                        <el-tooltip
                            effect="dark"
                            :content="`有条未读消息`"
                            placement="bottom">
                            <router-link to="/message">
                                <i class="el-icon-bell"></i>
                            </router-link>
                        </el-tooltip>
                        <span class="btn-bell-badge" ></span>
                    </div>
                    <!-- <el-dropdown  trigger="click" @command="handleDownload" placement='bottom'>
                        <span class="el-dropdown-link">
                            <el-tooltip
                                effect="dark"
                                content="下载项"
                                placement="bottom">
                                    <i class="iconfont icon-wenjianjia downloadIcon"></i>
                            </el-tooltip>
                        </span>
                    </el-dropdown> -->
                    <!-- <themeColor></themeColor> -->
                    <!-- 用户头像 -->
                    <div class="user-avator">
                        <img src="../../assets/img/img.jpg" />
                    </div>
                    <!-- 用户名下拉菜单 -->
                    <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                        <span class="el-dropdown-link">
                            {{ $store.getters.userInfo && $store.getters.userInfo.nickname  || '系统人员'}}
                            <i class="el-icon-caret-bottom"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item divided command="modifyPassword">修改密码</el-dropdown-item>
                            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <!-- 全屏显示 -->
                    <div class="btn-fullscreen" @click="handleFullScreen">
                        <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                            <i class="el-icon-rank"></i>
                        </el-tooltip>
                    </div>
                </div>
            </div>
        </div>
        <userModify ref="userModify" />
    </div>
</template>
<script>
import bus from '../common/bus';
import { dateTime } from '@/utils/mixins.js'
import userModify from '../page/userModify'
import { logout } from '../page/api/index'
export default {
    mixins:[dateTime],
    components:{
        userModify,
        // themeColor
    },
    data() {
        return {
            collapse: false,
            fullscreen: false,
            name: 'linxin',
            activeName:'second',
            //日期和时间
            dateTimes:{
                times:null,
                dates:null
            },
            userModify:false,
            ws:null,
            findId:'',
        };
    },
    mounted() {
        // if ( document.body.clientWidth < 1500 ) {
        //     this.collapseChage();
        // }
        // if(this.$store.getters.userInfo.passwordFlag){
        //     this.$refs.userModify.status()
        // }
    },
    methods: {
        
        // 处理文件夹事件
        handleDownload(download){
            window.open(download)
        },
        // // 用户名下拉菜单选择事件
        async handleCommand(command) {
            if (command === 'loginout') {
                let result = await logout();
                if(result.success){
                    localStorage.removeItem('token');
                    this.$store.commit('user/setUserInfo',null);
                    this.$store.commit('user/setModuleList',null);
                    // this.close();
                    // this.$parent.close()
                    this.$router.push('/login');
                }else{
                    this.$message.error(result.message);
                }
            }else if(command === 'modifyPassword'){
                this.$refs.userModify.status();
            }
        },
        // 侧边栏折叠
        collapseChage() {
            this.collapse = !this.collapse;
            bus.$emit('collapse', this.collapse);
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        }
    }
};
</script>
<style lang="less" scoped>
.downloadIcon{
    font-size: 26px;
}
.el-icon-bell{
    font-size: 30px;
    margin-right: 0 !important;
}
.logoText1{
    width: 175px;
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    cursor: pointer;
    margin-left: -12px;
    align-items: center;
    .logotitle{
        margin-top: 8px;
        margin-left: 10px;
        >p{color: #201b18;font-weight: 600;font-size: 20px;letter-spacing:8px}
    }
    .logomark{
        margin-top: -8px;
        p{
            font-weight: 700;
            font-size:12px;
            -webkit-transform:scale(0.6); 
            color: #201b18;
        }
    } 
}
.dateTimes{display: flex; align-items: center;
    .times{font-size: 15px; color: #3d3d3d; font-weight: 700;}
    .dates{font-size: 13px; color:#cecece; margin: 0 5px;}
}

.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 54px;
    font-size: 22px;
    color: #343435;
    background: #fff;
    box-shadow: 0 5px 10px #ddd;
    overflow: hidden;
    padding: 0 25px; box-sizing: border-box;
}
.header-content{
    display: flex; justify-content: space-between;
}

.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}
.header .logo {
    display: flex; align-items: center;
    cursor: pointer;width:175px;
    img{margin-right: 7px;width: 36px;height: 36px;margin-left: 5px;}
    .logoText{
        display: flex;
        flex-direction: column;
        margin-left: 7px;
        position: relative;
        .logotitle{
            width: 80px;margin-bottom: 12px;
            display: flex;justify-content: space-between;
            >p{color: #201b18;font-weight: 600;font-size: 20px;}}
        .logomark{
            position: absolute;
            top:20px;
            margin-top: 2px; 
            display: flex;
            justify-content:flex-start;
            left: -20px;
            p{
                font-weight: 700;
                font-size:12px;
                -webkit-transform:scale(0.6); 
                color: #201b18;
            }
        } 
    }
    
}
.header-left{display: flex;}
.header-right {
    display: flex ; align-items: center; 
}
.header-user-con {
    display: flex;
    height: 54px;
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
    margin-right: 15px;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #343435;
}
.btn-bell .el-icon-bell {
    color: #343435;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #343435;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
.title_Module{
    display: flex;
    li{
        height: 54px; display: flex;align-items: center; 
        cursor: pointer;margin: 0 19.5px;font-size: 15px;color: #030202;
        .iconfont{ font-size: 18px; margin-right: 9px;}
    }
    li:hover{
        color: #1ca75f; box-sizing: border-box;
    }
    li:nth-child(1){margin-left:0px;}
    .title_Selected{
        color: #1ca75f; box-sizing: border-box;
        font-weight: 700; align-items: center;
        border-bottom: 2px solid #1ca75f;
        span{font-weight: 700; font-size: 15px;}
    }
}
</style>

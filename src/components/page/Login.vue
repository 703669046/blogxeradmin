<template>
    <div class="login-wrap">
        <div >
            <div class="login-title">
                <!-- <p>深圳市地铁运营管理办公室</p> -->
                <div class="title-img">
                    <!-- <img src="../../assets/login/login1.png" alt="">
                    <p>核心业务系统</p>
                    <img src="../../assets/login/login1.png" alt=""> -->
                </div>
            </div>
            <div class="login-screen">
                <div class="login-logo">
                    <!-- <img src="../../assets/login/logn2.png" alt="">                    -->
                </div>
                <!-- 登陆输入 -->
                <div class="login-operation" v-on:keyup.enter="login" v-show="loginShow === true">
                    <div>
                        <el-input v-model="param.username"  placeholder=" 请输入用户名/手机号码" @focus="loginErr = false">
                            <i slot="prefix" class="iconfont icon-yonghu"></i>
                        </el-input>
                    </div>
                    <div>
                        <el-input v-model="param.password" show-password placeholder=" 请输入密码" @focus="loginErr = false">
                            <i slot="prefix" class="iconfont icon-mima1"></i>
                        </el-input>
                    </div>
                    <div class="loginErr">
                        <p v-show="loginErr">账号或密码错误！</p>
                    </div>
                    <div>
                        <div class="code">
                            <el-input v-model="param.code" placeholder=" 请输入验证码" @focus="loginErr = false">
                                <i slot="prefix" class="iconfont icon-yanzheng"></i>
                            </el-input>
                        </div>
                        
                        <img @click="iMgOn" :src="codeImg" alt="">
                    </div>
                    <div></div>
                    <div>
                        <el-button type="primary" round @click="login">登 录</el-button>
                    </div>  
                </div>
                <!-- 正在登陆 -->
                <div class="beingLogin" v-show="loginShow === false">
                    <p>正在登陆....</p>
                    <img class="Loginloading" src="../../assets/img/loading.gif" alt="">
                </div>
            </div>           
        </div>
    </div>
</template>

<script>
import md5 from 'blueimp-md5'
import { login,codeRuselu,userInfo,getUserMenu,getLoginCode } from './api/index';
import { host } from '../../config'
export default {
    data() {
        return {
            param: {
                username: '',
                password: '',
                verification: undefined,
            },
            checked:false,
            loginErr:false,
            codeImg:null,
            uuid:null,
            loginShow:true
        };
    },
    created(){
        //线上
        if(this.$route.query.token){
            this.loginShow = false;
            this.automaticLogin(this.$route.query.token)
        }
        else{
            this.loginShow = true;
            this.iMgOn()
        } 
        this.iMgOn()
    },
    methods: {
        async iMgOn(){
            let res = await getLoginCode();
            if(res.success){
                this.codeImg=`${host}${res.data.src}`;
                this.param.uniqid=res.data.uniqid;
            }
            // this.codeImg =  `${host}admin/captcha`;
        },
        async login(){
            let { username, password ,code,uniqid} = this.param;
            if(!username || !password||!code){
                return this.$message.error(!username && '请输入账号' || !password && '请输入密码'|| !code && '请输入验证码');
            }
            let param = {
                password:password,
                username:username,
                code:code,
                uniqid:uniqid
            }
            //登陆
            let result = await login(param);
            if(result.success){
                this.automaticLogin(result.data)
            }else{  
                this.loginErr = true;
                this.iMgOn()
            }
        },
        //登陆
        automaticLogin(data){
            localStorage.setItem('token',data.token);
            //获取用户信息
            let userInfoData =  data.userinfo;
            // let user = {
            //     uDepId:userInfoData.obj.depId , //所属组织id
            //     uId:userInfoData.obj.id,        //用户id
            //     uName:userInfoData.obj.name,    //用户名称
            //     uPic:userInfoData.obj.pic ,     //用户人脸
            //     uType:userInfoData.obj.utype,   //用户类型
            //     userLine:userInfoData.obj.companyByLineList, //用户所负责的线
            //     uRole:userInfoData.obj.roleSet  //用户角色类型
            // }
            // this.$store.commit('user/setAuthorityLineStation',{line: userInfoData.obj.companyByLineList,station: userInfoData.obj.companyByStationInfoList});        //  权限线站
            this.$store.commit('user/setUserInfo',data.userinfo);
            // this.$store.commit('user/setModuleList',userInfoData.obj.homeMenuList);
            // if(!userInfoData.obj.homeMenuList){
            //     return this.$message.error('当前用户没有菜单权限、不可登陆！')
            // }
            // let findId;
            // if(process.env.NODE_ENV === 'development'){
            //     findId = '1318808223999569922'
            // }else{
            //     findId = '1324013574088749057'
            // }
            // let menu = userInfoData.obj.homeMenuList.find( item =>{   
            //     return item.id === findId;
            // })
            // if(!menu){
            //     this.$message.error('您没有这个系统权限或菜单')
            //     if(this.$store.getters.localSwitch === 1){
            //         window.location.href = 'http://localhost:8081/#/?sys=1258958482169499649';
            //     }else{
            //        window.location.href = 'http://121.37.7.216/login/index.html#/?sys=1258958482169499649';
            //     }
            //     return false
            // }
            // let UserMenu = await getUserMenu(menu.id); 
            // // let name = ['url','url02','28'];
            // // this.recursive(UserMenu.obj,name);
            // //用户左菜单
            this.$store.commit('menuItems/setMenus',data.menutList);
            this.$message({
                message: `欢迎您！ ${userInfoData.nickname}`,
                type: 'success'
            });
            // this.$router.push('/') 
            // const urlPath = UserMenu.obj[0].children.length?UserMenu.obj[0].children[0].url:UserMenu.obj[0].url
            // const urlPath1 = this.getEffectiveUrl(UserMenu.obj[0]);
            // console.log(urlPath1)
            let UserMenu=data.menutList;

            // const urlPath = UserMenu[0].children.length?UserMenu[0].children[0].url:UserMenu[0].url
            // this.$router.push({
            //     path:urlPath
            // })
            this.$router.push({
                path:'/'
            })

        },
        getEffectiveUrl(data){
            let childData = data.children[0];
            let url = childData.url;
            while(childData.length){
                let data = childData[0];
                url = childData.url;
                childData = data.children;
            }
            return url;
        },
        recursive(arr,name){
            arr.forEach(item=>{
                if(name.indexOf(item.url) !== -1){
                    item.status = false;
                }
                if(item.children.length !== 0){
                    this.recursive(item.children,name);
                }
            })
        },
    }
};
</script>

<style lang="less" scoped>
.beingLogin{
    display: flex; justify-content: center;  flex-wrap: wrap; margin-top: 50px;
    p{width: 100%; text-align: center; color: #343435; font-size: 15px; font-weight: 700;}
    .Loginloading{width:200px; height: auto;}
}

.code{width: 140px;}
.loginErr{height: 12px;}
.login-wrap{
    // background: url("../../assets/login/login_br.png") no-repeat;
    background-size:100% 100%;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .login-title{
        font-size: 28px;
        text-align: center;
        p{
            font-weight: 700;
        }
        .title-img{
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 10px;
            margin-bottom: 30px;
            img{
                width: 14px;
                height: 14px;
            }
            p{
                color: #10984F;
                margin: 0 10px;
            }
        }
    }
    .login-screen{
        height: 383px;
        width: 306px;
        background: #fff;
        padding:25px 52px 30px;
        box-shadow:0px -3px 61px 4px rgba(187,182,182,0.16);
        border-radius:10px;
        .login-logo{
            text-align: center;           
            img{
                width: 160px;
                height: 48px;
            }
        }
        .login-operation{
            display: flex;
            justify-content: center;
            // align-items: center;
            flex-direction: column;
            >div{
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 26px;
                font-size: 12px;
                /deep/ .el-input--small .el-input__inner{
                    height: 40px;
                    line-height: 40px;
                    border-radius: 20px;  
                    background:rgba(248,248,250,1);
                    padding-left: 36px;
                }
                img{
                    width: 143px;
                    height: 39px;
                    margin-left: 20px;
                    cursor: pointer;
                }
                i{
                    font-size: 17px;
                    line-height: 40px;
                    margin-left: 8px;
                    // margin-right: 6px;
                }
                p{
                    color: red;
                    margin-left: 20px;
                }
                /deep/ .el-button--small{
                    width: 100%;
                    height: 40px;
                    margin-left: 10px;
                    // box-shadow:0 5px #10984F;
                }
            }
            div:nth-child(3){
                margin-top: 10px;
            }
            div:nth-child(4){
                margin-top: 16px;
            }
        }
    }
}
</style>
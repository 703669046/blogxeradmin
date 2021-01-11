<template>
    <div class="submitPage">
        <el-dialog
            title="修改密码"
            width="400px"
            @close="cancel"
            :visible.sync="userModify">
            <div class="submitImg">
                <div class="submitImg-div">
                    <i class="iconfont icon-ditie3"></i>
                    <div>修改密码</div>
                </div>
                <i class="iconfont icon-cross-fill" @click="userModify = false"></i>
            </div>
            <div>
                <div class="userD">
                   <div class="login-screen">
                        <div class="login-operation">
                            <div>
                                <el-input v-model="param.oldPassword"  show-password placeholder=" 当前密码" @focus="loginErr = false">
                                    <i slot="prefix" class="iconfont icon-mima1"></i>
                                </el-input>
                            </div>
                            <div>
                                <el-input v-model="param.newPassword" show-password placeholder=" 新密码" @focus="loginErr = false" @input="pwdInput">
                                    <i slot="prefix" class="iconfont icon-mima1"></i>
                                </el-input>
                            </div>
                            <div class="tipbox" v-if="pwdLevel !== 0">
                                <div class="tishi">密码强度:{{levelObj[pwdLevel]}}</div>
                                <div class="tip" :class="{'ruo':pwdLevel == 1}"></div>
                                <div class="tip" :class="{'zhong':pwdLevel == 2}"></div>
                                <div class="tip" :class="{'qiang':pwdLevel == 3}"></div>
                            </div>
                            <div>
                                <el-input v-model="param.confirmPassword" show-password placeholder=" 确认密码" @input="confirmPwd">
                                    <i slot="prefix" class="iconfont icon-mima1"></i>
                                </el-input>
                            </div>
                            <div class="tipbox" v-if="confirmLevel !== 0">
                                <div class="tishi">密码强度:{{levelObj[confirmLevel]}}</div>
                                <div class="tip" :class="{'ruo':confirmLevel == 1}"></div>
                                <div class="tip" :class="{'zhong':confirmLevel == 2}"></div>
                                <div class="tip" :class="{'qiang':confirmLevel == 3}"></div>
                            </div>
                            <div class="loginErr">
                                <p v-show="loginErr">账号或密码错误！</p>
                            </div> 
                            <!-- <p class="changPassword" v-if="this.$store.getters.userInfo.passwordFlag">您使用初始密码登陆安全性较低、建议修改密码</p> -->
                        </div>
                    </div>  
                    
                </div>
                <div class="submit-operate">
                    <el-button @click="cancel" size="mini" type="info">取 消</el-button>
                    <el-button type="primary" @click="submit" size="mini">确 定</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import md5 from 'blueimp-md5'
    import { updatePass,logout } from './api/index'
    export default{
        data(){
            return {
                param: {
                    oldPassword: null,
                    newPassword: null,
                    confirmPassword:null,
                    usename:null
                },
                loginErr:false,
                userModify:false,
                str:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
                pwdLevel:0,
                confirmLevel:0,
                levelObj:{
                    '1':'弱',
                    '2':'中',
                    '3':'强',
                }
            }
        },
        methods:{
            cancel(){
                this.userModify = false;
                this.param.oldPassword = null;
                this.param.newPassword = null;
                this.param.confirmPassword = null;
                this.pwdLevel = 0
                this.confirmLevel = 0
            },
            status(){
                this.userModify = true;
            },
            async submit(){
                let { oldPassword, newPassword ,confirmPassword } = this.param;
                if(!oldPassword || !newPassword || !confirmPassword){
                    return this.$message.error(
                        !password && '请输入当前密码' || 
                        !newPassword && '请输入新密码' || 
                        !confirmPassword && '请输入确认密码'
                    );
                }
                if(newPassword != confirmPassword){
                   return this.$message.error('两次密码不一致')
                }
                if(!this.str.test(newPassword)){
                    return this.$message.error('密码必须由8-16位数字加字母组成')
                }
                if(this.pwdLevel !== 3){
                    return this.$message.error('新密码强度不足!需由数字,小写字母,大写字母组成')
                }
                let param = {
                    oldpass:md5(oldPassword),
                    newpass:md5(newPassword)
                }
                let result = await updatePass(this.$store.getters.userInfo.uId,param);
                if(result.success){
                    logout().then( o =>{
                        if(result.success){
                            this.userModify = false;
                            this.$store.commit('user/setUserInfo','');
                            localStorage.setItem('token','');
                            this.$router.push({
                                path:'/login'
                            })
                        }
                    })
                }else{
                    this.$message.error(result.message)
                }
            },
            //密码
            pwdInput(val){
              this.pwdLevel = this.getLevel(val)
            },
            //确认密码
            confirmPwd(val){
              this.confirmLevel = this.getLevel(val)
            },
            //获取等级
            getLevel(str){
                let level = 0
                const ze1 = /[1-9]\d*|0/
                const ze2 = /[A-Z]/
                const ze3 = /[a-z]/
                if(ze1.test(str)) level++
                if(ze2.test(str)) level++
                if(ze3.test(str)) level++
                return level
            }
        }
    }
</script>

<style lang="less" scoped>
    .userD{display: flex; justify-content: center;}
        .login-screen{
            width: 385px; height:245px;
            padding: 0 52px ; box-sizing: border-box;
        }
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
                    border-radius: 5px;  
                    // background:rgba(248,248,250,1);
                    padding-left: 36px;
                }
                img{
                    width: 76px;
                    height: 32px;
                    margin-left: 20px;
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
                    // box-shadow:0 5px #10984F;
                }
            }
            div:nth-child(3){
                // margin-top: 26px;
            }
            div:nth-child(4){
                // margin-top: 10px;
            }
            .tipbox{
                margin-top: 10px;
                display: inline-flex;
                justify-content: flex-start;
                .tishi{
                    font-size: 10px;
                    margin-right: 10px;
                }
                .tip{
                    width: 30px;
                    height: 5px;
                    background: #fff;
                    border: 1px solid #ccc;
                    margin-left: 5px;
                    border-radius: 3px;
                    &.ruo{
                        background: red;
                        border: 1px solid rgba(0, 0, 0, 0);
                    }
                    &.zhong{
                        background: yellow;
                        border: 1px solid rgba(0, 0, 0, 0);
                    }
                    &.qiang{
                        background: #1ca75f;
                        border: 1px solid rgba(0, 0, 0, 0);
                    }
                }

            }
            .loginErr{height: 12px;}
        }
        .changPassword{color: tomato; font-size: 12px;}
</style>
<template>
    <div class="theme">
        <!-- <el-popover placement="bottom" v-model="visible"> -->
            <div class="zhuti">
                <div class="zhutida" v-for="(item,index) in list" :key="index">
                    <!-- :class="{action:show === index}" -->
                    <div @click="satasFun(item,index)">
                        <el-tooltip
                            effect="dark"
                            :content="item.p"
                            placement="bottom">
                            <i class="iconfont" :class="item.icon"></i>
                        </el-tooltip>
                        <!-- <p>{{item.p}}</p> -->
                    </div>
                </div>
            </div>
            <!-- <i class="iconfont icon-xingzhuang255" slot="reference" @click="comeFun"></i> -->
        <!-- </el-popover> -->
        <el-dialog :visible.sync="showPage" width="40%" title="个人偏好-分页">
            <p class="Da-p">*分页设置成功后需手动刷新页面</p>
            <div class="radio-Da">
                <div>
                    <el-radio-group v-model="page">
                        <div class="radio">
                            <el-radio v-for="item in radioList" :key="item" :label='item'></el-radio>
                        </div>
                    </el-radio-group>
                </div>
                <el-button type="primary" size="mini" @click="deter(0)">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="showLock"  width="40%" title="锁屏">
            <div class="screen">
                <div class="screen-da">
                    <p><i>*</i>锁屏密码</p>
                    <div><el-input v-model="pasward" show-password placeholder="请输入锁屏密码"></el-input></div>
                </div>
                <div class="screen-da">
                    <p><i>*</i>确认密码</p>
                    <div><el-input v-model="pasward2" show-password placeholder="请输入锁屏密码"></el-input></div>
                </div>
                <div class="screen-btn">
                    <el-button type="primary" size="mini" @click="deter(1)">确定</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { obtainAPI, findAPI } from './api/index'
export default {
    data() {
        return {
            visible: false,
            show: -1,
            list: [
                {
                    icon: 'icon-fenye',
                    p: '分页',
                },
                // {
                //     icon:'icon-xingzhuang971',
                //     p:'特色题色',
                // },
                {
                    icon: 'icon-xingzhuang969',
                    p: '锁屏',
                },
            ],
            radioList:[
                10,20,50,100,200
            ],
            // color1:'',
            // predefineColors:[
            //     '#FF4500',
            //     '#FF8C00',
            //     '#FFD700',
            //     '#90EE90',
            //     '#00CED1',
            //     '#1E90FF',
            //     '#C71585',
            // ],
            page: "",
            pasward: '',
            pasward2:'',
            paswards: '',
            sysLockPassword: '',
            showPage: false,
            showLock: false
        }
    },
    created() {
        this.getPageData();
    },
    methods: {
        comeFun() {
            this.show = -1;
            this.pasward = '';
            this.page = this.$store.getters.like.pageSize
        },
        // 请求数据
        async getPageData() {
            const datas = await obtainAPI();
            console.log(datas)
            if (datas.success) {
                this.page = datas.obj.pageSize;
                this.sysLockPassword = datas.obj.sysLockPassword;
                this.$store.commit('user/setLike', { ...datas.obj, isLock: false })
            }
        },
        // 切换
        satasFun(item, index) {
            this.show = index;
            if (index == 0) {
                this.showPage = true
            } else if (index == 1) {
                this.showLock = true
            }
        },
        deter(type) {
            if (type == 0) {
                let parms = {
                    pageSize: this.page,
                    sysBackGround: '#FFFFFF',
                    sysIsLock: 0,
                    sysLockPassword: '',
                    sysTheme: 1,
                }
                findAPI(parms).then(res => {
                    if (res.success) {
                        let likeObj = this.$store.getters.like
                        this.$store.commit('user/setLike', { ...likeObj, pageSize: this.page })
                        this.$message.success(res.message);
                        this.showPage = false
                    } else {
                        this.$message.error(res.message);
                    }
                })
            } else {
                if (this.pasward == '') {
                    return this.$message.error('请输入锁屏密码！');
                }else if(this.pasward2 == ''){
                    return this.$message.error('请确认锁屏密码！')
                }else if(this.pasward2 !== this.pasward){
                    return this.$message.error('两次密码不一致！')
                }
                let parms = {
                    pageSize: this.page,
                    sysBackGround: '#FFFFFF',
                    sysIsLock: 1,
                    sysLockPassword: this.pasward,
                    sysTheme: 1,
                }
                findAPI(parms).then(res => {
                    if (res.success) {
                        this.visible = false;
                        this.$store.commit('user/setLock', true)
                        this.$message.success('锁屏成功！');
                    } else {
                        this.$message.error(res.message);
                    }
                })
            }
        },
    }
}
</script>
<style lang="less" scoped>
/deep/ .el-dialog{
    top: 45%;
}
.icon-xingzhuang255 {
    font-size: 23px;
}
.zhuti {
    display: flex;
    .zhutida {
        width: 40px;
        height: 56px;
        padding: 0px 5px;
        display: flex;
        // border-right: 1px dashed #d8d8da;
        > div {
            width: 100%;
            height: 100%;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            cursor: pointer;
            > .iconfont {
                font-size: 22px;
                color: #5b5b5b;
            }
            p {
                color: #a5a7aa;
            }
        }
        .action {
            background: #f4f4f6;
            border-radius: 5px;
        }
    }
    > .zhutida:last-child {
        border: none;
    }
}
.picker {
    height: 30px;
    display: flex;
    justify-content: center;
    > div {
        width: 170px;
        margin-right: 10px;
    }
}
.top {
    margin-top: 20px;
}
.Da-p{
    color: red;
}
.radio-Da{
    display: flex;
    padding: 40px 0px;
    justify-content: center;
    .radio{
        width: 400px;
        display: flex;
        height: 30px;
        justify-content: space-between;
        align-items: center;
        margin-right: 50px;
    }
}
.screen{
    padding: 40px 0px 0px 0px;
    .screen-da{
        display: flex;
        justify-content: center;
        height: 30px;
        line-height: 30px;
        margin-bottom: 20px;
        >p{
            margin-right: 14px;
            >i{
                color: red;
            }
        }
        >div{
            width: 270px;
        }
    }
    .screen-btn{
        display: flex;
        justify-content: center;
        margin-top: 30px;
    }
}
</style>
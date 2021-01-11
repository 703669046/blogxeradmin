<template>
    <transition name="msgbox-fade">
        <div class="mes-box-wrap" v-show="showFlag" @click="hide">
            <div class="mes-box" @click.stop>
                <div class="mes-box-head">
                    <div class="title">提示</div>
                    <div @click="hide" class="clear iconfont icon-error"></div>
                </div>
                <div class="mes-box-content">
                    <i class="iconfont" :class="messageIcon[type].icon"></i>
                    <p>{{messageIcon[type].message}}</p>
                </div>
                <div class="mes-box-action">
                    <el-button @click="hide">取 消</el-button>
                    <el-button type="primary" @click="confirm">确 定</el-button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
  data() {
    return {
        showFlag: false,
        messageIcon: {   //0删除 1启用  2停用  3重置密码
            '0':{
                icon:'icon-shanchu',
                message:'确定执行“删除”操作吗？',
            },
            '1':{
                icon:'icon-jihuo1',
                message:'确定执行“启用”操作吗？',
            },
            '2':{
                icon:'icon-icon_tingzhi',
                message:'确定执行“禁用”操作吗？',
            },
            '3':{
                icon:'icon-icon_tingzhi',
                message:'重置后密码为 123456, 是否继续?',
            },
            '4': {
                icon: 'icon-tishi',
                message: '是否退出系统，是否继续？'
            },
            '5':{
                icon:'icon-shanchu',
                message:'确定执行“删除”操作吗？该项目下的条款条约也会全部删除，请谨慎操作',
            },
            '6':{
                icon:'icon-jihuo1',
                message:'确定执行“开启”操作吗？',
            },
            '7':{
                icon:'icon-icon_tingzhi',
                message:'确定执行“关闭”操作吗？',
            },
            '8':{
                icon:'icon-tishi',
                message:'确定提交审核吗？',
            },
            '9':{
                icon:'icon-tishi',
                message:'确定批量通过吗？',
            },
        },
        type:0
    };
  },
  methods: {
    show(cb){
        this.showFlag = true;
        // typeof cb === "function" && cb.call(this, this);
        return new Promise((resolve, reject) => {
            this.reject = reject;
            this.resolve = resolve;
        });
    },
    cancel() {
        this.reject("cancel");
        this.hide();
    },
    confirm() {
        this.resolve("confirm");
        this.hide();
    },
    hide() {
        this.showFlag = false;
        // this.reject("cancel");
        // document.body.removeChild(this.$el);
        // this.$destroy(); //消除实列
    }
  }
};
</script>

<style scoped lang="less">
.mes-box-wrap{
    z-index: 2001;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,.3);
    display: flex;
    justify-content: center;
    align-items: center;
    .mes-box{
        width: 420px;
        padding: 15px;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 5px;
        box-sizing: border-box;
        .mes-box-head{
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #303133;
            .clear{
                font-size: 18px;
                cursor: pointer;
                color: #ccc;
            }
            .title{
                display: flex;
                align-items: center;
                color: #303133;
                font-size: 15px;
            }
            .title::before{
                font-size: 22px;
                margin-right: 5px;
                color: #F78989;
            }
        }
        .mes-box-content{
            margin-top: 15px;
            line-height: 24px;
            color: #606266;
            font-size: 14px;
            padding-left: 10px;
            display: flex;
            > i{
                font-size: 22px;
                margin-right: 5px;
                color: #F78989;
            }
            >.icon-dui{
                display: flex;
                align-items: center;
                color: #64CD96;
            }
            >.icon-jihuo1{
                color:#00A766;
            }
        }
        .mes-box-action{
            margin-top: 15px;
            display: flex;
            justify-content: flex-end;
        }
    }
}

.msgbox-fade-enter-active {
    animation: msgbox-fade-in .3s;
}

.msgbox-fade-leave-active {
    animation: msgbox-fade-out .3s;
}

@keyframes msgbox-fade-in {
0% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
}
100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
}
}
@keyframes msgbox-fade-out {
0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
}
100% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
}
}
</style>

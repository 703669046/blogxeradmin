<template>
    <div class="depPage">
        <div class="depPage-text">部门名称</div>
        <div class="depPage-for">
            <div class="for-text" v-for="(item,index) in Datas" :key="index" 
            :class="{'active':show === index}"  @click.stop="depFun(item,index)">
                <p class="text-name">{{item.depName}}</p>
                <p v-if="item.status"><i class="iconfont icon-Checklist_iconkaobei"></i></p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props:{
        depList:{
            type:Array
        }
    },
    data(){
        return {
            Datas:[],
            show:-1,
        }
    },
    watch: {
        depList(value){
            this.Datas = value;
            // if(this.Datas.length){
            //     this.select(this.Datas[0],0)
            // }
        }
    },
    methods:{
        // 点击事件
        depFun(item,index){
            this.show = index;
            this.$emit('depClick',item);
        },
        // 默认返回第一个
        select(item,index){
            this.$emit('gettableList',item,index)
            this.show = index;
        },
    }
}
</script>

<style lang="less" scoped>
.depPage{
    width: 100%;
    .depPage-text{
        height: 38px;
        background: #F7F8F9;
        border: 1px solid #55BB86;
        line-height: 38px;
        text-align: center;
        color: #1CA15C;
        font-size: 14px;
        font-weight: bold;
    }
    .depPage-for{
        background: rgba(255, 255, 255, 0);
        border: 1px solid #E3E4E6;
        height:100%;
        padding: 10px 0px;
        height: 310px;
        overflow: auto;
        .for-text{
            height: 29px;
            line-height: 29px;
            text-align: center;
            cursor: pointer;
            display: flex;
            justify-content: center;
            position: relative;
            .text-name{
                color: #030202;
                font-size: 12px;
            }
            .iconfont{
                width: 19px;
                height: 19px;
                line-height: 19px;
                text-align: center;
                background: #A9EDC9;
                border: 1px solid #66BB8E;
                border-radius: 50%;
                color: #fff;
                font-size: 10px;
                position: absolute;
                right: 20px;
                top:4px
            }
        }
        .active{
            background: #E3F6EC;
            border: 1px solid #55BB86;
            border-radius: 15px;
            color: #1CA45D;
        }
    }
}
</style>
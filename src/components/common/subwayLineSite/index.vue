<template>
    <div class="subwayLine_c">
        <div class="adjustTheOn">
            <div class="adjustTheOnT">
                <!-- 多线 -->
                <div class="site" @click="lineShow = !lineShow" v-show="!lineType">
                    <div class="site-left">
                        <i class="iconfont icon-ditiezhan"></i>
                        <span>{{line && line.lineName}}</span>
                    </div>
                    <div class="site-right">
                        <span>切换</span>
                        <i class="iconfont icon-xiajiantou"></i>
                    </div>
                    <transition name="fade">
                        <div class="lineList" v-show="lineShow">
                            <ul>
                                <li :class="line.lineId === i.lineId?'line-selected':'' "
                                    v-for="(i,index) in lineList"
                                    :key="index" 
                                    @click="switchLine(i)">
                                    {{i.lineName}}
                                </li>
                            </ul>
                        </div>
                    </transition>
                </div>
                <!-- 单线 -->
                <div class="site" v-if="lineType"> 
                    <div class="site-left" @click="lineOnclick(lineId)">
                        <i class="iconfont icon-ditiezhan"></i>
                        <span>{{lineName}}</span>
                    </div>
                </div>
            </div>
            <!-- 站 -->
            <div class="SiteContent_box">
                <div class="SiteContent">
                    <ul>
                        <li
                            v-for="(item,index) in siteList"
                            :key="index"
                            @click.stop="isDisable?'':selectStation(index,item)">
                            <p class="SiteName">
                                <span
                                    :class="{'adjustTheLi':item.id === isSelect}">
                                    {{item.lineStationName}}
                                </span>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getSiteList,getAllSiteList } from './api/index';
import { userInfo } from '../../page/api/index';
export default {
    props: {
        lineId: {
            type: String,
            default:'1'
        },
        lineName:{
            type: String,
            default:'线路'
        },
        isRequest: {
            type: Boolean,
            default: true
        },
        isDisable:{
            type: Boolean,
            default: false
        },
        isAllStation:{
            type:Boolean,
            default:false
        },
        data:{
            type:Array,
            default:() =>{
                return []
            }
        },
        value:String
    },
    data() {
        return {
            siteList: [],
            isSelect: null,
            lineShow: false,
            lineList:[],
            line:null,
            lineType:false
        }
    },
    watch:{
        lineId(){
            this.initLineData()
        }
    },
    created(){
        this.initLineData()
    },
    methods: {
        initLineData(){
            //展示数据
            if(this.data.length){
                return this.showLineStation(this.data);
                this.lineType = true;
            }
            //通过线id展示当前线所有站
            if(this.lineId && this.lineId != 1){
                this.lineType = true;
            return this.getSiteData(this.lineId);
            }
            //展示当前登陆用户所管辖的线和站
            this.getUserLine();
            this.lineType = false;
        },
        //显示线站
        showLineStation(station){
            this.siteList = station;
            this.selectStation(0,this.siteList[0]);
        },
        //切换线
        switchLine(line){
            this.line = line;
            this.getSiteData(line.lineId);
            this.lineOnclick(line.lineId);
        },
        lineOnclick(lineId){
            this.$emit('lineClick',lineId);
        },
        //用户线站
        async getUserLine(){
            let usrInfo = this.$store.getters.userInfo.userLine;
            if(usrInfo.length === 0){
                return this.$emit('lineErr','当前用户没有线站');
            }
            this.lineList = usrInfo;
            if(this.value){
                usrInfo.find( (item,index) =>{
                    if(item.lineId === this.value){
                        this.line =  usrInfo[index];
                    }
                })
            }else{
                this.line = usrInfo[0];
            }
            this.lineOnclick(this.line.lineId)
            this.getSiteData(this.line.lineId);
        },
        //获取站
        async getSiteData(id) { 
            let result =  this.isAllStation?await getAllSiteList({id:id}): await getSiteList({ lineId: id });
            this.siteList = this.isAllStation && result.list || result.obj;
            if(this.siteList.length === 0){
                return this.$emit('lineErr','当前用户没有站');
            }
            this.$emit('getAllSite',this.siteList);
            this.isRequest && this.selectStation( this.siteList[0].id, this.siteList[0]);
        },
        //点击选择
        selectStation(index, item) {
            this.isSelect = item.id;
            item.lineName = this.line && this.line.lineName || this.lineName;
            item.lineId = this.line && this.line.lineId || this.lineId;
            this.$emit('getStationData',item);
        },
    }
}
</script>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all .5s;
    opacity: 1;
    transform: translateX(0);
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateX(-100%);
}
.subwayLine_c {
    height: 100%;
    width: 100%;
}
.addSite {
    height: 30px;
    position: absolute;
    bottom: 0px;
    width: 100%;
    left: 0;
    box-sizing: border-box;
    background: rgba(234, 234, 234, 1);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon-jiahao {
        width: 17px;
        height: 17px;
        background: rgba(225, 226, 226, 1);
        border-radius: 50%;
        display: block;
        display: flex;
        justify-content: center;
        line-height: 17px;
        color: #fff;
    }
}
.adjustTheOn {
    width: 100%;
    height: 100%;
    .adjustTheOnT {
        display: flex;
        line-height: 38px;
        font-size: 14px;
        font-weight: 900;
        background: #f7f8f9;
        height: 38px;
        color: #35b069;
        text-align: center;
        .site {
            display: flex;
            justify-content: center;
            width: 100%;
            border: 1px solid #55bb86;
            font-weight: 900;
            position: relative;
            cursor: pointer;
            > .iconfont {
                font-size: 14px;
            }
            .site-left {
                margin: 0 5px;
                margin-right: 0;
                > span {
                    font-size: 12px;
                    margin-left: 6px;
                    display: inline-block;
                    min-width: 45px;
                }
            }
            .site-right {
                margin: 0 5px;
                > span {
                    font-size: 12px;
                    margin-right: 6px;
                }
                .icon-xiajiantou {
                    font-size: 16px;
                }
            }
            .lineList {
                width: 93%;
                background: #fff;
                position: absolute;
                left: 6px;
                bottom: -222px;
                z-index: 2;
                border-radius: 5px;
                -moz-box-shadow: 0px 1px 16px #d4d4d4;
                -webkit-box-shadow: 0px 1px 16px #d4d4d4;
                box-shadow: 0px 1px 16px #d4d4d4;
                ul {
                    min-height: 200px;
                    max-height: 200px;
                    padding: 5px 0px;
                    overflow: hidden;
                    li {
                        color: #030202;
                        font-size: 12px;
                        width: 100%;
                        text-align: center;
                        height: 35px;
                    }
                    .line-selected {
                        background: #55bb86;
                        color: #fff;
                    }
                }
                ul::-webkit-scrollbar-track {
                    width: 0px;
                }
            }
            .lineList:hover ul{
                overflow-y: overlay;
            }
            .lineList::after {
                content: '';
                width: 0;
                height: 0;
                border: 10px solid;
                border-color: transparent transparent #fff;
                position: absolute;
                left: 50%;
                margin-left: -10px;
                top: -19px;
            }
        }
        // .serial{
        //     width: 40%;
        //     border:1px solid #55bb86;
        //     border-right: none;
        // }
    }
    > .SiteContent_box {
        background: #fff;
        border: 1px solid #eaebeb;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        height: 91%;
        position: relative;
        > .SiteContent {
            width: 100%;
            overflow: hidden;
            height: 100%;
            font-size: 12px;
            ul {
                width: 100%;
                box-sizing: border-box;
                padding-top: 6px;
                > li {
                    height: 29px;
                    line-height: 29px;
                    color: #030202;
                    margin: auto;
                    cursor: pointer;
                    display: flex;
                    // .serialItem{
                    //     width: 40%; text-align: center;
                    //     border-bottom: 1px solid #e3e4e6;
                    //     border-right: 1px solid #e3e4e6;
                    //     // border: 1px solid rgba(227,228,230,1);
                    //     border-top: none;
                    // }
                    .SiteName {
                        width: 100%;
                        text-align: center;
                        display: flex;
                        justify-content: center;
                        position: relative;
                        > span {
                            width: 93%;
                            display: block;
                            border-radius: 20px;
                            border: 1px solid transparent;
                            &:hover {
                                border: 1px solid #67c293;
                                color: #67c293;
                                background: #e3f6ec;
                            }
                        }
                        .icon-guanbi {
                            color: #fff;
                            position: absolute;
                            right: 10%;
                        }
                        .adjustTheLi {
                            background: #55bb86;
                            color: #fff;
                            &:hover {
                                background: #55bb86;
                                color: #fff;
                            }
                        }
                    }
                }
            }
        }
    }
    .SiteContent:not(.el-menu--collapse)::-webkit-scrollbar {
        width: 5px;
        transition: 3s;
        opacity: 0;
    }
    .SiteContent:not(.el-menu--collapse)::-webkit-scrollbar-track {
        background-color: #fafafa;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
    }
    .SiteContent:not(.el-menu--collapse)::-webkit-scrollbar-thumb {
        background-color: rgba(144, 147, 153, 0.3);
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
    }
    .SiteContent:not(.el-menu--collapse)::-webkit-scrollbar {
        width: 5px;
    }
    .SiteContent:not(.el-menu--collapse)::-webkit-scrollbar-track-piece {
        background: none;
    }
    .SiteContent:hover {
        overflow-y: overlay;
    }
}
</style>
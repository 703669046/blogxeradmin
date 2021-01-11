<template>
    <div class="subwayLine_c">
        <div class="adjustTheOn">
            <div class="adjustTheOnT">
                 <div class="serial">
                    项目名称
                </div>
                <div class="serial">
                    运营违约次数
                </div>
                <div class="serial">
                    运管违约次数
                </div>
               
                <!-- <div class="site">
                    <i class="iconfont icon-ditiezhan"></i>
                    <p>{{isData.regulationsName}}</p>
                </div> -->
            </div>
            <div class="SiteContent_box">
                <div class="SiteContent">
                    <ul v-if="List.length">
                        <li v-for="(item,index) in List"
                            :key="index"
                            @click.stop="select(index,item)">
                            <p class="SiteName serialItem" @dblclick="dblclick(item)">
                                <span class="one" :class="{'adjustTheLi':index === isSelect}">{{item.projectName}}
                                <i @click.stop="delLine(item)" class="iconfont iconerror"></i>
                                </span>
                            </p>
                            <p class="serialItem">{{item.operateBreachNumber}}</p>
                            <p class="serialItem">{{item.managementBreachNumber}}</p>
                            
                        </li>
                    </ul>

                    <div class="addSite">
                        <i  class="iconfont iconjiahao" @click="addLine"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import{getProjectByRegulations} from './api/index'
export default {
    watch: {
        List(value){
           this.List=value
           if(this.List.length){
                this.select(0,this.List[0])
                }
        }
    },
    props:{
        isData:{
            type:Object
        },
        List:{
            type:Array
        }
    },
    data(){
        return {
            isSelect:null,
            lineName:null,
            timer:null
        }
    },
    created(){
        this.regulation()
        console.log(this.List)
    },
    methods:{
       async delLine(item){
           this.$emit('delLine',item)
            
        },
        dblclick(item){
            clearTimeout(this.timer);  //清除
            this.$emit('Dblclick',item)
        },
        select(index,item){
            clearTimeout(this.timer);  //清除计时器
            this.timer = setTimeout(() => {
            this.$emit('gettableList',item,index)
            }, 200);
            this.isSelect = index;
        },
        addLine(){
            this.$emit('addproject')
        },
        async regulation(){
           await this.$emit('getlist')
             
            // let res= await getProjectByRegulations({regulationsId:this.isData.id})
            // if(res.success){
            //     this.List=res.list
            //     if(this.List.length){
            //     this.select(0,this.List[0])

            //     }
            // }
        }
    }
}
</script>

<style lang="less" scoped>
    .addSite{
        height:30px; position: absolute; bottom: 0px; width: 100%; left: 0; box-sizing: border-box;
        background:rgba(234,234,234,1);
        display: flex; justify-content: center; align-items: center;
        .icon-jiahao{
            width: 17px; height: 17px;  background:rgba(225,226,226,1);
            border-radius: 50%; 
            display: block; display: flex; justify-content: center; line-height: 17px; color: #fff;
        }
    }
    .adjustTheOn{
            width: 100%;
            height: 100%;
        .adjustTheOnT{
            display: flex;
            line-height: 38px;
            font-size: 14px;
            font-weight: 900;
            background: #e3f6ec;
            height: 38px;
            color: #35b069;
            text-align: center;
            .site{
                display: flex;
                justify-content: center;
                width: 100%;
                border:1px solid #55bb86;
                font-weight: 900;
                 >.iconfont{
                    font-size: 14px;
                }
                >p{
                    width: 196px;
                    height: 38px;
                }
            }
            .serial{
                width: 33%;
                border:1px solid #55bb86;
                border-right: none;
            }
           
        }
        >
        .SiteContent_box{
            background: #fff;
            border:1px solid #EAEBEB;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            position: relative;
            >.SiteContent{
                width: 100%;
                overflow: hidden;
                height: 378px;
                font-size: 12px;
                ul{
                    width: 100%;
                    box-sizing: border-box;
                    >li{
                        height: 29px;
                        line-height: 29px;
                        color: #030202;
                        margin: auto;
                        cursor: pointer;
                        display: flex;
                        .serialItem{
                            width: 100%; text-align: center;
                            border: 1px solid rgba(227,228,230,1);
                            border-top: none;
                        }
                        .SiteName{
                            width:100%;
                            text-align: center;                    
                            display: flex; justify-content: center;
                            overflow: hidden;
                            >span{
                                width: 93%;
                                display: block;
                                border-radius:20px;
                                border:1px solid transparent;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                &:hover{border:1px solid #67C293;color: #67C293;background: #E3F6EC;}
                            }
                            .adjustTheLi{background: #55BB86;color: #fff;
                                &:hover{background: #55BB86;color: #fff;}
                            }
                        }
                    }
                }
            }
        }
        .SiteContent:not(.el-menu--collapse)::-webkit-scrollbar {
            width: 5px;transition: 3s;
            opacity: 0;
        }
        .SiteContent:not(.el-menu--collapse)::-webkit-scrollbar-track {
            background-color: #fafafa;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
        }
        .SiteContent:not(.el-menu--collapse)::-webkit-scrollbar-thumb {
            background-color: rgba(144,147,153,.3);
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
        }
        .SiteContent:not(.el-menu--collapse)::-webkit-scrollbar {
            width: 5px;
        }
        .SiteContent:not(.el-menu--collapse)::-webkit-scrollbar-track-piece{background: none;}
        .SiteContent:hover{ overflow-y: overlay;}
    }
.one{position: relative;text-overflow:ellipsis;}
.iconerror{position: absolute;right: 10px;color: #fff;}
.iconjiahao{cursor: pointer;}
.subwayLine_c{width: 30%;}

</style>
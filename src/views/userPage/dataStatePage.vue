<template>
    <div class="dataStatusPage">
        <div v-show="pageShow">
            <Titlehint :list="Titlehint[pageType]" :show="true" :isData="{ activeName:'Table' }"></Titlehint>
            <div class="page-content">
                <div class="title mb15">{{Titlehint[pageType][1]}}</div>
                <div class="submit-table">
                    <table class="tablelist">
                        <tr>
                            <td class="key">名称</td>
                            <td>
                                <el-input v-model="submitData.auth_name" autocomplete="off"></el-input>
                            </td>
                            <td class="key">上级</td>
                            <td>
                                <el-cascader
                                    v-model="checkedData"
                                    :options="$parent.meuntList"
                                    @change="changeCheckedData"
                                    :props="{ expandTrigger:'hover',children:'son',label:'auth_name',value:'id',checkStrictly: true}"
                                ></el-cascader>
                            </td>
                            <td class="key">控制器名</td>
                            <td>
                                <el-input v-model="submitData.auth_c" autocomplete="off"></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td class="key">操作方法名</td>
                            <td>
                                <el-input v-model="submitData.auth_a" autocomplete="off"></el-input>
                            </td>
                            <td class="key">跳转路径</td>
                            <td>
                                <el-input v-model="submitData.path" autocomplete="off"></el-input>
                            </td>

                            <td class="key">是否菜单项</td>
                            <td>
                                <div class="pl15">
                                    <el-radio v-model="submitData.radio" label="1">是</el-radio>
                                    <el-radio v-model="submitData.radio" label="0">否</el-radio>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="key">是否可选</td>
                            <td>
                                <div class="pl15">
                                    <el-radio v-model="submitData.is_check" label="1">是</el-radio>
                                    <el-radio v-model="submitData.is_check" label="0">否</el-radio>
                                </div>
                            </td>
                            <td class="key">排序</td>
                            <td>
                                <el-input-number
                                    v-model="submitData.sort"
                                    :min="1"
                                    :max="100"
                                    label="描述文字"
                                ></el-input-number>
                            </td>
                            <td class="key">显示</td>
                            <td>
                                <div class="pl15">
                                    <el-switch :width="50" v-model="submitData.is_d"></el-switch>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="key">是否登录</td>
                            <td>
                                <div class="pl15">
                                    <el-switch :width="50" v-model="submitData.isLogin"></el-switch>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="key">图标</td>
                            <td>
                                <el-upload
                                    class="avatar-uploader"
                                    :headers="headers"
                                    :data="datas"
                                    :action="`${uploadhttp}/admin/uploadfile`"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload"
                                >
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="submit-operate">
                    <el-button type="primary" size="mini" @click="handleAdd()">确认</el-button>
                </div>
            </div>
        </div>

        <div v-loading="pageLoading" v-show="!pageShow">
            <empty slot="empty" />
        </div>
    </div>
</template>

<script>
import {host} from '@/config'
import {addMeunt} from "./api/index";
import UploadFile from "@/components/common/UploadFile/src/index";
import { deleteImg } from "@/utils/mixins";

export default {
    props: {
        isData: {
            type: Object
        }
    },
    components: {
        UploadFile
    },
    mixins: [deleteImg],
    data() {
        return {
            Titlehint: {
                0: ["菜单列表", "详情"],
                1: ["菜单列表", "新增"],
                2: ["菜单列表", "编辑"]
            },
            pageLoading: false,
            pageShow: true,
            pageType: 0,
            submitData: {},

            checkedData: [],
            imageUrl:undefined,
            headers:{
                Authorization:localStorage.getItem('token')
            },
            uploadhttp:host,
            datas:{
                type:'meunt_icon'
            }
        };
    },
    created() {
        this.submitStatus();
    },
    methods: {
        // 启动函数
        submitStatus() {},
        changeCheckedData(data) {
            this.submitData.pid = data[data.length - 1];
        },
        handleAvatarSuccess(res, file) {
            if(res.success){
                this.submitData.icon =res.data;
                this.imageUrl= URL.createObjectURL(file.raw);
            }
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },
        async handleAdd(){
            this.submitData.menut_type=1;
            let param = JSON.parse(JSON.stringify(this.submitData))
            let res = await addMeunt(this.submitData);
            if(res.success){
                this.$message.success('添加成功');
                this.cancel();
            }
        },
        // 回退
        cancel() {
            this.$pageShow("Table");
        }
    }
};
</script>
<style scoped lang="less">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
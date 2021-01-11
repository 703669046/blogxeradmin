<template>
    <div class="dataStatusPage">
        <div v-show="pageShow">
            <Titlehint :list="Titlehint[pageType]" :show="true" :isData="{ activeName:'Table' }"></Titlehint>
            <div class="page-content">
                <div class="submit-table">
                    <table class="tablelist">
                        <tr>
                            <td class="key">标题</td>
                            <td>
                                <div class="pl15">{{submitData.title}}</div>
                            </td>
                        </tr>
                        <tr>
                            <td class="key">分类</td>
                            <td>
                                <div class="pl15">{{submitData.category_title}}</div>
                            </td>
                        </tr>
                        <tr>
                            <td class="key">来源</td>
                            <td>
                                <div class="pl15">{{submitData.source}}</div>
                            </td>
                        </tr>
                        <tr>
                            <td class="key">图标</td>
                            <td>
                                <div class="pl15">
                                    <el-image
                                        :src="`${uploadhttp}${submitData.icon_src}`"
                                        :preview-src-list="previewList"
                                    ></el-image>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="key">内容</td>
                            <td>
                                <div class="pl15">
                                    <div v-html="submitData.context"></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="key">审批</td>
                            <td>
                                <el-select v-model="req.type" placeholder="请选择">
                                    <el-option label="待审核" :value="1"></el-option>
                                    <el-option label="驳回" :value="2"></el-option>
                                    <el-option label="通过" :value="3"></el-option>
                                </el-select>
                            </td>
                        </tr>
                        <tr>
                            <td class="key">意见</td>
                            <td>
                                <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="req.opinion"
                                ></el-input>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="submit-operate">
                    <el-button type="primary" size="mini" @click="handleApproval()">确认</el-button>
                </div>
            </div>
        </div>

        <div v-loading="pageLoading" v-show="!pageShow">
            <empty slot="empty" />
        </div>
    </div>
</template>

<script>
import { host } from "@/config";
import { getPostInfo ,approvalData} from "./api/index";
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
            previewList: [],
            req: {},

            checkedData: [],
            imageUrl: undefined,
            headers: {
                Authorization: localStorage.getItem("token")
            },
            uploadhttp: host,
            datas: {
                type: "meunt_icon"
            },
        };
    },
    created() {
        this.submitStatus();
    },
    methods: {
        // 启动函数
        async submitStatus() {
            this.req.id=this.isData.id;
            let res = await getPostInfo(this.isData.id);
            if (res.success) {
                this.previewList[0] = 'http://localhost:8080/' + res.data.icon_src;
                this.submitData = res.data;
            }
        },

        async handleApproval() {
            
            let res = await approvalData(this.req);
            if (res.success) {
                this.$message.success("审批完成");
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
    border-color: #409eff;
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
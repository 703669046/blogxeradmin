<template>
    <div class="table">
        <div class>
            <Titlehint :list="['菜单管理','菜单列表']"></Titlehint>
            <div class="page-content">
                <div class="page-content-head">
                    <div>
                        <el-button
                            type="primary"
                            size="mini"
                            class="iconfont iconxinzeng color1ca45d"
                            @click="addMeunt"
                        >添加菜单</el-button>
                    </div>
                </div>
                <transition name="move">
                    <div class="select" v-show="flag">
                        <div class="item"></div>
                    </div>
                </transition>

                <div class="page-content-table">
                    <el-table
                        :data="tableData"
                        row-key="id"
                        default-expand-all
                        :tree-props="{children: 'son', hasChildren: 'hasChildren'}"
                        v-loading="loading"
                    >
                        <el-table-column
                            prop="auth_name"
                            label="名称"
                            align="center"
                            show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                            prop="icon"
                            label="图标"
                            align="center"
                            show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                            prop="isLogin"
                            label="是否需要登录"
                            align="center"
                            show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                            prop="menut_type"
                            label="菜单类型"
                            align="center"
                            show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                            prop="path"
                            label="路由"
                            align="center"
                            show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                            prop="sort"
                            label="排序"
                            align="center"
                            show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column label="操作" align="center" width="150" fixed="right">
                            <template slot-scope="scope">
                                <el-dropdown>
                                    <el-button type="primary" plain @click.stop>
                                        <i class="iconfont iconcaozuo" @click.stop></i> 操作配置
                                    </el-button>
                                    <el-dropdown-menu
                                        slot="dropdown"
                                        class="page-content-table-operate"
                                    >
                                        <el-dropdown-item>
                                            <el-button
                                                type="primary"
                                                size="mini"
                                                class="iconfont"
                                                @click="editclick(scope.row)"
                                            >修改</el-button>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                        <empty slot="empty" />
                    </el-table>
                </div>
                <div class="pagination">
                    <el-pagination
                        background
                        layout="total, sizes, prev, pager, next"
                        :current-page.sync="$parent.search.currentPage"
                        :page-size="$parent.search.pageSize"
                        :page-sizes="[10,20,50,100,200]"
                        :total="$parent.search.total"
                        @current-change="currentChange"
                        @size-change="sizeChange"
                    ></el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getPageSelect } from "./api/index";
export default {
    props: {
        isData: {
            type: Object
        }
    },
    components: {},
    data() {
        return {
            pickerOptions: {
                disabledDate: time => {
                    return time.getTime() > new Date().getTime();
                }
            },
            tableData: [],
            loading: false,
            flag: false,
            linelists: [],
            stationlists: [],
            caseTypeList: [
                { label: "简易案件", value: "0" },
                { label: "一般案件", value: "1" }
            ],
            caseTypeObj: {
                0: "简易案件",
                1: "一般案件"
            }
        };
    },
    async created() {
        this.getPageData();
    },
    methods: {
        // 分页查询
        async getPageData() {
            let res = await getPageSelect();
            if (res.success) {
                this.tableData = res.data;
                this.$parent.meuntList = res.data;
            }
        },
        addMeunt() {
            let data = { type: 1 };
            this.$pageShow("DataStatePage", data);
        },
        editclick(row){
            row.type=2;
            this.$pageShow("DataStatePage", row);
        },
        // 重置
        resetSearch() {
            this.$parent.search = {
                currentPage: 1,
                pageSize: 10
            };
        },
        // 分页
        currentChange(currentPage) {
            this.$parent.search.currentPage = currentPage;
        },
        // 分页
        sizeChange(size) {
            this.$parent.search.pageSize = size;
        },
        // 删除点击事件
        deleteFun(data) {
            this.$Confirm({ type: 0 }).then(res => {});
        },
        // 时间处理
        changes(value) {
            var date = new Date(value);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var h = date.getHours();
            h = h < 10 ? "0" + h : h;
            var f = date.getMinutes();
            f = f < 10 ? "0" + f : f;
            var s = date.getSeconds();
            s = s < 10 ? "0" + s : s;
            m = m < 10 ? "0" + m : m;
            var d = date.getDate();
            d = d < 10 ? "0" + d : d;
            return y + "-" + m + "-" + d + " " + h + ":" + f + ":" + s;
        }
    }
};
</script>
<style lang="less" scoped>
// 滚动条的宽度
/deep/.el-table__body-wrapper::-webkit-scrollbar {
    // width: 6px; // 横向滚动条
    height: 10px !important; // 纵向滚动条 必写
}
</style>


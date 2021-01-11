<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            unique-opened
            router
        >
            <template v-for="item in items">
                <!-- 多级 -->
                <template v-if="item.children.length">
                    <el-submenu :index="item.path" :key="item.path">
                        <template slot="title">
                            <i :class="item.icon" class="iconfont"></i>
                            <span slot="title">{{ item.auth_name }}</span>
                        </template>

                        <template v-for="subItem in item.children">
                            <el-submenu
                                v-if="subItem.children.length"
                                :index="subItem.path"
                                :key="subItem.path"
                            >
                                <template slot="title">
                                    <i :class="isubItem.icon" class="iconfont"></i>
                                    <span slot="title">{{ isubItem.auth_name }}</span>
                                </template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.children"
                                    :key="i"
                                    :index="threeItem.path"
                                >
                                    <i :class="threeItem.icon" class="iconfont"></i>
                                    <span slot="title">{{ threeItem.auth_name }}</span>
                                </el-menu-item>
                            </el-submenu>

                            <el-menu-item v-else :index="subItem.path" :key="subItem.path">
                                <i :class="subItem.icon" class="iconfont"></i>
                                <span slot="title">{{ subItem.auth_name }}</span>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <!-- 只有一级 -->
                <template v-else>
                    <el-menu-item :index="item.path" :key="item.path" class="one">
                        <i :class="item.icon" class="iconfont"></i>
                        <span class="day" slot="title">{{ item.auth_name }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from "../common/bus";
export default {
    data() {
        return {
            collapse: false,
            items: this.$store.getters.menuItems,
            // [
            //     // {
            //     //     title: "菜单管理",
            //     //     url: "/menut",
            //     //     icon: "iconzhifaduiwuguanli",
            //     //     children: [
            //     //         {
            //     //             title: "菜单列表",
            //     //             url: "/menut/index",
            //     //             icon: "icon",
            //     //             children: []
            //     //         }
            //     //     ]
            //     // }
            // ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace("", "");
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on("collapse", msg => {
            this.collapse = msg;
            bus.$emit("collapse-content", msg);
        });
    }
};
</script>

<style lang='less' scoped>
// /deep/.el-menu-item{
//     padding:0 35px !important;
// }
.one {
    padding: 0 35px !important;
}
.iconfont {
    margin-right: 27px;
    font-size: 18px;
}
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 55.5px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 200px;
    overflow: hidden;
    transition: color 0.3s ease;
    transition: all 0.5s;
}
.sidebar-el-menu:not(.el-menu--collapse):hover {
    overflow-y: auto;
}
.sidebar-el-menu:not(.el-menu--collapse)::-webkit-scrollbar {
    width: 5x;
}
.sidebar-el-menu:not(.el-menu--collapse)::-webkit-scrollbar-track {
    background-color: #fafafa;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
}
.sidebar-el-menu:not(.el-menu--collapse)::-webkit-scrollbar-thumb {
    background-color: #c1c1c1;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
}
.sidebar-el-menu:not(.el-menu--collapse)::-webkit-scrollbar-track-piece {
    background: none;
}
.sidebar > ul {
    height: 100%;
}
/* .day{display: inline-block; padding-right: 28px !important;} */
</style>
<style lang="less">
.is-opened {
    .el-submenu__title {
        color: #030202;
        background: rgba(244, 244, 244, 1);
        > .iconfont {
            color: #030202;
        }
    }
}
</style>

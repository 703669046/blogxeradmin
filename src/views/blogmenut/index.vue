<template>
  <div class="ruleReviewA">
    <div class="table">
      <div class="page-content-box">
        <transition name="pageTransit" mode="out-in">
          <component :is="activeName" :isData="TitlehintData"></component>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Table from "./table";
import DataStatePage from './dataStatePage' 
import { switchPage } from "@/utils/mixins";

export default {
  
  mixins: [switchPage],
  components: {
    Table,
    DataStatePage
  },
  data() {
    return {
      activeName: "Table", //活跃组件
      TitlehintData: {},
      search: {
        currentPage: 1,
        pageSize: 10
      },
      meuntList:[]
    };
  },
  created() {}
};
</script>
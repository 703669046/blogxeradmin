<template>
  <div class="father">
    <!-- <transition name="fade">
      <div v-show="show">这里放的组件</div>
    </transition>
    <div @click="handleClick">hh</div> -->
     <!-- 控制数据的值切换显示隐藏 -->
          <div id="box">
            <!-- 控制数据的值切换显示隐藏 -->
            <button @click="show=!show">点我展示效果</button>
            
            <transition enter-active-class="zoomInLeft" leave-active-class="zoomOutRight">
              <p v-show="show" class="animated">345678</p>
            </transition>
          
            <!-- 第二种方法 -->
            <!-- <transition enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight">
              <p v-show="show"></p>
            </transition> -->
          
            <!-- 多元素运动 -->
            <!-- <transition-group enter-active-class="zoomInLeft" leave-active-class="zoomOutRight">
              <p v-show="show" class="animated" :key="1"></p>
              <p v-show="show" class="animated" :key="2"></p>
            </transition-group> -->
          </div>
            <div class="div001">
            <button @click="show2=!show2">点我展示效果</button>
              
            <transition enter-active-class="zoomInLeft" leave-active-class="zoomOutRight">
              <p v-show="show2" class="animated">
                <img src="../assets/img/404.png" style="height:200px;width:auto;"  alt="">
              </p>
            </transition>
            
          </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
      show: false,
      show2:false,
    }
  },
  methods:{
    handleClick() {
        this.show = (this.show === true ? false : true)
    }
  }
}
</script>
<style scoped>
  .demo{
    width: 243px;
  }
  /* 开始 */
  /* .fade-enter{
      transform: translate3d(0,-300px,0);
  } */
  /* 进入过渡的结束状态 */
  /* .fade-enter-active{ */
    /* transform: translate3d(0,-300px,0); */
      /* transition: .5s all ease;
  } */
  /* 离开过渡的开始状态 */
  /* .fade-leave-active{
    transition: .5s all ease;
  }
  .fade-leave-to{
    opacity:0;
    position: absolute;
    z-index: -10; 
    transform: translate3d(0,300px,0);
  } */

</style>

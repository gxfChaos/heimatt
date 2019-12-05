<template>
  <div class="home-container">
    <!-- navBar -->
    <van-nav-bar class="home-nav" title="首页" />
    <!-- 导航 -->
    <van-tabs>
      <van-tab v-for="(item,index) in 8" :title="'标签' + item" :key="index" animated>内容 {{ index }}</van-tab>
    </van-tabs>
    
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      
    };
  }
};
</script>

<style lang="less">
.home-container {
  // navBar
  .home-nav {
    background-color: #3296fa;
    .van-nav-bar__title {
      color: #fff;
    }
  }
}
</style>
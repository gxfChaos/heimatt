<template>
  <div class="layout-container">
    <!-- 路由出口 -->
    <router-view></router-view>
    <!-- 底部导航 -->
    <van-tabbar route>
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="chat-o">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item to="/my" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "layout"
};
</script>

<style>
</style>
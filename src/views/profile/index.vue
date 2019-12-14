<template>
  <div class="profile-container">
    <van-nav-bar
      title="标题"
      right-text="按钮"
      left-arrow
      @click-left="$router.back()"
      @click-right="onClickRight"
    />
    <van-grid>
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: "profile",
  data() {
    return {};
  },
  methods: {
    onClickRight() {}
  }
};
</script>

<style lang="less">
.profile-container {
  .van-nav-bar {
    background-color: #3296fa;
  }
}
</style>
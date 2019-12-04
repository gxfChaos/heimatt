<template>
  <div class="login-container">
    <!-- nav -->
    <van-nav-bar class="login-nav" title="登录" />
    <!-- input -->
    <van-cell-group>
      <van-field v-model="user.mobile" clearable placeholder="请输入手机号">
        <template slot="left-icon">
          <i class="iconfont icon-iphone"></i>
        </template>
      </van-field>
    </van-cell-group>
    <van-cell-group class="login-code">
      <van-field v-model="sms" center clearable placeholder="请输入验证码">
        <template slot="left-icon">
          <i class="iconfont icon-lock"></i>
        </template>
        <van-button round slot="button" size="small" style="background-color:#ededed;">获取验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- button -->
    <div class="login-btn">
      <van-button type="info" size="large">登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      user: {
        mobile: "",
        code: ""
      }
    };
  }
};
</script>

<style lang="less">
.login-container {
  height: 100%;
  background-color: #f5f7f9;
  .login-nav {
    background-color: #3296fa;
    .van-nav-bar__title {
      color: #fff;
    }
  }
  .login-btn {
    margin: 25px 15px;
    .van-button {
      background-color: #6db4fb;
    }
  }
}
</style>
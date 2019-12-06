<template>
  <div class="login-container">
    <!-- nav -->
    <van-nav-bar class="login-nav" title="登录" />
    <!-- input -->
    <van-cell-group>
      <van-field
        v-model.trim="user.mobile"
        clearable
        placeholder="请输入手机号"
        :error-message="userError.mobile"
      >
        <template slot="left-icon">
          <i class="iconfont icon-iphone"></i>
        </template>
      </van-field>
    </van-cell-group>
    <van-cell-group class="login-code">
      <van-field
        v-model.trim="user.code"
        center
        clearable
        placeholder="请输入验证码"
        :error-message="userError.code"
      >
        <template slot="left-icon">
          <i class="iconfont icon-lock"></i>
        </template>
        <van-button round slot="button" size="small" style="background-color:#ededed;">获取验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- button -->
    <div class="login-btn">
      <van-button
        type="info"
        size="large"
        @click="loginClick"
        :loading="isLoading"
        loading-type="spinner"
      >登录</van-button>
    </div>
  </div>
</template>

<script>
// 导入axios
// import axios from "axios";

// 导入user 接口
import {userApi} from "../../api/user.js";
// 导入本地存储方法
import { localData } from "../../utils/localData.js";

export default {
  name: "login",
  data() {
    return {
      // 输入框内容
      user: {
        mobile: "13911111111",
        code: "246810"
      },
      // 输入框错误提示
      userError: {
        mobile: "",
        code: ""
      },
      // 是否loading
      isLoading: false
    };
  },
  methods: {
    // 登录按钮点击事件
   async loginClick() {
      if (!this.loginPass()) {
        return;
      }
      this.isLoading = true;
      // setTimeout(async () => {
        try {
          let res = await userApi.login(this.user);
          // vuex
          this.$store.commit("SETINFO", res.data.data);
          // 本地存储
          localData.set("userToken", res.data.data);
          // 跳转home
          this.$router.push("/home");
        } catch (error) {
          this.$toast({
            message: "手机号或验证码错误!",
            type: "fail",
            closeOnClick: true
          });
        }
        // 关闭loading效果
        this.isLoading = false;
      // }, 1000);
    },
    // 登录验证
    loginPass() {
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      let mobileFlag = true;
      let codeFlag = true;
      if (!reg.test(this.user.mobile)) {
        this.userError.mobile = "手机号格式错误";
        mobileFlag = false;
      }
      if (this.user.code.length !== 6) {
        this.userError.code = "验证码格式错误";
        codeFlag = false;
      }
      return mobileFlag && codeFlag;
    }
  },
  // 侦听器
  watch: {
    // 手机号
    "user.mobile"(newValue, oldValue) {
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (reg.test(newValue)) {
        this.userError.mobile = "";
      }
    },
    // 验证码
    "user.code"(newValue, oldValue) {
      if (newValue.length === 6) {
        this.userError.code = "";
      }
    }
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
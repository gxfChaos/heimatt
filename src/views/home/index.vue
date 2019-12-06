<template>
  <div class="home-container">
    <!-- navBar -->
    <van-nav-bar class="home-nav" title="首页" fixed />
    <!-- 导航 -->
    <van-tabs v-model="activeChannel">
      <!-- 右侧按钮 -->
      <van-icon name="wap-nav" class="menu-icon" />
      <!-- 频道列表 -->
      <van-tab v-for="item in channelList" :title="item.name" :key="item.id" animated>
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="item.isLoading" @refresh="onRefresh">
          <!-- 内容 -->
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <!-- 单元格 -->
            <van-cell
              style="height:150px;"
              v-for="(subItem,subIndex) in item.articleList"
              :key="subIndex"
              :title="subItem.title"
            />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// 导入频道接口
import { channelApi } from "../../api/channel.js";
// 导入 localData
import { localData } from "../../utils/localData.js";
// 导入文章接口
import { articleApi } from "../../api/article.js";
export default {
  name: "home",
  data() {
    return {
      // 频道列表
      channelList: [],
      // 当前频道下标
      activeChannel: 0,
      // 是否处于加载状态
      loading: false,
      // 是否已加载完成
      finished: false,
      // 下拉是否在加载中
      isLoading: false,
      // 文章列表
      articleList: [],
      // 返回的时间戳
      timestamp: ""
    };
  },
  methods: {
    // 上拉加载更多方法
    async onLoad() {
      // 当前频道
      let currentChannel = this.channelList[this.activeChannel];
      // 当前频道的id
      let id = currentChannel.id;
      // 发送请求
      let res = await articleApi.list(id, this.timestamp);
      window.console.log(res);
      // 保存文章列表
      currentChannel.articleList.push(...res.data.data.results);
      // 保存时间戳
      currentChannel.timestamp = res.data.data.pre_timestamp;
      if (res.data.data.results.length === 0) {
        currentChannel.finished = true;
      }
      currentChannel.loading = false;
    },

    // 下拉刷新时触发
    onRefresh() {
      // 当前频道
      let currentChannel = this.channelList[this.activeChannel];
      currentChannel.loading = false;
      currentChannel.finished = false;
      currentChannel.articleList = [];
      currentChannel.timestamp = "";
      currentChannel.isLoading = false;
      this.onLoad();
    },

    // 获取频道列表
    async getChannelsList() {
      // 获取token
      let userInfo = this.$store.state.userInfo;
      // 用户登录了
      if (userInfo && userInfo.token) {
        let res = await channelApi.list();
        this.channelList = res.data.data.channels;
      } else {
        // 用户未登录
        // 获取本地存储的频道列表
        let localChannel = localData.get("localChannel");
        // 用户未登录-本地有存储频道列表
        if (localChannel) {
          this.channelList = localChannel;
        } else {
          // 用户未登录-本地未存储频道列表
          let res = await channelApi.list();
          this.channelList = res.data.data.channels;
        }
      }
      // 给频道设置独立的数据源
      this.channelList.forEach(item => {
        this.$set(item, "loading", false);
        this.$set(item, "finished", false);
        this.$set(item, "isLoading", false);
        this.$set(item, "articleList", []);
        this.$set(item, "timestamp", "");
      });
    }
  },
  created() {
    // 获取频道列表
    this.getChannelsList();
  }
};
</script>

<style lang="less" scoped>
.home-container {
  margin-top: 90px;
  margin-bottom: 50px;
  // navBar
  .home-nav {
    background-color: #3296fa;
    .van-nav-bar__title {
      color: #fff;
    }
  }
  // tabs
  .van-tabs {
    // 频道列表
    /deep/ .van-tabs__wrap {
      position: fixed;
      top: 46px;
      left: 0;
      z-index: 99;
      width: 90%;
    }
    // 右侧图标
    .menu-icon {
      position: fixed;
      top: 46px;
      right: 0;
      z-index: 99;
      line-height: 44px;
      font-size: 44px;
    }
  }
}
</style>
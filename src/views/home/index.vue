<template>
  <div class="home-container">
    <!-- navBar -->
    <van-nav-bar class="home-nav" title="首页" fixed />
    <!-- 导航 -->
    <van-tabs v-model="activeChannel">
      <!-- 右侧按钮 -->
      <van-icon name="plus" class="menu-icon" @click="showPop = true" />
      <!-- 频道列表 -->
      <van-tab v-for="item in channelList" :title="item.name" :key="item.id" animated>
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="item.isLoading" @refresh="onRefresh">
          <!-- 文章内容 -->
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <!-- 单元格 -->
            <van-cell v-for="(subItem,subIndex) in item.articleList" :key="subIndex">
              <template slot="title">
                {{ subItem.title }}
                <van-grid :border="false" :column-num="3" v-if="subItem.cover.type !== 0">
                  <van-grid-item>
                    <van-image
                      lazy-load
                      :src="imgItem"
                      v-for="(imgItem,imgIndex) in subItem.cover.images"
                      :key="imgIndex"
                    />
                  </van-grid-item>
                </van-grid>
                <div class="detail">
                  <div class="left">
                    <span>{{subItem.aut_name}}</span>
                    <span>{{subItem.comm_count}}评论</span>
                    <span>{{subItem.pubdate | dateFilter}}</span>
                  </div>
                  <div class="right">
                    <van-icon name="cross" @click="openMore(subItem)" />
                  </div>
                </div>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- 弹出层子组件 -->
    <channelpop v-model="showPop" :channelList="channelList" :activeChannel.sync="activeChannel"></channelpop>
    <!-- more操作面板 -->
    <more v-model="isMore" :moreItem="moreItem" @disLike="disLike"></more>
  </div>
</template>

<script>
// 导入频道接口
import { channelApi } from "../../api/channel.js";
// 导入 localData
import { localData } from "../../utils/localData.js";
// 导入文章接口
import { articleApi } from "../../api/article.js";
// 导入子组件
import channelpop from "../../components/channelPop";
import more from "../../components/more";

export default {
  name: "home",
  data() {
    return {
      // 频道列表
      channelList: [],
      // 当前频道下标
      activeChannel: 0,
      // 是否显示弹出层
      showPop: false,
      // 是否显示more编辑页面
      isMore: false,
      // 传到more页面的item
      moreItem: {}
      /* // 是否处于加载状态
      loading: false,
      // 是否已加载完成
      finished: false,
      // 下拉是否在加载中
      isLoading: false,
      // 文章列表
      articleList: [],
      // 返回的时间戳
      timestamp: ""   */
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
    },
    // 设置当前高亮频道
    changeActive(value) {
      this.activeChannel = value;
    },

    // 显示more面板
    openMore(subItem) {
      this.moreItem = subItem;
      this.isMore = true;
    },
    // 不感兴趣事件
    disLike(value) {
      this.channelList[this.activeChannel].articleList.forEach(
        (item, index) => {
          if (value.art_id === item.art_id) {
            this.channelList[this.activeChannel].articleList.splice(index, 1);
          }
        }
      );
    }
  },
  components: {
    channelpop,
    more
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
      font-size: 30px;
    }
  }

  .detail {
    display: flex;
    justify-content: space-between;
    .left {
      span {
        margin-right: 10px;
      }
    }
  }
}
</style>
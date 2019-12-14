<template>
  <div class="my-container">
    <!-- hd -->
    <div slot="title" class="my-hd">
      <div class="top">
        <div class="left" @click="$router.push('/profile')">
          <img :src="selfInfo.photo" alt />
          <div>{{selfInfo.name}}</div>
        </div>
        <div class="right">
          <span>今天阅读</span>
          <span>6分钟</span>
        </div>
      </div>
      <div class="bottom">
        <van-grid :column-num="3" :border="false">
          <van-grid-item>
            <div slot="default" class="text-content">
              <span>{{selfInfo.art_count}}</span>
              <span>动态</span>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div slot="default" class="text-content">
              <span>{{selfInfo.follow_count}}</span>
              <span>关注</span>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div slot="default" class="text-content">
              <span>{{selfInfo.fans_count}}</span>
              <span>粉丝</span>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <!-- 功能区 -->
    <van-grid :column-num="3" class="shop-content">
      <van-grid-item icon="star-o" text="收藏" class="collect"/>
      <van-grid-item icon="underway-o" text="历史" class="history"/>
      <van-grid-item icon="records" text="作品" class="production"/>
    </van-grid>
    <!-- bd -->

    <van-divider :style="{ height:'10px',backgroundColor:'#f5f7f9' }"></van-divider>
    <div class="my-bd">
      <van-cell is-link title="消息通知" />
      <van-cell is-link title="用户反馈" />
      <van-cell is-link title="小智同学" />
    </div>
  </div>
</template>

<script>
// 导入接口
import { userApi } from "../../api/user";
export default {
  name: "my",
  data() {
    return {
        selfInfo:{},
    };
  },
 async created() {
     let res = await userApi.getSelfInfo();
     this.selfInfo = res.data.data;
  }
};
</script>

<style lang="less">
.my-container {
  // hd
  .my-hd {
    background-color: #3e9df8;
    overflow: hidden;

    .top {
      margin-top: 35px;
      margin-left: 35px;
      .left {
        display: flex;
        color: #fff;
        font-size: 16px;

        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
      .right {
        background-color: rgba(0, 0, 0, 0.3);
        position: absolute;
        top: 50px;
        right: 0;
        padding: 0 15px;
        border-radius: 20px 0 0 20px;

        span {
          display: block;
          line-height: 20px;
          font-size: 12px;
          color: #fff;
        }
      }
    }
    .bottom {
      margin-top: 10px;
      margin-bottom: 15px;

      .text-content {
        span {
          display: block;
          text-align: center;
          font-size: 16px;
          color: #fff;
          line-height: 20px;
        }
      }
    }

    // 消除宫格的背景颜色
    .van-grid-item__content.van-grid-item__content--center {
      background-color: inherit;
    }
  }

  // shop
  .shop-content {
      span{
          font-size: 16px;
      }
      i.van-icon{
          font-size: 35px;
      }
      .collect i.van-icon{
          color: #ff4444;
      }
      .history i.van-icon{
          color: #ff9e1f;
      }
      .production i.van-icon{
          color: #6f96ff;
      }
  }

  // bd
  .my-bd {
  }
}
</style>
<template>
  <div class="comment-container">
    <van-cell v-for="(item,index) in commentData" :key="index">
      <div slot="title" class="comment-layout">
        <div class="user-icon">
          <img :src="item.aut_photo" alt />
        </div>
        <div class="message-content">
          <div class="user-name">{{item.aut_name}}</div>
          <div class="comment">{{item.content}}</div>
          <div class="bottom">
            <div>{{item.pubdate | dateFilter }}</div>
            <van-button v-if="isComment" round size="small" @click="openReply(item)">回复{{item.reply_count}}</van-button>
          </div>
        </div>
        <div class="like-content">
          <van-icon name="like" />
          {{item.like_count}}
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
// 导入bus
import bus from "../utils/bus.js";
export default {
  name: "comment",
  props: ["commentData","isComment"],
  data() {
    return {};
  },
  methods: {
    openReply(item) {
      // window.console.log(item.com_id.toString());
      this.$emit("openReply", true);
      // 通过bus传递出去值
      bus.$emit("sendCommentItem", item);
    }
  }
};
</script>

<style lang="less" scoped>
.comment-container {
  .comment-layout {
    display: flex;
    // 用户头像
    .user-icon {
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }

    // 详情
    .message-content {
      flex: 1;
      margin-left: 10px;

      .comment {
        margin-top: 6px;
      }
      .bottom {
        display: flex;
        align-items: center;

        .van-button {
          margin-left: 10px;
          background-color: #eff7f8;
        }
      }
    }

    .like-content {
      font-size: 16px;
      .van-icon {
        color: red;
        font-size: 20px;
        margin-right: 5px;
      }
    }
  }
}
</style>
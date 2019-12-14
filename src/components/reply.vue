<template>
  <div class="reply-container">
    <van-popup
      :value="value"
      @input="$emit('input',false)"
      position="bottom"
      :style="{ height: '60%' }"
      @closed="closedPop"
      @opened="openedPop"
    >
      <van-cell class="title">
        <van-icon name="cross" slot="icon" @click="$emit('input',false)" />
        <h2 slot="title">{{commentItem.reply_count}}条回复</h2>
      </van-cell>
      <!-- 当前评论 -->
      <comment :commentData="[commentItem]" :isComment="false" />
      <!-- 分割线 -->
      <van-divider>评论回复</van-divider>
      <!-- 评论回复 -->
      <van-list
        ref="list"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <comment :isComment="false" :commentData="commentReplyData" />
      </van-list>
    </van-popup>
  </div>
</template>

<script>
// 导入bus
import bus from "../utils/bus.js";
// 导入组件
import comment from "./comment";
// 导入api
import { commentApi } from "../api/comment.js";
export default {
  name: "reply",
  props: ["value"],
  components: {
    comment
  },
  data() {
    return {
      commentItem: {},
      loading: false,
      finished: false,
      // 当前偏移量id
      lastId: null,
      // 结束偏移量id
      endId: null,
      // 页容量
      limit: 10,
      // 评论回复数据源
      commentReplyData: []
    };
  },
  methods: {
    async onLoad() {
      let res = await commentApi.getCommentReply({
        comId: this.commentItem.com_id.toString(),
        offset: this.lastId,
        limit: this.limit
      });
      this.commentReplyData = [
        ...this.commentReplyData,
        ...res.data.data.results
      ];
      this.lastId = res.data.data.last_id;
      this.endId = res.data.data.end_id;
      if (this.endId === this.lastId) {
        this.finished = true;
        return;
      }

      this.loading = false;
    },
    closedPop() {
      this.$emit("closeReply", false);
      // 清空数据
      this.commentItem = {};
      this.loading = false;
      this.finished = false;
      this.lastId = null;
      this.endId = null;
      this.commentReplyData = [];
    },
    openedPop() {
      this.$refs.list.check();
    }
  },
  // computed: {
  //   //函数一定需要返回值
  //   commentItem: function(newValue, oldValue) {
  //     bus.$emit("replyTotalcount", {
  //       replyTotalcount: newValue.reply_count,
  //       comId: newValue.com_id.toString()
  //     });
  //     return newValue;
  //   }
  // },
  created() {
    // 获取bus传递过来的值
    bus.$on("sendCommentItem", value => {
      this.commentItem = value;
    });
    bus.$on("addCommentReply", value => {
      this.commentReplyData.unshift(value);
      this.commentItem.reply_count += 1;
    });
  }
};
</script>

<style lang="less" scoped>
.reply-container {
  margin-bottom: 50px;
  .title {
    i.van-icon {
      font-size: 30px;
    }
    .van-cell__title {
      text-align: center;
      position: absolute;
      top: 10px;
      left: 0;
      right: 0;
    }
  }
}
</style>
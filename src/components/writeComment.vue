<template>
  <div class="write-comment-container">
    <van-cell-group class="send-comment">
      <van-field v-model="commentKey" @keyup.enter="publish" placeholder="写评论" clearable autosize></van-field>
      <div class="right-icon">
        <van-icon name="comment-o" :info="totalCount" @click="publish" v-if="isComment" />
        <van-icon name="comment-o" :info="replyTotalcount" @click="publish" v-if="!isComment" />
        <van-icon name="star-o" v-if="isComment" />
        <van-icon name="share" v-if="isComment" />
      </div>
    </van-cell-group>
  </div>
</template>

<script>
// 导入bus
import bus from "../utils/bus.js";
// 导入接口
import { commentApi } from "../api/comment.js";
export default {
  name: "writeComment",
  props: ["totalCount", "artId", "isComment"],
  data() {
    return {
      commentKey: "",
      replyTotalcount: "",
      comId: ""
    };
  },
  methods: {
    async publish() {
      if (this.commentKey.trim().length === 0) {
        this.$toast.fail("内容不能为空!");
        return;
      }
      if (this.isComment) {
        let res = await commentApi.addComment({
          content: this.commentKey,
          artId: this.artId
        });
        this.$emit("addComment", res.data.data.new_obj);
        this.commentKey = "";
      } else {
        let res = await commentApi.addCommentReply({
          comId: this.comId,
          content: this.commentKey,
          artId: this.artId
        });
        bus.$emit("addCommentReply", res.data.data.new_obj);
        this.commentKey = "";
      }
    }
  },
  created() {
    //data数据创建了,但是el挂载点还没有创建(准备创建el)
    bus.$on("replyTotalcount", value => {
      this.replyTotalcount = value.replyTotalcount;
      this.comId = value.comId;
    });
  }
};
</script>

<style lang="less" scoped>
.write-comment-container {
  .send-comment {
    position: fixed;
    border-top: 1px solid #ccc;
    bottom: 0;
    right: 0;
    width: 100%;
    display: flex;
    height: 50px;
    z-index: 999999;

    .right-icon {
      display: flex;
      align-items: center;
      i {
        font-size: 25px;
        margin-right: 20px;
      }
    }
  }
}
</style>
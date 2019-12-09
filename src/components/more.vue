<template>
  <div class="more-container">
    <van-dialog
      :value="value"
      @input="$emit('input',false)"
      :showConfirmButton="false"
      closeOnClickOverlay
    >
      <div v-if="isReport===false">
        <van-cell title="不感兴趣" icon="point-gift-o" @click="disLike"></van-cell>
        <van-cell title="举报垃圾文章" icon="fail" is-link @click="isReport=true"></van-cell>
        <van-cell title="拉黑作者" icon="info-o" @click="blackList"></van-cell>
      </div>
      <div v-if="isReport===true">
        <!-- 切换按钮 -->
        <van-cell>
          <van-icon
            name="arrow-left"
            slot="right-icon"
            class="close-icon"
            @click.stop="isReport=false"
          />
        </van-cell>
        <!-- 举报类型 -->
        <van-cell
          :title="item.name"
          v-for="(item,index) in reportList"
          :key="index"
          @click.stop="report(item.type)"
        ></van-cell>
      </div>
    </van-dialog>
  </div>
</template>

<script>
// 导入文章接口
import { articleApi } from "../api/article";
// 导入用户接口
import { userApi } from "../api/user.js";

export default {
  name: "more",
  props: ["value", "moreItem"],
  data() {
    return {
      // 是否显示反馈详情
      isReport: false,
      // 举报类型
      reportList: [
        { type: 0, name: "其他问题" },
        { type: 1, name: "标题夸张" },
        { type: 2, name: "低俗色情" },
        { type: 3, name: "错别字多" },
        { type: 4, name: "旧闻重复" },
        { type: 5, name: "广告软文" },
        { type: 6, name: "内容不实" },
        { type: 7, name: "涉嫌违法犯罪" },
        { type: 8, name: "侵权" }
      ]
    };
  },
  methods: {
    // 不感兴趣事件
    async disLike() {
      this.$emit("disLike", this.moreItem);
      this.$emit("input", false);
      try {
        await articleApi.disLike(this.moreItem.art_id);
        this.$toast.success("屏蔽成功");
      } catch (error) {
        window.console.log(error.message);
      }
    },
    // 举报请求事件
    async report(type) {
      try {
        await articleApi.report(this.moreItem.art_id, type);
        this.$emit("input", false);
      } catch (error) {
        this.$toast("已经举报过!");
        this.isReport = false;
        this.$emit("input", false);
      }
    },
    // 拉黑作者事件
    async blackList() {
      try {
        let res = await userApi.blackList(this.moreItem.aut_id);
      } catch (error) {
        window.console.log(error.message);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.more-container {
}
</style>
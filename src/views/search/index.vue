<template>
  <div class="search-container">
    <!-- 搜索模块 -->
    <van-search
      v-model.trim="key"
      placeholder="请输入搜索关键词"
      show-action
      background="#3296fa"
      clearable
      @search="onSearch"
      @cancel="onCancel"
    />
    <!-- 搜索联想模块 -->
    <van-cell-group v-if="key !== ''">
      <van-cell
        icon="search"
        v-for="(item,index) in thinkResults"
        :key="index"
        @click="itemClick(item.item)"
      >
        <template slot="title">
          <div v-html="item.activeItem"></div>
        </template>
      </van-cell>
      <van-cell title="当前搜索无结果" v-if="thinkResults.length === 0" />
    </van-cell-group>
    <!-- 搜索历史模块 -->
    <van-cell-group v-else class="history">
      <van-cell title="搜索历史">
        <template slot="right-icon">
          <van-icon name="delete" @click="historyList = []" />
        </template>
      </van-cell>
      <van-cell
        v-for="(item,index) in historyList"
        :key="index"
        @click="itemClick(item)"
        :title="item"
      >
        <template slot="right-icon">
          <van-icon name="cross" @click.stop="historyList.splice(index,1)" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { searchApi } from "../../api/search.js";
import { localData } from "../../utils/localData.js";

export default {
  name: "search",
  data() {
    return {
      // 搜索关键词
      key: "",
      // 计时器
      timer: null,
      // 联想结果
      thinkResults: [],
      // 搜索历史列表
      historyList: localData.get("searchHistory") || []
    };
  },
  methods: {
    onSearch() {
      if (this.key.trim() === "") {
        return;
      }
      this.historyList.unshift(this.key);
      this.historyList = [...new Set(this.historyList)];
      setTimeout(() => {
        this.$router.push(`/searchResult/${this.key}`);
      }, 100);
    },
    onCancel() {},
    itemClick(item) {
      this.key = item;
      this.onSearch();
    },
  },
  watch: {
    key: function(newValue, oldValue) {
      if (!newValue) {
        return;
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        let res = await searchApi.getThink(newValue);
        this.thinkResults = res.data.data.options.map(item => {
          return {
            item,
            activeItem: item
              .split(newValue)
              .join(`<span style="color:#3296fa;">${newValue}</span>`)
          };
        });
      }, 500);
    },
    historyList: function(newValue, oldValue) {
      localData.set("searchHistory", this.historyList);
    }
  }
};
</script>

<style lang="less" scoped>
.search-container {
  .van-search__action {
    color: #fff;
  }

  .van-search__action:active {
    background-color: #3296fa;
    color: #ccc;
  }

  .history {
    i.van-icon {
      font-size: 20px;
    }
  }
}
</style>
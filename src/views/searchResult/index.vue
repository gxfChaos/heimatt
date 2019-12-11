<template>
  <div class="search-result-container">
    <!-- 导航模块 -->
    <van-nav-bar fixed>
      <span slot="title" class="txt">搜索结果</span>
      <van-icon name="arrow-left" slot="left" />
    </van-nav-bar>
    <!-- 搜索结果模块 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!-- 下拉刷新 -->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-cell v-for="(item,index) in resultList" :key="index">
          <template slot="title">
            <!-- 标题模块 -->
            <h3>{{item.title}}</h3>
            <!-- 图片模块 -->
            <van-grid :column-num="3" v-if="item.cover.type !== 0">
              <van-grid-item v-for="(imgItem,imgIndex) in item.cover.images" :key="imgIndex">
                <van-image :src="imgItem" lazy-load @click="openPreview(item.cover.images,imgIndex)" />
              </van-grid-item>
            </van-grid>
            <!-- 详情模块 -->
            <div class="details">
              <span>{{item.aut_name}}</span>
              <span>{{item.comm_count}} 评论</span>
              <span>{{ item.pubdate | dateFilter}}</span>
            </div>
            <!-- 功能模块 -->
            <van-grid :column-num="3" class="shop" border>
              <van-grid-item>
                <div slot="default" class="shop-content" @click="commClick">
                  <van-icon name="comment-o" />
                  <span v-if="item.comm_count !== 0">{{item.comm_count}}</span>
                  <span v-else>评论</span>
                </div>
              </van-grid-item>
              <van-grid-item>
                <div slot="default" class="shop-content">
                  <van-icon name="like-o" />
                  <span v-if="item.like_count !== 0">{{item.like_count}}</span>
                  <span v-else>点赞</span>
                </div>
              </van-grid-item>
              <van-grid-item>
                <div slot="default" class="shop-content">
                  <van-icon name="share" />
                  <span>分享</span>
                </div>
              </van-grid-item>
            </van-grid>
          </template>
        </van-cell>
      </van-pull-refresh>
    </van-list>
    <!-- 图片预览 -->
    <van-image-preview
      v-model="imgShow"
      :images="previewList"
      @change="onChange"
      :start-position="1"
    >
      <template slot="preivewIndex">第{{ preivewIndex }}页</template>
    </van-image-preview>
  </div>
</template>

<script>
import { searchApi } from "../../api/search.js";
export default {
  name: "searchResult",
  data() {
    return {
      loading: false,
      finished: false,
      isLoading: false,
      page: 0,
      perpage: 10,
      key: this.$route.params.key,
      resultList: [],
      totalCount: 0,
      previewList: [],
      imgShow: false,
      preivewIndex: 0,
    };
  },
  methods: {
    async onLoad() {
      this.page++;
      let res = await searchApi.getSearchResult({
        page: this.page,
        perpage: this.perpage,
        key: this.$route.params.key
      });
      this.totalCount = res.data.data.total_count;
      this.resultList = [...this.resultList, ...res.data.data.results];
      if (this.resultList.length === this.totalCount) {
        this.finished = true;
        return;
      }
      this.loading = false;
      this.isLoading = false;
    },
    onRefresh() {
      setTimeout(() => {
        this.loading = false;
        this.finished = false;
        this.page = 0;
        this.resultList = [];
        this.onLoad();
      }, 500);
    },
    onChange(index) {
      this.preivewIndex = index;
      window.console.log(this.preivewIndex);
      window.console.log(index);
    },
    openPreview(value,index) {
      this.previewList = value;
      this.preivewIndex = index + 1;
      window.console.log(this.preivewIndex);
      this.imgShow = true;
    },
    commClick(){
      
    }
  },
  created() {
    // this.onLoad();
  }
};
</script>

<style lang="less" scoped>
.search-result-container {
  margin-top: 46px;
  // 导航模块
  .van-nav-bar {
    background-color: #3e9df8;

    .van-icon,
    span.txt {
      color: #fff;
    }
  }

  // 结果模块
  .shop {
    .shop-content {
      display: flex;
      align-items: center;

      i.van-icon {
        font-size: 20px;
        margin-right: 5px;
      }
    }
  }
}
</style>
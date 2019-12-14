<template>
  <div class="article-detail-container">
    <!-- 导航条 -->
    <van-nav-bar>
      <span slot="title" class="txt">{{articleData.title}}</span>
      <van-icon name="arrow-left" slot="left" @click="$router.back()" />
    </van-nav-bar>
    <!-- 标题 -->
    <van-cell class="title">
      <h2 slot="title">{{ articleData.title }}</h2>
    </van-cell>
    <!-- 作者信息 -->
    <van-sticky>
      <van-cell class="author">
        <div slot="title" class="author-content">
          <div class="author-icon">
            <img :src="articleData.aut_photo" />
          </div>
          <div class="author-detail">
            <div>{{ articleData.aut_name }}</div>
            <div>{{ articleData.pubdate | dateFilter }}</div>
          </div>
          <div class="author-btn">
            <van-button @click="follow" type="info" v-if="articleData.is_followed === false">+ 关注</van-button>
            <van-button @click="unFollow" type="info" v-else>已关注</van-button>
          </div>
        </div>
      </van-cell>
    </van-sticky>
    <!-- 文章内容 -->
    <van-cell>
      <div class="article-content">
        <div slot="title" v-html="articleData.content"></div>
      </div>
    </van-cell>
    <!-- 点赞&不喜欢 按钮 -->
    <van-cell>
      <div slot="title" class="article-like-btn">
        <van-button
          @click="like"
          round
          plain
          icon="like"
          :type="articleData.attitude == 1 ?'danger':'default'"
        >点赞</van-button>
        <van-button
          @click="dislike"
          round
          plain
          icon="delete"
          :type="articleData.attitude == 0 ?'danger':'default'"
        >不喜欢</van-button>
      </div>
    </van-cell>
    <van-divider content-position="left">猜你喜欢</van-divider>
    <!-- 评论 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <comment :commentData="commentData" @openReply="openReply" :isComment="true" />
    </van-list>
    <!-- 发表评论 -->
    <writeComment
      :totalCount="totalCount"
      :artId="artId"
      @addComment="addComment"
      :isComment="isComment"
    />
    <!-- 评论回复组件组件 -->
    <reply v-model="replyShow" @closeReply="closeReply" />
  </div>
</template>

<script>
// 导入组件
import comment from "../../components/comment";
import reply from "../../components/reply";
import writeComment from "../../components/writeComment";
// 导入接口
import { articleApi } from "../../api/article.js";
import { commentApi } from "../../api/comment.js";
import { userApi } from "../../api/user";
export default {
  name: "articleDetail",
  // components
  components: {
    comment,
    reply,
    writeComment
  },
  // data
  data() {
    return {
      artId: this.$route.params.artId,
      loading: false,
      finished: false,
      // 文章数据源
      articleData: {},
      // 当前偏移量id
      lastId: null,
      // 结束偏移量id
      endId: null,
      // 页容量
      limit: 10,
      // 总评论数
      totalCount: null,
      // 评论数据源
      commentData: [],
      replyShow: false,
      isComment: true
    };
  },
  // methods
  methods: {
    // 加载评论
    async onLoad() {
      let res = await commentApi.getComment({
        artId: this.artId,
        offset: this.lastId,
        limit: this.limit
      });
      this.commentData = [...this.commentData, ...res.data.data.results];
      this.lastId = res.data.data.last_id;
      this.endId = res.data.data.end_id;
      this.totalCount = res.data.data.total_count;
      if (this.endId === this.lastId) {
        this.finished = true;
        return;
      }
      this.loading = false;
    },
    // 关注用户
    async follow() {
      try {
        await userApi.follow(this.articleData.aut_id);
        this.articleData.is_followed = true;
      } catch (error) {
        if (
          error.response.data.message.indexOf("User") !== -1 &&
          error.response.request.status == 400
        ) {
          this.$toast.fail("不能关注自己!");
          return;
        }
        window.console.dir(error);
      }
    },
    // 取消关注用户
    async unFollow() {
      try {
        await userApi.unfollow(this.articleData.aut_id);
      } catch (error) {
        this.articleData.is_followed = false;
      }
    },
    // 点赞
    async like() {
      try {
        await articleApi.like(this.artId);
        this.articleData.attitude = 1;
      } catch (error) {
        window.console.log(error);
      }
    },
    // 不喜欢
    async dislike() {
      try {
        await articleApi.disLike(this.artId);
        this.articleData.attitude = 0;
      } catch (error) {
        window.console.log(error);
      }
    },
    // 打开评论回复页
    openReply() {
      this.replyShow = true;
      this.isComment = false;
    },
    // 关闭评论回复页
    closeReply() {
      this.isComment = true;
    },
    // 新增评论
    addComment(value) {
      this.commentData.unshift(value);
    }
  },
  // created
  async created() {
    let res = await articleApi.getArticleDetail(this.artId);
    this.articleData = res.data.data;
  }
};
</script>

<style lang="less" scoped>
.article-detail-container {
  margin-bottom: 50px;
  // 导航条
  .van-nav-bar {
    background-color: #3e9df8;

    .van-icon,
    span.txt {
      color: #fff;
    }
  }
  // 标题
  .title {
    margin-bottom: 20px;
    h2 {
      font-size: 30px;
      font-weight: 500;
    }
  }
  // 作者信息
  .author {
    .author-content {
      display: flex;

      .author-icon {
        margin-right: 10px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }

      .author-detail {
        flex: 1;
      }
    }
  }
  // 点赞&不喜欢 按钮
  .article-like-btn {
    display: flex;
    justify-content: space-around;
  }
  // 文章内容
  // 发布评论
}
</style>
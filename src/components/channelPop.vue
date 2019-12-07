<template>
  <div class="channel-pop-container">
    <!-- 弹出层 -->
    <van-popup
      :value="value"
      @input="$emit('input',$event)"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '85%' }"
    >
      <!-- 我的频道 -->
      <div class="my-channel">
        <van-cell title="我的频道">
          <template slot="default">
            <van-button plain color="#f85d5d" round size="mini" v-if="!edit" @click="edit=!edit">编辑</van-button>
            <van-button plain color="#f85d5d" round size="mini" v-if="edit" @click="edit=!edit">完成</van-button>
          </template>
        </van-cell>
        <van-grid gutter="10px">
          <!-- 我的频道列表 -->
          <van-grid-item v-for="(item,index) in channelList" :key="index" class="my-grid-item">
            <template slot="text">
              {{ item.name }}
              <van-icon
                name="close"
                class="my-close"
                v-if="edit && index !== 0"
                @click="removeMyChannel(index)"
              />
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 频道推荐 -->
      <div class="recommend">
        <van-cell title="频道推荐" />
        <van-grid gutter="10px">
          <!-- 频道推荐列表 -->
          <van-grid-item
            :text="item.name"
            v-for="(item,index) in recommendChannelLIst"
            :key="index"
            @click="addMyChannel(item)"
          />
        </van-grid>
      </div>
    </van-popup>
  </div>
</template>

<script>
// 导入频道接口
import { channelApi } from "../api/channel.js";
// 导入 localData
import { localData } from "../utils/localData";

export default {
  name: "",
  props: ["value", "channelList"],
  data() {
    return {
      // 全部频道数据源
      channelAll: [],
      // 编辑按钮是否显示
      edit: false
    };
  },
  methods: {
    //  删除我的频道
    removeMyChannel(index) {
      this.channelList.splice(index, 1);
    },
    // 添加我的频道
    addMyChannel(item) {
      this.$set(item, "loading", false);
      this.$set(item, "finished", false);
      this.$set(item, "isLoading", false);
      this.$set(item, "articleList", []);
      this.$set(item, "timestamp", "");
      this.channelList.push(item);
    }
  },
  // 计算属性
  computed: {
    // 推荐频道列表
    recommendChannelLIst: function() {
      let ids = this.channelList.map(item => {
        return item.id;
      });
      let arrNew = this.channelAll.filter((item, index) => {
        return !ids.includes(item.id);
      });
      return arrNew;
    }
  },
  // 侦听器
  watch: {
    async channelList(newValue, oldValue) {
      let token = this.$store.state.userInfo.token;
      if (token) {
        let arrNew = newValue.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          };
        });
        // 把修改后的结果发送给服务器
        await channelApi.edit(arrNew);
      } else {
        localData.set("localChannel", newValue);
      }
    }
  },
  // created 钩子
  async created() {
    try {
      let res = await channelApi.all();
      this.channelAll = res.data.data.channels;
    } catch (error) {
      window.console.log(error);
    }
  }
};
</script>

<style lang="less" scoped>
// 容器
.channel-pop-container {
  // 我的频道
  .my-channel {
    margin-top: 44px;
    .my-grid-item {
      position: relative;
      // 关闭按钮
      .my-close {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
  // 频道推荐
  .recommend {
    margin-top: 30px;
  }

  // 宫格背景
  .van-grid-item {
    /deep/ .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        color: #222222;
      }
    }
  }
}
</style>
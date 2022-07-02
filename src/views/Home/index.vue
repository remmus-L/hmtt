<template>
  <div>
    <van-nav-bar fixed>
      <template #title>
        <van-button type="info" icon="search" class="search-btn" to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" animated>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <template #nav-right>
        <div class="menu" @click="isChannelPanelShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>
    <!-- v-model (value) 是否显示弹出层 -->
    <van-popup
      v-model="isChannelPanelShow"
      position="bottom"
      :style="{ height: '100%', paddingTop: '1.4rem' }"
      closeable
      close-icon-position="top-left"
    >
      <ChannelPanel
        :channels="channels"
        :active="active"
        @change-active="
          active = $event;
          isChannelPanelShow = false;
        "
        @del-event="active = $event"
      ></ChannelPanel>
    </van-popup>
  </div>
</template>

<script>
import ChannelPanel from './components/ChannelPanel.vue'
import ArticleList from '@/components/ArticleList.vue'
import { getMyChannels } from '@/api/home'
import { getItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'Home',
  created () {
    this.getMyChannels()
  },
  data () {
    return {
      active: 0,
      channels: [],
      isChannelPanelShow: false
    }
  },
  methods: {
    async getMyChannels () {
      // 匹配的是未登录并且本地存储中没有频道数据的情况
      const channels = getItem(CHANNELS)
      if (!(this.$store.state.user && this.$store.state.user.token) && channels) {
        this.channels = channels
      } else {
        try {
          const res = await getMyChannels()
          console.log('res', res)
          this.channels = res.data.data.channels
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  computed: {},
  watch: {
  },
  filters: {},
  components: { ArticleList, ChannelPanel }
}
</script>

<style scoped lang='less'>
.search-btn {
  width: 555px;
  height: 64px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 32px;
}
/deep/ .van-nav-bar__title {
  max-width: unset;
}
/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
/deep/ .van-tabs__line {
  width: 31px;
  height: 6px;
  background-color: #3296fa;
  border-radius: 3px;
}
.menu {
  min-width: 100px;
  height: 82px;
  // background-color:pink;
  background-color: rgba(255, 255, 255, 0.9);
  position: fixed;
  // 距离右边为0
  right: 0;
  text-align: center;
  line-height: 82px;
  .toutiao {
    font-size: 32px;
  }
}
// menu1没有脱离标准流  相当于占位
.menu1 {
  min-width: 100px;
  height: 82px;
  // background-color: pink;
  background-color: rgba(255, 255, 255, 0.9);
}
/deep/.van-tabs__wrap {
  position: fixed;
  width: 750px;
  top: 92px;
  z-index: 1;
  border-bottom: 1px solid #edeff3;
}
/deep/.van-pull-refresh {
  // 注意：-号两边要空格
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>

<template>
  <div class="container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem v-for="(item, index) in list" :key="index" :article="item">
        </ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
import ArticleItem from '@/components/ArticleItem'
export default {
  // 传过来的是打印的值
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () {
    this.getSearchResult()
  },
  data () {
    return {
      page: 1,
      per_page: 20,
      list: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async getSearchResult () {
      try {
        const res = await getSearchResult({ page: this.page, per_page: this.per_page, q: this.searchText })
        console.log(res)
        // this.list = res.data.data.results
        // 追加新的数据
        if (res.data.data.results.length === 0) {
          // 数据加载完了需要把finished变为true
          this.finished = true
          return
        }
        this.list.push(...res.data.data.results)
        // 数据更新完毕后，将 loading 设置成 false
        this.loading = false
        this.refreshing = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      // 每次到底部页码加一，请求下一页数据
      this.page++
      this.getSearchResult()
    },
    onRefresh () {
      this.list = []
      this.page = 1
      this.getSearchResult()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped lang='less'>
.container {
  overflow: auto;
  height: calc(100vh - 108px);
}
</style>

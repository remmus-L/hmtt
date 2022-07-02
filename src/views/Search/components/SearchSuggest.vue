<template>
  <div>
    <van-cell v-for="(item, index) in list" :key="index" icon="search" @click="$emit('search',item)">
      <template #title>
        <span v-html="highlight(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
// 响应式数据写在data中  非响应式的数据写在export default 上面
import { getSuggestList } from '@/api/search'
let timer = null
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () { },
  data () {
    return {
      list: []
    }
  },
  methods: {
    highlight (str) {
      const reg = new RegExp(this.searchText, 'g')
      return str.replace(reg, `<span style="color: red">${this.searchText}</span>`)
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler (newVal) {
        clearTimeout(timer)
        // async和await必须属于同一个函数
        timer = setTimeout(async () => {
          try {
            const res = await getSuggestList(newVal)
            console.log(res)
            this.list = res.data.data.options
          } catch (err) {
            console.log(err)
          }
        }, 900)
      },
      immediate: true
    }
  },
  // 当组件要被销毁时  把这些东西清理掉
  beforeDestroy () {
    clearTimeout(timer)
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>

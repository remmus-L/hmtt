<template>
<!-- 所有的评论 -->
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem
        v-for="item in commentList"
        :key="item.com_id"
        :item="item"
        @replay-show="$emit('replay-show', $event)"
      ></CommentItem>
      <!-- <van-cell v-for="(item, index) in commentList" :key="index">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d" slot="title">{{ item.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636">{{ item.content }}</p>
          <p>
            <span style="margin-right: 10px">{{
              item.pubdate | dateformat
            }}</span>
            <van-button size="mini" type="default">回复</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell>
      <van-cell v-for="item in list" :key="item" :title="item" /> -->
    </van-list>
  </div>
</template>

<script>
import { getCommentList } from '@/api/comment'
// 将ArticleComment的东西传到CommentItem中
import CommentItem from './CommentItem.vue'
export default {
  props: {
    type: {
      type: String,
      required: true,
      validator (value) {
        return ['a', 'c'].includes(value)
      }
    },
    source: {
      type: [String, Number],
      required: true
    },
    // 接受index.vue传过来的空数组
    commentList: {
      type: Array,
      required: true
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      paramsObj: {
        type: this.type,
        source: this.source,
        limit: 5,
        offset: null
      },
      // 数据提升 将自己原有的注释 将data变成props
      // commentList: [],
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList(this.paramsObj)
        console.log(res)
        // 若数据全部加载完毕，则直接将finished设置成true即可
        if (res.data.data.results.length === 0) {
          this.finished = true
        }
        // this.commentList = res.data.data.results
        // 将评论数量传出去
        this.$emit('set-count', res.data.data.total_count)
        this.commentList.push(...res.data.data.results)
        // 本次返回的最后一个评论id，作为请求下一页数据的offset参数，若本次无具体数据，则值为null
        this.paramsObj.offset = res.data.data.last_id
        this.loading = false// 每次当前页数据拿回来了，就关闭loading转圈效果
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.getCommentList()// 获取下一页数据
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { CommentItem }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>

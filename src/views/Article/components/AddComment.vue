<template>
  <div>
    <van-field
      v-model="message"
      rows="2"
      autosize
      label="留言"
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
      class="add-field"
      ref="field"
    >
      <template #extra>
        <van-button
          type="default"
          :disabled="message.length === 0"
          class="btn"
          @click="onClick"
          >发布</van-button
        >
      </template></van-field
    >
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  // 接收传过来的id值
  props: {
    target: {
      type: [Number, String],
      required: true
    },
    art_id: {
      type: [Number, String]
    }
  },
  created () { },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onClick () {
      try {
        const res = await addComment({
          target: this.target,
          content: this.message,
          art_id: this.art_id
        })
        console.log('评论内容', res)
        this.$emit('add-comment', res.data.data.new_obj)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
  // mounted  dom树已经准备好了   $el可以获得dom树
  mounted () {
    this.$refs.field.$el.querySelector('textarea').focus()
  }
}
</script>

<style scoped lang='less'>
.add-field {
  align-items: center;
  background-color: #eee;
  button {
    border: none;
  }
}
</style>

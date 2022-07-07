import request from '@/utils/request'
/**
 *
 * @param 获取评论或评论回复 get请求 type, source必传
 * 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
 * 源id，文章id或评论id
 * 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
 * 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
 * @returns
 */

export const getCommentList = ({ type, source, offset, limit }) => {
  return request({
    url: 'comments',
    params: {
      type, source, offset, limit
    }
  })
}
/**
 *
 * @param {对评论或评论回复点赞} target
 * @returns
 */
export const addLike = (target) => {
  return request({
    method: 'POST',
    url: 'comment/likings',
    data: {
      target
    }
  })
}
/**
 *
 * @param {要取消点赞的评论id或评论回复id} target
 * @returns
 */
export const delLike = (target) => {
  return request({
    method: 'DELETE',
    url: `comment/likings/${target}`
  })
}

/**
 *
 * @param {因为是可选参数  可以不用解构赋值} data
 * target 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
 * content 评论内容
 * art_id string 必须 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
 * @returns
 */
export const addComment = (data) => {
  return request({
    method: 'POST',
    url: 'comments',
    data
  })
}
// /comment/likings

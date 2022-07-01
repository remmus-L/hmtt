import request from '@/utils/request'
// 获取所有频道列表
export const getMyChannels = () => {
  return request({
    url: 'user/channels'
  })
}
// 获取文章列表
// eslint-disable-next-line camelcase
// 我们告诉后台我们需要channel_id, timestamp这两个数据
// eslint-disable-next-line camelcase
export const getArticleList = ({ channel_id, timestamp }) => {
  return request({
    url: 'articles',
    params: { channel_id, timestamp }
  })
}

// 获取所有的列表 不传参的话就不用写 params
export const getAllArticleList = () => {
  return request({
    url: 'channels'
  })
}

export const saveChannels = (channels) => {
  return request({
    url: 'user/channels',
    method: 'PUT',
    data: { channels }
  })
}

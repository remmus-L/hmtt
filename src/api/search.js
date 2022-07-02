import request from '@/utils/request'
export const getSuggestList = q => {
  return request({
    url: 'suggestion',
    params: {
      q
    }
  })
}

// export const getSuggestList = (q) => {
// q为参数  一个参数可以不加括号
//   return request({
//     url: 'suggestion',
//     params: {
//       q
//     }
//   })
// }

// eslint-disable-next-line camelcase
export const getSearchResult = ({ page = 1, per_page, q }) => {
  return request({
    url: 'search',
    params: { page, per_page, q }
  })
}

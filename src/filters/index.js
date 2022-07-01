import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
// 这个文件里面就是我们需要的过滤器 dateformat过滤事件的名字   time是我们需要处理的东西
export const dateformat = (time) => {
  return dayjs(time).fromNow()
}

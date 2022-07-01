import request from '@/utils/request'
// import store from '@/store'
// 返回值是个promise
// mobile是传的参数
export const getSmsCode = (mobile) => {
  return request({
    url: `/sms/codes/${mobile}`
  })
}

// @param{mobile, code} param0
// @return promise
// 花括号是解构赋值 把对象直接解构
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code
    }
  })
}

// 获取用户个人资料
export const getUserInfo = () => {
  return request({
    url: 'user'
  })
}

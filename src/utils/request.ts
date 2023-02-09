import axios, { type Method } from 'axios'
import { useUserStore } from '@/stores'
import router from '@/router'
import { Toast } from 'vant'

const baseURL = 'https://consult-api.itheima.net/'
const instance = axios.create({
  baseURL,
  timeout: 10000
})

instance.interceptors.request.use(
  (config) => {
    // 统一携带token
    const store = useUserStore()
    if (store.user?.token && config.headers) {
      config.headers['Authorization'] = `Bearer ${store.user.token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    //与后台约定,响应成功,但是code不是10000,业务逻辑失败
    if (res.data?.code !== 10000) {
      Toast(res.data?.message || '业务失败')
      return Promise.reject(res.data)
    }

    //业务逻辑成功,返回响应数据,作为axios成功的结果
    return res.data
  },
  (err) => {
    if (err.response.status === 401) {
      //删除用户信息
      const store = useUserStore()
      store.delUser()
      //跳转登录,带上接口失效的地址,登录完成后回跳使用
      router.push({
        path: '/login',
        query: { returnUrl: router.currentRoute.value.fullPath }
      })
    }
    return Promise.reject(err)
  }
)

type Data<T> = {
  code: number
  message: string
  data: T
}

// 请求工具函数
const request = <T>(
  url: string,
  method: Method = 'GET',
  submitData?: object
) => {
  return instance.request<T, Data<T>>({
    url,
    method,
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData
  })
}

export { request, baseURL, instance }

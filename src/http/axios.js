import axios from 'axios'
import qs from 'qs'

// 配置基路径
axios.defaults.baseURL = 'http://39.96.21.48:5588'

// 响应拦截(对于响应信息做一些处理)
axios.interceptors.response.use(function(response){
    const {data} = response
    response.data = data.data
    response.status = data.status
    response.statusText = data.message
    // 统一异常处理
    if(data.status !== 200){
        return Promise.reject(data.message)
    }
    return response
},function(error){
    return Promise.reject(error)
})

// get请求
export function get(url, params) {
  return axios({
    method: 'get',
    url,
    params,
    timeout: 10000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
}

// post方法 发送的数据格式为json字符串 -->  登录
export function post_json(url, data) {
  return axios({
    method: 'post',
    url,
    data,
    timeout: 10000
  })
}

//post方法 发送的数据格式为查询字符串(键值对) key1=value1&key2=value2
export function post(url, data) {
  return axios({
    method: 'post',
    url,
    data:qs.stringify(data),
    timeout: 10000,
    headers:{
        'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
    }
  })
}




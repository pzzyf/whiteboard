import axios from 'axios'

// 创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_API,
  timeout: 10000, // 请求超时时间
})

// 导出axios实例，用于更复杂的请求
export default request

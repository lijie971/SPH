//对于axios进行二次封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'

//利用axios对象的方法create,去创建一个axios实例
//requests就是axios,只不过我们稍微配置一下
const requests = axios.create({
    //配置对象
    //基础路径，发请求的时候，路径上都带有api就不需要自己一个一个加了
    baseURL: "/mock",
    // 代表请求超时的时间
    timeout: 5000,
})
//请求拦截器:在发请求之前，请求拦截器可以检测到,可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
    //config是配置对象,里面有个属性很重要,header请求头

    //进度条开始动
    //start:进度条开始  done:进度条结束
    nprogress.start();

    return config
})
//响应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调函数:服务器相应数据拿回来以后,响应拦截器可以检测到,可以做一些事情

    //进度条结束
    //start:进度条开始  done:进度条结束
    nprogress.done()

    return res.data
}, (error) => {
  //失败的回调函数
  return Promise.reject(new Error('faile'));
})


export default requests



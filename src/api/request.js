// 对于axios二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// nprogress的start方法：表示进度条开始     done方法：进度条结束

// 引入进度条样式
import 'nprogress/nprogress.css'

// 引入store
import store from '../store'


// 1.利用axios对象的方法:create  创建一个axios实例
const requests = axios.create({
	
	// 基础路径 发请求的时候 路径当中会出现api
	baseURL:'/api',
	
	//代表请求超时时的时间5s
	timeout:5000,
});

// 请求拦截器 在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
	
	if(store.state.detail.uuid_token){
		// 给请求头添加一个字段（userTempId）不能瞎写
		config.headers.userTempId = store.state.detail.uuid_token
	}
	
	if(store.state.user.token){
		// 给请求头添加一个字段（token）不能瞎写
		config.headers.token =store.state.user.token
	}
	
	// 进度条开始动
	nprogress.start()
	// config:配置对象  对象中有个属性很重要，headers请求头
	return config
	
})

// 响应拦截器
requests.interceptors.response.use(
	(res)=>{
		// 进度条结束
		nprogress.done()
		
		// 服务器成功的回调函数，服务器响应数据回来后，响应拦截器可以检测到，可以做一些事情
		return res.data
	} ,
	(error)=>{
		// 服务器响应失败的回调函数
		return Promise.reject(new Error('false'))
	} 
)

export default requests;
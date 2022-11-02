import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLoginout} from '@/api'

import {setToken,getToken,removeToken} from '../utils/token'

// 登录注册模块的小仓库
const state = {
	code:'',
	token:getToken(),
	userInfo:{}
}

const mutations = {
	GETCODE(state,code){
		state.code = code
	},
	USERLOGIN(state,token){
		state.token = token
	},
	GETUSERINFO(state,userInfo){
		state.userInfo = userInfo
	},
	CLEAR(state){
		state.token = ''
		state.userInfo = {}
		removeToken()
		
	}
}

const actions = {
	// 获取验证码
	async getCode({commit},phone){
		let result =  await reqGetCode(phone)
		if(result.code == 200){
			commit("GETCODE",result.data)
			return "ok"
		}else{
			return Promise.reject(new Error('faile'))
		}
	},
	
	// 用户注册
	async userRegister({commit},user){
		let result =  await reqUserRegister(user)
		if(result.code == 200){
			return "ok"
		}else{
			return Promise.reject(new Error('faile'))
		}
	},
	
	// 用户登录【token】
	async userLogin({commit},data){
		let result = await reqUserLogin(data)
		if(result.code == 200){
			commit('USERLOGIN',result.data.token)
			// 持久化存储token
			setToken(result.data.token)
			return "ok"
		}else{
			return Promise.reject(new Error('faile'))
		}
	},
	
	// 获取用户信息
	async getUserInfo({commit}){
		let result = await reqUserInfo()
		if(result.code == 200){
			// 提交用户信息存储到state
			commit('GETUSERINFO',result.data)
			return "ok"
		}else{
			return Promise.reject(new Error('faile'))
		}
	},
	
	// 退出登录
	async userLoginout({commit}){
		let result = await reqLoginout()
		if(result.code == 200){
			commit('CLEAR')
		return "ok"
		}else{
			return Promise.reject(new Error('faile'))
		}
	}
	
	
}

const getters = {
	
}

export default({
	state,
	mutations,
	actions,
	getters
})
import {reqGetSearchInfo} from '@/api'
// search模块的小仓库
const state = {
	searchList:{}
}

const mutations = {
	GETSEARCHLIST(state,searchList){
		state.searchList = searchList
	},
}

const actions = {
	// 获取search模块的数据
	async getSearchList(context,params={}){
		let result = await reqGetSearchInfo(params)
		if(result.code==200){
			context.commit('GETSEARCHLIST',result.data)
		}
	},
}

const getters = {
	// 当前形参state 是当前仓库中的state 并非大仓库的那个state
	goodsList(state){
		// 如果服务器的数据回来了 没问题是一个数组
		// 假如网络不给力或者没有网会返回undefined 组件拿到的是undefined[0] 会报错 所以要加空数组
		return state.searchList.goodsList || []
	},
	trademarkList(state){
		return state.searchList.trademarkList || []
	},
	attrsList(state){
		return state.searchList.attrsList || []
	},
}

export default({
	state,
	mutations,
	actions,
	getters
})
import {reqCategoryList,reqGetBannerList,reqFloorList} from '@/api'
// home模块的小仓库
const state = {
	// home仓库中存储三级菜单的数据
	categoryList:[],
	// 轮播图的数据
	bannerList:[],
	// floor的数据
	floorList:[]
}
const mutations = {
	CATEGORYLIST(state,categoryList){
		state.categoryList = categoryList
	},
	GETBANNERLIST(state,bannerList){
		state.bannerList = bannerList
	},
	GETFLOORLIST(state,floorList){
		state.floorList = floorList
	}
}
const actions = {
	// 通过api里面的接口函数调用，向服务器发请求，获取服务器的数据
	async categoryList(context){
		let result =await reqCategoryList();
		if(result.code== 200){
			context.commit("CATEGORYLIST",result.data)
		}
	},
	// 获取首页轮播图的数据
	async getBannerList(context){
		let result = await reqGetBannerList()
		if(result.code == 200){
			context.commit("GETBANNERLIST",result.data)
		}
	},
	// 获取floor数据
	async getFloorList(context){
		let result = await reqFloorList()
		// console.log(result)
		if(result.code == 200){
			context.commit("GETFLOORLIST",result.data)
		}
	},
	
	
}
const getters = {}

export default({
	state,
	mutations,
	actions,
	getters
})
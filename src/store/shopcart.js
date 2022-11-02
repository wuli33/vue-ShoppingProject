import {reqCartList,reqDeleteById,reqUpdateCheckedById} from '@/api'

const state = {
	carList:[]
}
const mutations = {
	GETCARTLIST(state,carList){
		state.carList =carList
	}
}
const actions = {
	// 获取购物车列表数据
	async getCartList({commit}){
		let result = await reqCartList()
		if(result.code == 200){
			commit("GETCARTLIST",result.data)
		}
	},
	
	// 删除购物车某一个产品
	async deleteCartListById({commit},skuId){
		let result = await reqDeleteById(skuId)
		if(result.code == 200){
			return 'ok'
		}else{
			// 代表删除失败
			return Promise.reject(new Error('Faile'))
		}
	},
	
	// 切换商品选中状态
	async updateCheckedById({commit},{skuId,isChecked}){
		let result = await reqUpdateCheckedById(skuId,isChecked)
		if(result.code == 200){
			return 'ok'
		}else{
			// 代表修改失败
			return Promise.reject(new Error('Faile'))
		}
	},
	
	// 删除全部勾选的产品
	deleteAllCheckedCart({dispatch,getters}){
		// getters.carList.cartInfoList  购物车的数据(数组)
		let PromiseAll = []
		getters.carList.cartInfoList.forEach(item=>{
			
			let promise =  item.isChecked == 1?dispatch('deleteCartListById',item.skuId):''
			PromiseAll.push(promise)
		})
		return Promise.all(PromiseAll)	
	},
	
	// 修改全部产品的状态
	updateAllCartIsChecked({dispatch,state},isChecked){
		let PromiseAll = []
		state.carList[0].cartInfoList.forEach(item=>{
			let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked}) 
		})
		return Promise.all(PromiseAll)	
	}
}
const getters = {
	carList(state){
		return state.carList[0] || {}
	},
	
}

export default({
	state,
	mutations,
	actions,
	getters
})
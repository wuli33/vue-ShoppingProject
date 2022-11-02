import Vue from 'vue'
import Vuex from 'vuex'

// 需要使用对象
Vue.use(Vuex)

// 引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'

// 对外暴露Store类的一个实例
export default new Vuex.Store({
modules:{
	home,
	search,
	detail,
	shopcart,
	user,
	trade
}
})


//state：仓库存储数据的地方
// mutations：修改state的唯一手段
// actions：处理actions 可以书写自己的业务逻辑 也可以处理异步
// getters：理解为计算属性，用于简化仓库数据，让组件获取仓库更加方便
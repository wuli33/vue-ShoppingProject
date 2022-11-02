// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

// 引入store
import store from '@/store'

// 使用插件
Vue.use(VueRouter)


// 配置路由
let router = new VueRouter({
	routes,
	scrollBehavior(to, from, savePosition) {
		// 滚动条回到最上方
		return {
			y: 0
		}
	}

})

// 全局守卫 前置守卫 
router.beforeEach(async (to, from, next) => {
	// next()
	let token = store.state.user.token
	let name = store.state.user.userInfo.name
	// 用户已登录
	if (token) {
		// 用户已登录还想跳转到登录页面  不给跳转
		if (to.path == '/login'||to.path == '/register') {
			next('/')
		// 用户已登录跳转到登录以外的界面
		} 
		else {
			// 登录了（但不是去登录页面） 判断有没有用户名 如果有就放行
			if(name){
				next()
			// 如果没有用户信息就要派发action让仓库存储用户信息再跳转
			}
			else{
				try{
					await store.dispatch('getUserInfo')
					next()
				}catch(e){
					//TODO handle the exception
					// token失效了  需要清除用户信息
					store.dispatch('userLoginout')
					next('/login')
				}
			}
		}
	}
	// 用户未登录
	else{
		// 不能去支付相关的 pay paysuccess 不能去个人中心
		let toPath = to.path
		if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
			next('/login?redirect='+toPath)
		}else{
			next()
		}
		
	}
})


export default router

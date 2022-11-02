import Vue from 'vue'
import App from './App.vue'

// 三级联动组件---全局组件
import TypeNav from './components/TypeNav'
Vue.component(TypeNav.name, TypeNav)

import Pagination from './components/Pagination'
Vue.component(Pagination.name,Pagination)

// 按需引入饿了么
import { Button,MessageBox} from 'element-ui';
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入路由
import router from './router'

// 引入仓库
import store from './store'

// 引入mockjs
import '@/mock/mockServe'

// 引入swiper样式
import 'swiper/css/swiper.css'

// 引入所有api
import * as API from '@/api'

// 引入图片
import gif1 from '@/assets/1.gif'

// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
	// 懒加载默认图片
	loading:gif1
})


// 引入自定义插件
import myPlugins from '@/plugins/myPlugins'
Vue.use(myPlugins,{name:'123测试'})


// 引入表单校验插件
import '@/plugins/validate'

Vue.config.productionTip = false

new Vue({
	render: h => h(App),
	// 全局事件总线配置
	beforeCreate() {
		Vue.prototype.$bus = this
		Vue.prototype.$API = API
	},
	// 注册路由
	router,
	// 注册仓库
	store,
}).$mount('#app')

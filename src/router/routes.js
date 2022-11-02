/* 
如果我们能把不同路由对应的组件分割成不同的代码块，
然后当路由被访问的时候才加载对应组件，
这样就会更加高效。 
*/

// 引入路由组件
/* import Search from '../pages/Search'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Detail from '../pages/Detail'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '../pages/ShopCart'
import Trade from '../pages/Trade'
import Pay from '../pages/Pay'
import PaySuccess from '../pages/PaySuccess'
import Center from '../pages/Center' */

// 引入二级路由
import myOrder from '../pages/Center/myOrder'
import groupOrder from '../pages/Center/groupOrder'
export default
[	
	{
		path: "/center",
		component: ()=>import('../pages/Center'),
		meta: {
			show: true
		},
		children:[
			{
				path: "myorder",
				component: myOrder,
				
			},
			{
				path: "grouporder",
				component: groupOrder,
				
			},
			{
				path:'/center',
				redirect:'/center/myorder',
			}
		]
	},
	{
		path: "/paysuccess",
		component: ()=>import('../pages/PaySuccess'),
		meta: {
			show: true
		},
		/* beforeEnter:(to,from,next)=>{
			if(from.path == '/pay'){
				next()
			}else{
				next(false)//中断当前的路由
			}
		} */
	},
	{
		path: "/pay",
		component: ()=>import('../pages/Pay'),
		meta: {
			show: true
		},
		beforeEnter:(to,from,next)=>{
			if(from.path == '/trade'){
				next()
			}else{
				next(false)//中断当前的路由
			}
		}
	},
	{
		path: "/trade",
		component: ()=>import('../pages/Trade'),
		meta: {
			show: true
		},
		// 路由独享守卫
		beforeEnter:(to,from,next)=>{
			if(from.path == '/shopcart'){
				next()
			}else{
				next(false)//中断当前的路由
			}
		}
	},
	{
		path: "/shopcart",
		component: ()=>import('../pages/ShopCart'),
		meta: {
			show: true
		}
	},
	{
		name:'addcartsuccess',
		path: "/addcartsuccess",
		component: ()=>import('../pages/AddCartSuccess'),
		meta: {
			show: true
		}
	},
	{
		path: "/detail/:skuId",
		component: ()=>import('../pages/Detail'),
		meta: {
			show: true
		}
	},
	{
		path: "/home",
		component: ()=>import('../pages/Home'),
		meta: {
			show: true
		}
	},
	{
		name: "search",
		// 配置路由时，在占位的后面加上一个问号，表示params参数可以传可以不传
		path: "/search/:keyword?",
		component: ()=>import('../pages/Search'),
		meta: {
			show: true
		}
	},
	{
		path: "/login",
		component: ()=>import('../pages/Login'),
		meta: {
			show: false
		}
	},
	{
		path: "/register",
		component: ()=>import('../pages/Register'),
		meta: {
			show: false
		}

	},
	// 重定向 当项目跑起来的时候 访问/，立刻让他定向到首页
	{
		path: '*',
		redirect: "/home"
	}
]

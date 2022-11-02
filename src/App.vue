<template>
	<div>
		<Header></Header>
		
		<!-- 路由组件 -->
		<router-view></router-view>
		
		<!-- 在Home Search 上显示 -->
		<Footer v-show="$route.meta.show"></Footer>
	</div>
</template>

<script>
	import Header from './components/Header'
	import Footer from './components/Footer'
	
	export default {
		name: 'App',
		components: {
			Header,
			Footer
		},
		mounted() {
			// console.log("app的$store",this.$store);
			// 派发action 获取商品分类的三级列表的数据   通知Vuex发请求，获取数据，存储于仓库中
			this.$store.dispatch('categoryList')
		}

	}
</script>

<style>

</style>

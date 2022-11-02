<template>
	<div class="type-nav">
		<div class="container">

			<!-- 事件委托给父元素 -->
			<div @mouseleave="leaveShow" @mouseenter="enterShow">
				<h2 class="all">全部商品分类</h2>

				<transition name="sort">
					<!-- 三级联动 -->
					<div class="sort" v-show="show">
						<!-- 事件委托给父元素 -->
						<div class="all-sort-list2" @click="goSearch">
							<!-- 一级分类 -->
							<div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId"
								:class="{cur:currentIndex==index}">
								<h3 @mouseenter="changeIndex(index)">
									<a :data-categoryName="c1.categoryName"
										:data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
									<!-- router-link是一个组件 当服务器的数据返回之后，循环出很多router-link组件（创建组件实例）
									创建组件实例的时候，一瞬间创建很多，导致很耗内存，因此出现卡顿现象 -->
									<!-- <router-link to="/search">{{c1.categoryName}}</router-link> -->
								</h3>
								<!-- 二级、三级分类 -->
								<div class="item-list clearfix" :style="{display:currentIndex == index?'block':'none'}">
									<div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
										<dl class="fore">
											<dt>
												<a :data-categoryName="c2.categoryName"
													:data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
												<!-- <router-link to="/search">{{c2.categoryName}}</router-link> -->
											</dt>
					   			<dd>
												<em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
													<a :data-categoryName="c3.categoryName"
														:data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
													<!-- <router-link to="/search">{{c3.categoryName}}</router-link> -->
												</em>

											</dd>
										</dl>
									</div>

								</div>
							</div>
						</div>
					</div>

				</transition>
			</div>

			<nav class="nav">
				<a href="###">服装城</a>
				<a href="###">美妆馆</a>
				<a href="###">尚品汇超市</a>
				<a href="###">全球购</a>
				<a href="###">闪购</a>
				<a href="###">团购</a>
				<a href="###">有趣</a>
				<a href="###">秒杀</a>
			</nav>

		</div>
	</div>

</template>

<script>
	// 这种引入的方式是把lodash全部功能函数引入
	// import _ from 'lodash'
	// 最好的引入方式：按需引入
	import throttle from 'lodash/throttle'

	import {
		mapState
	} from 'vuex'
	export default {
		name: 'TypeNav',
		data() {
			return {
				currentIndex: -1,
				show: true
			}
		},
		// 组件挂载完毕，可以向服务器发请求
		mounted() {
			
			if (this.$route.path != '/home') {
				this.show = false
			}
		},

		methods: {
			// 鼠标进入修改响应式数据currentIndex属性
			/* changeIndex(index) {
				this.currentIndex = index
			}, */
			// throttle回调函数别用箭头函数，可能会出现上下文this
			changeIndex: throttle(function(index) {
				this.currentIndex = index
			}, 50),

			// 进行路由跳转的方式
			goSearch(event) {
				// this.$router.push('/search')
				// 最好的解决方法：编程式导航 + 事件委派
				// 利用事件委派的一些问题：1.如何确定点击的是a标签 2.传递参数

				// 节点有一个属性dataset属性，可以获取节点的自定义属性与属性值
				let {
					categoryname,
					category1id,
					category2id,
					category3id
				} = event.target.dataset
				if (categoryname) {
					let location = {
						name: 'search'
					}
					let query = {
						categoryName: categoryname
					}
					if (category1id) {
						query.category1Id = category1id

					} else if (category2id) {
						query.category2Id = category2id
					} else {
						query.category3Id = category3id
					}
					if(this.$route.params){
						location.params = this.$route.params
						location.query = query
						this.$router.push(location)
					}
				}
			},

			// 当鼠标移入的时候，让商品分类列表进行展示
			enterShow() {
				if (this.$route.path != '/home') {
					this.show = true
				}
			},
			leaveShow() {
				this.currentIndex = -1
				if (this.$route.path != '/home') {
					this.show = false
				}
			}
		},


		computed: {
			...mapState({
				// 右侧需要一个函数，当时用这一个计算属性时候右侧函数会立即执行一次
				// 注入的一个参数state 其实为大仓库中的数据
				categoryList: (state) => {
					return state.home.categoryList
				}
			})
		},
	}
</script>

<style lang="less" scoped>
	.type-nav {
		border-bottom: 2px solid #e1251b;

		.container {
			width: 1200px;
			margin: 0 auto;
			display: flex;
			position: relative;

			.all {
				width: 210px;
				height: 45px;
				background-color: #e1251b;
				line-height: 45px;
				text-align: center;
				color: #fff;
				font-size: 14px;
				font-weight: bold;
			}

			.nav {
				a {
					height: 45px;
					margin: 0 22px;
					line-height: 45px;
					font-size: 16px;
					color: #333;
				}
			}

			.sort {
				position: absolute;
				left: 0;
				top: 45px;
				width: 210px;
				height: 461px;
				position: absolute;
				background: #fafafa;
				z-index: 999;

				.all-sort-list2 {
					.item {
						h3 {
							// line-height: 30px;
							line-height: 27px;
							font-size: 14px;
							font-weight: 400;
							overflow: hidden;
							padding: 0 20px;
							margin: 0;

							a {
								color: #333;
								
							}
						}

						.item-list {
							display: none;
							position: absolute;
							width: 734px;
							min-height: 460px;
							background: #f7f7f7;
							left: 210px;
							border: 1px solid #ddd;
							top: 0;
							z-index: 9999 !important;

							.subitem {
								float: left;
								width: 650px;
								padding: 0 4px 0 8px;

								dl {
									border-top: 1px solid #eee;
									padding: 6px 0;
									overflow: hidden;
									zoom: 1;

									&.fore {
										border-top: 0;
									}

									dt {
										float: left;
										width: 54px;
										line-height: 22px;
										text-align: right;
										padding: 3px 6px 0 0;
										font-weight: 700;
									}

									dd {
										float: left;
										width: 415px;
										padding: 3px 0 0;
										overflow: hidden;

										em {
											float: left;
											height: 14px;
											line-height: 14px;
											padding: 0 8px;
											margin-top: 5px;
											border-left: 1px solid #ccc;
										}
									}
								}
							}
						}

						/* &:hover {
	                        .item-list {
	                            display: block;
	                        }
	                    } */
					}

					.cur {
						background-color: skyblue;
					}
				}
			}
		
			// 过渡动画的样式
			// 过渡动画的开始状态(进入)
			.sort-enter{
				height: 0px;
			}
			// 过渡动画的结束状态(进入)
			.sort-enter-to{
				height: 461px;
			}
			// 定义动画的时间、速率
			.sort-enter-active{
				transition: all .5s linear;
			}
		}
	}
</style>

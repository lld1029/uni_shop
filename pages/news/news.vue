<template>
	<view class="cates">
		<search-input></search-input>
		
		<!-- 商品分类 -->
		<view class="cates_contents">
			<!-- 左侧菜单 -->
			<scroll-view scroll-y='true' class="left_menu" :scroll-into-view="leftId" scroll-with-animation >
				<view :id="'left'+index" :class="index == currentIndex ? 'active left_list' : 'left_list'"
					v-for="(item,index) in leftContents" @click="leftMenu(index, item,$event)" :data-myid="index">
					{{item}}
				</view>
			</scroll-view>

			<!-- 右侧菜单 -->
			<scroll-view scroll-y='true' class="right_menu" :scroll-into-view="rightId" :scroll-top='scrollTop'>
				<view class="right_list" v-for="(item,index) in rightContents" :id="'right'+index" :data-myid="index">
					<view class="titles">
						/{{item.cat_name}}/
					</view>
					<view class="goodsinfo">
						<navigator open-type="navigate" v-for="list in item.children" :url="'../goods_list/goods_list?cid='+list.cat_id">
							<image :src="list.cat_icon" mode="widthFix"></image>
							<view class="goodsname">
								{{list.cat_name}}
							</view>
						</navigator>
					</view>
				</view>
			</scroll-view>
			
		</view>
		<!-- 商品分类 -->
		
	</view>
</template>

<script>
	import SearchInput from '../../components/SearchInput.vue'
	export default {
		components: {
			SearchInput
		},
		data() {
			return {
				//接口总数据
				CateList: [],
				//左侧数据
				leftContents: [],
				//右侧数据
				rightContents: [],
				currentIndex: 0,
				//id
				leftId: 'left0',
				rightId: 'right0',
				//每次刷新距离顶部距离
				scrollTop:0,

			}
		},
		methods: {
			//请求分类数据
			getCates(){
				this.$Request({
					url: 'categories',
				}).then(res => {
					//总数据
					this.CateList = res.data.message
					
					//把数据存入本地存储
					uni.setStorageSync('cates',{time:Date.now(),data:this.CateList})
					
					//左侧菜单数据
					let leftMenuList = this.CateList.map(item => {
						return item.cat_name
					})
					
					//渲染菜单数据  默认渲染第一个
					this.rightContents = this.CateList[0].children
					this.leftContents = leftMenuList
				
				})
			},
			//左侧点击事件
			leftMenu(index, item, e) {
				//左侧小圆点
				this.currentIndex = index
				//渲染 右侧 数据 点击哪一个index就渲染哪一个index的数据
				this.rightContents = this.CateList[index].children
				this.scrollTop = 0 
			},
			

		},
		onLoad() {
			//请求分类数据
			// this.getCates()
			//组件一加载把数据缓存到本地
			//1.先判断本地时候有旧数据 
			//2.没有旧数据就重新发送请求
			//3.有旧数据 同时旧数据也没过期 就是用本地旧数据即可
			//4.存入的数据是时间戳{time:data.now(),data:[....]}
			
			const Cates = uni.getStorageSync('cates')
			//本地没有就重新调用数据
			if(!Cates){
				this.getCates()
			}
			//如果有则判断有没有过期
			else{
				//当前的时间减去存入的时间 如果超过10秒 就重新调用
				if(Date.now() - Cates.time > 5000 *10){
					this.getCates()
				}
				//以上都没 则说明可以用本地的数据
				else{
					
					//组件的总数据 = 存入在本地的的数据
					this.CateList = Cates.data;
					console.log(Cates.data)
					//用本地的数据渲染页面
					let leftMenuList = this.CateList.map(item => {
						return item.cat_name
					})
					
					this.rightContents = this.CateList[0].children
					this.leftContents = leftMenuList
					
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.cates {
		height: 100%;
	}

	.cates_contents {
		width: 100vw;
		height: calc(100vh - (44px + 45px));
		display: flex;

		.left_menu {
			flex: 2;

			.left_list {
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				position: relative;


			}

			.active {
				color: red;
				background: #C0C0C0;
			}


		}


		.right_menu {
			flex: 5;


			.right_list {
				.titles {
					width: 100%;
					text-align: center;
					height: 90rpx;
					line-height: 90rpx;
					color: #C0C0C0;
					letter-spacing: 5px;
				}

				.goodsinfo {
					display: flex;
					flex-wrap: wrap;
					justify-content: flex-start;
					align-items: center;
					text-align: center;

					navigator {
						box-sizing: border-box;
						width: 33.33%;

						image {
							width: 100%;
						}

						padding: 10px;

						.goodsname {}
					}

				}
			}
		}

	}
</style>

<template>
	<view>
		<!-- 搜索框 -->
		<SearchInput></SearchInput>

		<!-- 轮播图 -->
		<my-swiper></my-swiper>

		<!-- 导航区域 -->
		<my-nav></my-nav>

		<!-- 推荐商品 -->
		<view class="hot_goods">
			<view class="title">
				推荐商品
			</view>
		</view>

		<!-- 楼层 -->
		<my-floor></my-floor>
		
	</view>
</template>

<script>
	import MySwiper from '../../components/MySwiper.vue'
	import MyNav from '../../components/MyNav.vue'
	import SearchInput from '../../components/SearchInput.vue'
	import MyFloor from '../../components/MyFloor.vue'

	export default {
		// 组件
		components: {
			MySwiper,
			MyNav,
			SearchInput,
			MyFloor,
		},
		data() {
			return {
				

			}
		},
		onLoad() {
			
		},
		methods: {

		},
		onReady() {

		}
	}
</script>

<style lang="scss">
	.hot_goods {
		background: #eee;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		padding: 3px 0;

		.title {
			font-size: 35rpx;
			color: #ff0000;
			background: #fff;
			letter-spacing: 40rpx;

		}

	}

	
</style>

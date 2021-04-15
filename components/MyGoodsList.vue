<template>
	<view>
		<view class="goods_list">
			<navigator class="goods_box" v-for="(item,index) in goodsList" :key='item.goods_id' :url="'/pages/goods_detail/goods_detail?goods_id='+item.goods_id">
				<image :src="item.goods_small_logo ?item.goods_small_logo :'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.baike.soso.com%2Fp%2F20140611%2F20140611145529-1600143101.jpg&refer=http%3A%2F%2Fpic.baike.soso.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620644831&t=9c1cda609d6e2f22d6cd15fdb4930148' " mode="widthFix"></image>
				<view class="goods_info">
					<view class="goods_title">
						{{item.goods_name}}
					</view>
					<view class="goods_price">
						{{item.goods_price | filPrice}}
					</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['goodsList'],
		name: "MyGoodsList",
		data() {
			return {

			};
		},
		created() {
			
				
		},
		mounted() {
			
			
		},
		
	}
</script>

<style scoped lang="scss">
	.goods_list {
		width: 100vw;
		padding: 10rpx;

		.goods_box {
			display: flex;
			width: 100vw;
			box-shadow: 0 0 10rpx rgba(0, 0, 0, .3);
			overflow: hidden;
			margin-bottom: 20rpx;

			.goods_info {
				flex: 70%;
				display: flex;
				flex-wrap: wrap;
				align-items: center;

				.goods_title {

					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;

				}

				.goods_price {
					color: red;
					
				}
			}

			image {
				flex: 30%;
				display: block;
				width: 100%;
				margin-right: 10rpx;
			}
		}
	}
</style>

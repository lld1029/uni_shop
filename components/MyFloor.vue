<template>
	<view>
		<!-- 楼层效果 -->
		<view class="index_floor">
			<view class="floor_group" v-for="item in productList" :key='item.floor_title.name'>
				<!-- 标题 -->
				<view class="floor_title">
					<image :src="item.floor_title.image_src" mode="widthFix"></image>
				</view>
				<!-- 内容 -->
				<navigator class="floor_list" v-for="(list,index) in item.product_list" :key='list.name'>
					<image :src="list.image_src" :mode="index === 0 ? 'widthFix' : 'scaleToFill'"></image>
				</navigator>
			</view>
		
		</view>
		<!-- 楼层效果 -->
	</view>
</template>

<script>
	export default {
		name:"MyFloor",
		data() {
			return {
				// 楼层
				productList: [],
			};
		},
		created() {
			this.$Request({
				url: 'home/floordata',
			
			}).then((res) => {
				// console.log(res)
				this.productList = res.data.message
			
				console.log(this.productList)
			})
		}
	}
</script>

<style lang="scss">


	.index_floor {
		.floor_group {
			overflow: hidden;
			padding: 5rpx;
			.floor_title {

				image {
					width: 100%;
				}
			}
			
			.floor_list {
				float: left;
				width: 33.33%;
				box-sizing: border-box;
				&:nth-last-child(-n+4) {
					height: calc(33.33vw * 386/232/2);
					padding: 0 0 5rpx 10rpx;
				}
				
				
				image {
					height: 100%;
					width: 100%;
				}


			}
		}
	}
</style>
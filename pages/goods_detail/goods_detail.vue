 <template>
	<view>
		<!-- 轮播图 -->
		<swiper class="swiper" indicator-dots="true" circular='true'>
			<swiper-item v-for="item in goodsBanner" :key='item.pics_id' @click="swiperClick(item.pics_big)">
				<image :src="item.pics_big" mode="widthFix"></image>
			</swiper-item>
		</swiper>

		<!-- 商品详情 -->
		<view class="goods_info">
			<view class="price">
				{{goodsDetail.goods_price | filPrice}}
			</view>
			<view class="title">
				<view class="left">
					{{goodsDetail.goods_name}}
				</view>
				<view class="start">
					收藏
				</view>
			</view>
		</view>

		<!-- 图文详情 -->

		<view class="pictext_detail">
			<text>图文详情</text>
		</view>


		<!-- 商品详情 -->
		<view v-html="goodsDetail.goods_introduce">

		</view>

		<!-- 商品导航 -->
		<view class="btn_tools">
			<view class="tool_item">
				<view>
					客服
				</view>
				<button open-type='contact'>1</button>
			</view>
			<view class="tool_item ">
				<view>
					分享
				</view>
				<button open-type='share'>1</button>
			</view>
			<navigator class="tool_item" url="/pages/cart/cart" open-type="switchTab">
				<view>
					购物车
				</view>
			</navigator>
			<view class="tool_item btn-cart" @click="CartClick">
				<view>
					加入购物车
				</view>
			</view>
			<view class="tool_item btn_buy">
				<view>
					立即购买
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				goodsDetail: [],
				goodsBanner: [],
				isStart: false,
			}
		},
		methods: {
			getGoodsDetail(option) {
				this.$Request({
					url: 'goods/detail',
					data: {
						goods_id: option.goods_id
					}
				}).then((res) => {

					let {
						message
					} = res.data

					this.goodsDetail = message
					this.goodsBanner = message.pics
					console.log(this.goodsDetail)


				})
			},
			swiperClick(item) {
				console.log(item)
				let urls = this.goodsBanner.map(item => item.pics_big)
				uni.previewImage({
					current: item,
					urls: urls,
					loop: true,
					indicator: 'number',
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],

					}


				})
			},
			//购物车点击
			CartClick(){
				//1.获取本地的数据 用来做判断  如果没有数据 则是一个空数组
				let carts = uni.getStorageSync('carts')||[]
				//2.遍历本地数据 判断当前的id和本地的是否相等 如果相等 返回当前索引 (findindex判断不相等返回-1 否则匹配返回当前的索引)
				let goodsindex = carts.findIndex(item => item.goods_id == this.goodsDetail.goods_id)
				console.log(goodsindex)
				//如果 ==-1 说明数组里面找不到id(或者是空数组) 是第一次添加 则存入
				if (goodsindex === -1){
					//第一加入给他数量等1
					this.goodsDetail.num = 1
					//存入的时候 默认给一个复选框的状态 用于全选反选
					this.goodsDetail.checked = true
					//添加到carts的空数组中
					carts.push(this.goodsDetail)
				}
				//否则 相等说明本地数据的数量要+1
				else{
					carts[goodsindex].num++
					
				}
				//把数据重新添加回缓存中
				uni.setStorageSync('carts',carts)
				uni.showToast({
					title:'加入成功',
					icon:'success',
					mask:true
				})
			}	
		},
		onLoad(option) {
			this.getGoodsDetail(option)
		}
	}
</script>

<style lang="scss" scoped>
	swiper {
		width: 100vw;
		height: calc(100vw * 376/375);

		image {
			width: 100vw;
		}
	}

	.goods_info {
		width: 100vw;
		padding: 10rpx;

		.price {
			color: red;
			letter-spacing: 3rpx;

		}

		.title {
			display: flex;

			.left {
				flex: 7;
				overflow: hidden;
				font-size: 28rpx;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
			}

			.start {
				flex: 3;
				border-left: 1px solid #C0C0C0;
				text-align: center;
				line-height: 80rpx;

			}
		}
	}

	.pictext_detail {
		height: 80rpx;
		background: #C0C0C0;
		padding: 10rpx 5rpx;
		line-height: 80rpx;
		text-align: left;

		text {
			display: block;
			color: red;
			background: #FFFFFF;
			font-size: 35rpx;

		}
	}

	.btn_tools {
		width: 100vw;
		position: fixed;
		bottom: 0;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		line-height: 100rpx;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.5);

		.tool_item {
			flex: 1;
			background: #ccc;
			box-sizing: border-box;
			position: relative;

			button {
				top: 0;
				left: 0;
				height: 100%;
				width: 100%;
				position: absolute;
				opacity: 0;
			}

		}

		.btn-cart,
		.btn_buy {
			flex: 2;
			color: #FFFFFF;
		}

		.btn-cart {
			background: #FFA500;

		}

		.btn_buy {
			background: #EF5A50;
		}
	}
</style>

<template>
	<view>
		<!-- 地址 -->
		<view class="go_address" v-if="addressShow">
			<view class="address_btn">
				<button type="primary" plain>获取收货地址</button>
			</view>
		</view>
		<view v-else class="new_address">
			<view class="addreperson">
				<text>收货人:{{address.userName}}</text>
				<text>{{address.telNumber}}</text>
			</view>
			<view class="address_bottom">
				{{address.provinceName +address.cityName + address.countyName +address.detailInfo }}
			</view>
		</view>
		<!-- 地址 -->

		<!-- 购物车内容 -->
		<view class="cart_contents" v-for="(item,index) in cartList" :key='item.goods_id'>
			<view class="cart_item">
				<view class="cart_info">
					<navigator>
						<image :src="item.goods_small_logo" mode="widthFix"></image>
					</navigator>
					<view class="cart_info_list">
						<text>{{item.goods_name}}</text>

						<view class="cart_edit">
							<view class="goods_price">
								{{item.goods_price}}
							</view>

						</view>
					</view>
				</view>
			</view>
		</view>


		<!-- 底部工具 -->
		<view class="foot_tool">
			<view class="total_price_warp">
				<view class="total_top">
					合计：<text class="num_price">{{totalPrice}}</text>
				</view>
				<view class="yunfei">
					包含运费
				</view>
			</view>
			<view class="order_pay_warp">
				结算{{totalNum}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onShow() {
			//获取渲染数据
			const address = uni.getStorageSync('address')
			if (address) {
				this.address = address
				this.addressShow = false
			} else {
				this.addressShow = true
			}
			//获取本地数据如果没有则返回空数组	
			const carts = uni.getStorageSync('carts') || []
			let checkedCart = carts.filter(item=>item.checked)
			this.cartList = checkedCart
			//计算全选 计算总价
			this.setCart()
			let goods = []
			this.cartList.forEach(item=>goods.push({
				goods_id:item.goods_id,
				goods_number:item.goods_number,
				goods_price:item.goods_price,
			}))
			console.log(goods)
		},
		data() {
			return {
				address: {},
				addressShow: true,
				//所需数据
				cartList: [], //从本地获取的购物车列表
				allChecked: false, //全选的状态
				totalPrice: 0, //总价格
				totalNum: 0, //总数量

			}
		},
		methods: {
			handleChooseAddress() {
				uni.chooseAddress({
					success: function(res) {
						const address = res
						uni.setStorageSync('address', address)
					},
					fail: function(err) {
						console.log(err)
					}
				})
			},
			//计算全选 计算总价
			setCart() {

				//1.计算全选 计算复选框的状态  every数组方法会遍历会接收一个回调函数那么每一个回调函数都返回true那么every方法的返回值为true
				//只要有一个回调函数返回了false那么不再循环执行，直接返回false
				//不确定本地数据时候是空数组 空数组调用every，返回值就是true 所以先做判断 如果数组类的值不为空
				this.allChecked = this.cartList.length !== 0 ? this.cartList.every(item => item.checked) : false
				//默认为值都为0便于计算
				this.totalNum = 0
				this.totalPrice = 0
				//计算总价格 和总数量
				this.cartList.forEach(item => {
					//计算全选中的价格和总数量
					if (item.checked) {
						this.totalPrice += item.num * item.goods_price
						this.totalNum += item.num
					} else {
						this.allChecked = false
					}
				})
			},


		}
	}
</script>

<style scoped lang="scss">
	.go_address {
		padding: 20rpx;
	}

	.new_address {
		padding: 10rpx;
		display: flex;
		height: 120rpx;
		line-height: 120rpx;
		border-bottom: 1px solid red;
		// align-items: center;
		flex-direction: column;

		.addreperson {
			display: flex;
			justify-content: space-between;
			width: 100vw;
			height: 50rpx;

		}
	}

	.cart_contents {
		margin-top: 20rpx;
		width: 100vw;
		height: 200rpx;

		.cart_item {
			height: 100%;
			display: flex;
			padding: 5rpx;
			align-items: center;
			text-align: center;
			border-bottom: 1px solid red;

			.cart_chk_warp {
				flex: 2;

			}

			.cart_info {
				flex: 8;
				display: flex;
				position: relative;

				navigator {
					flex: 3;

					image {
						width: 100%;
						height: 100%;
						display: block;
					}
				}

				.cart_info_list {
					flex: 7;
					display: flex;
					flex-direction: column;
					padding: 10rpx;
					justify-content: space-around;
					box-sizing: border-box;

					text {
						text-align: left;
						font-size: 20rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						margin-bottom: 10rpx;
					}

					.cart_edit {
						display: flex;
						justify-content: space-between;

						.goods_price {
							color: red;
							font-size: 35rpx;
						}

						.num_carttool {
							display: flex;

							.num_edit {
								width: 55rpx;
								height: 55rpx;
								display: flex;
								justify-content: center;
								align-items: center;
								border: 1px solid #C0C0C0;
							}
						}


					}
				}
			}
		}
	}

	.foot_tool {
		display: flex;
		position: fixed;
		height: 60px;
		width: 100vw;
		bottom: 50px;
		left: 0;
		width: 100vw;

		.all_chk_warp {
			flex: 2;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.total_price_warp {
			flex: 6;
			flex-direction: column;
			text-align: right;
			display: flex;
			justify-content: space-between;

			.total_top {
				.num_price {
					color: red;
					font-size: 24px;
				}
			}
		}

		.order_pay_warp {
			flex: 2;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #FF524C;
		}
	}
</style>

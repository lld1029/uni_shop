<template>
	<view>
		<search-input></search-input>
		<my-tabs :tabsArr='tabsArr' @tabactive='tabactive'>
			<block v-if="tabsArr[0].isActive">
				<my-goods-list :goodsList='goodsList'></my-goods-list>
			</block>
			<block v-else-if="tabsArr[1].isActive">我是第二个</block>
			<block v-else>组件还在开发</block>

		</my-tabs>
	</view>
</template>

<script>
	import SearchInput from '../../components/SearchInput.vue'
	import MyTabs from '../../components/MyTabs.vue'
	import MyGoodsList from '../../components/MyGoodsList.vue'
	export default {
		components: {
			SearchInput,
			MyTabs,
			MyGoodsList
		},
		data() {
			return {
				// tabr栏
				tabsArr: [{
						id: 1,
						name: '综合',
						isActive: true
					},
					{
						id: 2,
						name: '销量',
						isActive: false
					},
					{
						id: 3,
						name: '价格',
						isActive: false
					},
				],
				//请求到的商品列表数据
				goodsList: [],
				//请求体
				QueryParams: {
					query: '',
					pagenum: 1, //当前的页码 用来下拉++
					pagesize: 10, //当前请求一个页面的数量(页容量) 10条商品
					cid: '',
				},
				//总共的条数
				totalPage: 1,
				totals: 0,
			}
		},
		methods: {
			tabactive(index) {
				this.tabsArr.forEach((item, i) => i === index ? item.isActive = true : item.isActive = false)
			},
			//数据请求
			getGoodsList(option) {
				this.QueryParams.cid = option
				this.$Request({
					url: 'goods/search',
					data: this.QueryParams
				}).then(res => {
					let {
						message
					} = res.data
					//计算总页数  总条数total除以 当前的页面容量
					//算出结果 26 / 10 向上取 返回3
					const total = message.total
					this.totalPage = Math.ceil(total / this.QueryParams.pagesize)
					//每次加载拼接数据
					this.goodsList.push(...message.goods)
					console.log(this.goodsList)
					// this.goodsList = [...this.goodsList, ...message.goods]
					console.log(this.totalPage)
				})

			},

		},
		onLoad(option) {
			uni.showLoading({
			    title: '加载中'
			});
			console.log(option)
			this.getGoodsList(option.cid)
			setTimeout(function () {
			    uni.hideLoading();
			}, 2000);
		},
		//页面上滑 触底
		onReachBottom() {
			uni.showLoading({
			    title: '加载中'
			});
			//判断有每一下一页数据当前页码 事后 大于总页码的时候 就没有下一页
			if (this.QueryParams.pagenum >= this.totalPage) {
				uni.showToast({
					title: '没有了哦'
				})
				return
			} else {
				//页码++
				this.QueryParams.pagenum++
				this.getGoodsList()

			}
			setTimeout(function () {
			    uni.hideLoading();
			}, 2000);
		},

		//监听下拉用户刷新
		onPullDownRefresh() {
			uni.showLoading({
			    title: '加载中'
			});
			console.log('refresh');
			//1.把原有数据列表清空
			//2.把页码回到1
			//3.重新请求
			this.goodsList = []
			this.QueryParams.pagenum = 1,
				this.getGoodsList()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
			setTimeout(function () {
			    uni.hideLoading();
			}, 2000);
		}
	}
</script>

<style>

</style>

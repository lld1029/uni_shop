<template>
	<view>
		<input type="text" value="" @input="handleInput" placeholder="请输入" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timerId : -1
			}
		},
		methods: {
			handleInput(e) {

				let { value } = e.detail
				
				// clearTimeout(this.timerId)
				// this.timerId =setTimeout(()=>{
				// 	this.getQuery(value)
				// },1000)
				
				this.debounce(this.testFn,5000)
				
			},
			getQuery(query) {
				this.$Request({
					url: 'goods/qsearch',
					data: {
						query,
					}
				}).then(res => {
					console.log(res)
				})
			},
			// //防抖函数
			debounce(fn,delay,value){
				let timer = null
				if(timer){
					clearTimeout(timer)
				}else{
					timer = setTimeout(fn,delay)
					
				}
			},
			testFn(value){
				console.log('测试啊')
				console.log(value)
			}
		}
	}
</script>

<style>

</style>

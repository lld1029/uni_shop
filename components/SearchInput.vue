<template>
	<view>
		<view class="search_input">
			<navigator url="/pages/search/search" open-type="navigate" animation-type='out'>搜索</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		name: "SearchInput",
		data() {
			return {

			};
		},
			
		methods:{
		
		}
	}
</script>

<style lang="scss">
	.search_input {
		box-sizing: border-box;
		height: 90rpx;
		padding: 10rpx;
		background: #55557F;
		navigator{
			border-radius: 15rpx;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #FFF;
			color: #666;
		}
	}
</style>

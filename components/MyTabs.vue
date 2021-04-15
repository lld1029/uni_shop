<template>
	<view>
		<view class="box">
			<view :class="item.isActive?'active tabs':'tabs'" v-for="(item,index) in tabsArr" :key='item.id' @click="activeClick(index)">
				{{item.name}}
			</view>
		</view>
		 
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name:"MyTabs",
		props:['tabsArr'],
		data() {
			return {
				
			};
		},
		methods:{
			activeClick(index){
				// console.log(index)
				this.$emit('tabactive',index)
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.box{
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	height: 100rpx;
	width: 100vw;
	line-height: 100rpx;
	.tabs{
		flex: 1;
		
	}
	.active{
		background: #e8e8e8;
		border-bottom: 1px solid red;
	}
	
}
</style>

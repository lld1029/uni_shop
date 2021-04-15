<template>
	<view>
		<view class="nav">
			<view class="nav_item" v-for="item in navList">
				<image :src="item.image_src" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"MyNav",
		created() {
			this.$Request({
				url:"home/catitems"
			}).then(res =>{
				this.navList = res.data.message
			})
		},
		data() {
			return {
				navList:[]
			};
		}
		
	}
</script>

<style lang="scss" scoped>
	.nav{
		display: flex;
		width: 100vw;
		.nav_item{
			flex: 1;
			image{
				width: 100%;
			}
		}
	}


</style>

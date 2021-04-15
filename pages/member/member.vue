<template>
	<view>
		<button type="primary" plain @getuserinfo="handleGetuserInfo" open-type="getUserInfo" v-if="isLogin"> 登录</button>
		<view class="user_info" v-else>
			<image :src="userInfo.avatarUrl" mode="widthFix">
			<view class="user_name">{{userInfo.nickName}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin:true,
				userInfo:[]
			}
		},
		methods: {
			handleGetuserInfo(e){
				let {userInfo} = e.detail
				this.userInfo = userInfo
				console.log(this.userInfo)
				uni.setStorageSync('userInfo',userInfo)
				uni.showToast({
					title:'登录成功'
				})
				setTimeout(()=>{
					this.isLogin = false
				},2000)
				
 			}
		}
	}
</script>

<style scoped lang="scss">
.user_info{
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	image{
		height: 50%;
		width: 50%;
		border-radius: 50%;
		
	}
}
</style>

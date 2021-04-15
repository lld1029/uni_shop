<template>
	<view>
		<!-- 轮播图 -->
		<swiper class="swiper" indicator-dots="true" circular='true'>
			<swiper-item v-for="item in BannerArr" :key='item.goods_id'>
				<image :src="item.image_src" mode="widthFix"></image>
			</swiper-item>
		</swiper>

	</view>
</template>

<script>
	export default {
		name: "MySwiper",
		created() {
			this.$Request({
				url:'home/swiperdata',
			}).then((res)=>{
				this.BannerArr = res.data.message
			})
		},
		data() {
			return {
				BannerArr: [],

			};
		}
	}
</script>

<style lang="scss">
	swiper {
		height: calc(100vw * 188/414);

		image {
			width: 100vw;
		}
	}
</style>

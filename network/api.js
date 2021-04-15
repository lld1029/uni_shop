const BSER_URL = 'https://api-hmugo-web.itheima.net/api/public/v1/'
export const Request = (option) => {
	return new Promise((reslove, reject) => {
		uni.request({
			url: BSER_URL + option.url,
			method: option.method || 'GET',
			data: option.data || {},
			success: (res) => {
				if (res.data.meta.status !== 200 && res.statusCode !== 200 ) {
					uni.showToast({
						title: "数据获取失败"
					})
				}
				reslove(res)
			},
			fail: (err) => {
				uni.showToast({
					title: "请求接口失败"
				}),
				reject(err)
			}
		})
	})
}

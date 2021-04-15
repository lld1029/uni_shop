import Vue from 'vue'
import App from './App'

import {Request} from './network/api.js'
Vue.prototype.$Request = Request


Vue.filter('filPrice',(val)=>{
	return '￥' + val
})

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

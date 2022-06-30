import Vue from 'vue'
import App from './App.vue'

//三级联动组件(注册为全局组件)
import TypeNav from '@/components/TypeNav/TypeNav.vue'
Vue.component(TypeNav.name, TypeNav)

//轮播图组件(注册为全局组件)
import Carousel from '@/components/Carousel/Carousel.vue'
Vue.component(Carousel.name, Carousel)

//分页器组件(注册为全局组件)
import Pagination from '@/components/Pagination/Pagination.vue'
Vue.component(Pagination.name, Pagination)

//引入VueRouter
import VueRouter from 'vue-router'

//引入路由器
import router from './router/index.js'

//引入仓库
import store from '@/store/index.js'

Vue.config.productionTip = false

Vue.use(VueRouter)

//引入mock数据
import "@/mock/mockServe.js"

//引入swiper样式
import 'swiper/css/swiper.css'

//统一接口api文件夹里面的全部请求函数
//统一引入
import * as API from '@/api'

//按需引入Element-ui
import { Button, MessageBox } from 'element-ui';
//全局注册
Vue.component(Button.name, Button);
//挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入图片
import atm from '@/assets/atm.gif'

//引入插件(图片懒加载)
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  //懒加载默认的图片
  loading:atm
})


//引入自定义插件(表单验证)
import '@/plugins/validate.js'


new Vue({
  render: h => h(App),
  //注册路由
  router: router,
  //注册仓库
  store: store,
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  }
}).$mount('#app')

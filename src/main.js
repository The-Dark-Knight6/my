// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible/flexible' //引用rem单位 自适应移动端布局
import './mock/mockserver' //加载虚拟数据模块
// import VueResource from 'vue-resource'
import axios from 'axios' //使用axios发送http请求
import VueScroller from 'vue-scroller' //下拉刷新 直接在也忙中使用的 ,<scroller></scroller>

// better-scroll安装依赖后需要在使用它的页面进行调用 更多详细参加它的官方文档说明 以上

Vue.use(VueScroller)
Vue.prototype.$ajax = axios //将axios添加至原型链 方便axios的使用
// Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

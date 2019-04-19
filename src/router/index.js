import Vue from 'vue'
import Router from 'vue-router'
import goods from '@/components/goods/goods'
import ratings from '@/components/ratings/ratings'
import seller from '@/components/seller/seller'

Vue.use(Router)

export default new Router({
  mode : 'history',  //去掉URL地址里面的 # 号
  routes: [
    {
      path: '/',
      redirect : '/goods'
    },
    {
      path : '/goods',
      name : 'goods',
      component : goods
    },
    {
      path : '/ratings',
      component : ratings
    },
    {
      path : '/seller',
      component : seller
    }
  ]
})

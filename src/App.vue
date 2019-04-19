<template>
  <div id="app">
    <!-- 顶部店铺组件 -->
    <ele-header :data="seller"></ele-header>
    <!-- 路由的全局切换 -->
   <div class="tabs">
     <div class="tab-item">
       <router-link to="/goods">商品</router-link>
     </div>
     <div class="tab-item">
       <router-link to="/ratings">评价</router-link>
     </div>
     <div class="tab-item">
       <router-link to="/seller">商家</router-link>
     </div>
   </div>
   <!-- 缓存切换路由之后状态 且提供给子组件data 的数据-->
   <keep-alive>
     <router-view :data="seller"></router-view>
   </keep-alive>
  </div>
</template>

<script>
import headers from './components/header/header.vue'

export default {
  name: 'App',
  methods : {

  },
  data(){
    return{
      seller : {},
    }
  },
  components : {
    'ele-header' : headers
  },
  created(){
    setTimeout(() => {
      //获取mock中的模拟数据
      this.$ajax.get('/api2/seller').then(res => {
        const result = res.data;
        if(result.code == 0){
          this.seller = result.data
        }
      }).catch(err => {
        console.log(err)
      })
    },100)
  }
}
</script>

<style>
.tabs{
  display: flex;
  font-size: .35rem;
}
a{
  text-decoration: none;
  color: rgb(77,85,93);
  -webkit-tap-highlight-color: transparent;
  display: block;
}
.tab-item{
  padding: .3rem;
  flex: 1;
  text-align: center;
}
.router-link-active{
  color: red;
}
body,html{
width: 100%;
height: 100%;
}
h1,h2,h3,h4,h5,h6,p,body,html{
  margin: 0%;
  padding: 0%;
}
ul{
  list-style: none;
  padding: 0%;
  margin: 0;
}
</style>


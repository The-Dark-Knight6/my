<template>
    <div class="goods">
        <!-- 左侧的菜单栏目 -->
        <div class="menu-wrapper" ref="menuwrapper">
            <ul>
                <li class="menu-item" v-for="(good,i) in goods" :class="{cur : i === currents}" :key="i" @click="clickmenuitem(i,$event)">
                    <div class="box">
                        <div class="icon" v-if="good.type" :class="classmap[good.type]"></div>
                        <span class="text">{{good.name}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 右侧每个菜的详细介绍 -->
        <div class="foods-wrapper" ref="foodswrapper">
            <ul>
                <li class="food-list food-list-hook" v-for="(v,i) in goods" :key="i">
                    <h1 class="tit">{{v.name}}</h1>
                    <ul>
                        <li class="food-item" v-for="(f,i) in v.foods" :key="i">
                            <div class="f_icon" @click="showfood(f)">
                                <img :src="f.icon" alt="food_imgs">
                            </div>
                            <div class="f_cont">
                                <p>{{f.name}}</p>
                                <span>{{f.description}}</span>
                                <div class="extra">
                                    <span>月售：{{f.sellCount}}</span>
                                    <span>好评率：{{f.rating}}</span>
                                </div>
                                 <div class="price">
                                    <span class="p_now">RMB: {{f.price}}</span>
                                    <carcontrol :food="f" :updates="updateFoodCount"></carcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <!-- 所引用组件中的驼背式(大小写的)写法需要写成分段式 （将大写字母换成小写字母并在前加上-） -->
        <shopcart :delivery-price="data.deliveryPrice"
            :list="listarray"
            :minprice="data.minPrice"
            :update-food-count="updateFoodCount"
            :clear-cart="clearCart"></shopcart>
            <!-- 商品的详细页面 -->
        <food :datas="fod" ref="food"  :update-food-count="updateFoodCount"></food>
    </div>
</template>

<script>
import BScroll from 'better-scroll' //引入移动端滚动插件
import Vue from 'vue' //引入vue使用其中的一个方法 nextTick()
import carcontrol from '../goods/carcontrol' //添加商品 数量
import shopcart from '../goods/shopcart'    //添加商品到购物车 数量*价格
import food from '../goods/food'  //菜 的详细页面

export default {
    props : ['data'],
    components : {
        carcontrol,
        shopcart,
        food,
    },
    data(){
        return {
            goods : [], //存储 所需要的 mockjs 模拟接口中的 商品数据
            tops : [], 
            currents : 0, //计数 左侧 导航栏的当前所在栏目
            fod : {}, 
        }
    },
    created(){
        //初始化 特殊 数组 用来给特定的菜单项 加上相应的背景图片
        this.classmap = ['decrease','discount','special','invoice','guarantee']
        // 获取mockjs 中的模拟数据
        setTimeout(() => {
            this.$ajax.get('/api2/goods').then(res => {
                const ret = res.data;
                if(ret.code == 0){
                    this.goods = ret.data
                    // 这是vue 的一个方法 用来修改数据之后调用此方法获取更新后的dom
                    Vue.nextTick(() =>{
                        //初始化滚动条 包含左侧菜单条 以及 右侧 菜式条
                        this.initscroll()
                        //获取 右侧 菜单 样品中的top值
                        this.inittops()
                    })
                }
            })
        })
    },
    methods : {
        // 对组件进行传值 以及 显示隐藏
        showfood(e){
            this.fod = e;
            // 子组件中的方法 show调用  进行显示和隐藏food组件
            this.$refs.food.show();
        },
        //清空购物车
        clearCart(){
            this.listarray.forEach(k =>{
                k.count = 0
            })
        },
        // 初始化 混动 模块
        initscroll(){
            new BScroll(this.$refs.menuwrapper,{
                click : true,
            })
            this.foodsscroll = new BScroll(this.$refs.foodswrapper,{
                click : true,
                probeType : 3, //知道实时滚动的位置信息
            })
            this.foodsscroll.on('scroll',(pos) => {
                this.scrollY = Math.abs(pos)
            })
        },
        // 左侧 按钮 来决定 右侧 混动
        inittops(){
            var tops = this.tops;
            var top = 0;
            var lis = this.$refs.foodswrapper.getElementsByClassName('food-list-hook');
            [].slice.call(lis).forEach(li => {
                top += li.clientHeight;
                tops.push(top)
            })
        },
        clickmenuitem(i,event){
            this.currents = i
            if(! event._constructed){ //过滤原生dom事件 _constructed为better-scrioll库原生属性
                return
            } //将右侧列表滚动到对应位置
            var li =  this.$refs.foodswrapper.getElementsByClassName('food-list-hook')[i];
            this.foodsscroll.scrollToElement(li,300)
        },
        updateFoodCount(food,isadd,event){
            // 当isadd为true时（即点击+） 给json数据food中创建新的数据count用来计数        
            if(isadd){
                if(!food.count){
                    Vue.set(food,'count',1)
                }else{
                    food.count ++
                }
                // this.$refs.shopcart.drop(event,target)
            }else{
                if(food.count){
                    food.count --
                }
            }
        }
    },
    computed : {
        //存储用户点击的菜品数据 （即count>0）
        listarray(){
            let nums = []
            this.goods.forEach(e =>{
                e.foods.forEach(i => {
                    if(i.count){
                        nums.push(i)
                    }
                })
            })
            return nums;
        }
    }
}
</script>

<style lang="scss" scoped>
//点击时候出现的菜单样式
.cur{
    background: rgb(204, 204, 204) !important;
}
.food-list{
    .food-item{
        margin:.4rem .3rem;
        display: flex;
        align-items: center;
        .f_cont{
            flex: .7;
            >p{
                font-size: .35rem;
            }
            >span{
                color: gray;
                font-size: .3rem;
            }
            .price{
                display: flex;
                justify-content: space-between;
                color: red;
                font-size: .3rem;
            }
            .extra{
                span{
                    color: gray;
                    margin-right: .3rem;
                    font-size: .25rem;
                }
            }
        }
        .f_icon{
            flex: .3;
            height: 2rem;
            width: 2rem;
            margin-right: .1rem;
            img{
                width: 100%;
            }
        }
    }
    h1.tit{
        border-left: 3px solid gray;
        color: black;
        background: #f3f5f7;
        padding: .2rem .3rem;
        text-align: left;
        font-size: .4rem;
    }
}
.goods{
    display: flex;
    // 利用绝对定位勾画出能够让vuescroll滚动的高度
   position: absolute;
   width: 100%;
   top: 5rem;bottom: 1.3rem;
    overflow: hidden;
}
.foods-wrapper{
    display: inline-block;
    flex: 0.7;
}
.menu-wrapper{
    display: inline-block;
    flex: 0.3;
}
li.menu-item{
    background: #f3f5f7;
    border-bottom: 1px solid gainsboro;
    padding: .5rem .2rem;
    .box>*{
        vertical-align: middle;
        text-align: center
    }
    .text{
        font-size: .35rem;
        color: black;
    }
    .icon{
        display: inline-block;
        background-size: contain;
        background-repeat: no-repeat;
        width: .35rem;
        height: .35rem;
    }
    .discount{
        background-image: url('./discount_3@2x.png')
    }
    .special{
        background-image: url('./special_3@2x.png')
    }
}
</style>



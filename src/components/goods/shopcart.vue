<template>
    <div class="shopcart">
        <!-- 下方的购物统计 -->
        <div class="content">
            <div class="con_num" v-show="totalCount">{{totalCount}}</div>
            <div class="con_left">
                <div class="logos" 
                    :class="{highlight : totalCount > 0}"
                    @click="toogleList"><span>购</span></div>
                <span class="pri">RMB:{{totalPrice}}元</span>
                <span class="delivery" >另需配送费{{deliveryPrice}}元</span>
            </div>
            <div class="con_right" :class="{highs : minprice <= totalPrice}" @click="to_pays">
                <span>{{paytext}}</span>
            </div>
        </div>
        <!-- 购物车 详情界 -->
        <transition name="fold">
            <div class="shop_car" v-if="isshowcount">
                <div class="list_header">
                    <h1 class="title">购物车</h1>
                    <span class="empty" @click="clearCart">清空</span>
                </div>
                <div class="list_content" ref="listContent">
                    <ul>
                        <li class="food" v-for="(food,i) in list" :key="i">
                            <span class="f_name">{{food.name}}/{{food.count}}</span>
                            <div class="f_price_count">
                                <span>RMB:{{food.price}}</span>
                                <carcontrol style="display:inline-block" :food="food" :updates="updateFoodCount"></carcontrol>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
        <!-- 购物车 透明黑色背景 -->
        <transition>
            <div class="list_mask" v-if="isshowcount" @click="toogleList"></div>
        </transition>
    </div>
</template>

<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
import carcontrol from '../goods/carcontrol'
export default {
    components : {
        carcontrol,
    },
    props : {
        deliveryPrice : Number, //额外 配送费用
        list : Array, //购买数量>1的 商品数据
        minprice : Number, //配送的 最低价格
        updateFoodCount : Function, // 添加商品数量的函数 由组件而来
        clearCart : Function //清空所购买的商品
    },
    methods : {
        //显示 与 隐藏 购物车 以及 背景
        toogleList(){
            this.isshow = !this.isshow;
        },
        // 需要支付的 总价格
        to_pays(){
            if(this.totalPrice >= this.minprice)
            alert(`pay:${this.totalPrice + this.deliveryPrice}`)
        }
    },
    computed : {
        //计算总价格
        totalPrice(){
            return this.list.reduce((pr,fo) => {
                return pr + fo.price * fo.count
            },0)
        },
        //计算总商品数量
        totalCount(){
            return this.list.reduce((pr,e) => {
                return pr + e.count
            },0)
        },
        // 计算 当前所选商品是否满足最低价格配送（是否可以下单）
        paytext(){
            let cur = this.totalPrice; //当前所选商品总价格
            let min = this.minprice; //当前最低配送价格（下单价格）
            if(cur == 0){
                return `需${min}元起送`
            }else if(cur < min){
                return `还差${min - cur}元起送`
            }else{
                return `买单`
            }
        },
        // 检测 当count=0时 购物车为灰色且不可用 同时由来显示和隐藏相关界面
        isshowcount(){
            if(this.totalCount == 0){
                this.isshow = false
                return false
            }
            // 调用 滑动插件
            if(this.isshow){
                Vue.nextTick(() => {
                    if(!this.scroll){
                        this.scroll = new BScroll(this.$refs.listContent,{
                            click : true,
                        })
                    }else{
                        this.scroll.refresh();
                    }
                })
            }
            return this.isshow
        }
    },
data(){
    return{
        isshow : false,
    }
},
}
</script>

<style lang="scss" scoped>
.list_mask{
    background: rgba(7,17,27,0.6);
    position: fixed;
    top: 0%;
    left: 0;
    z-index: -10;
    width: 100%;
    height: 100%;
    &.fade-enter-active, &.fade-leave-active{
        transition: all 0.5s;
    }
    &.fade-enter, &.fade-leave-active{
        opacity: 0;
        background: rgba(7, 17, 27, 0);
    }    
}
.shop_car{
    position: absolute;
    top:0;left: 0;
    width: 100%;
    z-index: -1;
    transform:  translate3d(0,-102%,0); //显示时候的 转换
    &.fold-enter-active,&.fold-leave-active{
        transition: .5s;
    }
    &.fold-enter,&.fold-leave-active{
        transform: translate3d(0,0,0)
    }
    .list_content{
        max-height: 4.3rem;
        padding: .2rem;
        overflow: scroll;
        background: #fff;
        .food{
            position: relative;
            padding: .15rem ;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            border-bottom: 1px solid ghostwhite;
            .f_name{
                font-size: .3rem;
            }
            .f_price_count{
                span{
                    font-size: .3rem;
                    display: inline-block;
                    margin-right: .4rem;
                }
            }
        }
    }
    .list_header{
        height: .4rem;
        line-height: .4rem;
        padding: .2rem;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7,17,27,.1);
        .title{
            float: left;
            font-size: .32rem;
            color: rgb(7,17,27);
        }
        .empty{
            float: right;
            color: rgb(0,160,220);
            font-size: .32rem;
        }
    }
}
.shopcart{
    z-index: 4; //层叠级别需要比 菜品 的界面级别高 这样才可以在它的上面显示 其它同理
    position: fixed;
    bottom: 0;
    width: 100%;
    .content{
        background: #141d27;
        display: flex;
        .con_num{
            width: .6rem;
            height: .4rem;
            position: absolute;top: -.4rem;left: 1rem;
            z-index: 99;
            background: red;
            color: white;
            text-align: center;
            border-radius: 35%;
            font-weight: bold;
            padding: .05rem;
        }
        .con_right{
            flex: .3;
            background: #2b333b;
            text-align: center;
            &.highs{
                background: #00b43c;
                span{
                    color: white;
                }
            }
            span{
                display: inline-block;
                font-size: .36rem;
                color: gray;
                line-height: 1rem;
            }
        }
        .con_left{
            flex:.7;
            .logos{
                // 购买数量>0时 改变样式
                &.highlight{
                    background: rgb(0, 160, 220);
                    span{
                    color: white ;
                    }
                }
                display: inline-block;
                width: .7rem;
                height: .7rem;
                border-radius: 50%;
                margin:0 .3rem; 
                background:#2b333b;
                border:.2rem solid #141d27;
                position: relative;
                top: -.35rem;
                text-align: center;
                span{
                    display: inline-block;
                    color: gray;
                    font-size: .35rem;
                    margin-top: .1rem;
                }
            }
            .pri{
                display: inline-block;
                font-weight: bold;
                color:gray;
                padding-right: .25rem;
                border-right: 2px solid rgba(255,255,255,.1)
            }
            .delivery{
                color: gray;
                display: inline-block;
                text-align: left;
            }
        }
    }
}
</style>



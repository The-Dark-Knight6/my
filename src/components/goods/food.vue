<template>
    <transition name="move">
        <div class="food" v-if="isshow" ref="foodd">
            <div class="fo_contents">
            <div class="food_img">
                <img :src="datas.image" alt="imgs">
                <span class="back" @click="show()"> 《 </span>
            </div>
            <div class="f_name">
                <p>{{datas.name}}</p>
                <div class="f_dan">
                    <span>月售：{{datas.sellCount}}份</span>
                    <span>好评率：{{datas.rating}}%</span>
                </div>
                <div class="f_prices">
                    <span>RMB:{{datas.price}}</span>
                    <cartcontrol :food="datas" :updates="updateFoodCount"></cartcontrol>
                </div>
                <!-- 首次加入 购物车 给一个特别的样式设计 -->
                <div class="buy" v-if="!datas.count" @click="updateFoodCount(datas,true,$event)">加入购物车</div>
            </div>
            <div class="f_desc">
                <h1>商品信息</h1>
                <p>{{datas.info}}</p>
            </div>
            <div class="rating">
                <h1>商品评价</h1>
                <div class="ra_comment">  
                    <span @click="sele(2)" :class="{hig : types ==2}">全部{{datas.ratings.length}}</span>
                    <span @click="sele(0)" :class="{hig : types ==0}">满意{{leng}}</span>
                    <span @click="sele(1)" :class="{hig : types ==1}">不满意{{datas.ratings.length - leng}}</span>
                </div>
                <div class="bot_conten">
                    <div class="conten_just" v-for="(v,i) in filterRatings" :key="i">
                        <div class="th_img">
                            <img :src="v.avatar" alt="imgs">
                        </div>
                        <div class="real_con">
                            <div class="bot_t">
                                <span>{{v.username}}</span>
                                <span>{{v.deliveryTime }}</span>
                            </div>
                            <p>{{v.text}}</p>
                            <div class="zans">
                                <span class="item" v-for="(vs,i) in v.recommend" :key="i">{{vs}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </transition>    
</template>

<script>
import cartcontrol from '../goods/carcontrol' // 引入添加 商品 的组件
export default {
    components : {
        cartcontrol
    },
props : {
    datas : Object, // 该 菜 的数据
    updateFoodCount : Function,    //计算 商品 数量
},
data(){
    return {
        isshow : false,
        types : 2,

    }
},
methods : {
    show(){
        this.isshow = !this.isshow;
    },
    sele(e){
        this.types = e
    }
},
computed : {
    // 当前菜的满意评论数量
    leng(){
        return this.datas.ratings.reduce((r,a) => {
            return r + (a.rateType == 0 ? 1 : 0)
        },0)
    },
    // 过滤当前 菜的评论 满意 不满意 和全部
    filterRatings(){
    return this.datas.ratings.filter(ra => {
        if(this.types == 2){
            return ra
        }else{
            return this.types == ra.rateType
        }
    })
},
}
}
</script>

<style lang="scss" scoped>
.bot_conten{
        padding: .2rem;
        .conten_just{
            display: flex;
            margin-top: .2rem;
            border-top: 2px solid gainsboro;
            .th_img{
                width: .8rem;
                height: .8rem;
                >img{
                    border-radius: 50%;
                    width: 100%;
                }
            }
            .real_con{
                flex: 1;
                padding-left: .1rem;
                .bot_t{
                    display: flex;
                    justify-content: space-between;
                    span{
                        color: gray;
                        font-size: .26rem;
                    }
                }
                div.star{
                    padding: .15rem 0;
                    margin: 0;
                    text-align: left;
                }
                p{
                    font-size: .3rem;
                    padding: .2rem 0;
                    color: black;
                }
                .zans{
                    span{
                        font-size: .25rem;
                        color: gray;
                    }
                }
            }
        }
    }
.ra_comment{
    padding: .2rem 0;
    span{
        display: inline-block;
        padding:.2rem .3rem;
        margin-right: .2rem;
        font-size: .35rem;
    }
    span:nth-of-type(2),span:nth-of-type(1){
        background: rgba(0,160,220,0.2);
    }
    span:nth-of-type(3){
        background:rgba(77,85,93,0.2);
    }
}
.f_desc,.rating{
    border-top: .35rem solid ghostwhite;
    padding: 0 .2rem;
    .hig{
        background: #00a0dc !important;
    }
    h1{
        font-size: .35rem;
        padding: .25rem 0;
    }
    p{
        line-height: .7rem;
        font-size: .28rem;
        color: gray;
        padding: 0 .3rem;
    }
}
.f_name{
    padding: .25rem .2rem;
    position: relative;
    .buy{
        display: inline-block;
        position: absolute;
        padding: .2rem .3rem;
        font-size: .3rem;
        background: #00a0dc;
        color: white;
        right: .1rem;
        bottom: .35rem;
        border-radius: .5rem;
    }
    .f_prices{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: .2rem 0;
        span{
            font-size: .3rem;
            color: red;
        }
    }
    p{
        font-weight: bold;
        font-size: .35rem;
    }
    .f_dan{
        margin: .15rem 0;
        span{
            margin-right: .25rem;
            color: gray;
            font-size: .3rem;
        }
    }
}
.move-enter-active,.move-leave-active{
    transition: .2s;
}
.move-enter,.move-leave-active{
    opacity: 0;
    transform: translate3d(100%,0,0)
}
.food{
    position: fixed;
    left: 0;
    top:0;
    z-index: 2;
    width: 100%;
    background: white;
    max-height: 92%;
    height: 100%;
    overflow: scroll;
    padding-bottom: 1.4rem;
    .food_img{
            img{
        width: 100%;
        }
        .back{
            color: #00a0dc;
            font-size: .45rem;
            position: absolute;
            top: .2rem;left:.3rem;
        }
    }
}
</style>



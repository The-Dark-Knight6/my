<template>
    <div class="seller">
        <scroller>
        <div class="seller_heads">
            <p>{{data.name}}</p>
            <div class="in_star">
                <star :score="data.score"></star>
                <span style="margin:0 .15rem;">{{data.ratingCount}}</span>
                <span>月售{{data.saleCount}}单</span>
            </div>
            <div class="seller_desc">
                <div class="desc_what">
                    <p>起送价</p>
                    <span>{{data.minPrice}}</span>元
                </div>
                <div class="desc_what">
                    <p>商家配送</p>
                    <span>{{data.deliveryPrice}}</span>元
                </div>
                <div class="desc_what">
                    <p>平均配送时间</p>
                    <span>{{data.deliveryTime}}</span>元
                </div>
            </div>        
        </div>
        <div class="seller_acts">
            <p>公告与活动</p>
            <p class="cons">{{data.bulletin}}</p>
            <ul>
                <li class="supports" v-for="(v,i) in data.supports" :key="i">
                    <div class="icon" :class="classmap[v.type]"></div>
                    <span>{{v.description}}</span>
                </li>
            </ul>
        </div>
        <div class="seller_seeing">
            <p>商家实景</p>
            <div class="pic_wrapper" ref="picwrappers">
                <ul class="piv_list" ref="pivlist">
                    <li class="piv_item" v-for="(v,i) in data.pics" :key="i">
                        <img :src="v" width="190" alt="pic_img" @click.stop.prevent="chang($event)">
                    </li>
                </ul>
            </div>
        </div>
        <div class="seller_info">
            <p>商家信息</p>
            <ul>
                <li class="infos" v-for="(v,i) in data.infos" :key="i">{{v}}</li>
            </ul>
        </div>
        </scroller>
        <div class="bg_img" v-if="th == true">
            <span @click.stop="(th = false)">&times;</span>
            <img :src="there" alt="imgs">
        </div>
    </div>
</template>

<script>
import star from '../star/star'
import BScroll from 'better-scroll'

export default {
    data(){
        return{
            th : false,
            there : null, //保存img的src地址
        }
    },
props : ['data'],
components : {
    star,
},
created(){
     this.classmap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
     this.heng();
},
updated(){
    this.heng();
},
methods : {
    //点击图片进行放大
    chang(event){
        this.there = event.target.src;
        this.th = true;
    },
    // 图片 显示 横着时的 滑动效果
    heng(){
        this.$nextTick(() => {
             const liWidth = 200
            const space = 6
            const ul = this.$refs.picwrappers.children[0]
            const liCount = ul.children.length
            ul.style.width = liCount * (liWidth + space) - space + 'px'
            new BScroll(this.$refs.picwrappers,{
                click : true,
                scrollX : true,
            })
        })
    }
},
}
</script>

<style lang="scss" scoped>
.bg_img{
    span{
        font-size: .7rem;
        color: white;
        margin: .35rem .8rem;
        float: right;
    }
    img{
        margin-top: 2rem;
        width:100%;
    }
    text-align: center;
    background: rgba(7, 17, 27, 0.8);
    position: fixed;
    z-index: 100;
    top: 0%;
    left: 0;
    width: 100%;
    height: 100%;
}
@mixin chili{
    content: '';
    display: inline-block;
    width: 3px;
    height: 1.2rem;
    position: absolute;  
    background: gainsboro;
}
@mixin hed{
    padding: .2rem .3rem;
    border-top: .42rem solid ghostwhite;
}
.seller_info{
   @include hed;
   p{
       padding: .2rem 0;
   } 
   ul{
       margin: .15rem 0;
       li{
           padding: .32rem .15rem;
           border-top: 1px solid gainsboro;
       }
   }
}
.seller_seeing{
    p{
        padding: .2rem 0;
    }
@include hed;
    ul.piv_item{
        padding: .1rem 0;
    }
    .piv_item{
        display: inline-block;
        padding-right: .15rem;
        width:190;
    }
    .pic_wrapper{
        width: 100%;
        overflow: scroll;
        white-space: nowrap; //禁止换行 
    }
}
.seller_acts{
    @include hed;
    p{
        font-size: .35rem;
        color: black;
        padding-top: .15rem;
    }
    p.cons{
        font-size: .37rem;
        color: red;
        line-height: .7rem;
        padding:.15rem;
    }
    ul{
        margin: .12rem 0;
        padding: 0 .15rem;
        li{
            border-top: 1px solid gainsboro;
            padding: .25rem 0;
            >*{
                vertical-align:middle;
            }
            span{
                font-size: .28rem;
                margin-left: .2rem;
            }
            .icon{
                width: .5rem;
                height: .5rem;
                background-repeat: no-repeat;
                background-size: contain;
                display: inline-block;
            }
            .decrease{
                background-image: url('./decrease_3@2x.png')
            }
            .discount{
                background-image: url('./discount_3@2x.png');
            }
            .special{
                background-image: url('./special_3@2x.png');
            }
            .invoice{
                background-image: url('./invoice_4@2x.png')
            }
            .guarantee{
                background-image: url('./guarantee_3@2x.png');
            }
        }
    }
}
.seller{
    position: absolute;
    top: 5rem;
    bottom: 0%;
    width: 100%;
}
.seller_desc{
    display: flex;
    justify-content: space-evenly;
    padding: .25rem;
    border-top: 1px solid gainsboro;
    .desc_what{
        position: relative;
        text-align: center;
        p{
            text-align: center;
            font-size: .34rem;
            color: gray;
        }
        span{
            color: black;
            font-size: .6rem;
            display: inline-block;
        }
    }
    .desc_what:nth-of-type(2)::before{
        @include chili;
         right: 1.8rem;
    }
    .desc_what:nth-of-type(2)::after{
        @include chili;
        left: 1.8rem;
        bottom: .05rem;
    }
}
.seller_heads{
    border-top: 1px solid gainsboro;
    padding: .2rem .3rem;
    p{
        font-size: .35rem;
        color: black;
    }
    .in_star{
        margin: .12rem 0;
        *{
            vertical-align: middle;
        }
    }
    div.star{
        margin: 0%;
        padding: .12rem 0;
        display: inline-block;
    }
    span{
        color: gray;
        font-size: .28rem;
    }
}
</style>

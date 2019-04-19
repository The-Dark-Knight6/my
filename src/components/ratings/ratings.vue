<template>
    <div class="ratings" ref="ratingss">
        <!-- 渲染 本商店 的综合评价 同时使用main.js引入的VueScroller来进行上下拉的滑动效果-->
        <scroller>
        <div class="r_tops">
            <div class="r_lefts">
                <h2>{{data.score}}</h2>
                <p>综合评分</p>
                <p>高于周边商家{{data.rankRate}}%</p>
            </div>
            <div class="r_rights">
                <div class="servers">
                    <span>服务态度</span>
                    <star :score="data.serviceScore"></star>
                    <span class="sco">{{data.serviceScore}}</span>
                </div>
                <div class="scores">
                    <span>商品评分</span>
                    <star :score="data.foodScore"></star>
                    <span class="sco">{{data.foodScore}}</span>
                </div>
                <div class="thetimes">
                    <span style="margin-right:.2rem;">送达时间</span>
                    <span style="color:gray">{{data.deliveryTime}}分钟</span>
                </div>
            </div>
        </div>
        <!-- 渲染 客户的 相关评论 -->
        <div class="r_bottoms">
            <div class="bot_ratings">
                <span @click="select(2)" :class="{spi : typs == 2}">全部{{mydatas.length}}</span>
                <span @click="select(0)" :class="{spi : typs == 0}">满意{{the_greats}}</span>
                <span @click="select(1)" :class="{spi : typs == 1}">不满意{{mydatas.length - the_greats}}</span>
            </div>
            <div class="bot_conten">
                <div class="conten_just" v-for="(v,i) in o_mydatas" :key="i">
                    <div class="th_img">
                        <img :src="v.avatar" alt="imgs">
                    </div>
                    <div class="real_con">
                        <div class="bot_t">
                            <span>{{v.username}}</span>
                            <span>{{v.deliveryTime }}</span>
                        </div>
                        <star :score="v.score"></star>
                        <p>{{v.text}}</p>
                        <div class="zans">
                            <!-- <span :class="v.rateType == 0 ? 'icon_up' : 'icon_down'"></span> -->
                            <span class="item" v-for="(vs,i) in v.recommend" :key="i">{{vs}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </scroller>
    </div>
</template>

<script>
import star from '../star/star' //引入星级评分页面

export default {
    props : [
        'data',
    ],
    components : {
        star,
    },
    computed : {
        the_greats(){
            // 使用 reduce 方法 来计算 数据中满意（即mydatas.rateType为0）的数量
            return this.mydatas.reduce((r,t) => {
                return r + (t.rateType == 0 ? 1 : 0)
            },0)
        },
        o_mydatas(){
            // 评论过滤 当为2时（即全部的评论） 返回所有 当为0或者1时返回相应的评论
            return this.mydatas.filter(ret => {
                if(this.typs == 2){
                    return ret
                }else{
                    return this.typs == ret.rateType
                }
            })
        }
    },
    data(){
        return{
            mydatas : [], //存储mockjs中的ratings模拟数据
            typs : 2, // 区分 满意 和不满意 的评论
        }
    },
    created(){
        this.getdat();
    },
    methods : {
        select(e){
            this.typs = e
        },
       getdat(){
           this.$ajax.get('/api2/ratings').then(res => {
               const mdata = res.data;
               if(mdata.code == 0){
                   this.mydatas = mdata.data;
               }
           })
       }
    },
}
</script>

<style lang="scss" scoped>
.ratings{
    position: absolute;
    top: 5rem;
    bottom: 0;
    width: 100%;
}
.r_bottoms{
    padding: 0 .2rem;
    border-top: .4rem solid ghostwhite;
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
    .bot_ratings{
        padding: .25rem 0;
        span{
            font-size: .3rem;
            padding: .2rem;
            margin-left: .2rem;
            display: inline-block;
            background: rgba(0,160,220,0.2);
        }
        span.spi{
            background: #00a0dc !important;
            color: white;
        }
        span:last-child{
            color: white;
            background: #babec4;
        }
    }
}
.r_tops{
    padding: .25rem;
    display: flex;
    border-top: 1px solid gray;
    .r_rights{
        flex: .7;
        margin-left: .2rem;
        font-size: .3rem;
        color: black;
        div.star{
            padding: 0%;
            margin: 0 .2rem;
        }
        div{
            padding: .1rem .2rem;
            *{
                vertical-align: middle;
                display: inline-block;
            }
        }
        .sco{
            color:goldenrod;
        }
    }
    .r_lefts{
        flex: .3;
        padding: 0 .2rem;
        text-align: center;
        border-right: 1px solid gray;
        h2{
            font-size: .4rem;
            color: goldenrod;
        }
        p:nth-of-type(1){
            font-size: .3rem;
            padding: .15rem;
        }
        p:nth-of-type(2){
            color:gray;
            font-size: .3rem;
        }
    }
}
</style>



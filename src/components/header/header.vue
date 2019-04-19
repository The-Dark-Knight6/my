<template>
    <div class="home_top">
        <div class="content_host">
            <!-- 背景图片 超出部分需要隐藏 -->
            <div class="bg_img">
                <img :src="data.avatar" alt="bg_img">
            </div>
            <div class="con_img">
                <img :src="data.avatar" alt="imgs_user">
            </div>
            <div class="con_text">
                <div class="con_title">
                    <img src="./brand@2x.png" alt="brand">
                    <span>{{data.name}}</span>
                </div>
                <div class="con_time">
                    <span>{{data.description}}/{{data.deliveryTime}}分钟到达</span>
                </div>
                <!-- 使用v-if指令防止vue报错 莫名其妙的错误 当循环对象数组时出现-->
                <div class="con_money" v-if="data.supports">
                    <img src="./decrease_1@2x.png" alt="decrease">
                    <span>{{data.supports[0].description}}</span>                  
                </div>
            </div>
            <span class="spa_span" v-if="data.supports" @click="shows(true)">{{data.supports.length}}个 ></span>
        </div>
        <div class="con_pub" @click="shows(true)">
            <img src="./bulletin@2x.png" alt="pubs">
            <span>{{data.bulletin}} ></span>
        </div>
        <!-- 弹出的店铺详情 -->
        <transition name="fade">
            <div class="detail" v-if="toshow == true">
                <div class="det_top">
                    <p>{{data.name}}</p>
                    <star :score="data.score"></star>
                </div>
                <div class="det_cen">
                    <div class="desc_line">
                        <div></div>
                        <div class="desc_text">优惠信息</div>
                        <div></div>
                    </div>
                    <div class="desc_cont">
                       <ul>
                           <li v-for="(v,i) in data.supports" :key="i">
                               <!-- 循环遍历 输出图片和相应文字 -->
                               <div class="icon" :class="classmap[v.type]"></div>
                               <span class="txt">{{v.description}}</span>
                           </li>
                       </ul>
                    </div>
                </div>
                <div class="det_cen">
                    <div class="desc_line">
                        <div></div>
                        <div class="desc_text">商家公告</div>
                        <div></div>
                    </div>
                    <div class="desc_cont">
                       <p>{{data.bulletin}}</p>
                    </div>
                </div>
                <span class="clo" @click="shows(false)">&times;</span>
            </div>
        </transition>
    </div>
</template>

<script>
import star from '../star/star'
export default {
    components : {
        star
    },
    props : [
        'data'
    ],
    data(){
        return{
            toshow : false,
        }
    },
    created(){
      this.classmap = ["decrease", "discount", "guarantee", "invoice", "special"]
    },
    methods : {
        // 用于显示和隐藏过渡界面
        shows(e){
            this.toshow = e
        }
    }
}
</script>

<style lang="scss" scoped>
// vue的过度动画
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
ul{
    padding: .25rem 1.5rem;
}
li{
    color: white;
    font-size: .3rem;
    margin: .2rem 0;
    >*{
        vertical-align: middle;
    }
    .icon{
        width: .4rem;
        height: .4rem;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: inline-block;
        margin-right: .1rem;
    }
    .decrease{
        background-image: url('./decrease_1@2x.png')
    }
    .discount{
        background-image: url('./discount_1@2x.png')
    }
    .guarantee{
        background-image: url('./guarantee_1@2x.png')
    }
    .invoice{
        background-image: url('./invoice_1@2x.png')
    }
    .special{
        background-image: url('./special_1@2x.png')
    }
}
.detail{
    background: rgba(7,17,27,0.8);
    position: fixed;
    z-index: 100;
    top: 0%;
    left: 0;
    width:100%;
    height: 100%;
    .clo{
        color: gray;
        font-size:1rem;
        display: block;
        text-align: center;
        margin-top:.5rem;
    }
    .det_cen{
        margin: .3rem 0;
        .desc_cont{
            p{
                text-align: left;
                color: white;
                font-size: .3rem;
                padding: .25rem 1.5rem;
                line-height: .7rem;
            }
        }
        .desc_line{
            text-align: center;
            >*{
                display: inline-block;
                vertical-align: middle;
            }
            div:not(.desc_text){
                width: 2.5rem;
                height: 1px;
                margin: 0 .2rem;
                background: white;
            }
            .desc_text{
                color: white;
                font-size: .35rem;
            }
        }
    }
    .det_top{
        margin-top: 3rem;
        text-align: center;
        font-size: .45rem;
        color: white;
    }
}
.home_top{
    position: relative;
    overflow: hidden;
}
.con_pub{
    letter-spacing: .05rem;
    padding: .2rem ;
    display: inline-block;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    background: rgba(0,0,0,.3);
    color: white;
    box-sizing: border-box;
    img{
        width: .6rem;
        margin-right: .1rem;
    }
    span{
        font-size: .3rem;
    }
    >*{
        vertical-align: middle;
    }
}
.bg_img{
        filter: blur(2px) brightness(50%);
        z-index: -1;
        position: absolute;
        top: 0%;left: 0;
        width: 100%;
        img{
            width: 100%;       
        }
    }
    .spa_span{
        float: right;
        font-size: .35rem;
        color: white;
        background: rgba(0,0,0,.3);
        width:1rem;
        text-align: center;
        margin-top: 1.4rem;
    }
.content_host{
    padding: .5rem ;
    >*{
        vertical-align: middle;
    }
    .con_img{
        display: inline-block;
        width: 2rem;
        img{
            width: 100%;
        }
    }
    .con_text{
        display: inline-block;
        margin-left: .3rem;
        >*{
            margin: .1rem 0;
        }
        .con_money{
            *{
                vertical-align: middle;
            }
            img{
                width:.35rem;
            }
            span{
                font-size: .25rem;
                color: white;
            }
        }
        .con_time{
            span{
                font-size: .3rem;
                color: white;
            }
        }
        .con_title{
            *{
                vertical-align: middle;
            }
            img{
                width: .9rem;
            }
            span{
                font-size: .5rem;
                color: white;
            }
        }
    }
}
</style>



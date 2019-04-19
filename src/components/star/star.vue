<template>
    <div class="star">
        <!-- 用循环遍历一个计算变量 这个变量接受来自后台的评分数据 满分五分 用floor来向下取得分数的下限（整数）
        后用原始分数与这个的差值得到 半颗星 而首先则添加相应的满星（for循环 i小于分数下限时 ++）
        最后当星未满5时 加上灰色的（未评分，代表0）星即可 此vue可以用在多个页面用来当做评分 -->
        <div class="star-item" :class="c" v-for="(c,i) in starclass" :key="i"></div>
    </div>
</template>

<script>
const ON = 'on'
const HALF = 'half'
const OFF = 'off'
export default {
    props : {
        score : Number
    },
    computed : {
        starclass(){
            const scs = [];
            var score = this.score;
            var the_score = Math.floor(score);//进行下舍入 （例如：3.8取3，2.4取2）
            for(let i = 0 ; i < the_score ; i++){
                scs.push(ON)
            }
            //判断是否超过半颗心（0.5为界限） 超过则添加
            if(score - the_score >= 0.5){
                scs.push(HALF)
            }
            //补全五颗星的满分 未满的用 灰色星星补上
            while(scs.length < 5){
                scs.push(OFF)
            }
            return scs
        }
    }
}
</script>

<style lang="scss" scoped>
.star{
    margin: .35rem 0;
    text-align: center;
    .star-item{
        display: inline-block;
        width: .4rem;
        height: .4rem;
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .on{
        background-image: url('./star24_on@2x.png')
    }
    .off{
        background-image: url('./star36_off@2x.png')
    }
    .half{
        background-image: url('./star24_half@2x.png')
    }
}
</style>




<template>
    <div class="carcontrol">
        <transition name="move">
            <div class="car_decrease" v-show="food.count"
            @click.stop="updates(food,false,$event)" >
                <span>-</span>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count">
            {{food.count}}
        </div>
        <div class="cart_add" @click.stop="updates(food,true,$event)">
            <span>+</span>
        </div>
    </div>
</template>

<script>
export default {
    props : {
        food : Object,
        updates : Function
    }
}
</script>

<style lang="scss" scoped>
.carcontrol {
    >*{
        vertical-align: middle;
    }
    .car_decrease{
        display: inline-block;
        border:2px solid rgb(0,160,220);
        font-size: .5rem;
        background: white;
        width: .5rem;
        height: .5rem;
        border-radius: 50%;
        text-align: center;
        line-height: .4rem;
        color:rgb(0, 160, 220);
        // 点击增加的动画
        &.move-enter-active,&.move-leave-active{
        transition : .4s
        }
        &.move-enter,&.move-leave-active{
            opacity: 0;
            transform: translate3d(34px,0,0) rotate(180deg)
        }
    }
    .cart-count{
        display: inline-block;
        padding: 0 .15rem;
        text-align: center;
        font-size: .4rem;
        color: rgb(147,153,159);
    }
    .cart_add{
        display: inline-block;
        background: rgb(0,160,220);
        font-size: .5rem;
        color: white;
        width: .5rem;
        height: .5rem;
        border-radius: 50%;
        text-align: center;
       line-height: .4rem;
       border: 2px solid #00a0dc;
    }
}
</style>



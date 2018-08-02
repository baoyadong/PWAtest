<template>
<div class="goods">
	<div class="menu-wrapper" ref='menuWrapper'>
   <ul>
      <li v-for='(item,index) in goods' class="menu-item" :key='item.id' :class="{current:currentIndex == index}" @click='selectMenu(index)'>
         <span class="text border-1px">
         <span v-show='item.type > 0' :class='classMap[item.type]' class="icon"></span>{{item.name}}
         </span>
      </li>
    </ul> 
  </div>
    <div class="foods-wrapper" ref='foodsWrapper'>  
       <ul>
         <li v-for='item in goods' class="food-list food-list-hook">
           <h1 class="title">{{item.name}}&nbsp;({{item.foods.length}})</h1>
           <ul>
             <li v-for='food in item.foods' class="food-item border-1px">
               <div class="icon">
                 <img width="57" height="57" :src="food.icon">
               </div>
               <div class="content">
                 <h2 class="name">{{food.name}}</h2>
                 <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}}份</span><!--
                    --><span>好评率 {{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">¥{{food.price}}</span><!--
                    --><span class="old" v-show='food.oldPrice'>¥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food='food'></cartcontrol>
                  </div>
               </div>
             </li>
           </ul>
         </li>
       </ul>
    </div>
    <shopcart ref='shopcart' :select-foods='selectFoods' :delivery-price='seller.deliveryPrice' :min-price='seller.minPrice'></shopcart>
</div>
	
</template>
<script>

import BScroll from 'better-scroll';
import shopcart from '@/components/shopcart/shopcart';
import cartcontrol from '@/components/cartcontrol/cartcontrol';

const ERR_OK = 0;

 export default {
    props: {
    seller: {
        type: Object
    }
 },
    data() {
        return {
          goods: [],
          listHeight: [],
          scrollY: 0
      };
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() { // 注意点：父传子是一个对象，子组件对象内的购买数量改变，导致父组件的数量也接着改变。
        let foods = [];
        console.log(this.goods);
        this.goods.forEach(good => {
          good.foods.forEach(food => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods; // 找到所有选择的foods
      }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        this.$http.get('/api/goods').then((response) => {
            response = response.body;
            if (response.errno === ERR_OK) {
                this.goods = response.data;
                console.log(this.goods);
                this.$nextTick(() => { // 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
                  this._initScroll();
                  this._calculateHeight();
                });
          }
       });
    },
    methods: {
      selectMenu(index) {
        let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook');
        let el = foodList[index];
        this.foodScroll.scrollToElement(el, 300);
      },
      _drop(target) {
        this.$refs.shopcart.drop(target);
      },
      _initScroll() {
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        });
        this.foodScroll.on('scroll', pos => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
    },
    components: {
      shopcart,
      cartcontrol
    },
    events: {
      'cart.add'(target) {
        this._drop(target);
      }
    }
 };

</script>

<style lang='less'>
 @import "../../common/css/same.less";
.bg-image(@u){ // 注意点： 只能放在同一个环境中，不能放在same.less中，否则无法引入；
  background-image: url('@{u}@2x.png');
  @media(-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3){
    background-image: url('@{u}@3x.png');
  }
}
	.goods {
	   display: flex;
       position: absolute;
       top:176px;bottom: 46px;
       width:100%;
       overflow: hidden;
		.menu-wrapper{
			flex:0 0  80px;
			width: 80px; //需要写，安卓浏览器可能会出现问题；
			background-color: #f3f5f7;
      .menu-item {
        display: table; //多行文字垂直居中
        height: 54px;
        width: 56px;
        padding:0 12px;
        line-height: 14px;
        &.current {
          position: relative;
          z-index: 10;
          margin-top:-1px;
          background: #fff;
          .text {
            font-weight: 700;
            .border-none();
          }

        }
        .icon {
              display: inline-block;
              width: 16px;height: 16px;
              vertical-align: top;
              margin-right: 2px;
              background-size: 16px 16px;
              background-repeat: no-repeat;
              &.decrease { .bg-image('decrease_3');}
              &.discount { .bg-image('discount_3');}
              &.guarantee { .bg-image('guarantee_3');}
              &.invoice { .bg-image('invoice_3');}
              &.special {.bg-image('special_3');}
        }
        .text {
          display: table-cell;
          width: 56px;
          vertical-align: middle;
          .border-1px(rgba(7,17,27,0.1));
          font-size: 12px;

        }
      }

		}
		.foods-wrapper{
            flex:1;
       .title {
        padding-left: 14px;
        height: 26px;line-height: 26px;
        border-left:2px solid #d9dde1;
        font-size: 12px;
        color:rgb(147,153,159);
        background: #f3f5f7;
       }
       .food-item {
        display: flex;
        margin:18px;
        padding-bottom: 18px;
        .border-1px(rgba(7,17,27,0.1));
        &:last-child {
          .border-none();
          margin-bottom: 0;

        }
        .icon {
          flex:0 0 57px;
          margin-right: 10px;
        }
        .content {
          flex:1;
          .name {
            margin:2px 0 8px 0;
            height: 14px;line-height: 14px;
            font-size: 14px;
            color: rgb(7,17,27);
          }
          .desc,.extra {
            line-height: 12px;
            font-size: 10px;
            color:rgb(147,153,159);
          }
          .desc { margin-bottom: 8px;}
          .extra {
            line-height: 10px;
            .count {
              margin-right: 12px;
            } 
          }
          .price {
            font-weight: 700;
            line-height: 24px;
            .now {
              margin-right: 8px;
              font-size: 14px;
              color:rgb(240,20,20);
            }
            .old {
              text-decoration: line-through;
              font-size: 10px;
              color:rgb(147,153,159);
            }
          }
          .cartcontrol-wrapper {
            position: absolute;
            right: 0;bottom: 12px;
          }
        }
       }     
		}

	}
</style>/*假如代码到此结束，那么必须在下面加一行空行*/

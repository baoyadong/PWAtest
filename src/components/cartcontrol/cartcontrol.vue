<template>
  <div class="cartcontrol">
  	<div class="cart-decrease" @click='decreaseCart'>
  	  <transition name='move'>
  	  	<span class="inner icon-remove_circle_outline" v-show='food.count > 0'></span>
  	  </transition>
  	</div>
  	<div class="cart-count" v-show='food.count > 0'>{{food.count}}</div>
  	<div class="cart-add icon-add_circle" @click='addCart'></div>
  </div>
	
</template>
<script>
  import Vue from 'vue';

	export default {
		props: {
			food: {
        type: Object
     }
		},
		created() {
		},
		methods: {
			addCart(event) {
				if (!this.food.count) {
					Vue.set(this.food, 'count', 1); // 使用set方法，food的count的变化能够观察到；
					// this.food.count = 1;
				} else {
					this.food.count++;
				}
				this.$dispatch('cart.add', event.target);
			},
			decreaseCart() {
				if (this.food.count) {
					this.food.count--;
				}
			}
		}
	};

</script>

<style lang='less'>
	.cartcontrol {
		font-size: 0;
		.cart-decrease {
			font-size: 24px;
			display: inline-block;
			padding: 6px;
			.move-enter-active, .move-leave-active {
			 	transition: all 0.4s linear;
			 }
			.inner {
				line-height: 24px;
				font-size: 24px;
			    color: rgb(0, 160, 220);
			}
			.move-enter, .move-leave-to {
				opacity: 0;
				transform: translate3D(48px, 0, 0);
			}
		}
		.cart-count {
			display: inline-block;
			vertical-align: top;
			width: 12px;
			padding-top: 6px;
			line-height: 24px;
			text-align: center;
			font-size: 10px;
			font-weight: bold;
			color: #000;
		}
		.cart-add {
			display: inline-block;
			line-height: 24px;
			padding:6px;
			font-size: 24px;
			color: rgb(0, 160, 220);
		}
	}
</style>

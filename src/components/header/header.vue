<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img :src="seller.avatar" width="64" height="64">
			</div><!--消除元素间的间隙
			--><div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{dd}}小时送达
				</div>
				<div class="support" v-if='seller.supports'>
					<span class="icon" :class="classMap[seller.supports[0].type]"></span><span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div><!--
			--><div class="support-count" v-if='seller.supports' @click= "showDetail">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper" @click= "showDetail">
			<span class="bulletin-title"></span><!--
			--><span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%">
		</div>
		<div class="detail" v-show='detailShow'>
			<div class="detail-wrapper clearfix">
				<div class="detail-main">
					<h1 class="detail-name">{{seller.name}}</h1>
					<div class="star-wrapper">
						<star :size='48' :score='seller.score'></star>
					</div>
					<div class="title">
						<div class="line"></div>
						<div class="text">优惠信息</div>
						<div class="line"></div>
					</div>
					<ul v-if='seller.supports' class="supports">
						<li class="support-item" v-for='(item,key) in seller.supports'>
							<span class="icon" :class='classMap[item.type]'></span>
							<span class="text">{{item.description}}</span>
						</li>
					</ul>
					<div class="title">
						<div class="line"></div>
						<div class="text">商家公告</div>
						<div class="line"></div>
					</div>
					<div class="bulletin">
						<p class="content">
							{{seller.bulletin}}
						</p>
					</div>
				</div>
			</div>
			<div class="detail-close">
				<i class="icon-close" @click='detailClose'></i>
			</div>
		</div>
	</div>
</template>
<script>
import star from '@/components/star/star';

 export default {
   props: {
    seller: {}
   },
   data() {
    return {
      detailShow: false
   };
   },
   methods: {
    showDetail() {
     this.detailShow = true;
   },
    detailClose() {
    this.detailShow = false;
    }
   },
   created() {
     this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
   },
   computed: {
     dd: function() {
      return (this.seller.deliveryTime / 60).toFixed(3); // 保留看看
   }
  },
  components: {
     star
  }
 };

</script>

<style scoped lang='less'>
@import "../../common/css/same.less";
.bg-image(@u){ // 注意点： 只能放在同一个环境中，不能放在same.less中，否则无法引入；
	background-image: url('@{u}@2x.png');
	@media(-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3){
		background-image: url('@{u}@3x.png');
	}
}
.header {
	position: relative;
	overflow: hidden;
	color: #fff;
	background: rgba(7, 17, 27, 0.5);
	// filter:blur(10px);整个header页全部都是模糊的；
	.content-wrapper {
		position: relative;
		padding:24px 12px 18px 24px;
		.avatar {
			display: inline-block;
			// vertical-align: top;
			img {
				border-radius: 2px;
			}
		}
		.content {
			display: inline-block;
			margin-left:16px;
			.title {
				margin:2px 0 8px 0;
				.brand {
					display: inline-block;
					vertical-align: top; // 字体和图片对齐
					width:30px;height: 18px;
				    .bg-image('brand');
					background-size: 30px 18px;
					background-repeat: no-repeat;

				}
				.name {
					margin-left: 6px;
					font-size: 16px;
					line-height: 18px;
					font-weight: bold;
				}
			}
			.description {
				margin-bottom:10px;
				line-height: 12px;
				font-size: 12px;
			}
			.support {
				//font-size: 0;
				.icon {
					display:inline-block;
					vertical-align: top;
					width:12px;
					height: 12px;
					margin-right: 4px;
					background-size: 12px 12px;
					background-repeat: no-repeat;
					&.decrease { .bg-image('decrease_1');}
					&.discount { .bg-image('discount_1');}
					&.guarantee { .bg-image('guarantee_1');}
					&.invoice { .bg-image('invoice_1');}
					&.special {.bg-image('special_1');}
			}
			    .text {
                    line-height: 12px;
			    	font-size: 12px;
			    	vertical-align: top;
			}
			}
		}
		.support-count {
			position: absolute;
			right: 12px;bottom:18px;padding:0 8px;
			height: 24px;line-height: 24px;
			border-radius: 14px;
			background-color: rgba(0, 0, 0, 0.2);
			text-align: center;
			.count {
				vertical-align: top;
			}
			.icon-keyboard_arrow_right{
				font-size: 10px;margin-left: 2px;
			}
		}
	}
	.bulletin-wrapper{
		position: relative;
		height: 28px;line-height: 28px;
		padding:0 22px 0 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow:ellipsis;
		background-color: rgba(7, 17, 27, 0.2);
		.bulletin-title {
			margin-top: 9px;
			vertical-align: top;
			display: inline-block;
			width:22px;height: 12px;
			.bg-image('bulletin');
			background-size: 100% 100%;
	        background-repeat: no-repeat;     
		}
		.bulletin-text {
			font-size: 10px;
			margin:0 4px;height: 28px;

		}
		.icon-keyboard_arrow_right {
            position: absolute;
            font-size: 10px;right: 12px;top:10px;
		}
	}
	.background {
		position: absolute;
		top:0;left:0;width: 100%;height: 100%;z-index:-1;
		filter:blur(10px);
	}
	.detail {
		position: fixed;
		z-index: 5;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: rgba(7, 17, 27, 0.8);
		top:0;left:0;
		.detail-wrapper {
			width: 100%;
		    min-height: 100%;
			.detail-main {
				margin-top: 64px;
				padding-bottom:64px; // 关键点注意
				.detail-name {
					line-height: 16px;
					text-align: center;
					font-size:16px;
					font-weight: 700;
				}
				.star-wrapper {
					text-align: center;
					margin-top:16px;
					padding:2px 0;
				}
				.title {
					display: flex;
					width: 80%;
					margin:28px auto 24px auto;
					.line {
						flex:1;
						position: relative;
						top:-6px;
						border-bottom:1px solid rgba(255,255,255,0.2);

					}
					.text {
						padding:0 12px;
						font-size: 14px;
						font-weight: 700;

					}
				}
				.supports {
					width: 80%;
					margin:0 auto;
					.support-item {
						padding:0 12px;
						margin-bottom: 12px;
						font-size: 0;
						&:last-child {
							margin-bottom: 0;
						}
						.icon {
							display: inline-block;
							width: 16px;height: 16px;
						    vertical-align: top;
							margin-right: 6px;
							background-size: 16px 16px;
							background-repeat: no-repeat;
                            &.decrease { .bg-image('decrease_2');}
							&.discount { .bg-image('discount_2');}
							&.guarantee { .bg-image('guarantee_2');}
							&.invoice { .bg-image('invoice_2');}
							&.special {.bg-image('special_2');}
						}
                        .text {
                        	line-height: 16px;font-size: 12px; //line-height:16px 实现垂直居中；
                        	font-weight: 200;color: rgb(255,255,255);
                        }
					}
				}
				.bulletin {
					width: 80%;margin:24px auto 0;
					.content {
						line-height: 24px;font-size: 12px;
						font-weight: 200;padding:0 12px;
					    color: rgb(255,255,255);text-align: justify;
					}
				}
			}
		}
	    .detail-close {
			position: relative;
			width: 32px;height: 32px;
            margin:-64px auto 0 auto; // 2.关键点注意；
            clear:both;font-size: 32px;
		}
	}
}
	
</style>/*假如代码到此结束，那么必须在下面加一行空行*/

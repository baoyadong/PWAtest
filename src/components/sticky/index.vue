<template>
	<div :style="{height: height + 'px'}" class="nav">
		<div :style="{top: stickyTop + 'px', zIndex: zIndex, position: position, width: width, height: height + 'px'}">
			<slot> Sticky </slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'sticky',
		props: {
			stickyTop: {
				type: Number,
				default: 0
			},
			zIndex: {
				type: Number,
				default: 10
			}
		},
		data() {
			return {
				position: '',
				width: '100%',
				height: null,
				active: false
			};
		},
		mounted() {
			this.height = this.$el.getBoundingClientRect().height;
			window.addEventListener('scroll', this.handleScroll);
		},
		methods: {
			handleScroll() {
				// console.log(this);
				/* 注意点： this.$el是sticky组件的根元素<div class='nav'></div>,此父级必须有，否则sticky无法使用；
				*/
				let divTop = this.$el.getBoundingClientRect().top;
				if (divTop <= this.stickyTop) {
					this.sticky();
				} else {
					this.reset();
				}
			},
			sticky() {
				if (this.active) {
					return false;
				}
				this.position = 'fixed';
				this.active = true;
			},
			reset() {
				if (!this.active) {
					return false;
				}
				this.position = '';
				this.active = false;
			}
		}
	};

</script>

<style lang='less'>
	
</style>

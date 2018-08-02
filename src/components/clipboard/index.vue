<template>
	<div id="clipContainer">
		<input v-model='inputData' class="inputStyle">
	    <button class="copyBtn" @click='handleCopy(inputData,$event)'>copy</button>
	     <br>
	     <br>
	    <input v-model='inputData1' class="inputStyle">
	    <button class="copyBtn" v-clipboard:copy='inputData1' v-clipboard:success='clipboardSuccess'>指令复制</button>
	</div>

</template>

<script>
    import clip from '@/utils/clipboard';
    import clipboard from '@/directive/clipboard/index.js';
	export default {
		data() {
			return {
				inputData: 'www.baidu.com/cn',
				inputData1: '指令复制功能'
			};
		},
		directives: {
			clipboard
		},
		methods: {
			handleCopy(text, e) {
				clip(text, e);
			},
			clipboardSuccess() {
				window.alert('clip success');
			}
		}

	};
</script>
<style>
    #clipContainer {
    	border: 1px solid green;
    }
	.inputStyle {
		border: 1px solid #ccc;
	}
	.copyBtn {
		vertical-align: top;
		background-color: #ccc;
	}
</style>

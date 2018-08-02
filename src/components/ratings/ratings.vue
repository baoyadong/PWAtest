<template>
	<div style="height:200vh;">
		<sticky>
			<div class="tab">
				<div>news</div>
				<div>blog</div>
				<div>name</div>
			</div>
		</sticky>
		<clipboard class='clipClass'></clipboard>
		<!-- <a v-tap='{"method": "handleTap"}'>tap</a> -->
		<div class="logincontainer">
			<div class="head">用户登录</div>
	        <input name="telephone" v-validate="{ rules: { required:true} }" :class="{'is-danger': errors.has('telephone') }" placeholder="手机/邮箱" class="input-style telephone" v-model="userName" tabindex="1">
	        <input name="password" v-validate="{ rules: { regex: /.{6,20}$/} }" :class="{'is-danger': errors.has('password') }" placeholder="密码" type="password" class="input-style passwd-style" v-model="passwd" tabindex="2">
	        <div :class="{'is-ok': !errors.any()&&userName&&passwd}" class="jump-to" tabindex="4" @click='login'>登录</div>
        </div>
        <div class="form-input">
		  <input type="text" name="email" v-validate="'required|email'" placeholder="Email">
		  <span v-show="errors.has('field')">{{ errors.first('field') }}</span>
		  <span v-show="fields.email && fields.email.dirty">I'm Dirty</span>
		  <span v-show="fields.email && fields.email.touched">I'm touched</span>
		  <span v-show="fields.email && fields.email.valid">I'm valid</span>
		</div>
		<back-to-top :customStyle='customStyle' :visibilityHeight='300' :backPosition='50' transitionName="fade"></back-to-top>
	</div>
</template>
<script>
 import backToTop from '@/components/backToTop';
 import sticky from '@/components/sticky';
 import clipboard from '@/components/clipboard';
 // import vuetap from '@/directive/vuetap/index.js';

 export default {
	components: {
		backToTop,
		sticky,
		clipboard
	},
	// directives: {
	// 	vuetap
	// },
	data() {
		return {
			customStyle: undefined, // customStyle必须是undefined,才能保证default默认值生效
			userName: '',
			passwd: ''

		};
	},
	methods: {
		handleTap() {
			alert('tap');
		},
		login() {
			/*
			  any() - 当前表单是否有任何错误(true/false)
			  has('field') - 当前filed是否有错误(true/false)
			*/
		}
	},
	mounted() {
		console.log(this.errors);
	}
 };

</script>

<style scoped lang='less'>
.tab {
	display: flex;
	width: 100%;
	justify-content: space-around;
}
.clipClass {
	margin-top: 10px;
}
.logincontainer {
	margin-top: 14px;
	text-align: center;
	.input-style {
		margin-top: 10px;
		border: 1px solid #ccc;
	}
	.input-style.is-danger {
		border: 1px solid red;
	}
	.jump-to {
	    width: 100px;
	    height: 56px;
	    line-height: 56px;
	    margin: 40px auto 16px;
	    border: 1px solid #DFE3EB;
	    border-radius: 4px;
	    font-size: 18px;
	    text-align: center;
	    cursor: pointer;
	    color: #B0C1D4;
	    background: #EAF0F6;
	}
	.jump-to.is-ok {
		background: #5488F9;
        color: #fff;
	}
}
.form-input {
	input {
		border: 1px solid #ccc;
	}
}
	
</style>/*假如代码到此结束，那么必须在下面加一行空行*/

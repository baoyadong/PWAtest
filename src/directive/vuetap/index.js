import tap from './vuetap.js';
const install = function(Vue) {
	Vue.directive('tap', tap);
};
tap.install = install;

if (window.Vue) {
	window.tap = tap;
	Vue.use(install);
}

export default tap;

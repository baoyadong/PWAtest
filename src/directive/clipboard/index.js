import Clipboard from './clipboard';
const install = function (Vue) {
	Vue.directive('Clipboard', Clipboard); // 全局注册指令
};
if (window.Vue) {
	window.clipboard = Clipboard;
	// 通过全局方法 Vue.use() 使用插件：
	Vue.use(install);
}
// 插件的公共方法 install
Clipboard.install = install;
export default Clipboard;

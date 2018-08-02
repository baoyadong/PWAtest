const Clipboard = require('Clipboard');
if (!Clipboard) {
	throw new Error('you shold npm install `clipboard` --save at first ');
}
export default {
    /* 指令钩子函数会被传入以下参数：
        el：指令所绑定的元素，可以用来直接操作 DOM,---> 注意el是个对象 。
        binding：一个对象，包含以下属性：
        name：指令名，不包括 v- 前缀。
        value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
        oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
        expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
        arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
        modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
        vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
        oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
    */
	bind(el, binding) {
		if (binding.arg === 'success') {
			el._v_clipboard_success = binding.value;
		} else if (binding.arg === 'error') {
			el._v_clipboard_error = binding.value;
             console.log(el, el._v_clipboard_error);
		} else {
			const clipboard = new Clipboard(el, {
			text() { return binding.value; },
			action() { return binding.arg === 'cut' ? 'cut' : 'copy'; }
        });
        clipboard.on('success', e => {
			const callback = el._v_clipboard_success;
			callback && callback(e); // eslint-disable-line
        });
        clipboard.on('error', e => {
			const callback = el._v_clipboard_error;
			callback && callback(e); // eslint-disable-line
        });
          el._v_clipboard = clipboard;
      }
	},
	update(el, binding) {
		if (binding.arg === 'success') {
			el._v_clipboard_success = binding.value;
		} else if (binding.arg === 'error') {
			el._v_clipboard_error = binding.value;
		} else {
            el._v_clipboard.text = function() { return binding.value; };
            el._v_clipboard.action = function() { return binding.arg === 'cut' ? 'cut' : 'copy'; };
		}
	},
	unbind(el, binding) {
		if (binding.arg === 'success') {
			delete el._v_clipboard_success;
		} else if (binding.arg === 'error') {
			delete el._v_clipboard_error;
		} else {
			el._v_clipboard.destroy();
			delete el._v_clipboard;
		}
  }
};

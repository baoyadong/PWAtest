function isPc() {
	var uaInfo = navigator.userAgent;
	var agents = ['Android', 'iPhone', 'Windows Phone', 'iPad', 'iPod'];
	var flag = true;
	for (var i = 0; i < agents[i].length; i++) {
		if (uaInfo.indexOf(agents[i] > 0)) {
			flag = false;
			break;
		}
	}
	return flag;
}
function isTap(self) {
	if (self.disabled) {
		return false;
	}
	let tapObj = self.tapObj;
	return self.time < 300 && Math.abs(tapObj.distanceX) < 10 && Math.abs(tapObj.distanceY) < 10;
}
function touchstart(e, self) {
	var touches = e.touches[0];
	var tapObj = self.tapObj;
	tapObj.pageX = touches.pageX;
	tapObj.pageY = touches.pageY;
	tapObj.clientX = touches.clientX;
	tapObj.clientY = touches.clientY;
	self.time = +new Date();
}
function touchend(e, self) {
	var touches = e.changedTouches[0];
	var tapObj = self.tapObj;
	self.time = +new Date() - self.time;
	tapObj.distanceX = tapObj.pageX - touches.pageX;
	tapObj.distanceY = tapObj.pageY - touches.pageY;
	if (!isTap(self)) { return false; }
	self.handler(e);
}
// 具体的指令方法
export default {
	bind: function(el, binding) {
		el.tapObj = {};
		el.handler = function(e, isPc) {
			var value = binding.value;
			if (!value && el.href && !binding.modifiers.prevent) {
				return window.location = el.href;
			}
			value.event = e;
			var tagName = value.event.target.tagName.toLocaleLowerCase();
			!isPc ? value.tapObj = el.tapObj : null;
			if (tagName === 'input' || tagName === 'textarea') {
				return value.event.target.focus();
			}
			value.methods.call(this, value);
		};
		if (isPc()) {
			el.addEventListener('click', function(e) {
				if (binding.modifiers.stop) {
					e.stopPropagation();
				}
				if (binding.modifiers.prevent) {
					e.preventDefault();
				}
				el.handler(e, true);
			});
		} else {
			el.addEventListener('touchstart', function(e) {
				if (binding.modifiers.stop) {
					e.stopPropagation();
				}
				if (binding.modifiers.prevent) {
					e.preventDefault();
				}
				touchstart(e, el);
			});
			el.addEventListener('touchend', function(e) {
				try {
					Object.defineProperty(e, 'currentTarget', {
						value: el,
						writable: true,
						enumerable: true,
						configurable: true
					});
				} catch (e) {
					// ios7下对e.currentTarget用defineProperty会报错
					console.error(e.message);
					e.currentTarget = el;
				}
				e.preventDefault();
				return touchend(e, el);
			});
		}
	},
	componentUpdated: function(el, binding) {
		el.tapObj = {};
		el.handler = function(e, isPc) {
			var value = binding.value;
			if (!value && el.href && !binding.modifiers.prevent) {
				return window.location = el.href;
			}
			value.event = e;
			!isPc ? value.tapObj = el.tapObj : null;
			value.methods.call(this, value);
		};
	},
	unbind: function(el) {
		// 卸载
		el.handler = function() {};
	}
};

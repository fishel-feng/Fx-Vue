function Observer(data) {
  this.data = data;
  // 遍历
  this.walk(data);
}

Observer.prototype = {
  walk: function (data) {
    let self = this;
    Object.keys(data).forEach(function (key) {
      self.defineReactive(data, key, data[key]);
    });
  },
  defineReactive: function (data, key, val) {
    let dep = new Dep();
    let childObj = observe(val);
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: function getter() {
        if (Dep.target) {
          // 添加订阅者
          dep.addSub(Dep.target);
        }
        return val;
      },
      set: function setter(newVal) {
        if (newVal === val) {
          return;
        }
        val = newVal;
        // 发生变化时通知订阅者
        dep.notify();
      }
    });
  }
};

// 对value创建监听者
function observe(value, vm) {
  if (!value || typeof value !== 'object') {
    return;
  }
  return new Observer(value);
}


// 消息订阅器，负责维护订阅者数组
function Dep() {
  // 订阅者数组
  this.subs = [];
}

Dep.prototype = {
  // 添加订阅者
  addSub: function (sub) {
    this.subs.push(sub);
  },
  // 通知订阅者
  notify: function () {
    this.subs.forEach(function (sub) {
      sub.update();
    });
  }
};

Dep.target = null;

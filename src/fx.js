function Fx(options) {
  // 绑定this
  let self = this;
  this.data = options.data;
  this.methods = options.methods;
  // 遍历data，把每一个key都使用Object.defineProperty定义
  Object.keys(this.data).forEach(function (key) {
    self.proxyKeys(key);
  });
  observe(this.data);
  // new Compile(options.el, this);
  // options.mounted.call(this);
}

Fx.prototype = {
  // 使用Object.defineProperty定义key
  proxyKeys: function (key) {
    let self = this;
    Object.defineProperty(this, key, {
      enumerable: false,
      configurable: true,
      get: function getter() {
        return self.data[key];
      },
      set: function setter(newVal) {
        self.data[key] = newVal;
      }
    });
  }
};

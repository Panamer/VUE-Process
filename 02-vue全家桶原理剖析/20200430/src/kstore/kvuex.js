// 目标1：实现Store类，管理state（响应式的），commit方法和dispatch方法
// 目标2：封装一个插件，使用更容易使用
let Vue;
const forEachValue = (obj, fn) => {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}
const partial = (fn, arg) =>{
  return function () {
    return fn(arg)
  }
}

const computed = {}

class Store {
  constructor(options) {
    this.getters = {}
    // reset local getters cache
    const wrappedGetters = options.getters
    forEachValue(wrappedGetters, (fn, key) => {
      computed[key] = partial(fn, options.state)
      Object.defineProperty(this.getters, key, {
        get: () => this._vm[key],
        enumerable: true // for local getters
      })
    })
    // 定义响应式的state
    // this.$store.state.xx
    // 借鸡生蛋
    this._vm = new Vue({
      data: {
        $$state: options.state
      },
      computed
    })
    
    this._mutations = options.mutations
    this._actions = options.actions
    this._getters = options.getters

    // 绑定this指向
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }

  // 只读
  get state() {
    return this._vm._data.$$state
  }

  set state(val) {
    console.error('不能直接赋值呀，请换别的方式！！天王盖地虎！！');
    
  }
  
  // 实现commit方法，可以修改state
  commit(type, payload) {
    // 拿出mutations中的处理函数执行它
    const entry = this._mutations[type]
    if (!entry) {
      console.error('未知mutaion类型');
      return
    }

    entry(this.state, payload)
  }

  dispatch(type, payload) {
    const entry = this._actions[type]

    if (!entry) {
      console.error('未知action类型');
      return
    }

    // 上下文可以传递当前store实例进去即可
    entry(this, payload)
  }

}

function install(_Vue){
  Vue = _Vue

  // 混入store实例
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

// { Store, install }相当于Vuex
// 它必须实现install方法
export default { Store, install }
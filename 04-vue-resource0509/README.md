### 源码剖析01
runtime版本 不包含编辑器 不支持template 平时用的就是这个版本 因为webpack打包的过程已经把模板预编译了  vue-loader

## 01查看源码的入口文件是：src\platforms\web\entry-runtime-with-compiler.js
- 引入默认$mount方法，并扩展它 编译template
```
const mount = Vue.prototype.$mount
Vue.prototype.$mount = function ()

```
- 处理render或者template或者el三个选项  优先级 render > template > el
```
if(!options.render)
let template = options.template
if(template){

} else if (el) {

}
```

## 02 vue的来源： \src\platforms\web\runtime\index.js

- 安装平台补丁函数
```
Vue.prototype.__patch__ = inBrowser ? patch : noop
```
- 实现mount方法 调用mountComponent
```
Vue.prototype.$mount = function()
```

## 03 vue来源：\src\core\index.js
- 初始化全局API
```
initGlobalAPI(Vue)
```

## 04 vue庐山真面目: \src\core\instance\index.js
- 声明构造函数、初始化、用混入方法扩展vue构造函数 实现多个实例方法和属性
```
// Vue构造函数
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 初始化
  this._init(options)
}

// 扩展Vue构造函数，实现多个”实例方法“"实例属性”
initMixin(Vue) // _init()
stateMixin(Vue) // $data/$set/$watch/$delete/$props
eventsMixin(Vue) // $on/$off/...
lifecycleMixin(Vue) // $_update()/$destroy/$forceupdate
renderMixin(Vue) // $nextTick / _render()
```



# 初始化都做了什么  \src\core\instance\init.js
- 选项合并
- 初始化核心代码 两个生命周期：beforeCreate、 created
```
    initLifecycle(vm) // $parent/$children等等
    initEvents(vm) // 事件监听
    initRender(vm) // 插槽、_c...
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm) // 初始化data、prop、method并执行响应式
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created') // 这里可以访问组件状态
```
- data/method/props不能重名： \src\core\instance\state.js
```
  // proxy data on instance
  // data/method/props不能重复
```



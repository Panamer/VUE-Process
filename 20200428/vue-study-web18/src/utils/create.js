import Vue from 'vue'

// 可以动态创建组件实例并挂载至body
export const createkkb = (Component, props) => {
  // 1.组件实例怎么创建？
  // 方式1：组件配置对象 =》 Ctor = Vue.extend(Component)变成构造函数
  // =》 new Ctor()
  // 方式2：借鸡生蛋new Vue({render() {}}),在render中把Component作为根组件
  const vm = new Vue({
    // h是createElement函数，它可以返回虚拟dom
    render(h) {
      console.log(h(Component,{props}));
      
      // 将Component作为根组件渲染出来
      // h(标签名称或组件配置对象，传递属性、事件等，孩子元素)
      return h(Component, {props})
    }
  }).$mount() // 挂载是为了把虚拟dom变成真实dom
  // 不挂载就没有真实dom
  // 手动追加至body
  // 挂载之后$el可以访问到真实dom
  document.body.appendChild(vm.$el)

  console.log(vm.$el);
  
  // 实例
  const comp = vm.$children[0]

  // 淘汰机制
  comp.remove = () => {
    // 删除dom
    document.body.removeChild(vm.$el)

    // 销毁组件
    vm.$destroy()
  }

  // 返回Component组件实例
  return comp
}
export const create = (Component, props) => {
  // 组件是对象
  // vue.extend构造器返回一个构造函数，参数是一个包含组件选项的对象，也可以是vue文件
  // data 选项是特例，需要注意 - 在 Vue.extend() 中它必须是函数
  const NoticeConstractor = Vue.extend(Component);
  // 组件构造函数 参数是组件所需要的属性对象。
  // 实例化得到实例 并挂载 得到真实dom
  // 这里和上面不同的是 直接就拿到了实例 不需要取children
  const comp = new NoticeConstractor({
    propsData: props
  }).$mount()
  
  // 追加dom
  document.body.appendChild(comp.$el)

  // 此处有坑：直接log是拿不到el的，打印出来的是<!---->。加了setTimeout就好了，猜测$mount方法是异步的，正在探究
  // 使用alert会发现：alert和<!---->同时出现，然后 <!----> 变成了真实dom

  console.log('-------------');
  // setTimeout(() => {
  alert(comp.$el);
  // }, 0)
  console.log('-------------');
  
  // 淘汰机制
  comp.remove = () => {
    // 删除dom
    document.body.removeChild(comp.$el)
    // 销毁组件
    comp.$destroy()
  }
  
  return comp
}

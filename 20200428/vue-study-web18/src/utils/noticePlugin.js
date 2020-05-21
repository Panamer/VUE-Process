import Notice from '@/components/Notice'

const noticePlugin = {
  install(Vue) {
    Vue.prototype.$notice = (props= {
      title: '头条',
      message: '村长是王者，大圣不服气'
    }) => {
      const Comp = Vue.extend(Notice);
      let vm = new Comp({
        propsData: props
      })
  
      vm.$mount();
      document.body.appendChild(vm.$el)

      Vue.nextTick().then(function() {
        console.log(vm.$el);
      })

      vm.hide = () => {
        vm.isShow = false;
        vm.remove();
      }
      vm.remove = () => {
        document.body.removeChild(vm.$el);
        vm.$destroy();
      }

      vm.isShow = true;
      setTimeout(vm.hide, 2000);
  
    }
  }
}
export default noticePlugin
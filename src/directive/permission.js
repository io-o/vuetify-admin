import Vue from 'vue'

/**
 * 自定义指令 判断是否有操作权限
 */

Vue.directive('permission', {
  inserted(el, binding, vnode) {
    const { value } = binding
    if (!value.insert && el.id === 'insert') {
      el.parentNode && el.parentNode.removeChild(el)
    }
    if (!value.update && el.id === 'update') {
      el.parentNode && el.parentNode.removeChild(el)
    }
    if (!value.insert && el.id === 'insert') {
      el.parentNode && el.parentNode.removeChild(el)
    }
    if (!value.insert && el.id === 'insert') {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
})

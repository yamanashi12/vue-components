import {
  Message
} from 'element-ui'
/**
 * response 过滤器
 *
 * @export
 * @param {*} res
 * @returns
 */
export default function sideEffectDefault(state, res) {
  if (state === 'start') {
    if (res.options && res.options.context) {
      if (res.options.context._isVue) {
        res.options.context.loading = true
      } else if (res.options.context.nodeType === 1) { // options为dom对象则修改disabled状态
        if (res.options.context.parentNode.disabled !== undefined) {
          res.options.context = res.options.context.parentNode
        }
        res.options.context.disabled = true
      }
    }
  } else if (state === 'complete') {
    if (res.options && res.options.context) {
      if (res.options.context._isVue) {
        res.options.context.loading = false
        res.options.context = null
      } else if (res.options.context.nodeType === 1) { // options为dom对象则修改disabled状态
        res.options.context.disabled = false
      }
    }
    if (res.options && res.options.successMsg) {
      Message({
        message: res.options.successMsg,
        type: 'success',
        duration: 2 * 1000
      })
    }
  } else if (state === 'filterError' || state === 'ajaxError') {
    if (res.options && res.options.context) {
      if (res.options.context._isVue) {
        res.options.context.loading = false
        res.options.context = null
      } else if (res.options.context.nodeType === 1) { // options为dom对象则修改disabled状态
        res.options.context.disabled = false
      }
    }
    if (!(res.options && res.options.errorMsg === 'none')) {
      Message({
        message: res.options.errorMsg || res.error.responseText || '网络错误',
        type: 'error',
        duration: 2 * 1000
      })
    }
  }
}
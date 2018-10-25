import Router from '@/routers'

/**
 * 搜索参数更新URL地址
 *
 * @export
 * @returns
 */
export function searchUpdateRoute (query) {
  let _query = Object.assign({}, query)
  for (let name in _query) { // 清除 值为null|undefined
    if (_query[name] === null || _query[name] === undefined || _query[name] === '' || ['pageTotal', 'total'].indexOf(name) !== -1) {
      delete _query[name]
    }
  }
  if (!_query.pageIndex ) {
    let pagesQuery = {}
    pagesQuery.pageIndex = 1
    _query = Object.assign({}, _query, pagesQuery)
  }
  if (!_query.pageSize) {
    let pagesQuery = {}
    pagesQuery.pageSize = 15
    _query = Object.assign({}, _query, pagesQuery)
  }
  console.log(Router.history.current.path, _query)
  Router.push({path: Router.history.current.path, query: _query})
}
/**
 * 判断菜单新旧
 *
 * @export
 * @returns
 */
export function checkMenuIframe (str) {
  let routeArr = Router.options.routes
  let check = (str, route) => {
    let ifram = true
    route.map( item => {
      if (str === item.identify) {
        ifram = false
      } else if (item.children && item.children.length > 0) {
        if(!check(str, item.children)) {
          ifram = false
        }
      }
    })
    return ifram
  }
  return check(str, routeArr)
}
/**
 * 获取cookie
 *
 * @export
 * @returns
 */
export function getCookie(name) {
 var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
 if (arr = document.cookie.match(reg))
  return (arr[2])
 else
  return
}

// export function dispatch (context, componentName, eventName, params) {
//   var parent = context.$parent || context.$root
//   var name = parent.$options.componentName
//   while (parent && (!name || name !== componentName)) {
//     parent = parent.$parent
//     if (parent) {
//       name = parent.$options.componentName
//     }
//   }
//   if (parent) {
//     parent.$emit.apply(parent, [eventName].concat(params))
//   }
// }


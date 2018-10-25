/**
 * URL 映射
 */
let mapper = {
  'w': 'wmsadmin/admin'
}
const prefix = process.env.NODE_ENV === 'development' ? 'api' : ''
mapper = Object.keys(mapper).reduce((o, k) => {
  o[k] = `${prefix}/${mapper[k]}`
  return o
}, {})

export default url => {
  // mocks 不做映射
  if (url.indexOf('mocks') >= 0 && url.indexOf('mocks') < 2) {
    return url
  }
  const arr = url.split('/')
  // 如果找到匹配的
  const matchValue = arr.length > 2 && mapper[arr[1]]
  if (matchValue) {
    return url.replace(arr[1], matchValue)
  }
  if (url.charAt(0) === '/') {
    url = `/${prefix}${url}`
  } else {
    url = `/${prefix}/${url}`
  }
  return url
}
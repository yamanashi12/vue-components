/* eslint-disable */
import * as http from './core'
import filtersDefault from './repsonseFilters'
import mapperURL from './mapperURL'
import sideEffectDefault from './repsonseSideEffect'

/**
 *  创建一个HTTP Agent GET 请求
 *
 * @export
 * @template T - 返回数据类型
 * @template P - 参数类型
 * @param {(Url | string)} requestURL - 符合 URL 规范的地址
 * @param {T} [params={} as T] - Query 参数，自动转换成 { foo: 1 } 为 &foo=1
 * @param {AjaxRequest} [options={}] - request config & options { context, filterResponse, sideEffect}
 * @returns
 */
export function GET(requestURL, params = {}, options = {}) {
  let {
    context, // 上下文
    filterResponse, // response 过滤器
    sideEffect, // 副作用
    ...config // request Config
  } = options
  filterResponse = filterResponse || filtersDefault
  sideEffect = sideEffect || sideEffectDefault
  return http.httpAgent(http.GET(mapperURL(requestURL), subPageIndex(params), config), filterResponse, sideEffect, options)
}
/**
 * 创建一个HTTP POST 请求
 *
 * @export
 * @template T - 返回数据类型
 * @template P - 参数类型
 * @param {(Url | string)} requestURL - 符合 URL 规范的地址
 * @param {T} data - POST 请求的数据
 * @param {AjaxRequest} [options={}] - request config & options { context, filterResponse, sideEffect}
 * @returns
 */
export function POST(requestURL, data, options = {}) {
  let {
    context, // 上下文
    filterResponse, // response 过滤器
    sideEffect, // 副作用
    ...config // request Config
  } = options
  filterResponse = filterResponse || filtersDefault
  sideEffect = sideEffect || sideEffectDefault
  return http.httpAgent(http.POST(mapperURL(requestURL), subPageIndex(data), config), filterResponse, sideEffect, options)
}

/**
 * 创建一个HTTP PUT 请求
 *
 * @export
 * @template T - 返回数据类型
 * @template P - 参数类型
 * @param {(Url | string)} requestURL - 符合 URL 规范的地址
 * @param {T} data - POST 请求的数据
 * @param {AjaxRequest} [options={}] - request config & options { context, filterResponse, sideEffect}
 * @returns
 */
export function PUT(requestURL, data, options = {}) {
  let {
    context, // 上下文
    filterResponse, // response 过滤器
    sideEffect, // 副作用
    ...config // request Config
  } = options
  filterResponse = filterResponse || filtersDefault
  sideEffect = sideEffect || sideEffectDefault
  return http.httpAgent(http.PUT(mapperURL(requestURL), data, config), filterResponse, sideEffect, options)
}

/**
 * 创建一个HTTP DELETE 请求
 *
 * @export
 * @template T
 * @param {(Url | string)} requestURL - 符合 URL 规范的地址
 * @param {T} [params={} as T] - Query 参数，自动转换成 { foo: 1 } 为 &foo=1
 * @param {AjaxRequest} [options={}] - request config & options { context, filterResponse, sideEffect}
 * @returns
 */
export function DELETE(requestURL, params = {}, options = {}) {
  let {
    context, // 上下文
    filterResponse, // response 过滤器
    sideEffect, // 副作用
    ...config // request Config
  } = options
  filterResponse = filterResponse || filtersDefault
  sideEffect = sideEffect || sideEffectDefault
  return http.httpAgent(http.DELETE(mapperURL(requestURL), data, config), filterResponse, sideEffect, options)
}

/**
 *  统一处理pageIndex从0开始的问题
 *
 * @export
 * @param [params={} as T] - Query 参数
 * @returns
 */
function subPageIndex (params) {
  if (params && params.pageIndex && params.pageIndex > 0) {
    let obj = Object.assign({}, params)
    obj.pageIndex--
    return obj
  }
  return params
}
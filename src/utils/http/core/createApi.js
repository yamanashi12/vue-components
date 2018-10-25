/* eslint-disable */
import {
  Url,
  format as formatURL
} from 'url'
import {
  stringify as formatQuery
} from 'querystring'
import {
  ajax as AjaxObservable,
  AjaxRequest
} from 'rxjs/ajax'
import {
  map,
  catchError
} from 'rxjs/operators'

// 创建一个默认的Ajax配置
const ajaxConfig = {
  timeout: 3000,
  withCredentials: true
}
const ajaxHeader = {
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
}

/**
 * 创建一个HTTP AJAX 请求
 *
 * @export
 * @template DATA - 返回的数据类型
 * @param {Url} requestURL - 符合 URL 规范的地址
 * @param {AjaxRequest} config - axios request config
 * @returns
 */

function setFormDate(config) {
  if (config.type === 'formData') {
    if (typeof config.body === 'object') {
      return Object.assign({}, config, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
    }
  }
  return config
}

export function createAjax(requestURL, config) {
  config = setFormDate(config)
  let ajaxSetting = Object.assign({}, ajaxConfig, config, {
    headers: Object.assign({}, ajaxHeader.headers, config.headers),
    url: formatURL(requestURL)
  })
  return AjaxObservable(ajaxSetting).pipe(
    map(res => ({
      data: res.response,
      status: res.status,
      config: res.request,
      raw: res.responseText,
      headers: res.request && res.request.headers,
    }))
  )
}
/**
 *  创建一个HTTP GET 请求
 *
 * @export
 * @template T - 返回数据类型
 * @template P - 参数类型
 * @param {(Url | string)} requestURL - 符合 URL 规范的地址
 * @param {T} [params={} as T] - Query 参数，自动转换成 { foo: 1 } 为 &foo=1
 * @param {AjaxRequest} [config={}] - axios request config
 * @returns
 */
export function GET(requestURL, params = {}, config = {}) {
  if (typeof requestURL === 'string') {
    requestURL = {
      pathname: requestURL
    }
  }
  requestURL = Object.assign({}, requestURL, {
    search: formatQuery(params)
  })
  return createAjax(
    requestURL,
    Object.assign({}, config, {
      method: 'GET'
    })
  )
}

/**
 * 创建一个HTTP POST 请求
 *
 * @export
 * @template T - 返回数据类型
 * @template P - 参数类型
 * @param {(Url | string)} requestURL - 符合 URL 规范的地址
 * @param {T} data - POST 请求的数据
 * @param {AjaxRequest} [config={}] - axios request config
 * @returns
 */
export function POST(requestURL, data, config = {}) {
  if (typeof requestURL === 'string') {
    requestURL = {
      pathname: requestURL
    }
  }
  return createAjax(
    requestURL,
    Object.assign({}, config, {
      method: 'POST',
      body: data
    })
  )
}

/**
 * 创建一个HTTP PUT 请求
 *
 * @export
 * @template T - 返回数据类型
 * @template P - 参数类型
 * @param {(Url | string)} requestURL - 符合 URL 规范的地址
 * @param {T} data - POST 请求的数据
 * @param {AjaxRequest} [config={}] - axios request config
 * @returns
 */
export function PUT(requestURL, data, config = {}) {
  if (typeof requestURL === 'string') {
    requestURL = {
      pathname: requestURL
    }
  }
  return createAjax(
    requestURL,
    Object.assign({}, config, {
      method: 'PUT',
      body: data
    })
  )
}

/**
 * 创建一个HTTP DELETE 请求
 *
 * @export
 * @template T
 * @param {(Url | string)} requestURL - 符合 URL 规范的地址
 * @param {T} [params={} as T] - Query 参数，自动转换成 { foo: 1 } 为 &foo=1
 * @param {AjaxRequest} [config={}] - axios request config
 * @returns
 */
export function DELETE(requestURL, params = {}, config = {}) {
  if (typeof requestURL === 'string') {
    requestURL = {
      pathname: requestURL
    }
  }
  return createAjax(
    requestURL,
    Object.assign({}, config, {
      method: 'DELETE',
      body: params
    })
  )
}
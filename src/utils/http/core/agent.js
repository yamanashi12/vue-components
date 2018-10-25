/* eslint-disable */
import { of
} from 'rxjs'
import {
  catchError,
  tap,
  map
} from 'rxjs/operators'


/**
 * HTTP 数据代理
 *
 * @export
 * @param {*} httpStream - GET/POST等Observable请求流
 * @param {*} filterResponse - response 过滤器
 * @param {*} sideEffect - 副作用函数 （state: start | ajaxError | filterError | complete, response）
 * @returns
 */
export function httpAgent(httpStream, filterResponse, sideEffect, options) {
  sideEffect = sideEffect || function () {}
  filterResponse = filterResponse || function (res) {
    if (!res.response) {
      throw new Error(res.responseText)
    }
    return res
  }
  // 写入副作用状态
  sideEffect('start', {
    options
  })
  return httpStream.pipe(
    catchError(err => {
      return of({
        status: err.status,
        request: err.request,
        responseText: err.message
      }).pipe(
        tap(errorResponse => sideEffect('ajaxError', {
          error: errorResponse.responseText,
          response: errorResponse,
          options
        }))
      )
    }),
    map(filterResponse),
    catchError(error => {
      return of(error).pipe(
        tap(error => sideEffect('filterError', {
          error,
          options
        }))
      )
    }),
    tap(data => {
      if (data.responseText) {
        throw data
      }
      sideEffect('complete', {
        data,
        options
      })
    }))
}
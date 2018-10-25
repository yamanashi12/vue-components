/**
 * response 过滤器
 *
 * @export
 * @param {*} res
 * @returns
 */
export default function filterResponse(res) {
  if (!res.data || res.data.errorCode !== 0 || res.status !== 200) {
    throw {
      response: res,
      status: res.status,
      request: res.request,
      responseText: res.data && res.data.errorMessage ? res.data.errorMessage : '网络错误',
      errorCode: res.data && res.data.errorCode ? res.data.errorCode : 1
    }
  }
  return {
    data: res.data.data,
    response: res
  }
}

/*
 本文件用于定义与API接口服务的代码
 只允许导出接口方法，不允许导出其它非接口方法的功能
 */
import * as httpAgent from '@/utils/http'
/**
 * 校验
 *
 * @export
 * @returns
 */
export function getCheckJump(params, options) {
  return httpAgent.GET('/legaoadmin/navigation/checkJump.json', params, options)
}

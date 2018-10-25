import * as httpAgent from '@/utils/http'

/**
 * 获取菜单
 *
 * @export
 * @returns
 */
export function getVideoToken(data, options) {
  return httpAgent.POST('/cdnadmin/admin/upload/videoKen.json', data, options)
}

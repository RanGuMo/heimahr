import request from '@/utils/request'

/**
 *  获取员工列表数据
 * @param {*} params
 * @returns
 */
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params // 地址参数 查询参数
  })
}

import request from '@/utils/request'

export function changePassword(data) {
  return request({
    url: '/auth/change-password',
    method: 'post',
    data: data,
  })
}

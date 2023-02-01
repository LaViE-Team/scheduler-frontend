import request from '@/utils/request'

export function getShare() {
  return request({
    url: '/timetable/get-shared-timetables',
    method: 'get',
  })
}

export function shareTimtable(data) {
  return request({
    url: '/timetable/share-timetable',
    method: 'post',
    data: data,
  })
}

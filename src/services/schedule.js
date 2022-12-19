import request from '@/utils/request'

export function uploadCsv(data) {
  return request({
    url: '/csv/upload',
    method: 'post',
    data: data,
  })
}

export function getSampleCsv() {
  return request({
    url: '/csv/download-sample',
    method: 'get',
    responseType: 'blob',
  })
}

export function updateData(data) {
  return request({
    url: '/csv/update-cached-csv',
    method: 'post',
    data: data,
  })
}

export function getDatas() {
  return request({
    url: '/csv/get-cached-csv',
    method: 'get',
  })
}

export function exportSchedule(data) {
  return request({
    url: '/timetable/generate-timetable',
    method: 'post',
    data: data,
  })
}

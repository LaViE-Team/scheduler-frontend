import request from '@/utils/request'

export function generateTimtable(data) {
  return request({
    url: '/timetable/generate-timetable',
    method: 'post',
    data: data,
  })
}

export function exportTimtable(data) {
  return request({
    url: '/timetable/export-timetable',
    method: 'post',
    data: data,
    responseType: 'blob',
  })
}

export function getExportedTimtables() {
  return request({
    url: '/timetable/get-exported-timetables',
    method: 'get',
  })
}

export function downloadTimetable(params) {
  return request({
    url: '/timetable/download-timetable',
    method: 'get',
    params: params,
    responseType: 'blob',
  })
}

import request from '@/utils/request'

export function uploadCsv(data) {
    return request({
      url: '/csv/upload',
      method: 'post',
      data: data,
    })
}

export function downloadSample() {
    return request({
      url: '/csv/download-sample',
      method: 'get',
    })
}

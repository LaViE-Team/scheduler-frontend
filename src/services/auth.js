import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data: data,
  })
}

export function register(data) {
  return request({
    url: '/auth/register',
    method: 'post',
    data: data,
  })
}

export function loginFB() {
  return request({
    url: '/auth/facebook',
    method: 'get',
  })
}

export function loginGG(data) {
  return request({
    url: '/auth/google',
    method: 'post',
    data: data,
  })
}

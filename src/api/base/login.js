import request from '@/utils/request'
import qs from 'qs'
import { moduleurl } from './main'
export function login(PUBLIC_KEY, username, password, vcCode, vcToken, loginCount) {
  const clientId = '0'
  return request({
    url: `/${moduleurl}/login`,
    method: 'post',
    headers: {
      RSAPublicKey: PUBLIC_KEY
    },
    data: {
      username,
      password,
      vcCode,
      vcToken,
      clientId,
      loginCount
    },
    transformRequest: [function(data) {
      return qs.stringify(data)
    }]
  })
}

export function rsa() {
  return request({
    url: `/${moduleurl}/rsa/public`,
    method: 'get'
  })
}

export function code(token = '') {
  return request({
    url: `/${moduleurl}/verification/image/generate`,
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: `/${moduleurl}/logout`,
    method: 'post'
  })
}

export function getInfo() {
  return request({
    url: `/${moduleurl}/user/info`,
    method: 'get'
  })
}


import request from '@/utils/request'

export function camerapage(data) {
  return request({
    url: '/ctrl-tool/video-device/page',
    method: 'post',
    data
  })
}

export function vrpage(data) {
  return request({
    url: '/ctrl-tool/vr/page',
    method: 'post',
    data
  })
}

// 管控工具总数
export function count(id) {
  return request({
    url: `/ctrl-tool/tools/count/${id}`,
    method: 'get'
  })
}
